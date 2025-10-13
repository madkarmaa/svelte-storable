export type WidenLiteral<T> = T extends number
	? number
	: T extends string
		? string
		: T extends boolean
			? boolean
			: T extends undefined
				? undefined
				: T;

export type JSONPrimitive = string | number | boolean | null | undefined;

export type Serializable =
	| JSONPrimitive
	| Serializable[]
	| {
			[key: string]: Serializable;
	  };
