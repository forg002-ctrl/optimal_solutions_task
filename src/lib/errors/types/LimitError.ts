export class LimitError extends Error {
    public statusCode = 402;
    public message: string;

    public constructor(message: string = 'Limit of your current plan was reached') {
        super();
        this.message = message;
    }
}
