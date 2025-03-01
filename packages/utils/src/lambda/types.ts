/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayEvent, APIGatewayProxyEventQueryStringParameters, Context } from 'aws-lambda';

export interface DefaultResponse {
	message: string;
	data?: Record<string, any>;
}

export interface DefaultPathParameters {
	[key: string]: string;
}

export interface APIGatewayEventWithBody<
	T,
	P extends DefaultPathParameters = {},
	Q extends APIGatewayProxyEventQueryStringParameters | null = null,
> extends Omit<APIGatewayEvent, 'body' | 'pathParameters' | 'queryStringParameters'> {
	body: T;
	pathParameters: P;
	queryStringParameters: Q;
}

export type None = null;

export interface Func<T> {
	(): T;
}

export interface ExtendedContext extends Context {}
