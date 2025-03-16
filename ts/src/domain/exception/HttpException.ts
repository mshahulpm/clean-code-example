export class HttpException extends Error {

    constructor(
        public readonly message: string,
        public readonly statusCode: number,
        public readonly errorCode: string
    ) {
        super(message)
    }

    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            errorCode: this.errorCode
        };
    }
}

export class BadRequestException extends HttpException {

    constructor(
        public readonly message: string,
    ) {
        super(message, 400, 'BAD_REQUEST')
    }
}

export class NotFoundException extends HttpException {

    constructor(
        public readonly message: string,
    ) {
        super(message, 404, 'NOT_FOUND')
    }
}

export class ForbiddenException extends HttpException {

    constructor(
        public readonly message: string,
    ) {
        super(message, 404, 'FORBIDDEN')
    }
}

export class InternalServerException extends HttpException {

    constructor(
        public readonly message: string,
    ) {
        super(message, 500, 'INTERNAL_SERVER_ERROR')
    }
}

