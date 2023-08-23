export class BadRequestError extends Error {
    public statusCode = 400;
    public message: string;

    public constructor(message: string = 'Bad request') {
        super();
        this.message = message;
    }
}
