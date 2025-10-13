/**
 * Widens literal types to their base types.
 * This is useful for ensuring type compatibility when working with stores.
 * @example
 * WidenLiteral<5> // number
 * WidenLiteral<'hello'> // string
 * WidenLiteral<true> // boolean
 */
export type WidenLiteral<T> = T extends number
	? number
	: T extends string
		? string
		: T extends boolean
			? boolean
			: T extends undefined
				? undefined
				: T;

/**
 * Represents primitive JSON types that can be stored in localStorage.
 */
export type JSONPrimitive = string | number | boolean | null | undefined;

/**
 * Represents any value that can be serialized to JSON.
 * This includes primitives, arrays, and objects with serializable values.
 */
export type Serializable =
	| JSONPrimitive
	| Serializable[]
	| {
			[key: string]: Serializable;
	  };
