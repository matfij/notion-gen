import axios from 'axios';
import { Cache } from 'cache-manager';
import { Test } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GeneratorService } from '../../../src/modules/gateway/services/generator.service';
import { getProjectCreateDtoStub, getProjectDtoStub } from '../../common/stubs';
import { Queue } from 'bull';
import { QUEUE_SYNC } from '../../../src/common/config';
import { ProjectSyncProducer } from '../../../src/modules/gateway/services/project-sync.producer';
import { ProjectSyncJobPayload } from '../../../src/modules/gateway/models/project-sync-job-payload';

describe('GeneratorService', () => {
    let generatorService: GeneratorService;
    const cacheManager: Omit<Cache, 'store'> = {
        set: jest.fn(),
        get: jest.fn(),
        del: jest.fn(),
        reset: jest.fn(),
        wrap: jest.fn(),
    };
    const projectSyncProducer: Omit<ProjectSyncProducer, 'syncQueue'> = {
        addToQueue: jest.fn(),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                GeneratorService,
                {
                    provide: CACHE_MANAGER,
                    useValue: cacheManager,
                },
                {
                    provide: ProjectSyncProducer,
                    useValue: projectSyncProducer,
                },
            ],
        }).compile();
        generatorService = moduleRef.get(GeneratorService);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(generatorService).toBeDefined();
    });

    it('should create a project', async () => {
        const userId = 'k1e023k0ek12o3';
        const dto = getProjectCreateDtoStub();
        jest.spyOn(axios, 'post').mockResolvedValue({ data: getProjectDtoStub(userId) });

        const project = await generatorService.createProject(userId, dto);

        expect(project.id).toEqual(getProjectDtoStub(userId).id);
        expect(project.notionName).toEqual(dto.notionName);
        expect(cacheManager.del).toBeCalledWith(`USER_PROJECTS_${userId}`);
    });

    it('should read user projects from cache', async () => {
        const userId = '095k64it0d';
        const cachedProjects = [getProjectDtoStub(userId)];
        cacheManager.get = jest.fn().mockResolvedValue(cachedProjects);
        const axiosPostSpy = jest.spyOn(axios, 'post').mockRejectedValue(undefined);

        const projects = await generatorService.readProjects(userId);

        expect(projects).toEqual(cachedProjects);
        expect(cacheManager.get).toBeCalledWith(`USER_PROJECTS_${userId}`);
        expect(axiosPostSpy).not.toHaveBeenCalled();
    });

    it('should read user projects from other service', async () => {
        const userId = 'k1e023k0ek12o3';
        const fetchedProjects = [getProjectDtoStub(userId)];
        cacheManager.get = jest.fn().mockResolvedValue(undefined);
        const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValue({ data: fetchedProjects });

        const projects = await generatorService.readProjects(userId);

        expect(projects).toEqual(fetchedProjects);
        expect(cacheManager.get).toBeCalledWith(`USER_PROJECTS_${userId}`);
        expect(axiosPostMock).toHaveBeenCalled();
    });

    it('should add project sync job to queue', async () => {
        const userId = '929eie00192e';
        const projectId = 'kd209d1d09d2';

        await generatorService.syncProjectData(userId, projectId);

        expect(projectSyncProducer.addToQueue).toHaveBeenCalledWith({
            userId: userId,
            projectId: projectId,
        });
    });
});
