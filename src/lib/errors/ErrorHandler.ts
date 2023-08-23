import { BadRequestError } from '@src/lib/errors/types/BadRequestError';
import { AuthError } from '@src/lib/errors/types/AuthError';
import { LimitError } from '@src/lib/errors/types/LimitError';
import { ForbiddenError } from '@src/lib/errors/types/ForbiddenError';
import { NotFoundError } from '@src/lib/errors/types/NotFoundError';

type IError<T = Record<string, unknown>> = T & {
    errors?: Array<string> | undefined;
};

export class ErrorHandler {
    private static instance: ErrorHandler;

    private static Init(): void {
        if (this.instance) {
            throw new Error('ErrorHandler is already initialized');
        }

        this.instance = new ErrorHandler();
    }

    public static GetInstance(): ErrorHandler {
        if (!this.instance) {
            this.Init();
        }

        return this.instance;
    }

    private isBadRequestError(x: Error): x is BadRequestError {
        return x instanceof BadRequestError;
    }

    private isAuthError(x: Error): x is AuthError {
        return x instanceof AuthError;
    }

    private isLimitError(x: Error): x is LimitError {
        return x instanceof LimitError;
    }

    private isForbiddenError(x: Error): x is ForbiddenError {
        return x instanceof ForbiddenError;
    }

    private isNotFoundError(x: Error): x is NotFoundError {
        return x instanceof NotFoundError;
    }

    public isCustomError(err: Error): boolean {
        if (this.isBadRequestError(err) ||
        this.isAuthError(err) ||
        this.isLimitError(err) ||
        this.isForbiddenError(err) ||
        this.isNotFoundError(err)) {
            return true;
        } else {
            return false;
        }
    }

    public static hasErrors<T = Record<string, unknown>>(json: IError<T>): boolean | undefined {
        return json && json.errors && Array.isArray(json.errors) && !!json.errors.length;
    }

    public static toString<T = Record<string, unknown>>(json: IError<T>): string {
        return this.hasErrors(json)
            ? json.errors ? json.errors.join('\n') : ''
            : '';
    }
}
