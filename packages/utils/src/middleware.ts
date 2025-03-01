/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { Log } from '@sst-monorepo-template/utils';
import {
	Context as LambdaContext,
	Handler,
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';
import { omit } from 'lodash';
import { InternalServerError, unauthorized, Unauthorized } from './http';
import { APIGatewayEventWithBody, DefaultPathParameters } from './lambda';

/**
 * 'after' middleware to log successful execution of the handler.
 *
 * @param {middy.Request<APIGatewayProxyEvent, APIGatewayProxyResult, Error, ExtendedContext>} handler
 */
const after: middy.MiddlewareFn<
	APIGatewayEventWithBody<any, any, any>,
	APIGatewayProxyResult,
	Error,
	LambdaContext
> = async (handler): Promise<void> => {
	try {
		const keysToOmit = ['pk', 'sk'];

		// Parse the response body if it exists and is not already an object
		const parsedBody = handler?.response?.body ? JSON.parse(handler.response.body) : {};
		if (Array.isArray(parsedBody.data)) {
			Object.assign(parsedBody, {
				data: parsedBody.data.map((item: any) => {
					if (typeof item === 'object') {
						return omit(item, keysToOmit);
					}

					return item;
				}),
			});
		}
		// Omit the primary and sort keys from the response body
		else if (typeof parsedBody.data === 'object') {
			Object.assign(parsedBody, { data: omit(parsedBody.data, keysToOmit) });
		}

		if (handler.response) {
			Object.assign(handler.response, { body: JSON.stringify(parsedBody) });
		}

		// Log the success and the modified response
		// Log.info('Handler executed successfully', handler.response);
	} catch (error) {
		const errString = error?.toString();
		Log.error('Error in after middleware:', errString);
		throw new InternalServerError(`Internal Server Error: ${errString}`);
	}
};

/**
 * Options for wrapping middleware in the handler.
 */
interface Options {
	isAuthenticated?: boolean;
	bodyParser?: boolean;
}

/**
 * Clerk Authentication Middleware for AWS Lambda using middy.
 * This middleware verifies the Clerk token before processing the handler,
 * attaches the session information to the handler context, and handles errors.
 *
 * @returns {middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult, Error, ExtendedContext>}
 */
const clerkMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult, Error, LambdaContext> => {
	return {
		/**
		 * 'before' middleware to verify the Clerk token.
		 * It extracts the Authorization header, verifies the token, and adds session info to the context.
		 *
		 * @param {middy.Request<APIGatewayProxyEvent, APIGatewayProxyResult, Error, ExtendedContext>} handler
		 * @throws {Unauthorized} if the Authorization header is missing or token verification fails.
		 */
		before: async (handler) => {
			const { headers } = handler.event;
			const authorization = headers?.Authorization ?? headers?.authorization;

			// Ensure there's an Authorization header
			const token = authorization?.replace('Bearer ', '');
			if (!token) {
				Log.error('No authorization token provided');
				throw new Unauthorized('Unauthorized: No token provided');
			}

			try {
				// const claims = await verifyToken(token, {
				//   secretKey: process.env.CLERK_SECRET_KEY,
				// });
				// Log.debug('Authentication was successful. Claims from clerk: ', {
				//   ...claims,
				//   iat: new Date(claims.iat * 1000).toISOString(),
				//   exp: new Date(claims.exp * 1000).toISOString(),
				// });
				// Object.assign(handler.context, { claims });
			} catch (error) {
				const err = error as Error;

				Log.error('Error verifying Clerk token:', error);
				throw new Unauthorized(err?.message || 'Unauthorized: Invalid token');
			}
		},

		/**
		 * 'after' middleware to log successful execution of the handler.
		 *
		 * @param {middy.Request<APIGatewayProxyEvent, APIGatewayProxyResult, Error, ExtendedContext>} handler
		 */
		after,

		/**
		 * 'onError' middleware to handle errors during the request lifecycle.
		 * Logs the error and modifies the response to return a 500 Internal Server Error.
		 *
		 * @param {middy.Request<APIGatewayProxyEvent, APIGatewayProxyResult, Error, ExtendedContext>} handler
		 */
		onError: async (handler) => {
			// Handle errors in the middleware lifecycle
			Log.error('Error in middleware:', handler.error);

			// Modify the response if needed
			handler.response = unauthorized({
				message: handler?.error?.message || 'Unauthorized',
			});
		},
	};
};

/**
 * Wraps the given Lambda handler with the necessary middlewares (Clerk authentication and JSON body parsing).
 *
 * @param {Handler<APIGatewayEventWithBody<T>, APIGatewayProxyResult>} handler - The original Lambda handler function with a typed body.
 * @param {Options} options - Options indicating whether authentication is required.
 * @returns {middy.MiddyfiedHandler<any, any, Error, ExtendedContext, {}>} The handler wrapped with middlewares.
 */
export const wrapMiddleware = <
	T,
	P extends DefaultPathParameters = {},
	Q extends APIGatewayProxyEventQueryStringParameters | null = null,
>(
	handler: Handler<APIGatewayEventWithBody<T, P, Q>, APIGatewayProxyResult>,
	options: Options = { isAuthenticated: false, bodyParser: false },
): middy.MiddyfiedHandler<any, any, Error, LambdaContext, {}> => {
	const defaultMiddleware = middy(handler).after(after);

	if (options.bodyParser) {
		defaultMiddleware.use(jsonBodyParser());
	}

	if (options.isAuthenticated) {
		defaultMiddleware.use(clerkMiddleware());
	}

	return defaultMiddleware;
};
