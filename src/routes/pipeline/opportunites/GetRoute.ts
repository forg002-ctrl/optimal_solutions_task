import { Request, Response } from 'express';

import { Route } from '@src/lib/routing/Route';
import { RemoteService } from '@src/lib/remote/RemoteService';

import {
    routeDescription,
    IResponseBody,
    IListPipelineOpportunitesQuery,
    IListPipelineOpportunitesParams,
} from '@src/routes/pipeline/opportunites/GetRouteDescription';

import { ListPipelineOpportunites } from '@src/modules/opportunites/ListPipelineOpportunites';
import { ListPipelineStatuses } from '@src/modules/pipelines/ListPipelineStatuses';

export class GetPipelinceOpportunitesRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let query = req.query as unknown as IListPipelineOpportunitesQuery;
        let params = req.params as unknown as IListPipelineOpportunitesParams;

        let listPipelineOpportunites = new ListPipelineOpportunites({
            listPipelineStatuses: new ListPipelineStatuses({
                remoteService: RemoteService.GetInstance(),
            }),
            remoteService: RemoteService.GetInstance(),
        });
        let response = await listPipelineOpportunites.execute({
            id_pipeline: params.id_pipeline,
            page: query.page,
            entriesPerPage: query.entriesPerPage,
        });

        res.status(200).json(<IResponseBody>response);
    }
}
