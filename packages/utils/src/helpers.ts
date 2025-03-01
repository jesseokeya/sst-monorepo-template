/* eslint-disable @typescript-eslint/no-explicit-any */
import { omit } from 'lodash';

/**
 * Removes specified keys from an object, including default keys if provided.
 *
 * @param {object} data - The object to process.
 * @param {string[]} [keys=[]] - Additional keys to omit from the object, optional.
 * @returns {object | null} - A new object with specified keys removed, or null if input is invalid.
 */
export const omitKeys = (data: Record<string, any> | null, keys: string[] = []): Record<string, any> | null => {
	if (!data || typeof data !== 'object') {
		return null;
	}

	const defaultKeysToOmit = ['pk', 'sk'];
	return omit(data, [...defaultKeysToOmit, ...keys]);
};

/**
 * Returns the partition key for a given ID and prefix.
 * The partition key is formatted as '{prefix}::{id}'.
 *
 * @param {string} id - The ID to use in the partition key.
 * @param {string} prefix - The prefix to use in the partition key.
 * @returns {string} - The partition key.
 */
export const toPartitionKey = (id: string, prefix: string): string => `${prefix}::${id}`;
