import { ErrorHandler } from '@src/lib/errors/ErrorHandler';
import { IRemoteResponse, RemoteService } from '@src/lib/remote/RemoteService';

import { AuthError } from '@src/lib/errors/types/AuthError';
import { LimitError } from '@src/lib/errors/types/LimitError';
import { ForbiddenError } from '@src/lib/errors/types/ForbiddenError';
import { BadRequestError } from '@src/lib/errors/types/BadRequestError';

import { IListPipelineStatuses } from '@src/modules/pipelines/ListPipelineStatuses';

export interface IListPipelineOpportunitesOptions {
    remoteService: RemoteService;
    listPipelineStatuses: IListPipelineStatuses;
}

export interface IListPipelineOpportunitesParams {
    id_pipeline: string;
    page?: number;
    entriesPerPage?: number;
}

interface IListApiOpportunites {
    date_updated: string;
    note: string;
    integration_links: Array<any>;
    contact_name?: string;
    contact_id?: string;
    created_by_name: string;
    status_label: string;
    id: string;
    date_created: string;
    organization_id: string;
    status_id: string;
    confidence: string;
    status_display_name: string;
    value: number;
    value_period: string;
    status_type: 'active' | 'won' | 'lost';
    annualized_value: number;
    lead_name: string;
    date_won: string;
    date_lost?: string;
    value_formatted: string;
    value_currency: string;
    expected_value: number;
    user_name: string;
    updated_by_name: string;
    lead_id: string;
    annualized_expected_value: number;
    created_by: string;
    updated_by: string;
    user_id: string;
}

interface IListApiPipelinesResponse {
    data: IListApiOpportunites[];
}

interface IListPipelineOpportunitesResponse {
    data: IListApiOpportunites[];
    entriesCount: number;
}

interface IListPipelineOpportunites {
    execute(params: IListPipelineOpportunitesParams): Promise<IListPipelineOpportunitesResponse>;
}

export class ListPipelineOpportunites implements IListPipelineOpportunites {
    private listPipelineStatuses: IListPipelineStatuses;
    private remoteService: RemoteService;

    public constructor(options: IListPipelineOpportunitesOptions) {
        this.listPipelineStatuses = options.listPipelineStatuses;
        this.remoteService = options.remoteService;
    }

    public async execute(params: IListPipelineOpportunitesParams): Promise<IListPipelineOpportunitesResponse> {
        this.validateParams(params);

        let response = await this.listPipelineStatuses.execute({
            id_pipeline: params.id_pipeline,
        });

        let apiResponse: IRemoteResponse;
        if (params.page && params.entriesPerPage) {
            apiResponse = await this.remoteService.get(`/opportunity?_skip=${(params.page - 1) * params.entriesPerPage}&_limit=${params.entriesPerPage}&status_id__in=${response.statusIds.toString()}`);
        } else {
            apiResponse = await this.remoteService.get(`/opportunity?status_id__in=${response.statusIds.toString()}`);
        }

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

        return <IListPipelineOpportunitesResponse>{
            data: apiResponseJSON.data,
            entriesCount: apiResponseJSON.data.length,
        };
    }

    private validateParams(params: IListPipelineOpportunitesParams): void {
        if (!params.id_pipeline) {
            throw new BadRequestError('Pipeline ID is missing');
        }
        if (params.page && params.page <= 0) {
            throw new BadRequestError('Page can not be lower, than 1');
        }
        if (params.entriesPerPage && params.entriesPerPage <= 0) {
            throw new BadRequestError('Number of entries per page can not be lower, than 1');
        }
    }
}
