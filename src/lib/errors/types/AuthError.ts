export class AuthError extends Error {
    public statusCode = 401;
    public message: string;

    public constructor(message: string = 'Not Authorized') {
        super();
        this.message = message;
    }
}
