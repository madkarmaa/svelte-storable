import { writable } from 'svelte/store';
import type { JSONSerializable } from '@madkarma/ts-utils/types';

type WidenLiteral<T> = T extends number
	? number
	: T extends boolean
		? boolean
		: T extends undefined
			? undefined
			: T;

const browser = typeof window !== 'undefined';

/**
 * Creates a Svelte store that automatically persists its value to localStorage.
 *
 * @template T - The type of the value stored, must be serializable
 * @param key - The localStorage key to store the value under
 * @param initial - The initial value of the store
 * @param options - Optional configuration
 * @param options.serialize - Custom serialization function (defaults to JSON.stringify)
 * @param options.deserialize - Custom deserialization function (defaults to JSON.parse)
 * @param options.saveInitial - Whether to save the initial value to localStorage if no stored value exists
 *
 * @example
 * // Basic usage
 * const count = storable('count', 0);
 *
 * @example
 * // With custom serialization
 * const date = storable('lastVisit', new Date(), {
 *   serialize: (d) => d.toISOString(),
 *   deserialize: (s) => new Date(s)
 * });
 *
 * @example
 * // Don't save initial value if not in storage
 * const preferences = storable('prefs', { theme: 'dark' }, { saveInitial: false });
 */
const storable = <T extends JSONSerializable>(
	key: string,
	initial: T,
	options: Partial<{
		serialize: (value: WidenLiteral<T>) => string;
		deserialize: (value: string) => WidenLiteral<T>;
		saveInitial: boolean;
	}> = {}
) => {
	const { subscribe, set, update } = writable(initial as WidenLiteral<T>);

	const opts: Required<typeof options> = {
		serialize: JSON.stringify,
		deserialize: JSON.parse,
		saveInitial: true,
		...options
	};

	let skipNextSave = false;

	if (browser) {
		const storedValue = localStorage.getItem(key);
		if (storedValue) set(opts.deserialize(storedValue));
		else if (!opts.saveInitial) skipNextSave = true;
	}

	subscribe((value) => {
		if (!browser) return;

		if (skipNextSave) {
			skipNextSave = false;
			return;
		}

		localStorage.setItem(key, opts.serialize(value));
	});

	const _reset = () => set(initial as WidenLiteral<T>);

	return {
		subscribe,
		set,
		update,
		reset: _reset,
		/**
		 * Removes the value from localStorage
		 * @param reset - Whether to also reset the store value to initial
		 */
		remove: (reset = true) => {
			if (!browser) return;

			localStorage.removeItem(key);

			if (!reset) return;

			skipNextSave = true;
			_reset();
		}
	};
};

export default storable;
