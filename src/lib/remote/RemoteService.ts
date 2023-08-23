import fetch from 'node-fetch';

import { Crypto } from '@src/lib/utils/Crypto';
import { Config } from '@src/lib/config/Config';

import { HTTP_METHODS } from '@src/lib/routing/description/interfaces/IRouteDescription';

export interface IRemoteService {
    get(endpoint: string): Promise<IRemoteResponse>;
}

export interface IRemoteResponse {
    status: number;
    json(): Promise<Record<string, unknown>>;
    json<T>(): Promise<T>;
}

export class RemoteService implements IRemoteService {
    private static instance: RemoteService;

    private async fetch(method: HTTP_METHODS, endpoint: string, additionalHeaders?: Record<string, unknown>): Promise<IRemoteResponse> {
        let headers: Record<string, unknown> = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Crypto.toBase64(`${Config.CLOSE_API_KEY}:`)}`,
        };

        if (additionalHeaders) {
            headers = {
                'Content-Type': 'application/json',
                ...additionalHeaders,
            };
        }

        let url: string = endpoint.startsWith('/') ? `https://api.close.com/api/v1/${endpoint}` : `https://api.close.com/api/v1${endpoint}`;
        let requestConfig: any = {
            method: method,
            credentials: 'include',
            mode: 'cors',
            cache: 'no-cache',
            keepalive: true,
            headers: headers,
        };

        return fetch(url, requestConfig) as unknown as IRemoteResponse;
    }

    public async get(endpoint: string): Promise<IRemoteResponse> {
        return this.fetch('GET', endpoint);
    }

    public static GetInstance(): RemoteService {
        if (!this.instance) {
            this.instance = new RemoteService();
        }

        return this.instance;
    }
}
