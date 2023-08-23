import { JSONSchemaType } from 'ajv';

import { IRouteDefinition } from '@src/lib/routing/description/interfaces/IRouteDefinition';
import { IRouteDescription } from '@src/lib/routing/description/interfaces/IRouteDescription';

import {
    Generate200ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate402ResponseSchema,
    Generate403ResponseSchema,
    Generate500ResponseSchema,
} from '@src/lib/routing/description/ResponseDefinition';

interface IListPipelineStatus {
    id: string;
    label: string;
    type: 'active' | 'won' | 'lost';
}

interface IListPipeline {
    id: string;
    organization_id: string;
    name: string;
    statuses: IListPipelineStatus[];
    created_by?: string;
    updated_by?: string;
    date_created: string;
    date_updated: string;
}

export interface IResponseBody {
    data: IListPipeline[];
    entriesCount: number;
}

const statusResponseSchema: JSONSchemaType<IListPipelineStatus[]> = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
            label: {
                type: 'string',
            },
            type: {
                type: 'string',
                enum: ['active', 'won', 'lost'],
            },
        },
        required: [
            'id',
            'label',
            'type',
        ],
    },
};

const responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    organization_id: {
                        type: 'string',
                    },
                    name: {
                        type: 'string',
                    },
                    statuses: statusResponseSchema,
                    created_by: {
                        type: 'string',
                        nullable: true,
                    },
                    updated_by: {
                        type: 'string',
                        nullable: true,
                    },
                    date_created: {
                        type: 'string',
                    },
                    date_updated: {
                        type: 'string',
                    },
                },
                required: [
                    'id',
                    'organization_id',
                    'name',
                    'statuses',
                    'date_created',
                    'date_updated',
                ],
            },
        },
        entriesCount: {
            type: 'number',
        },
    },
    required: [
        'data',
        'entriesCount',
    ],
};

const routeDefinition: IRouteDefinition = {
    tags: ['Pipelines'],
    summary: 'GET pipelines route',
    description: 'Route for getting your pipelines from Close.com',
    responses: {
        200: Generate200ResponseSchema('Pipelines from Close.com fetched successfully', responseBodySchema),
        400: Generate400ResponseSchema('Bad request'),
        401: Generate401ResponseSchema('API authorization failed'),
        402: Generate402ResponseSchema('Limit of your current plan was reached'),
        403: Generate403ResponseSchema('Forbidden'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/pipelines',
    definition: routeDefinition,
};
