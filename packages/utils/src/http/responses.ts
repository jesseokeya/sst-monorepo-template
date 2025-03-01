import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Generates a 200 OK response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 200.
 */
export function ok<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 200,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 201 Created response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 201.
 */
export function created<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 201,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 202 Accepted response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 202.
 */
export function accepted<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 202,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 204 No Content response.
 *
 * @returns {APIGatewayProxyResult} The Lambda response with status 204 and no body.
 */
export function noContent(): APIGatewayProxyResult {
	return {
		statusCode: 204,
		body: '',
	};
}

/**
 * Generates a 400 Bad Request response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 400.
 */
export function badRequest<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 400,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 401 Unauthorized response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 401.
 */
export function unauthorized<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 401,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 403 Forbidden response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 403.
 */
export function forbidden<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 403,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 404 Not Found response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 404.
 */
export function notFound<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 404,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 405 Method Not Allowed response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 405.
 */
export function methodNotAllowed<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 405,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 409 Conflict response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 409.
 */
export function conflict<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 409,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 422 Unprocessable Entity response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 422.
 */
export function unprocessableEntity<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 422,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 429 Too Many Requests response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 429.
 */
export function tooManyRequests<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 429,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 500 Internal Server Error response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 500.
 */
export function internalServerError<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 500,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 501 Not Implemented response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 501.
 */
export function notImplemented<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 501,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 502 Bad Gateway response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 502.
 */
export function badGateway<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 502,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 503 Service Unavailable response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 503.
 */
export function serviceUnavailable<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 503,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}

/**
 * Generates a 504 Gateway Timeout response.
 *
 * @template T
 * @param {T} body - The response body.
 * @returns {APIGatewayProxyResult} The Lambda response with status 504.
 */
export function gatewayTimeout<T>(body: T): APIGatewayProxyResult {
	return {
		statusCode: 504,
		body: typeof body === 'string' ? body : JSON.stringify(body),
	};
}
