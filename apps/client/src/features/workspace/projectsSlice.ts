import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProjectDto } from '../../common/gql-client';

export type ProjectsState = {
    projects: ProjectDto[];
};

const initialState: ProjectsState = {
    projects: [],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<ProjectDto[]>) => {
            console.log('set')
            state.projects = action.payload;
        },
    },
});

export default projectsSlice.reducer;
export const { setProjects } = projectsSlice.actions;
