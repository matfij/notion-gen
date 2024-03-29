import { Schema, Types, model } from 'mongoose';
import { Project } from '../models/project-model';
import { PROJECT_CONFIG_DEFAULT } from '../data/project-config-default';
import { ProjectConfigSchema } from './mongo-project-config-model';

const ProjectSchema = new Schema<Project>(
    {
        id: String,
        userId: String,
        notionId: String,
        notionName: String,
        notionAccessCode: String,
        config: {
            type: ProjectConfigSchema,
            ref: 'ProjectConfig',
            default: PROJECT_CONFIG_DEFAULT,
        },
        createdAt: {
            type: Number,
            default: () => Date.now(),
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

ProjectSchema.pre('save', function (next) {
    this.id = new Types.ObjectId().toHexString();
    this.notionId = this.notionId?.replace(/\-/g, '');
    next();
});

export const MongoProjectModel = model<Project>('Project', ProjectSchema);
