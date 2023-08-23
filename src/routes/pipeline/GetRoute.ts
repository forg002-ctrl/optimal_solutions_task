import { Request, Response } from 'express';

import { Route } from '@src/lib/routing/Route';
import { RemoteService } from '@src/lib/remote/RemoteService';

import {
    routeDescription,
    IResponseBody,
} from '@src/routes/pipeline/GetRouteDescription';

import { ListPipelines } from '@src/modules/pipelines/ListPipelines';

export class GetPipelincesRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let listPipelines = new ListPipelines({
            remoteService: RemoteService.GetInstance(),
        });
        let response = await listPipelines.execute();

        res.status(200).json(<IResponseBody>response);
    }
}
