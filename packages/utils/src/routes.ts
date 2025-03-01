import { FunctionArgs } from '../../../.sst/platform/src/components/aws';

/**
 * Creates a route configuration for the API with the given handler suffix path.
 * @param {string} handlerSuffixPath - The relative path (from the `./apps/server/src/lambdas/api/` directory) to the handler function file.
 * @returns {object} - A route configuration object that can be used in the API route definitions
 */
const createRoute = (
	handlerSuffixPath: string,
	props: Omit<FunctionArgs, 'handler'> = {},
	folder = 'api',
): FunctionArgs => {
	return { ...props, handler: `./apps/server/src/lambdas/${folder}/${handlerSuffixPath}` };
};

export { createRoute };
