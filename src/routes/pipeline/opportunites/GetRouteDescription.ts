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

export interface IListPipelineOpportunitesQuery {
    page?: number;
    entriesPerPage?: number;
}

export interface IListPipelineOpportunitesParams {
    id_pipeline: string;
}

interface IListOpportunity {
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

export interface IResponseBody {
    data: IListOpportunity[];
    entriesCount: number;
}

const responseBodySchema: JSONSchemaType<IResponseBody> = {
    type: 'object',
    properties: {
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    date_updated: {
                        type: 'string',
                    },
                    note: {
                        type: 'string',
                    },
                    integration_links: {
                        type: 'array',
                        items: {
                            type: 'object',
                        },
                    },
                    contact_name: {
                        type: 'string',
                        nullable: true,
                    },
                    contact_id: {
                        type: 'string',
                        nullable: true,
                    },
                    created_by_name: {
                        type: 'string',
                    },
                    status_label: {
                        type: 'string',
                    },
                    id: {
                        type: 'string',
                    },
                    date_created: {
                        type: 'string',
                    },
                    organization_id: {
                        type: 'string',
                    },
                    status_id: {
                        type: 'string',
                    },
                    confidence: {
                        type: 'string',
                    },
                    status_display_name: {
                        type: 'string',
                    },
                    value: {
                        type: 'number',
                    },
                    value_period: {
                        type: 'string',
                    },
                    status_type: {
                        type: 'string',
                        enum: ['active', 'won', 'lost'],
                    },
                    annualized_value: {
                        type: 'number',
                    },
                    lead_name: {
                        type: 'string',
                    },
                    date_won: {
                        type: 'string',
                    },
                    date_lost: {
                        type: 'string',
                        nullable: true,
                    },
                    value_formatted: {
                        type: 'string',
                    },
                    value_currency: {
                        type: 'string',
                    },
                    expected_value: {
                        type: 'number',
                    },
                    user_name: {
                        type: 'string',
                    },
                    updated_by_name: {
                        type: 'string',
                    },
                    lead_id: {
                        type: 'string',
                    },
                    annualized_expected_value: {
                        type: 'number',
                    },
                    created_by: {
                        type: 'string',
                    },
                    updated_by: {
                        type: 'string',
                    },
                    user_id: {
                        type: 'string',
                    },
                },
                required: [
                    'date_updated',
                    'note',
                    'integration_links',
                    'created_by_name',
                    'status_label',
                    'id',
                    'date_created',
                    'organization_id',
                    'status_id',
                    'confidence',
                    'status_display_name',
                    'value',
                    'value_period',
                    'status_type',
                    'annualized_value',
                    'lead_name',
                    'date_won',
                    'value_formatted',
                    'value_currency',
                    'expected_value',
                    'user_name',
                    'updated_by_name',
                    'lead_id',
                    'annualized_expected_value',
                    'created_by',
                    'updated_by',
                    'user_id',
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
    tags: ['Opportunites'],
    summary: 'GET opportunites route',
    description: `Route for getting the pipeline's opportunites by pipeline_id from Close.com`,
    parameters: [
        {
            in: 'query',
            name: 'page',
            description: 'Number of page',
            required: false,
            schema: {
                type: 'number',
            },
        },
        {
            in: 'query',
            name: 'entriesPerPage',
            description: 'Number of entries per page',
            required: false,
            schema: {
                type: 'number',
            },
        },
        {
            in: 'path',
            name: 'pipeline_id',
            description: 'Pipeline ID',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        200: Generate200ResponseSchema(`Pipeline's opportunites from Close.com fetched successfully`, responseBodySchema),
        400: Generate400ResponseSchema('Bad request'),
        401: Generate401ResponseSchema('API authorization failed'),
        402: Generate402ResponseSchema('Limit of your current plan was reached'),
        403: Generate403ResponseSchema('Forbidden'),
        500: Generate500ResponseSchema('Internal server error'),
    },
};

export const routeDescription: IRouteDescription = {
    httpMethod: 'GET',
    endpoint: '/pipeline/:id_pipeline/opportunites',
    definition: routeDefinition,
};
