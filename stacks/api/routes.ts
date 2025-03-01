import { createRoute } from '@sst-monorepo-template/utils';
import { ApiGatewayV2Args } from '../../.sst/platform/src/components/aws';

/**
 * Registers API routes for the application using AWS API Gateway v2.
 *
 * This function defines and registers API routes for resources such as leads, emails, onboarding,
 * organizations, and webhooks. It uses `sst.aws.ApiGatewayV2` for creating and managing the API Gateway instance.
 *
 * @param {ApiGatewayV2Args} props - Configuration arguments for the API Gateway such as routes and authorizers.
 * @returns {sst.aws.ApiGatewayV2} - The configured API Gateway instance.
 */
export const registerRoutes = (props: ApiGatewayV2Args): sst.aws.ApiGatewayV2 => {
	const api = new sst.aws.ApiGatewayV2('Api', props);

	/* Helper function to simplify route registration */
	const registerRoute = (method: string, path: string, handler: string) => {
		api.route(`${method} ${path}`, createRoute(handler));
	};

	/* Home Route */
	registerRoute('GET', '/', 'home.handler');

	return api;
};
