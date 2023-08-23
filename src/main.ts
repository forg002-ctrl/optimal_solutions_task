require('module-alias/register');
import dotenv from 'dotenv';
dotenv.config();

import { Config } from '@src/lib/config/Config';
import { App } from '@src/lib/App';

import { appRoutes } from '@src/routes/routeIndex';

void (async (): Promise<void> => {
    Config.Init({
        port: Number(process.env.PORT),
        closeApiKey: process.env.CLOSE_API_KEY as string,
    });

    let app = new App();
    await app.run({
        routes: appRoutes,
    });
})();
