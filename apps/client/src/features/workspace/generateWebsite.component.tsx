import { useEffect } from 'react';
import { LoadingComponent } from '../../common/loading.component';
import { useGenerateWebsiteQuery } from './projectsApiSlice';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

export type GenerateWebsiteComponentProps = {
    projectId: string;
    onDownloadComplete: () => void;
};

export const GenerateWebsiteComponent = (props: GenerateWebsiteComponentProps) => {
    const { isLoading, status } = useGenerateWebsiteQuery(props.projectId, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (status === QueryStatus.fulfilled || status === QueryStatus.rejected) {
            props.onDownloadComplete();
        }
    }, [props, status]);

    return <>{isLoading && <LoadingComponent />}</>;
};
