/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpError extends Error {
	public statusCode: number;
	public details?: any;

	/**
	 * @param {number} statusCode - The HTTP status code.
	 * @param {string} message - The error message.
	 * @param {any} [details] - Optional additional error details (e.g., original error).
	 */
	constructor(statusCode: number, message: string, details?: any) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		this.name = this.constructor.name;

		// Capture the stack trace (optional)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

/**
 * Represents a 400 Bad Request error.
 *
 * @class BadRequest
 * @extends HttpError
 */
export class BadRequest extends HttpError {
	/**
	 * Creates an instance of BadRequest.
	 *
	 * @param {string} [message='Bad Request'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Bad Request', details?: any) {
		super(400, message, details);
	}
}

/**
 * Represents a 401 Unauthorized error.
 *
 * @class Unauthorized
 * @extends HttpError
 */
export class Unauthorized extends HttpError {
	/**
	 * Creates an instance of Unauthorized.
	 *
	 * @param {string} [message='Unauthorized'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Unauthorized', details?: any) {
		super(401, message, details);
	}
}

/**
 * Represents a 403 Forbidden error.
 *
 * @class Forbidden
 * @extends HttpError
 */
export class Forbidden extends HttpError {
	/**
	 * Creates an instance of Forbidden.
	 *
	 * @param {string} [message='Forbidden'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Forbidden', details?: any) {
		super(403, message, details);
	}
}

/**
 * Represents a 404 Not Found error.
 *
 * @class NotFound
 * @extends HttpError
 */
export class NotFound extends HttpError {
	/**
	 * Creates an instance of NotFound.
	 *
	 * @param {string} [message='Not Found'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Not Found', details?: any) {
		super(404, message, details);
	}
}

/**
 * Represents a 415 Unsupported Media Type error.
 *
 * @class UnsupportedMediaType
 * @extends HttpError
 */
export class UnsupportedMediaType extends HttpError {
	/**
	 * Creates an instance of UnsupportedMediaType.
	 *
	 * @param {string} [message='Unsupported Media Type'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Unsupported Media Type', details?: any) {
		super(415, message, details);
	}
}

/**
 * Represents a 405 Method Not Allowed error.
 *
 * @class MethodNotAllowed
 * @extends HttpError
 */
export class MethodNotAllowed extends HttpError {
	/**
	 * Creates an instance of MethodNotAllowed.
	 *
	 * @param {string} [message='Method Not Allowed'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Method Not Allowed', details?: any) {
		super(405, message, details);
	}
}

/**
 * Represents a 409 Conflict error.
 *
 * @class Conflict
 * @extends HttpError
 */
export class Conflict extends HttpError {
	/**
	 * Creates an instance of Conflict.
	 *
	 * @param {string} [message='Conflict'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Conflict', details?: any) {
		super(409, message, details);
	}
}

/**
 * Represents a 422 Unprocessable Entity error.
 *
 * @class UnprocessableEntity
 * @extends HttpError
 */
export class UnprocessableEntity extends HttpError {
	/**
	 * Creates an instance of UnprocessableEntity.
	 *
	 * @param {string} [message='Unprocessable Entity'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Unprocessable Entity', details?: any) {
		super(422, message, details);
	}
}

/**
 * Represents a 429 Too Many Requests error.
 *
 * @class TooManyRequests
 * @extends HttpError
 */
export class TooManyRequests extends HttpError {
	/**
	 * Creates an instance of TooManyRequests.
	 *
	 * @param {string} [message='Too Many Requests'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Too Many Requests', details?: any) {
		super(429, message, details);
	}
}

/**
 * Represents a 500 Internal Server Error.
 *
 * @class InternalServerError
 * @extends HttpError
 */
export class InternalServerError extends HttpError {
	/**
	 * Creates an instance of InternalServerError.
	 *
	 * @param {string} [message='Internal Server Error'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Internal Server Error', details?: any) {
		super(500, message, details);
	}
}

/**
 * Represents a 501 Not Implemented error.
 *
 * @class NotImplemented
 * @extends HttpError
 */
export class NotImplemented extends HttpError {
	/**
	 * Creates an instance of NotImplemented.
	 *
	 * @param {string} [message='Not Implemented'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Not Implemented', details?: any) {
		super(501, message, details);
	}
}

/**
 * Represents a 502 Bad Gateway error.
 *
 * @class BadGateway
 * @extends HttpError
 */
export class BadGateway extends HttpError {
	/**
	 * Creates an instance of BadGateway.
	 *
	 * @param {string} [message='Bad Gateway'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Bad Gateway', details?: any) {
		super(502, message, details);
	}
}

/**
 * Represents a 503 Service Unavailable error.
 *
 * @class ServiceUnavailable
 * @extends HttpError
 */
export class ServiceUnavailable extends HttpError {
	/**
	 * Creates an instance of ServiceUnavailable.
	 *
	 * @param {string} [message='Service Unavailable'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Service Unavailable', details?: any) {
		super(503, message, details);
	}
}

/**
 * Represents a 504 Gateway Timeout error.
 *
 * @class GatewayTimeout
 * @extends HttpError
 */
export class GatewayTimeout extends HttpError {
	/**
	 * Creates an instance of GatewayTimeout.
	 *
	 * @param {string} [message='Gateway Timeout'] - The error message.
	 * @param {any} [details] - Optional additional error details.
	 */
	constructor(message: string = 'Gateway Timeout', details?: any) {
		super(504, message, details);
	}
}
