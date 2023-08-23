import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '@src/lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '@src/lib/routing/description/interfaces/IRouteDescription';

import {
    Generate200ResponseSchema,
    Generate500ResponseSchema,
} from '@src/lib/routing/description/ResponseDefinition';

export interface IRequestBody {}

export interface IResponseBody {
    response: string;
}

const responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        response: {
            type: 'string',
        },
    },
    required: [
        'response',
    ],
};

const routeDefinition: IRouteDefinition = {
    tags: ['Test'],
    summary: 'GET ping route',
    description: 'Testing ping route',
    responses: {
        200: Generate200ResponseSchema('Pong', responseBodySchema),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/ping',
    definition: routeDefinition,
};
