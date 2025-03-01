/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyResult } from 'aws-lambda';
import {
	HttpError,
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	MethodNotAllowed,
	Conflict,
	UnprocessableEntity,
	TooManyRequests,
	InternalServerError,
	NotImplemented,
	BadGateway,
	ServiceUnavailable,
	GatewayTimeout,
} from './errors';
import {
	badRequest,
	unauthorized,
	forbidden,
	notFound,
	methodNotAllowed,
	conflict,
	unprocessableEntity,
	tooManyRequests,
	internalServerError,
	notImplemented,
	badGateway,
	serviceUnavailable,
	gatewayTimeout,
} from './responses';

interface ErrorResponse {
	error: string;
	details?: Record<string, any>;
	statusCode: number;
}

/**
 * Maps error classes to their corresponding response functions.
 */
const errorResponseMap: Record<string, (message: ErrorResponse) => APIGatewayProxyResult> = {
	[BadRequest.name]: badRequest,
	[Unauthorized.name]: unauthorized,
	[Forbidden.name]: forbidden,
	[NotFound.name]: notFound,
	[MethodNotAllowed.name]: methodNotAllowed,
	[Conflict.name]: conflict,
	[UnprocessableEntity.name]: unprocessableEntity,
	[TooManyRequests.name]: tooManyRequests,
	[InternalServerError.name]: internalServerError,
	[NotImplemented.name]: notImplemented,
	[BadGateway.name]: badGateway,
	[ServiceUnavailable.name]: serviceUnavailable,
	[GatewayTimeout.name]: gatewayTimeout,
};

/**
 * Transforms an HttpError into an appropriate Lambda response.
 *
 * @param {Error} error - The caught error.
 * @returns {APIGatewayProxyResult} The appropriate Lambda response based on the error type.
 */
export function transformErrorToResponse(error: unknown): APIGatewayProxyResult {
	const err = error as HttpError;
	const errorName = err.constructor.name;
	const errorResponse: ErrorResponse = {
		error: err.toString(),
		details: err.details || {},
		statusCode: err.statusCode,
	};

	// Check if the error type exists in the map
	if (errorResponseMap[errorName]) {
		const responseFn = errorResponseMap[errorName];
		return responseFn(errorResponse);
	}

	// Default to Internal Server Error for unknown errors
	return internalServerError(errorResponse);
}
