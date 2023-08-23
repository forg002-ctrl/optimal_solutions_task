import express, { Express, Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import { Documentation } from '@src/lib/documentation/Documenatation';

export interface IServerOptions {
    port: number;
    swaggerDocumentation: Documentation;
}

export class Server {
    private static instance: Server;

    private app: Express;
    private router: Router;
    private port: number;
    private swaggerDocumentation: Documentation;

    private constructor(options: IServerOptions) {
        this.app = express();
        this.router = Router();
        this.port = options.port;
        this.swaggerDocumentation = options.swaggerDocumentation;
        this.app.use(this.router);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    public static Init(options: IServerOptions): void {
        if (this.instance) {
            throw new Error('Server is already initialized');
        }

        this.instance = new Server(options);
    }

    public static GetInstance(): Server {
        if (!this.instance) {
            throw new Error('Server is not initialized');
        }

        return this.instance;
    }

    public start(): void {
        if (!this.port || isNaN(this.port) || this.port <= 0) {
            throw new Error('Server starting failed - wrong port value');
        }

        this.initDocumentation();

        this.app.listen(this.port, () => {
            console.log(`Server is running on port - ${this.port}`);
        });
    }

    private initDocumentation(): void {
        if (!this.swaggerDocumentation) {
            throw new Error('Swagger Documentation is missing');
        }

        let swaggerDocs = this.swaggerDocumentation.getSwaggerJsDoc();
        let swaggerDocsHtml = swaggerUi.generateHTML(swaggerDocs);

        this.getRouter().use('/swagger', swaggerUi.serveFiles(swaggerDocs));
        this.getRouter().get('/swagger', (req: Request, res: Response): void => {
            res.send(swaggerDocsHtml);
        });
    }

    public getRouter(): Router {
        return this.router;
    }

    public getSwaggerDocumentation(): Documentation | undefined {
        return this.swaggerDocumentation;
    }
}
