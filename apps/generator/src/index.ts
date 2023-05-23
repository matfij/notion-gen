import os from 'os';
import cluster from 'cluster';
import express from 'express';
import mongoose from 'mongoose';
import { APP_PORT, DB_CONNECTION_STRING } from './common/config';
import { ProjectsRouter } from './features/projects/routes/projects-router';
import { GeneratorRouter } from './features/generator/routes/generator-router';

const app = express();
app.use(express.json());
app.use(new GeneratorRouter().router);
app.use(new ProjectsRouter().router);

function connectDb() {
    mongoose.connect(DB_CONNECTION_STRING).then(() => console.log(`generator-db connected (pid: ${process.pid})`));
}

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork(process.env);
    }
} else {
    app.listen(APP_PORT, () => {
        connectDb();
        console.log(`generator-app started (pid: ${process.pid}).`);
    });
}
