import { Server } from '@src/lib/server/Server';
import { Config } from '@src/lib/config/Config';
import { Documentation } from '@src/lib/documentation/Documenatation';
import { Route } from '@src/lib/routing/Route';

export interface IAppOptions {
    routes: Route[];
}

export class App {
    private server: Server;

    public async run(options: IAppOptions): Promise<void> {
        await this.initServer(options.routes);
        this.server.start();
    }

    private async initServer(routes: Route[]): Promise<void> {
        Server.Init({
            port: Config.PORT,
            swaggerDocumentation: new Documentation({
                basepath: '/',
                information: {
                    title: 'REST API',
                    description: 'REST API Routes',
                    version: '0.0.1',
                },
            }),
        });

        this.server = Server.GetInstance();
        for (let route of routes) {
            await route.register(this.server);
        }
    }
}
