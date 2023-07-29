import { ProjectRepository } from '../data-access/project-repository';
import { CreateProjectParams } from '../models/create-project-params';
import { EditProjectParams } from '../models/edit-project-params';
import { Project } from '../models/project-model';
import { ReadAllProjectsParams } from '../models/read-all-projects-params';
import { ReadOneProjectParams } from '../models/read-one-project-params';

export class ProjectsService {
    constructor(private projectRepository: ProjectRepository) {}

    async create(params: CreateProjectParams): Promise<Project> {
        const projectDoc = await this.projectRepository.create(params);
        return projectDoc;
    }

    async readOne(params: ReadOneProjectParams): Promise<Project> {
        const project = await this.projectRepository.findOne({ id: params.projectId });
        if (!project) {
            throw new Error('Project not found');
        }
        if (project.userId !== params.userId) {
            throw new Error('Project not owned');
        }
        return project;
    }

    async readAll(params: ReadAllProjectsParams): Promise<Project[]> {
        const projects = await this.projectRepository.findMany({ userId: params.userId });
        return projects;
    }

    async update(params: EditProjectParams): Promise<Project> {
        let project = await this.projectRepository.findOne({ id: params.projectId });
        if (!project) {
            throw new Error('Project not found');
        }
        if (project.userId !== params.userId) {
            throw new Error('Project not owned')
        }
        project = { ...project, ...params };
        const updatedProject = this.projectRepository.update(params);
        return updatedProject;
    }
}
