export class ForbiddenError extends Error {
    public statusCode = 403;
    public message: string;

    public constructor(message: string = 'Forbidden') {
        super();
        this.message = message;
    }
}
