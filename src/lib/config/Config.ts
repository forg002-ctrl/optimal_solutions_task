export interface IConfigOptions {
    port: number;
    closeApiKey: string;
}

export class Config {
    private static instance: Config;

    public static PORT: number;
    public static CLOSE_API_KEY: string;

    private constructor(options: IConfigOptions) {
        Config.PORT = options.port;
        Config.CLOSE_API_KEY = options.closeApiKey;
    }

    public static Init(options: IConfigOptions): void {
        if (this.instance) {
            throw new Error('Config is already initialized');
        }

        this.instance = new Config(options);
    }
}
