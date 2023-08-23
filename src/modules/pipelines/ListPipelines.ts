import { ErrorHandler } from '@src/lib/errors/ErrorHandler';
import { RemoteService } from '@src/lib/remote/RemoteService';

import { AuthError } from '@src/lib/errors/types/AuthError';
import { LimitError } from '@src/lib/errors/types/LimitError';
import { ForbiddenError } from '@src/lib/errors/types/ForbiddenError';
import { BadRequestError } from '@src/lib/errors/types/BadRequestError';

export interface IListPipelinesOptions {
    remoteService: RemoteService;
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

interface IListPipelinesResponse {
    data: IListApiPipeline[];
    entriesCount: number;
}

interface IListPipelines {
    execute(): Promise<IListPipelinesResponse>;
}

export class ListPipelines implements IListPipelines {
    private remoteService: RemoteService;

    public constructor(options: IListPipelinesOptions) {
        this.remoteService = options.remoteService;
    }

    public async execute(): Promise<IListPipelinesResponse> {
        let apiResponse = await this.remoteService.get('/pipeline');

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

        return <IListPipelinesResponse>{
            data: apiResponseJSON.data,
            entriesCount: apiResponseJSON.data.length,
        };
    }
}
