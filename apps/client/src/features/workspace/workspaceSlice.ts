import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProjectDto } from './models';

type WorkspaceState = {
    projects: ProjectDto[];
};

const initialState: WorkspaceState = {
    projects: [],
};

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState: initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<ProjectDto[]>) => {
            state.projects = action.payload;
        },
    },
});

export default workspaceSlice.reducer;
export const { setProjects } = workspaceSlice.actions;
