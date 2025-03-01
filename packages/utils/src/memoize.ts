/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A type representing a generic function that returns a result of type `T`.
 * @template T The return type of the function.
 */
type AnyFunction<T = unknown> = (...args: any[]) => T;

/**
 * A type representing a generic asynchronous function that returns a Promise of type `T`.
 * @template T The resolved type of the promise.
 */
type AnyAsyncFunction<T = unknown> = (...args: any[]) => Promise<T>;

/**
 * Memoizes a synchronous function, caching its results based on its arguments.
 * If the function is called again with the same arguments, the cached result is returned.
 *
 * @template TResult The return type of the memoized function.
 * @template TFactory The type of the function to be memoized.
 * @param {TFactory} factory - The function to be memoized.
 * @returns {TFactory} The memoized version of the provided function.
 *
 * @example
 * const add = (a: number, b: number) => a + b;
 * const memoizedAdd = memoize(add);
 * memoizedAdd(2, 3); // First time: computes and caches the result.
 * memoizedAdd(2, 3); // Second time: returns the cached result.
 */
export function memoize<TResult, TFactory extends AnyFunction<TResult>>(factory: TFactory): TFactory {
	const cache: Record<string, TResult> = {};

	function wrapped(...args: unknown[]): TResult {
		const key = JSON.stringify(args);
		if (!(key in cache)) {
			cache[key] = factory(...args);
		}
		return cache[key];
	}

	return wrapped as TFactory;
}

/**
 * Memoizes an asynchronous function, caching its results based on its arguments.
 * If the function is called again with the same arguments, the cached result is returned.
 *
 * @template TResult The resolved type of the promise returned by the memoized function.
 * @template TFactory The type of the asynchronous function to be memoized.
 * @param {TFactory} factory - The asynchronous function to be memoized.
 * @returns {TFactory} The memoized version of the provided asynchronous function.
 *
 * @example
 * const fetchData = async (id: number) => {
 *   const response = await fetch(`https://api.example.com/data/${id}`);
 *   return await response.json();
 * };
 * const memoizedFetch = memoizeAsync(fetchData);
 * memoizedFetch(1); // First time: fetches and caches the result.
 * memoizedFetch(1); // Second time: returns the cached result.
 */
export function memoizeAsync<TResult, TFactory extends AnyAsyncFunction<TResult>>(factory: TFactory): TFactory {
	const cache: Record<string, TResult> = {};

	async function wrapped(...args: unknown[]): Promise<TResult> {
		const key = JSON.stringify(args);
		if (!(key in cache)) {
			cache[key] = await factory(...args);
		}
		return cache[key];
	}

	return wrapped as TFactory;
}
