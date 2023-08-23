import { ErrorHandler } from '@src/lib/errors/ErrorHandler';
import { RemoteService } from '@src/lib/remote/RemoteService';

import { AuthError } from '@src/lib/errors/types/AuthError';
import { LimitError } from '@src/lib/errors/types/LimitError';
import { ForbiddenError } from '@src/lib/errors/types/ForbiddenError';
import { BadRequestError } from '@src/lib/errors/types/BadRequestError';

export interface IListPipelineStatusesOptions {
    remoteService: RemoteService;
}

interface IListPipelineStatusesParams {
    id_pipeline: string;
}

interface IListApiPipelineStatus {
    id: string;
    label: string;
    type: 'active' | 'won' | 'lost';
}

interface IListApiPipeline {
    id: string;
    organization_id: string;
    name: string;
    statuses: IListApiPipelineStatus[];
    created_by?: string;
    updated_by?: string;
    date_created: string;
    date_updated: string;
}

interface IListApiPipelinesResponse {
    data: IListApiPipeline[];
}

interface IListPipelineStatusesResponse {
    statusIds: string[];
}

export interface IListPipelineStatuses {
    execute(params: IListPipelineStatusesParams): Promise<IListPipelineStatusesResponse>;
}

export class ListPipelineStatuses implements IListPipelineStatuses {
    private remoteService: RemoteService;

    public constructor(options: IListPipelineStatusesOptions) {
        this.remoteService = options.remoteService;
    }

    public async execute(params: IListPipelineStatusesParams): Promise<IListPipelineStatusesResponse> {
        this.validateParams(params);

        let apiResponse = await this.remoteService.get(`/pipeline?id_pipeline=${params.id_pipeline}`);

        let json: Record<string, unknown> = {};
        if (apiResponse.status !== 200) {
            switch (apiResponse.status) {
                case 400:
                    json = await apiResponse.json();
                    if (ErrorHandler.hasErrors(json)) {
                        throw new BadRequestError(ErrorHandler.toString(json));
                    }
                    break;
                case 401:
                    throw new AuthError();
                case 402:
                    throw new LimitError();
                case 403:
                    throw new ForbiddenError();
                default:
                    json = await apiResponse.json();
                    if (ErrorHandler.hasErrors(json)) {
                        throw new Error(ErrorHandler.toString(json));
                    }
                    break;
            }
        }

        let apiResponseJSON = await apiResponse.json<IListApiPipelinesResponse>();
        let statuesIds = [];
        for (let entry of apiResponseJSON.data) {
            for (let statusObject of entry.statuses) {
                statuesIds.push(statusObject.id);
            }
        }

        return <IListPipelineStatusesResponse>{
            statusIds: statuesIds,
        };
    }

    private validateParams(params: IListPipelineStatusesParams): void {
        if (!params.id_pipeline) {
            throw new BadRequestError('Pipeline ID is missing');
        }
    }
}
