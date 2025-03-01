import { registerRoutes } from './routes';
import { ApiGatewayV2Args } from '../../.sst/platform/src/components/aws';

const isProd = $app.stage === 'production';
const isDev = $app.stage === 'development';
const retention = '1 week';

const props: ApiGatewayV2Args = {
	accessLog: {
		retention,
	},
	transform: {
		route: {
			handler: (props) => {
				props.link = [];
				props.environment = {
					ENVIRONMENT: $app.stage,
					NODE_ENV: process.env.NODE_ENV ?? $app.stage,
					LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
				};

				props.permissions = [
					{
						actions: ['*'],
						resources: ['*'],
					},
				];

				props.logging = {
					retention,
				};
			},
		},
	},
};

props.cors = {
	allowMethods: ['*'],
	allowHeaders: ['*'],
	allowOrigins: ['*'],
	maxAge: '1 day',
};

/* API Route Definitions */
const api = registerRoutes(props);

export { api };
