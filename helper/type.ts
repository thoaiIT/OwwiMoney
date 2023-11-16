type GetEventHandlers<T extends keyof JSX.IntrinsicElements> = Extract<keyof JSX.IntrinsicElements[T], `on${string}`>;

/**
 * Provides the event type for a given element and handler.
 *
 * @example
 *
 * type MyEvent = EventFor<"input", "onChange">;
 */
export type EventFor<
  TElement extends keyof JSX.IntrinsicElements,
  THandler extends GetEventHandlers<TElement>,
> = JSX.IntrinsicElements[TElement][THandler] extends ((e: infer TEvent) => any) | undefined ? TEvent : never;

/**
 * Provides the might be something or null or undefined.
 *
 * @example
 *
 * type phoneNumber: Maybe<string>;
 */
export type Maybe<T> = T | null | undefined;
/**
 * Represents a type for an enum with string values.
 *
 * @example
 *
 * enum Color {
 *   Red = "red",
 *   Green = "green",
 *   Blue = "blue",
 * }
 *
 * type ColorType = EnumType<Color>;
 */
export type EnumType<T extends Record<string, string>> = T[keyof T];
/**
 * Represents a simple dictionary with string keys and any values.
 *
 * @example
 *
 * const myDictionary: Dictionary = {
 *   key1: "value1",
 *   key2: "value2",
 * };
 */
export type Dictionary = {
  [key: string]: any;
};
/**
 * Represents an immutable data type.
 *
 * @example
 *
 * type ImmutableData = Immutable<{ name: string; age: number }>;
 */
export type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};
/**
 * Represents a custom type using Omit to exclude properties from an existing type.
 *
 * @example
 *
 * type NewUser = Omit<User, 'id'>;
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/**
 * Represents a custom type using Union to create a type from multiple types.
 *
 * @example
 *
 * type Result = UnionType<string | number>;
 */
export type UnionType<T> = T;
/**
 * Represents a custom type combining Omit and Union to exclude a property and add another type.
 *
 * @example
 *
 * type ModifiedUser = ModifyUser<User, 'email', string>;
 */
export type ModifyOption<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };
/**
 * Represents a type for an object with dynamic keys and specific value type.
 *
 * @example
 *
 * type DynamicObject = ObjectWithDynamicKeys<number>;
 */
export type ObjectWithDynamicKeys<T> = {
  [key: string]: T;
};

export type ErrorType = {
  message: string;
};

interface HttpStatusCode {
  [key: number]: { message: string; code: number };
}

export const HttpStatusCodes: HttpStatusCode = {
  100: { message: 'Continue', code: 100 },
  101: { message: 'Switching Protocols', code: 101 },

  200: { message: 'OK', code: 200 },
  201: { message: 'Created', code: 201 },
  204: { message: 'No Content', code: 204 },

  301: { message: 'Moved Permanently', code: 301 },
  304: { message: 'Not Modified', code: 304 },

  400: { message: 'Bad Request', code: 400 },
  401: { message: 'Unauthorized', code: 401 },
  403: { message: 'Forbidden', code: 403 },
  404: { message: 'Not Found', code: 404 },
  422: { message: 'Unprocessable Entity', code: 422 },

  500: { message: 'Internal Server Error', code: 500 },
  502: { message: 'Bad Gateway', code: 502 },
  503: { message: 'Service Unavailable', code: 503 },
  504: { message: 'Gateway Timeout', code: 504 },
};
