import { Route } from '@src/lib/routing/Route';

import { GetPingRoute } from '@src/routes/ping/GetRoute';
import { GetPipelincesRoute } from '@src/routes/pipeline/GetRoute';
import { GetPipelinceOpportunitesRoute } from '@src/routes/pipeline/opportunites/GetRoute';

export const appRoutes: Route[] = [
    new GetPingRoute(),
    new GetPipelincesRoute(),
    new GetPipelinceOpportunitesRoute(),
];
