import { Log } from '@sst-monorepo-template/utils';
import { APIGatewayEventWithBody, None, ok, wrapMiddleware } from '@sst-monorepo-template/utils';
import { Handler } from 'aws-lambda';

export const home: Handler<APIGatewayEventWithBody<None>> = async (_) => {
	Log.info('Home route hit');
	return ok({
		message: `Welcome to sst-monorepo-template api 🤖`,
		data: {
			version: '0.0.0',
			author: 'sst-monorepo-template',
		},
	});
};

export const handler = wrapMiddleware(home);
