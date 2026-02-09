
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model AccountResetLog
 * 
 */
export type AccountResetLog = $Result.DefaultSelection<Prisma.$AccountResetLogPayload>
/**
 * Model PriceTier
 * 
 */
export type PriceTier = $Result.DefaultSelection<Prisma.$PriceTierPayload>
/**
 * Model PriceList
 * 
 */
export type PriceList = $Result.DefaultSelection<Prisma.$PriceListPayload>
/**
 * Model Skin
 * 
 */
export type Skin = $Result.DefaultSelection<Prisma.$SkinPayload>
/**
 * Model ImageUpload
 * 
 */
export type ImageUpload = $Result.DefaultSelection<Prisma.$ImageUploadPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model CarouselSlide
 * 
 */
export type CarouselSlide = $Result.DefaultSelection<Prisma.$CarouselSlidePayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Voucher
 * 
 */
export type Voucher = $Result.DefaultSelection<Prisma.$VoucherPayload>
/**
 * Model GlobalSettings
 * 
 */
export type GlobalSettings = $Result.DefaultSelection<Prisma.$GlobalSettingsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Status: {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN_USE',
  NOT_AVAILABLE: 'NOT_AVAILABLE'
};

export type Status = (typeof Status)[keyof typeof Status]


export const MediaType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


export const BookingStatus: {
  HOLD: 'HOLD',
  RESERVED: 'RESERVED',
  EXPIRED: 'EXPIRED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  EXPIRED: 'EXPIRED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const Provider: {
  FASPAY: 'FASPAY',
  MANUAL: 'MANUAL'
};

export type Provider = (typeof Provider)[keyof typeof Provider]


export const PaymentMethodType: {
  QRIS: 'QRIS',
  VIRTUAL_ACCOUNT: 'VIRTUAL_ACCOUNT',
  MANUAL: 'MANUAL'
};

export type PaymentMethodType = (typeof PaymentMethodType)[keyof typeof PaymentMethodType]


export const Type: {
  PERSENTASE: 'PERSENTASE',
  NOMINAL: 'NOMINAL'
};

export type Type = (typeof Type)[keyof typeof Type]

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type PaymentMethodType = $Enums.PaymentMethodType

export const PaymentMethodType: typeof $Enums.PaymentMethodType

export type Type = $Enums.Type

export const Type: typeof $Enums.Type

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accountResetLog`: Exposes CRUD operations for the **AccountResetLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountResetLogs
    * const accountResetLogs = await prisma.accountResetLog.findMany()
    * ```
    */
  get accountResetLog(): Prisma.AccountResetLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priceTier`: Exposes CRUD operations for the **PriceTier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceTiers
    * const priceTiers = await prisma.priceTier.findMany()
    * ```
    */
  get priceTier(): Prisma.PriceTierDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priceList`: Exposes CRUD operations for the **PriceList** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceLists
    * const priceLists = await prisma.priceList.findMany()
    * ```
    */
  get priceList(): Prisma.PriceListDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skin`: Exposes CRUD operations for the **Skin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skins
    * const skins = await prisma.skin.findMany()
    * ```
    */
  get skin(): Prisma.SkinDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.imageUpload`: Exposes CRUD operations for the **ImageUpload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImageUploads
    * const imageUploads = await prisma.imageUpload.findMany()
    * ```
    */
  get imageUpload(): Prisma.ImageUploadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.carouselSlide`: Exposes CRUD operations for the **CarouselSlide** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CarouselSlides
    * const carouselSlides = await prisma.carouselSlide.findMany()
    * ```
    */
  get carouselSlide(): Prisma.CarouselSlideDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voucher`: Exposes CRUD operations for the **Voucher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vouchers
    * const vouchers = await prisma.voucher.findMany()
    * ```
    */
  get voucher(): Prisma.VoucherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.globalSettings`: Exposes CRUD operations for the **GlobalSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalSettings
    * const globalSettings = await prisma.globalSettings.findMany()
    * ```
    */
  get globalSettings(): Prisma.GlobalSettingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.3.1
   * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Account: 'Account',
    AccountResetLog: 'AccountResetLog',
    PriceTier: 'PriceTier',
    PriceList: 'PriceList',
    Skin: 'Skin',
    ImageUpload: 'ImageUpload',
    User: 'User',
    Customer: 'Customer',
    CarouselSlide: 'CarouselSlide',
    Booking: 'Booking',
    Payment: 'Payment',
    Voucher: 'Voucher',
    GlobalSettings: 'GlobalSettings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "account" | "accountResetLog" | "priceTier" | "priceList" | "skin" | "imageUpload" | "user" | "customer" | "carouselSlide" | "booking" | "payment" | "voucher" | "globalSettings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      AccountResetLog: {
        payload: Prisma.$AccountResetLogPayload<ExtArgs>
        fields: Prisma.AccountResetLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountResetLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountResetLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>
          }
          findFirst: {
            args: Prisma.AccountResetLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountResetLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>
          }
          findMany: {
            args: Prisma.AccountResetLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>[]
          }
          create: {
            args: Prisma.AccountResetLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>
          }
          createMany: {
            args: Prisma.AccountResetLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountResetLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>[]
          }
          delete: {
            args: Prisma.AccountResetLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>
          }
          update: {
            args: Prisma.AccountResetLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>
          }
          deleteMany: {
            args: Prisma.AccountResetLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountResetLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountResetLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>[]
          }
          upsert: {
            args: Prisma.AccountResetLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountResetLogPayload>
          }
          aggregate: {
            args: Prisma.AccountResetLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccountResetLog>
          }
          groupBy: {
            args: Prisma.AccountResetLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountResetLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountResetLogCountArgs<ExtArgs>
            result: $Utils.Optional<AccountResetLogCountAggregateOutputType> | number
          }
        }
      }
      PriceTier: {
        payload: Prisma.$PriceTierPayload<ExtArgs>
        fields: Prisma.PriceTierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceTierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceTierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>
          }
          findFirst: {
            args: Prisma.PriceTierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceTierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>
          }
          findMany: {
            args: Prisma.PriceTierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>[]
          }
          create: {
            args: Prisma.PriceTierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>
          }
          createMany: {
            args: Prisma.PriceTierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceTierCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>[]
          }
          delete: {
            args: Prisma.PriceTierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>
          }
          update: {
            args: Prisma.PriceTierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>
          }
          deleteMany: {
            args: Prisma.PriceTierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceTierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceTierUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>[]
          }
          upsert: {
            args: Prisma.PriceTierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceTierPayload>
          }
          aggregate: {
            args: Prisma.PriceTierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceTier>
          }
          groupBy: {
            args: Prisma.PriceTierGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceTierGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceTierCountArgs<ExtArgs>
            result: $Utils.Optional<PriceTierCountAggregateOutputType> | number
          }
        }
      }
      PriceList: {
        payload: Prisma.$PriceListPayload<ExtArgs>
        fields: Prisma.PriceListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>
          }
          findFirst: {
            args: Prisma.PriceListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>
          }
          findMany: {
            args: Prisma.PriceListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>[]
          }
          create: {
            args: Prisma.PriceListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>
          }
          createMany: {
            args: Prisma.PriceListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>[]
          }
          delete: {
            args: Prisma.PriceListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>
          }
          update: {
            args: Prisma.PriceListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>
          }
          deleteMany: {
            args: Prisma.PriceListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>[]
          }
          upsert: {
            args: Prisma.PriceListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceListPayload>
          }
          aggregate: {
            args: Prisma.PriceListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceList>
          }
          groupBy: {
            args: Prisma.PriceListGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceListGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceListCountArgs<ExtArgs>
            result: $Utils.Optional<PriceListCountAggregateOutputType> | number
          }
        }
      }
      Skin: {
        payload: Prisma.$SkinPayload<ExtArgs>
        fields: Prisma.SkinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>
          }
          findFirst: {
            args: Prisma.SkinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>
          }
          findMany: {
            args: Prisma.SkinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>[]
          }
          create: {
            args: Prisma.SkinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>
          }
          createMany: {
            args: Prisma.SkinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>[]
          }
          delete: {
            args: Prisma.SkinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>
          }
          update: {
            args: Prisma.SkinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>
          }
          deleteMany: {
            args: Prisma.SkinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>[]
          }
          upsert: {
            args: Prisma.SkinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkinPayload>
          }
          aggregate: {
            args: Prisma.SkinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkin>
          }
          groupBy: {
            args: Prisma.SkinGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkinGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkinCountArgs<ExtArgs>
            result: $Utils.Optional<SkinCountAggregateOutputType> | number
          }
        }
      }
      ImageUpload: {
        payload: Prisma.$ImageUploadPayload<ExtArgs>
        fields: Prisma.ImageUploadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageUploadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageUploadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>
          }
          findFirst: {
            args: Prisma.ImageUploadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageUploadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>
          }
          findMany: {
            args: Prisma.ImageUploadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>[]
          }
          create: {
            args: Prisma.ImageUploadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>
          }
          createMany: {
            args: Prisma.ImageUploadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageUploadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>[]
          }
          delete: {
            args: Prisma.ImageUploadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>
          }
          update: {
            args: Prisma.ImageUploadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>
          }
          deleteMany: {
            args: Prisma.ImageUploadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageUploadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageUploadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>[]
          }
          upsert: {
            args: Prisma.ImageUploadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImageUploadPayload>
          }
          aggregate: {
            args: Prisma.ImageUploadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImageUpload>
          }
          groupBy: {
            args: Prisma.ImageUploadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageUploadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageUploadCountArgs<ExtArgs>
            result: $Utils.Optional<ImageUploadCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      CarouselSlide: {
        payload: Prisma.$CarouselSlidePayload<ExtArgs>
        fields: Prisma.CarouselSlideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarouselSlideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarouselSlideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>
          }
          findFirst: {
            args: Prisma.CarouselSlideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarouselSlideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>
          }
          findMany: {
            args: Prisma.CarouselSlideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>[]
          }
          create: {
            args: Prisma.CarouselSlideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>
          }
          createMany: {
            args: Prisma.CarouselSlideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarouselSlideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>[]
          }
          delete: {
            args: Prisma.CarouselSlideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>
          }
          update: {
            args: Prisma.CarouselSlideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>
          }
          deleteMany: {
            args: Prisma.CarouselSlideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarouselSlideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CarouselSlideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>[]
          }
          upsert: {
            args: Prisma.CarouselSlideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarouselSlidePayload>
          }
          aggregate: {
            args: Prisma.CarouselSlideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarouselSlide>
          }
          groupBy: {
            args: Prisma.CarouselSlideGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarouselSlideGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarouselSlideCountArgs<ExtArgs>
            result: $Utils.Optional<CarouselSlideCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Voucher: {
        payload: Prisma.$VoucherPayload<ExtArgs>
        fields: Prisma.VoucherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoucherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoucherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          findFirst: {
            args: Prisma.VoucherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoucherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          findMany: {
            args: Prisma.VoucherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          create: {
            args: Prisma.VoucherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          createMany: {
            args: Prisma.VoucherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoucherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          delete: {
            args: Prisma.VoucherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          update: {
            args: Prisma.VoucherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          deleteMany: {
            args: Prisma.VoucherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoucherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoucherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          upsert: {
            args: Prisma.VoucherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          aggregate: {
            args: Prisma.VoucherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoucher>
          }
          groupBy: {
            args: Prisma.VoucherGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoucherGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoucherCountArgs<ExtArgs>
            result: $Utils.Optional<VoucherCountAggregateOutputType> | number
          }
        }
      }
      GlobalSettings: {
        payload: Prisma.$GlobalSettingsPayload<ExtArgs>
        fields: Prisma.GlobalSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findFirst: {
            args: Prisma.GlobalSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findMany: {
            args: Prisma.GlobalSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          create: {
            args: Prisma.GlobalSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          createMany: {
            args: Prisma.GlobalSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GlobalSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          delete: {
            args: Prisma.GlobalSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          update: {
            args: Prisma.GlobalSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GlobalSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          upsert: {
            args: Prisma.GlobalSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          aggregate: {
            args: Prisma.GlobalSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalSettings>
          }
          groupBy: {
            args: Prisma.GlobalSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    account?: AccountOmit
    accountResetLog?: AccountResetLogOmit
    priceTier?: PriceTierOmit
    priceList?: PriceListOmit
    skin?: SkinOmit
    imageUpload?: ImageUploadOmit
    user?: UserOmit
    customer?: CustomerOmit
    carouselSlide?: CarouselSlideOmit
    booking?: BookingOmit
    payment?: PaymentOmit
    voucher?: VoucherOmit
    globalSettings?: GlobalSettingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    skinList: number
    otherImages: number
    resetLogs: number
    Booking: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skinList?: boolean | AccountCountOutputTypeCountSkinListArgs
    otherImages?: boolean | AccountCountOutputTypeCountOtherImagesArgs
    resetLogs?: boolean | AccountCountOutputTypeCountResetLogsArgs
    Booking?: boolean | AccountCountOutputTypeCountBookingArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountSkinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkinWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountOtherImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageUploadWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountResetLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountResetLogWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountBookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type PriceTierCountOutputType
   */

  export type PriceTierCountOutputType = {
    accounts: number
    priceList: number
  }

  export type PriceTierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | PriceTierCountOutputTypeCountAccountsArgs
    priceList?: boolean | PriceTierCountOutputTypeCountPriceListArgs
  }

  // Custom InputTypes
  /**
   * PriceTierCountOutputType without action
   */
  export type PriceTierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTierCountOutputType
     */
    select?: PriceTierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PriceTierCountOutputType without action
   */
  export type PriceTierCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * PriceTierCountOutputType without action
   */
  export type PriceTierCountOutputTypeCountPriceListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceListWhereInput
  }


  /**
   * Count Type SkinCountOutputType
   */

  export type SkinCountOutputType = {
    accounts: number
  }

  export type SkinCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | SkinCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * SkinCountOutputType without action
   */
  export type SkinCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkinCountOutputType
     */
    select?: SkinCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkinCountOutputType without action
   */
  export type SkinCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    Booking: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Booking?: boolean | CustomerCountOutputTypeCountBookingArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountBookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type BookingCountOutputType
   */

  export type BookingCountOutputType = {
    payments: number
  }

  export type BookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | BookingCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: BookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingCountOutputType without action
   */
  export type BookingCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    id: number | null
    currentBookingDuration: number | null
    nextBookingDuration: number | null
    totalRentHour: number | null
    skinCount: number | null
    priceTierId: number | null
    thumbnailId: number | null
  }

  export type AccountSumAggregateOutputType = {
    id: number | null
    currentBookingDuration: number | null
    nextBookingDuration: number | null
    totalRentHour: number | null
    skinCount: number | null
    priceTierId: number | null
    thumbnailId: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: number | null
    username: string | null
    nickname: string | null
    accountCode: string | null
    description: string | null
    accountRank: string | null
    availabilityStatus: $Enums.Status | null
    currentBookingDate: Date | null
    currentBookingDuration: number | null
    currentExpireAt: Date | null
    nextBookingDate: Date | null
    nextBookingDuration: number | null
    nextExpireAt: Date | null
    totalRentHour: number | null
    rentHourUpdated: boolean | null
    password: string | null
    passwordResetRequired: boolean | null
    skinCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    isLowRank: boolean | null
    isRecommended: boolean | null
    priceTierId: number | null
    thumbnailId: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: number | null
    username: string | null
    nickname: string | null
    accountCode: string | null
    description: string | null
    accountRank: string | null
    availabilityStatus: $Enums.Status | null
    currentBookingDate: Date | null
    currentBookingDuration: number | null
    currentExpireAt: Date | null
    nextBookingDate: Date | null
    nextBookingDuration: number | null
    nextExpireAt: Date | null
    totalRentHour: number | null
    rentHourUpdated: boolean | null
    password: string | null
    passwordResetRequired: boolean | null
    skinCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    isLowRank: boolean | null
    isRecommended: boolean | null
    priceTierId: number | null
    thumbnailId: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    username: number
    nickname: number
    accountCode: number
    description: number
    accountRank: number
    availabilityStatus: number
    currentBookingDate: number
    currentBookingDuration: number
    currentExpireAt: number
    nextBookingDate: number
    nextBookingDuration: number
    nextExpireAt: number
    totalRentHour: number
    rentHourUpdated: number
    password: number
    passwordResetRequired: number
    skinCount: number
    createdAt: number
    updatedAt: number
    isLowRank: number
    isRecommended: number
    priceTierId: number
    thumbnailId: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    id?: true
    currentBookingDuration?: true
    nextBookingDuration?: true
    totalRentHour?: true
    skinCount?: true
    priceTierId?: true
    thumbnailId?: true
  }

  export type AccountSumAggregateInputType = {
    id?: true
    currentBookingDuration?: true
    nextBookingDuration?: true
    totalRentHour?: true
    skinCount?: true
    priceTierId?: true
    thumbnailId?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    username?: true
    nickname?: true
    accountCode?: true
    description?: true
    accountRank?: true
    availabilityStatus?: true
    currentBookingDate?: true
    currentBookingDuration?: true
    currentExpireAt?: true
    nextBookingDate?: true
    nextBookingDuration?: true
    nextExpireAt?: true
    totalRentHour?: true
    rentHourUpdated?: true
    password?: true
    passwordResetRequired?: true
    skinCount?: true
    createdAt?: true
    updatedAt?: true
    isLowRank?: true
    isRecommended?: true
    priceTierId?: true
    thumbnailId?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    username?: true
    nickname?: true
    accountCode?: true
    description?: true
    accountRank?: true
    availabilityStatus?: true
    currentBookingDate?: true
    currentBookingDuration?: true
    currentExpireAt?: true
    nextBookingDate?: true
    nextBookingDuration?: true
    nextExpireAt?: true
    totalRentHour?: true
    rentHourUpdated?: true
    password?: true
    passwordResetRequired?: true
    skinCount?: true
    createdAt?: true
    updatedAt?: true
    isLowRank?: true
    isRecommended?: true
    priceTierId?: true
    thumbnailId?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    username?: true
    nickname?: true
    accountCode?: true
    description?: true
    accountRank?: true
    availabilityStatus?: true
    currentBookingDate?: true
    currentBookingDuration?: true
    currentExpireAt?: true
    nextBookingDate?: true
    nextBookingDuration?: true
    nextExpireAt?: true
    totalRentHour?: true
    rentHourUpdated?: true
    password?: true
    passwordResetRequired?: true
    skinCount?: true
    createdAt?: true
    updatedAt?: true
    isLowRank?: true
    isRecommended?: true
    priceTierId?: true
    thumbnailId?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: number
    username: string
    nickname: string
    accountCode: string
    description: string | null
    accountRank: string
    availabilityStatus: $Enums.Status
    currentBookingDate: Date | null
    currentBookingDuration: number | null
    currentExpireAt: Date | null
    nextBookingDate: Date | null
    nextBookingDuration: number | null
    nextExpireAt: Date | null
    totalRentHour: number
    rentHourUpdated: boolean
    password: string
    passwordResetRequired: boolean
    skinCount: number
    createdAt: Date
    updatedAt: Date
    isLowRank: boolean
    isRecommended: boolean
    priceTierId: number
    thumbnailId: number | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    nickname?: boolean
    accountCode?: boolean
    description?: boolean
    accountRank?: boolean
    availabilityStatus?: boolean
    currentBookingDate?: boolean
    currentBookingDuration?: boolean
    currentExpireAt?: boolean
    nextBookingDate?: boolean
    nextBookingDuration?: boolean
    nextExpireAt?: boolean
    totalRentHour?: boolean
    rentHourUpdated?: boolean
    password?: boolean
    passwordResetRequired?: boolean
    skinCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId?: boolean
    thumbnailId?: boolean
    skinList?: boolean | Account$skinListArgs<ExtArgs>
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
    otherImages?: boolean | Account$otherImagesArgs<ExtArgs>
    resetLogs?: boolean | Account$resetLogsArgs<ExtArgs>
    Booking?: boolean | Account$BookingArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    nickname?: boolean
    accountCode?: boolean
    description?: boolean
    accountRank?: boolean
    availabilityStatus?: boolean
    currentBookingDate?: boolean
    currentBookingDuration?: boolean
    currentExpireAt?: boolean
    nextBookingDate?: boolean
    nextBookingDuration?: boolean
    nextExpireAt?: boolean
    totalRentHour?: boolean
    rentHourUpdated?: boolean
    password?: boolean
    passwordResetRequired?: boolean
    skinCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId?: boolean
    thumbnailId?: boolean
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    nickname?: boolean
    accountCode?: boolean
    description?: boolean
    accountRank?: boolean
    availabilityStatus?: boolean
    currentBookingDate?: boolean
    currentBookingDuration?: boolean
    currentExpireAt?: boolean
    nextBookingDate?: boolean
    nextBookingDuration?: boolean
    nextExpireAt?: boolean
    totalRentHour?: boolean
    rentHourUpdated?: boolean
    password?: boolean
    passwordResetRequired?: boolean
    skinCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId?: boolean
    thumbnailId?: boolean
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    username?: boolean
    nickname?: boolean
    accountCode?: boolean
    description?: boolean
    accountRank?: boolean
    availabilityStatus?: boolean
    currentBookingDate?: boolean
    currentBookingDuration?: boolean
    currentExpireAt?: boolean
    nextBookingDate?: boolean
    nextBookingDuration?: boolean
    nextExpireAt?: boolean
    totalRentHour?: boolean
    rentHourUpdated?: boolean
    password?: boolean
    passwordResetRequired?: boolean
    skinCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId?: boolean
    thumbnailId?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "nickname" | "accountCode" | "description" | "accountRank" | "availabilityStatus" | "currentBookingDate" | "currentBookingDuration" | "currentExpireAt" | "nextBookingDate" | "nextBookingDuration" | "nextExpireAt" | "totalRentHour" | "rentHourUpdated" | "password" | "passwordResetRequired" | "skinCount" | "createdAt" | "updatedAt" | "isLowRank" | "isRecommended" | "priceTierId" | "thumbnailId", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skinList?: boolean | Account$skinListArgs<ExtArgs>
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
    otherImages?: boolean | Account$otherImagesArgs<ExtArgs>
    resetLogs?: boolean | Account$resetLogsArgs<ExtArgs>
    Booking?: boolean | Account$BookingArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      skinList: Prisma.$SkinPayload<ExtArgs>[]
      priceTier: Prisma.$PriceTierPayload<ExtArgs>
      thumbnail: Prisma.$ImageUploadPayload<ExtArgs> | null
      otherImages: Prisma.$ImageUploadPayload<ExtArgs>[]
      resetLogs: Prisma.$AccountResetLogPayload<ExtArgs>[]
      Booking: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      nickname: string
      accountCode: string
      description: string | null
      accountRank: string
      availabilityStatus: $Enums.Status
      currentBookingDate: Date | null
      currentBookingDuration: number | null
      currentExpireAt: Date | null
      nextBookingDate: Date | null
      nextBookingDuration: number | null
      nextExpireAt: Date | null
      totalRentHour: number
      rentHourUpdated: boolean
      password: string
      passwordResetRequired: boolean
      skinCount: number
      createdAt: Date
      updatedAt: Date
      isLowRank: boolean
      isRecommended: boolean
      priceTierId: number
      thumbnailId: number | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    skinList<T extends Account$skinListArgs<ExtArgs> = {}>(args?: Subset<T, Account$skinListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    priceTier<T extends PriceTierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PriceTierDefaultArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    thumbnail<T extends Account$thumbnailArgs<ExtArgs> = {}>(args?: Subset<T, Account$thumbnailArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    otherImages<T extends Account$otherImagesArgs<ExtArgs> = {}>(args?: Subset<T, Account$otherImagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    resetLogs<T extends Account$resetLogsArgs<ExtArgs> = {}>(args?: Subset<T, Account$resetLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    Booking<T extends Account$BookingArgs<ExtArgs> = {}>(args?: Subset<T, Account$BookingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'Int'>
    readonly username: FieldRef<"Account", 'String'>
    readonly nickname: FieldRef<"Account", 'String'>
    readonly accountCode: FieldRef<"Account", 'String'>
    readonly description: FieldRef<"Account", 'String'>
    readonly accountRank: FieldRef<"Account", 'String'>
    readonly availabilityStatus: FieldRef<"Account", 'Status'>
    readonly currentBookingDate: FieldRef<"Account", 'DateTime'>
    readonly currentBookingDuration: FieldRef<"Account", 'Int'>
    readonly currentExpireAt: FieldRef<"Account", 'DateTime'>
    readonly nextBookingDate: FieldRef<"Account", 'DateTime'>
    readonly nextBookingDuration: FieldRef<"Account", 'Int'>
    readonly nextExpireAt: FieldRef<"Account", 'DateTime'>
    readonly totalRentHour: FieldRef<"Account", 'Int'>
    readonly rentHourUpdated: FieldRef<"Account", 'Boolean'>
    readonly password: FieldRef<"Account", 'String'>
    readonly passwordResetRequired: FieldRef<"Account", 'Boolean'>
    readonly skinCount: FieldRef<"Account", 'Int'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
    readonly isLowRank: FieldRef<"Account", 'Boolean'>
    readonly isRecommended: FieldRef<"Account", 'Boolean'>
    readonly priceTierId: FieldRef<"Account", 'Int'>
    readonly thumbnailId: FieldRef<"Account", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.skinList
   */
  export type Account$skinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    where?: SkinWhereInput
    orderBy?: SkinOrderByWithRelationInput | SkinOrderByWithRelationInput[]
    cursor?: SkinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SkinScalarFieldEnum | SkinScalarFieldEnum[]
  }

  /**
   * Account.thumbnail
   */
  export type Account$thumbnailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    where?: ImageUploadWhereInput
  }

  /**
   * Account.otherImages
   */
  export type Account$otherImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    where?: ImageUploadWhereInput
    orderBy?: ImageUploadOrderByWithRelationInput | ImageUploadOrderByWithRelationInput[]
    cursor?: ImageUploadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageUploadScalarFieldEnum | ImageUploadScalarFieldEnum[]
  }

  /**
   * Account.resetLogs
   */
  export type Account$resetLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    where?: AccountResetLogWhereInput
    orderBy?: AccountResetLogOrderByWithRelationInput | AccountResetLogOrderByWithRelationInput[]
    cursor?: AccountResetLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountResetLogScalarFieldEnum | AccountResetLogScalarFieldEnum[]
  }

  /**
   * Account.Booking
   */
  export type Account$BookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model AccountResetLog
   */

  export type AggregateAccountResetLog = {
    _count: AccountResetLogCountAggregateOutputType | null
    _avg: AccountResetLogAvgAggregateOutputType | null
    _sum: AccountResetLogSumAggregateOutputType | null
    _min: AccountResetLogMinAggregateOutputType | null
    _max: AccountResetLogMaxAggregateOutputType | null
  }

  export type AccountResetLogAvgAggregateOutputType = {
    id: number | null
    accountId: number | null
  }

  export type AccountResetLogSumAggregateOutputType = {
    id: number | null
    accountId: number | null
  }

  export type AccountResetLogMinAggregateOutputType = {
    id: number | null
    accountId: number | null
    previousExpireAt: Date | null
    resetAt: Date | null
  }

  export type AccountResetLogMaxAggregateOutputType = {
    id: number | null
    accountId: number | null
    previousExpireAt: Date | null
    resetAt: Date | null
  }

  export type AccountResetLogCountAggregateOutputType = {
    id: number
    accountId: number
    previousExpireAt: number
    resetAt: number
    _all: number
  }


  export type AccountResetLogAvgAggregateInputType = {
    id?: true
    accountId?: true
  }

  export type AccountResetLogSumAggregateInputType = {
    id?: true
    accountId?: true
  }

  export type AccountResetLogMinAggregateInputType = {
    id?: true
    accountId?: true
    previousExpireAt?: true
    resetAt?: true
  }

  export type AccountResetLogMaxAggregateInputType = {
    id?: true
    accountId?: true
    previousExpireAt?: true
    resetAt?: true
  }

  export type AccountResetLogCountAggregateInputType = {
    id?: true
    accountId?: true
    previousExpireAt?: true
    resetAt?: true
    _all?: true
  }

  export type AccountResetLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountResetLog to aggregate.
     */
    where?: AccountResetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountResetLogs to fetch.
     */
    orderBy?: AccountResetLogOrderByWithRelationInput | AccountResetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountResetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountResetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountResetLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountResetLogs
    **/
    _count?: true | AccountResetLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountResetLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountResetLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountResetLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountResetLogMaxAggregateInputType
  }

  export type GetAccountResetLogAggregateType<T extends AccountResetLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountResetLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountResetLog[P]>
      : GetScalarType<T[P], AggregateAccountResetLog[P]>
  }




  export type AccountResetLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountResetLogWhereInput
    orderBy?: AccountResetLogOrderByWithAggregationInput | AccountResetLogOrderByWithAggregationInput[]
    by: AccountResetLogScalarFieldEnum[] | AccountResetLogScalarFieldEnum
    having?: AccountResetLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountResetLogCountAggregateInputType | true
    _avg?: AccountResetLogAvgAggregateInputType
    _sum?: AccountResetLogSumAggregateInputType
    _min?: AccountResetLogMinAggregateInputType
    _max?: AccountResetLogMaxAggregateInputType
  }

  export type AccountResetLogGroupByOutputType = {
    id: number
    accountId: number
    previousExpireAt: Date | null
    resetAt: Date
    _count: AccountResetLogCountAggregateOutputType | null
    _avg: AccountResetLogAvgAggregateOutputType | null
    _sum: AccountResetLogSumAggregateOutputType | null
    _min: AccountResetLogMinAggregateOutputType | null
    _max: AccountResetLogMaxAggregateOutputType | null
  }

  type GetAccountResetLogGroupByPayload<T extends AccountResetLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountResetLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountResetLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountResetLogGroupByOutputType[P]>
            : GetScalarType<T[P], AccountResetLogGroupByOutputType[P]>
        }
      >
    >


  export type AccountResetLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    previousExpireAt?: boolean
    resetAt?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accountResetLog"]>

  export type AccountResetLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    previousExpireAt?: boolean
    resetAt?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accountResetLog"]>

  export type AccountResetLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    previousExpireAt?: boolean
    resetAt?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accountResetLog"]>

  export type AccountResetLogSelectScalar = {
    id?: boolean
    accountId?: boolean
    previousExpireAt?: boolean
    resetAt?: boolean
  }

  export type AccountResetLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "previousExpireAt" | "resetAt", ExtArgs["result"]["accountResetLog"]>
  export type AccountResetLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type AccountResetLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type AccountResetLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $AccountResetLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccountResetLog"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      accountId: number
      previousExpireAt: Date | null
      resetAt: Date
    }, ExtArgs["result"]["accountResetLog"]>
    composites: {}
  }

  type AccountResetLogGetPayload<S extends boolean | null | undefined | AccountResetLogDefaultArgs> = $Result.GetResult<Prisma.$AccountResetLogPayload, S>

  type AccountResetLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountResetLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountResetLogCountAggregateInputType | true
    }

  export interface AccountResetLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccountResetLog'], meta: { name: 'AccountResetLog' } }
    /**
     * Find zero or one AccountResetLog that matches the filter.
     * @param {AccountResetLogFindUniqueArgs} args - Arguments to find a AccountResetLog
     * @example
     * // Get one AccountResetLog
     * const accountResetLog = await prisma.accountResetLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountResetLogFindUniqueArgs>(args: SelectSubset<T, AccountResetLogFindUniqueArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AccountResetLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountResetLogFindUniqueOrThrowArgs} args - Arguments to find a AccountResetLog
     * @example
     * // Get one AccountResetLog
     * const accountResetLog = await prisma.accountResetLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountResetLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountResetLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AccountResetLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountResetLogFindFirstArgs} args - Arguments to find a AccountResetLog
     * @example
     * // Get one AccountResetLog
     * const accountResetLog = await prisma.accountResetLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountResetLogFindFirstArgs>(args?: SelectSubset<T, AccountResetLogFindFirstArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AccountResetLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountResetLogFindFirstOrThrowArgs} args - Arguments to find a AccountResetLog
     * @example
     * // Get one AccountResetLog
     * const accountResetLog = await prisma.accountResetLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountResetLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountResetLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AccountResetLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountResetLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountResetLogs
     * const accountResetLogs = await prisma.accountResetLog.findMany()
     * 
     * // Get first 10 AccountResetLogs
     * const accountResetLogs = await prisma.accountResetLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountResetLogWithIdOnly = await prisma.accountResetLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountResetLogFindManyArgs>(args?: SelectSubset<T, AccountResetLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AccountResetLog.
     * @param {AccountResetLogCreateArgs} args - Arguments to create a AccountResetLog.
     * @example
     * // Create one AccountResetLog
     * const AccountResetLog = await prisma.accountResetLog.create({
     *   data: {
     *     // ... data to create a AccountResetLog
     *   }
     * })
     * 
     */
    create<T extends AccountResetLogCreateArgs>(args: SelectSubset<T, AccountResetLogCreateArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AccountResetLogs.
     * @param {AccountResetLogCreateManyArgs} args - Arguments to create many AccountResetLogs.
     * @example
     * // Create many AccountResetLogs
     * const accountResetLog = await prisma.accountResetLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountResetLogCreateManyArgs>(args?: SelectSubset<T, AccountResetLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccountResetLogs and returns the data saved in the database.
     * @param {AccountResetLogCreateManyAndReturnArgs} args - Arguments to create many AccountResetLogs.
     * @example
     * // Create many AccountResetLogs
     * const accountResetLog = await prisma.accountResetLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccountResetLogs and only return the `id`
     * const accountResetLogWithIdOnly = await prisma.accountResetLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountResetLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountResetLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AccountResetLog.
     * @param {AccountResetLogDeleteArgs} args - Arguments to delete one AccountResetLog.
     * @example
     * // Delete one AccountResetLog
     * const AccountResetLog = await prisma.accountResetLog.delete({
     *   where: {
     *     // ... filter to delete one AccountResetLog
     *   }
     * })
     * 
     */
    delete<T extends AccountResetLogDeleteArgs>(args: SelectSubset<T, AccountResetLogDeleteArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AccountResetLog.
     * @param {AccountResetLogUpdateArgs} args - Arguments to update one AccountResetLog.
     * @example
     * // Update one AccountResetLog
     * const accountResetLog = await prisma.accountResetLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountResetLogUpdateArgs>(args: SelectSubset<T, AccountResetLogUpdateArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AccountResetLogs.
     * @param {AccountResetLogDeleteManyArgs} args - Arguments to filter AccountResetLogs to delete.
     * @example
     * // Delete a few AccountResetLogs
     * const { count } = await prisma.accountResetLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountResetLogDeleteManyArgs>(args?: SelectSubset<T, AccountResetLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountResetLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountResetLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountResetLogs
     * const accountResetLog = await prisma.accountResetLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountResetLogUpdateManyArgs>(args: SelectSubset<T, AccountResetLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountResetLogs and returns the data updated in the database.
     * @param {AccountResetLogUpdateManyAndReturnArgs} args - Arguments to update many AccountResetLogs.
     * @example
     * // Update many AccountResetLogs
     * const accountResetLog = await prisma.accountResetLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccountResetLogs and only return the `id`
     * const accountResetLogWithIdOnly = await prisma.accountResetLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountResetLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountResetLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AccountResetLog.
     * @param {AccountResetLogUpsertArgs} args - Arguments to update or create a AccountResetLog.
     * @example
     * // Update or create a AccountResetLog
     * const accountResetLog = await prisma.accountResetLog.upsert({
     *   create: {
     *     // ... data to create a AccountResetLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountResetLog we want to update
     *   }
     * })
     */
    upsert<T extends AccountResetLogUpsertArgs>(args: SelectSubset<T, AccountResetLogUpsertArgs<ExtArgs>>): Prisma__AccountResetLogClient<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AccountResetLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountResetLogCountArgs} args - Arguments to filter AccountResetLogs to count.
     * @example
     * // Count the number of AccountResetLogs
     * const count = await prisma.accountResetLog.count({
     *   where: {
     *     // ... the filter for the AccountResetLogs we want to count
     *   }
     * })
    **/
    count<T extends AccountResetLogCountArgs>(
      args?: Subset<T, AccountResetLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountResetLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountResetLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountResetLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountResetLogAggregateArgs>(args: Subset<T, AccountResetLogAggregateArgs>): Prisma.PrismaPromise<GetAccountResetLogAggregateType<T>>

    /**
     * Group by AccountResetLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountResetLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountResetLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountResetLogGroupByArgs['orderBy'] }
        : { orderBy?: AccountResetLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountResetLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountResetLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccountResetLog model
   */
  readonly fields: AccountResetLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountResetLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountResetLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccountResetLog model
   */ 
  interface AccountResetLogFieldRefs {
    readonly id: FieldRef<"AccountResetLog", 'Int'>
    readonly accountId: FieldRef<"AccountResetLog", 'Int'>
    readonly previousExpireAt: FieldRef<"AccountResetLog", 'DateTime'>
    readonly resetAt: FieldRef<"AccountResetLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccountResetLog findUnique
   */
  export type AccountResetLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountResetLog to fetch.
     */
    where: AccountResetLogWhereUniqueInput
  }

  /**
   * AccountResetLog findUniqueOrThrow
   */
  export type AccountResetLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountResetLog to fetch.
     */
    where: AccountResetLogWhereUniqueInput
  }

  /**
   * AccountResetLog findFirst
   */
  export type AccountResetLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountResetLog to fetch.
     */
    where?: AccountResetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountResetLogs to fetch.
     */
    orderBy?: AccountResetLogOrderByWithRelationInput | AccountResetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountResetLogs.
     */
    cursor?: AccountResetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountResetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountResetLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountResetLogs.
     */
    distinct?: AccountResetLogScalarFieldEnum | AccountResetLogScalarFieldEnum[]
  }

  /**
   * AccountResetLog findFirstOrThrow
   */
  export type AccountResetLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountResetLog to fetch.
     */
    where?: AccountResetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountResetLogs to fetch.
     */
    orderBy?: AccountResetLogOrderByWithRelationInput | AccountResetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountResetLogs.
     */
    cursor?: AccountResetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountResetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountResetLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountResetLogs.
     */
    distinct?: AccountResetLogScalarFieldEnum | AccountResetLogScalarFieldEnum[]
  }

  /**
   * AccountResetLog findMany
   */
  export type AccountResetLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * Filter, which AccountResetLogs to fetch.
     */
    where?: AccountResetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountResetLogs to fetch.
     */
    orderBy?: AccountResetLogOrderByWithRelationInput | AccountResetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountResetLogs.
     */
    cursor?: AccountResetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountResetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountResetLogs.
     */
    skip?: number
    distinct?: AccountResetLogScalarFieldEnum | AccountResetLogScalarFieldEnum[]
  }

  /**
   * AccountResetLog create
   */
  export type AccountResetLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AccountResetLog.
     */
    data: XOR<AccountResetLogCreateInput, AccountResetLogUncheckedCreateInput>
  }

  /**
   * AccountResetLog createMany
   */
  export type AccountResetLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccountResetLogs.
     */
    data: AccountResetLogCreateManyInput | AccountResetLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccountResetLog createManyAndReturn
   */
  export type AccountResetLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * The data used to create many AccountResetLogs.
     */
    data: AccountResetLogCreateManyInput | AccountResetLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccountResetLog update
   */
  export type AccountResetLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AccountResetLog.
     */
    data: XOR<AccountResetLogUpdateInput, AccountResetLogUncheckedUpdateInput>
    /**
     * Choose, which AccountResetLog to update.
     */
    where: AccountResetLogWhereUniqueInput
  }

  /**
   * AccountResetLog updateMany
   */
  export type AccountResetLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccountResetLogs.
     */
    data: XOR<AccountResetLogUpdateManyMutationInput, AccountResetLogUncheckedUpdateManyInput>
    /**
     * Filter which AccountResetLogs to update
     */
    where?: AccountResetLogWhereInput
    /**
     * Limit how many AccountResetLogs to update.
     */
    limit?: number
  }

  /**
   * AccountResetLog updateManyAndReturn
   */
  export type AccountResetLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * The data used to update AccountResetLogs.
     */
    data: XOR<AccountResetLogUpdateManyMutationInput, AccountResetLogUncheckedUpdateManyInput>
    /**
     * Filter which AccountResetLogs to update
     */
    where?: AccountResetLogWhereInput
    /**
     * Limit how many AccountResetLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccountResetLog upsert
   */
  export type AccountResetLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AccountResetLog to update in case it exists.
     */
    where: AccountResetLogWhereUniqueInput
    /**
     * In case the AccountResetLog found by the `where` argument doesn't exist, create a new AccountResetLog with this data.
     */
    create: XOR<AccountResetLogCreateInput, AccountResetLogUncheckedCreateInput>
    /**
     * In case the AccountResetLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountResetLogUpdateInput, AccountResetLogUncheckedUpdateInput>
  }

  /**
   * AccountResetLog delete
   */
  export type AccountResetLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
    /**
     * Filter which AccountResetLog to delete.
     */
    where: AccountResetLogWhereUniqueInput
  }

  /**
   * AccountResetLog deleteMany
   */
  export type AccountResetLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountResetLogs to delete
     */
    where?: AccountResetLogWhereInput
    /**
     * Limit how many AccountResetLogs to delete.
     */
    limit?: number
  }

  /**
   * AccountResetLog without action
   */
  export type AccountResetLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountResetLog
     */
    select?: AccountResetLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountResetLog
     */
    omit?: AccountResetLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountResetLogInclude<ExtArgs> | null
  }


  /**
   * Model PriceTier
   */

  export type AggregatePriceTier = {
    _count: PriceTierCountAggregateOutputType | null
    _avg: PriceTierAvgAggregateOutputType | null
    _sum: PriceTierSumAggregateOutputType | null
    _min: PriceTierMinAggregateOutputType | null
    _max: PriceTierMaxAggregateOutputType | null
  }

  export type PriceTierAvgAggregateOutputType = {
    id: number | null
  }

  export type PriceTierSumAggregateOutputType = {
    id: number | null
  }

  export type PriceTierMinAggregateOutputType = {
    id: number | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceTierMaxAggregateOutputType = {
    id: number | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceTierCountAggregateOutputType = {
    id: number
    code: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PriceTierAvgAggregateInputType = {
    id?: true
  }

  export type PriceTierSumAggregateInputType = {
    id?: true
  }

  export type PriceTierMinAggregateInputType = {
    id?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceTierMaxAggregateInputType = {
    id?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceTierCountAggregateInputType = {
    id?: true
    code?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PriceTierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceTier to aggregate.
     */
    where?: PriceTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceTiers to fetch.
     */
    orderBy?: PriceTierOrderByWithRelationInput | PriceTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceTiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceTiers
    **/
    _count?: true | PriceTierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceTierAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceTierSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceTierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceTierMaxAggregateInputType
  }

  export type GetPriceTierAggregateType<T extends PriceTierAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceTier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceTier[P]>
      : GetScalarType<T[P], AggregatePriceTier[P]>
  }




  export type PriceTierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceTierWhereInput
    orderBy?: PriceTierOrderByWithAggregationInput | PriceTierOrderByWithAggregationInput[]
    by: PriceTierScalarFieldEnum[] | PriceTierScalarFieldEnum
    having?: PriceTierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceTierCountAggregateInputType | true
    _avg?: PriceTierAvgAggregateInputType
    _sum?: PriceTierSumAggregateInputType
    _min?: PriceTierMinAggregateInputType
    _max?: PriceTierMaxAggregateInputType
  }

  export type PriceTierGroupByOutputType = {
    id: number
    code: string
    createdAt: Date
    updatedAt: Date
    _count: PriceTierCountAggregateOutputType | null
    _avg: PriceTierAvgAggregateOutputType | null
    _sum: PriceTierSumAggregateOutputType | null
    _min: PriceTierMinAggregateOutputType | null
    _max: PriceTierMaxAggregateOutputType | null
  }

  type GetPriceTierGroupByPayload<T extends PriceTierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceTierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceTierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceTierGroupByOutputType[P]>
            : GetScalarType<T[P], PriceTierGroupByOutputType[P]>
        }
      >
    >


  export type PriceTierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | PriceTier$accountsArgs<ExtArgs>
    priceList?: boolean | PriceTier$priceListArgs<ExtArgs>
    _count?: boolean | PriceTierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceTier"]>

  export type PriceTierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["priceTier"]>

  export type PriceTierSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["priceTier"]>

  export type PriceTierSelectScalar = {
    id?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PriceTierOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["priceTier"]>
  export type PriceTierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | PriceTier$accountsArgs<ExtArgs>
    priceList?: boolean | PriceTier$priceListArgs<ExtArgs>
    _count?: boolean | PriceTierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PriceTierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PriceTierIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PriceTierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceTier"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      priceList: Prisma.$PriceListPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["priceTier"]>
    composites: {}
  }

  type PriceTierGetPayload<S extends boolean | null | undefined | PriceTierDefaultArgs> = $Result.GetResult<Prisma.$PriceTierPayload, S>

  type PriceTierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceTierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceTierCountAggregateInputType | true
    }

  export interface PriceTierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceTier'], meta: { name: 'PriceTier' } }
    /**
     * Find zero or one PriceTier that matches the filter.
     * @param {PriceTierFindUniqueArgs} args - Arguments to find a PriceTier
     * @example
     * // Get one PriceTier
     * const priceTier = await prisma.priceTier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceTierFindUniqueArgs>(args: SelectSubset<T, PriceTierFindUniqueArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PriceTier that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceTierFindUniqueOrThrowArgs} args - Arguments to find a PriceTier
     * @example
     * // Get one PriceTier
     * const priceTier = await prisma.priceTier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceTierFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceTierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PriceTier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceTierFindFirstArgs} args - Arguments to find a PriceTier
     * @example
     * // Get one PriceTier
     * const priceTier = await prisma.priceTier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceTierFindFirstArgs>(args?: SelectSubset<T, PriceTierFindFirstArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PriceTier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceTierFindFirstOrThrowArgs} args - Arguments to find a PriceTier
     * @example
     * // Get one PriceTier
     * const priceTier = await prisma.priceTier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceTierFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceTierFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PriceTiers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceTierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceTiers
     * const priceTiers = await prisma.priceTier.findMany()
     * 
     * // Get first 10 PriceTiers
     * const priceTiers = await prisma.priceTier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceTierWithIdOnly = await prisma.priceTier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceTierFindManyArgs>(args?: SelectSubset<T, PriceTierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PriceTier.
     * @param {PriceTierCreateArgs} args - Arguments to create a PriceTier.
     * @example
     * // Create one PriceTier
     * const PriceTier = await prisma.priceTier.create({
     *   data: {
     *     // ... data to create a PriceTier
     *   }
     * })
     * 
     */
    create<T extends PriceTierCreateArgs>(args: SelectSubset<T, PriceTierCreateArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PriceTiers.
     * @param {PriceTierCreateManyArgs} args - Arguments to create many PriceTiers.
     * @example
     * // Create many PriceTiers
     * const priceTier = await prisma.priceTier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceTierCreateManyArgs>(args?: SelectSubset<T, PriceTierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PriceTiers and returns the data saved in the database.
     * @param {PriceTierCreateManyAndReturnArgs} args - Arguments to create many PriceTiers.
     * @example
     * // Create many PriceTiers
     * const priceTier = await prisma.priceTier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PriceTiers and only return the `id`
     * const priceTierWithIdOnly = await prisma.priceTier.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceTierCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceTierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PriceTier.
     * @param {PriceTierDeleteArgs} args - Arguments to delete one PriceTier.
     * @example
     * // Delete one PriceTier
     * const PriceTier = await prisma.priceTier.delete({
     *   where: {
     *     // ... filter to delete one PriceTier
     *   }
     * })
     * 
     */
    delete<T extends PriceTierDeleteArgs>(args: SelectSubset<T, PriceTierDeleteArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PriceTier.
     * @param {PriceTierUpdateArgs} args - Arguments to update one PriceTier.
     * @example
     * // Update one PriceTier
     * const priceTier = await prisma.priceTier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceTierUpdateArgs>(args: SelectSubset<T, PriceTierUpdateArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PriceTiers.
     * @param {PriceTierDeleteManyArgs} args - Arguments to filter PriceTiers to delete.
     * @example
     * // Delete a few PriceTiers
     * const { count } = await prisma.priceTier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceTierDeleteManyArgs>(args?: SelectSubset<T, PriceTierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceTiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceTierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceTiers
     * const priceTier = await prisma.priceTier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceTierUpdateManyArgs>(args: SelectSubset<T, PriceTierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceTiers and returns the data updated in the database.
     * @param {PriceTierUpdateManyAndReturnArgs} args - Arguments to update many PriceTiers.
     * @example
     * // Update many PriceTiers
     * const priceTier = await prisma.priceTier.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PriceTiers and only return the `id`
     * const priceTierWithIdOnly = await prisma.priceTier.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceTierUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceTierUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PriceTier.
     * @param {PriceTierUpsertArgs} args - Arguments to update or create a PriceTier.
     * @example
     * // Update or create a PriceTier
     * const priceTier = await prisma.priceTier.upsert({
     *   create: {
     *     // ... data to create a PriceTier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceTier we want to update
     *   }
     * })
     */
    upsert<T extends PriceTierUpsertArgs>(args: SelectSubset<T, PriceTierUpsertArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PriceTiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceTierCountArgs} args - Arguments to filter PriceTiers to count.
     * @example
     * // Count the number of PriceTiers
     * const count = await prisma.priceTier.count({
     *   where: {
     *     // ... the filter for the PriceTiers we want to count
     *   }
     * })
    **/
    count<T extends PriceTierCountArgs>(
      args?: Subset<T, PriceTierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceTierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceTier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceTierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceTierAggregateArgs>(args: Subset<T, PriceTierAggregateArgs>): Prisma.PrismaPromise<GetPriceTierAggregateType<T>>

    /**
     * Group by PriceTier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceTierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceTierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceTierGroupByArgs['orderBy'] }
        : { orderBy?: PriceTierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceTierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceTierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceTier model
   */
  readonly fields: PriceTierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceTier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceTierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends PriceTier$accountsArgs<ExtArgs> = {}>(args?: Subset<T, PriceTier$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    priceList<T extends PriceTier$priceListArgs<ExtArgs> = {}>(args?: Subset<T, PriceTier$priceListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceTier model
   */ 
  interface PriceTierFieldRefs {
    readonly id: FieldRef<"PriceTier", 'Int'>
    readonly code: FieldRef<"PriceTier", 'String'>
    readonly createdAt: FieldRef<"PriceTier", 'DateTime'>
    readonly updatedAt: FieldRef<"PriceTier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceTier findUnique
   */
  export type PriceTierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * Filter, which PriceTier to fetch.
     */
    where: PriceTierWhereUniqueInput
  }

  /**
   * PriceTier findUniqueOrThrow
   */
  export type PriceTierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * Filter, which PriceTier to fetch.
     */
    where: PriceTierWhereUniqueInput
  }

  /**
   * PriceTier findFirst
   */
  export type PriceTierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * Filter, which PriceTier to fetch.
     */
    where?: PriceTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceTiers to fetch.
     */
    orderBy?: PriceTierOrderByWithRelationInput | PriceTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceTiers.
     */
    cursor?: PriceTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceTiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceTiers.
     */
    distinct?: PriceTierScalarFieldEnum | PriceTierScalarFieldEnum[]
  }

  /**
   * PriceTier findFirstOrThrow
   */
  export type PriceTierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * Filter, which PriceTier to fetch.
     */
    where?: PriceTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceTiers to fetch.
     */
    orderBy?: PriceTierOrderByWithRelationInput | PriceTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceTiers.
     */
    cursor?: PriceTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceTiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceTiers.
     */
    distinct?: PriceTierScalarFieldEnum | PriceTierScalarFieldEnum[]
  }

  /**
   * PriceTier findMany
   */
  export type PriceTierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * Filter, which PriceTiers to fetch.
     */
    where?: PriceTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceTiers to fetch.
     */
    orderBy?: PriceTierOrderByWithRelationInput | PriceTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceTiers.
     */
    cursor?: PriceTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceTiers.
     */
    skip?: number
    distinct?: PriceTierScalarFieldEnum | PriceTierScalarFieldEnum[]
  }

  /**
   * PriceTier create
   */
  export type PriceTierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceTier.
     */
    data: XOR<PriceTierCreateInput, PriceTierUncheckedCreateInput>
  }

  /**
   * PriceTier createMany
   */
  export type PriceTierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceTiers.
     */
    data: PriceTierCreateManyInput | PriceTierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceTier createManyAndReturn
   */
  export type PriceTierCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * The data used to create many PriceTiers.
     */
    data: PriceTierCreateManyInput | PriceTierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceTier update
   */
  export type PriceTierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceTier.
     */
    data: XOR<PriceTierUpdateInput, PriceTierUncheckedUpdateInput>
    /**
     * Choose, which PriceTier to update.
     */
    where: PriceTierWhereUniqueInput
  }

  /**
   * PriceTier updateMany
   */
  export type PriceTierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceTiers.
     */
    data: XOR<PriceTierUpdateManyMutationInput, PriceTierUncheckedUpdateManyInput>
    /**
     * Filter which PriceTiers to update
     */
    where?: PriceTierWhereInput
    /**
     * Limit how many PriceTiers to update.
     */
    limit?: number
  }

  /**
   * PriceTier updateManyAndReturn
   */
  export type PriceTierUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * The data used to update PriceTiers.
     */
    data: XOR<PriceTierUpdateManyMutationInput, PriceTierUncheckedUpdateManyInput>
    /**
     * Filter which PriceTiers to update
     */
    where?: PriceTierWhereInput
    /**
     * Limit how many PriceTiers to update.
     */
    limit?: number
  }

  /**
   * PriceTier upsert
   */
  export type PriceTierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceTier to update in case it exists.
     */
    where: PriceTierWhereUniqueInput
    /**
     * In case the PriceTier found by the `where` argument doesn't exist, create a new PriceTier with this data.
     */
    create: XOR<PriceTierCreateInput, PriceTierUncheckedCreateInput>
    /**
     * In case the PriceTier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceTierUpdateInput, PriceTierUncheckedUpdateInput>
  }

  /**
   * PriceTier delete
   */
  export type PriceTierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
    /**
     * Filter which PriceTier to delete.
     */
    where: PriceTierWhereUniqueInput
  }

  /**
   * PriceTier deleteMany
   */
  export type PriceTierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceTiers to delete
     */
    where?: PriceTierWhereInput
    /**
     * Limit how many PriceTiers to delete.
     */
    limit?: number
  }

  /**
   * PriceTier.accounts
   */
  export type PriceTier$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * PriceTier.priceList
   */
  export type PriceTier$priceListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    where?: PriceListWhereInput
    orderBy?: PriceListOrderByWithRelationInput | PriceListOrderByWithRelationInput[]
    cursor?: PriceListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceListScalarFieldEnum | PriceListScalarFieldEnum[]
  }

  /**
   * PriceTier without action
   */
  export type PriceTierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceTier
     */
    select?: PriceTierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceTier
     */
    omit?: PriceTierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceTierInclude<ExtArgs> | null
  }


  /**
   * Model PriceList
   */

  export type AggregatePriceList = {
    _count: PriceListCountAggregateOutputType | null
    _avg: PriceListAvgAggregateOutputType | null
    _sum: PriceListSumAggregateOutputType | null
    _min: PriceListMinAggregateOutputType | null
    _max: PriceListMaxAggregateOutputType | null
  }

  export type PriceListAvgAggregateOutputType = {
    id: number | null
    normalPrice: number | null
    lowPrice: number | null
    tierId: number | null
  }

  export type PriceListSumAggregateOutputType = {
    id: number | null
    normalPrice: number | null
    lowPrice: number | null
    tierId: number | null
  }

  export type PriceListMinAggregateOutputType = {
    id: number | null
    duration: string | null
    normalPrice: number | null
    lowPrice: number | null
    tierId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceListMaxAggregateOutputType = {
    id: number | null
    duration: string | null
    normalPrice: number | null
    lowPrice: number | null
    tierId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceListCountAggregateOutputType = {
    id: number
    duration: number
    normalPrice: number
    lowPrice: number
    tierId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PriceListAvgAggregateInputType = {
    id?: true
    normalPrice?: true
    lowPrice?: true
    tierId?: true
  }

  export type PriceListSumAggregateInputType = {
    id?: true
    normalPrice?: true
    lowPrice?: true
    tierId?: true
  }

  export type PriceListMinAggregateInputType = {
    id?: true
    duration?: true
    normalPrice?: true
    lowPrice?: true
    tierId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceListMaxAggregateInputType = {
    id?: true
    duration?: true
    normalPrice?: true
    lowPrice?: true
    tierId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceListCountAggregateInputType = {
    id?: true
    duration?: true
    normalPrice?: true
    lowPrice?: true
    tierId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PriceListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceList to aggregate.
     */
    where?: PriceListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLists to fetch.
     */
    orderBy?: PriceListOrderByWithRelationInput | PriceListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceLists
    **/
    _count?: true | PriceListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceListAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceListSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceListMaxAggregateInputType
  }

  export type GetPriceListAggregateType<T extends PriceListAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceList[P]>
      : GetScalarType<T[P], AggregatePriceList[P]>
  }




  export type PriceListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceListWhereInput
    orderBy?: PriceListOrderByWithAggregationInput | PriceListOrderByWithAggregationInput[]
    by: PriceListScalarFieldEnum[] | PriceListScalarFieldEnum
    having?: PriceListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceListCountAggregateInputType | true
    _avg?: PriceListAvgAggregateInputType
    _sum?: PriceListSumAggregateInputType
    _min?: PriceListMinAggregateInputType
    _max?: PriceListMaxAggregateInputType
  }

  export type PriceListGroupByOutputType = {
    id: number
    duration: string
    normalPrice: number
    lowPrice: number
    tierId: number
    createdAt: Date
    updatedAt: Date
    _count: PriceListCountAggregateOutputType | null
    _avg: PriceListAvgAggregateOutputType | null
    _sum: PriceListSumAggregateOutputType | null
    _min: PriceListMinAggregateOutputType | null
    _max: PriceListMaxAggregateOutputType | null
  }

  type GetPriceListGroupByPayload<T extends PriceListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceListGroupByOutputType[P]>
            : GetScalarType<T[P], PriceListGroupByOutputType[P]>
        }
      >
    >


  export type PriceListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    duration?: boolean
    normalPrice?: boolean
    lowPrice?: boolean
    tierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tier?: boolean | PriceTierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceList"]>

  export type PriceListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    duration?: boolean
    normalPrice?: boolean
    lowPrice?: boolean
    tierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tier?: boolean | PriceTierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceList"]>

  export type PriceListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    duration?: boolean
    normalPrice?: boolean
    lowPrice?: boolean
    tierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tier?: boolean | PriceTierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceList"]>

  export type PriceListSelectScalar = {
    id?: boolean
    duration?: boolean
    normalPrice?: boolean
    lowPrice?: boolean
    tierId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PriceListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "duration" | "normalPrice" | "lowPrice" | "tierId" | "createdAt" | "updatedAt", ExtArgs["result"]["priceList"]>
  export type PriceListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tier?: boolean | PriceTierDefaultArgs<ExtArgs>
  }
  export type PriceListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tier?: boolean | PriceTierDefaultArgs<ExtArgs>
  }
  export type PriceListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tier?: boolean | PriceTierDefaultArgs<ExtArgs>
  }

  export type $PriceListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceList"
    objects: {
      tier: Prisma.$PriceTierPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      duration: string
      normalPrice: number
      lowPrice: number
      tierId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["priceList"]>
    composites: {}
  }

  type PriceListGetPayload<S extends boolean | null | undefined | PriceListDefaultArgs> = $Result.GetResult<Prisma.$PriceListPayload, S>

  type PriceListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceListCountAggregateInputType | true
    }

  export interface PriceListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceList'], meta: { name: 'PriceList' } }
    /**
     * Find zero or one PriceList that matches the filter.
     * @param {PriceListFindUniqueArgs} args - Arguments to find a PriceList
     * @example
     * // Get one PriceList
     * const priceList = await prisma.priceList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceListFindUniqueArgs>(args: SelectSubset<T, PriceListFindUniqueArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PriceList that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceListFindUniqueOrThrowArgs} args - Arguments to find a PriceList
     * @example
     * // Get one PriceList
     * const priceList = await prisma.priceList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceListFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PriceList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceListFindFirstArgs} args - Arguments to find a PriceList
     * @example
     * // Get one PriceList
     * const priceList = await prisma.priceList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceListFindFirstArgs>(args?: SelectSubset<T, PriceListFindFirstArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PriceList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceListFindFirstOrThrowArgs} args - Arguments to find a PriceList
     * @example
     * // Get one PriceList
     * const priceList = await prisma.priceList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceListFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceListFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PriceLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceLists
     * const priceLists = await prisma.priceList.findMany()
     * 
     * // Get first 10 PriceLists
     * const priceLists = await prisma.priceList.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceListWithIdOnly = await prisma.priceList.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceListFindManyArgs>(args?: SelectSubset<T, PriceListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PriceList.
     * @param {PriceListCreateArgs} args - Arguments to create a PriceList.
     * @example
     * // Create one PriceList
     * const PriceList = await prisma.priceList.create({
     *   data: {
     *     // ... data to create a PriceList
     *   }
     * })
     * 
     */
    create<T extends PriceListCreateArgs>(args: SelectSubset<T, PriceListCreateArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PriceLists.
     * @param {PriceListCreateManyArgs} args - Arguments to create many PriceLists.
     * @example
     * // Create many PriceLists
     * const priceList = await prisma.priceList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceListCreateManyArgs>(args?: SelectSubset<T, PriceListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PriceLists and returns the data saved in the database.
     * @param {PriceListCreateManyAndReturnArgs} args - Arguments to create many PriceLists.
     * @example
     * // Create many PriceLists
     * const priceList = await prisma.priceList.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PriceLists and only return the `id`
     * const priceListWithIdOnly = await prisma.priceList.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceListCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PriceList.
     * @param {PriceListDeleteArgs} args - Arguments to delete one PriceList.
     * @example
     * // Delete one PriceList
     * const PriceList = await prisma.priceList.delete({
     *   where: {
     *     // ... filter to delete one PriceList
     *   }
     * })
     * 
     */
    delete<T extends PriceListDeleteArgs>(args: SelectSubset<T, PriceListDeleteArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PriceList.
     * @param {PriceListUpdateArgs} args - Arguments to update one PriceList.
     * @example
     * // Update one PriceList
     * const priceList = await prisma.priceList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceListUpdateArgs>(args: SelectSubset<T, PriceListUpdateArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PriceLists.
     * @param {PriceListDeleteManyArgs} args - Arguments to filter PriceLists to delete.
     * @example
     * // Delete a few PriceLists
     * const { count } = await prisma.priceList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceListDeleteManyArgs>(args?: SelectSubset<T, PriceListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceLists
     * const priceList = await prisma.priceList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceListUpdateManyArgs>(args: SelectSubset<T, PriceListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceLists and returns the data updated in the database.
     * @param {PriceListUpdateManyAndReturnArgs} args - Arguments to update many PriceLists.
     * @example
     * // Update many PriceLists
     * const priceList = await prisma.priceList.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PriceLists and only return the `id`
     * const priceListWithIdOnly = await prisma.priceList.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceListUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PriceList.
     * @param {PriceListUpsertArgs} args - Arguments to update or create a PriceList.
     * @example
     * // Update or create a PriceList
     * const priceList = await prisma.priceList.upsert({
     *   create: {
     *     // ... data to create a PriceList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceList we want to update
     *   }
     * })
     */
    upsert<T extends PriceListUpsertArgs>(args: SelectSubset<T, PriceListUpsertArgs<ExtArgs>>): Prisma__PriceListClient<$Result.GetResult<Prisma.$PriceListPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PriceLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceListCountArgs} args - Arguments to filter PriceLists to count.
     * @example
     * // Count the number of PriceLists
     * const count = await prisma.priceList.count({
     *   where: {
     *     // ... the filter for the PriceLists we want to count
     *   }
     * })
    **/
    count<T extends PriceListCountArgs>(
      args?: Subset<T, PriceListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceListAggregateArgs>(args: Subset<T, PriceListAggregateArgs>): Prisma.PrismaPromise<GetPriceListAggregateType<T>>

    /**
     * Group by PriceList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceListGroupByArgs['orderBy'] }
        : { orderBy?: PriceListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceList model
   */
  readonly fields: PriceListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceList.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tier<T extends PriceTierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PriceTierDefaultArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceList model
   */ 
  interface PriceListFieldRefs {
    readonly id: FieldRef<"PriceList", 'Int'>
    readonly duration: FieldRef<"PriceList", 'String'>
    readonly normalPrice: FieldRef<"PriceList", 'Int'>
    readonly lowPrice: FieldRef<"PriceList", 'Int'>
    readonly tierId: FieldRef<"PriceList", 'Int'>
    readonly createdAt: FieldRef<"PriceList", 'DateTime'>
    readonly updatedAt: FieldRef<"PriceList", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceList findUnique
   */
  export type PriceListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * Filter, which PriceList to fetch.
     */
    where: PriceListWhereUniqueInput
  }

  /**
   * PriceList findUniqueOrThrow
   */
  export type PriceListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * Filter, which PriceList to fetch.
     */
    where: PriceListWhereUniqueInput
  }

  /**
   * PriceList findFirst
   */
  export type PriceListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * Filter, which PriceList to fetch.
     */
    where?: PriceListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLists to fetch.
     */
    orderBy?: PriceListOrderByWithRelationInput | PriceListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceLists.
     */
    cursor?: PriceListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceLists.
     */
    distinct?: PriceListScalarFieldEnum | PriceListScalarFieldEnum[]
  }

  /**
   * PriceList findFirstOrThrow
   */
  export type PriceListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * Filter, which PriceList to fetch.
     */
    where?: PriceListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLists to fetch.
     */
    orderBy?: PriceListOrderByWithRelationInput | PriceListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceLists.
     */
    cursor?: PriceListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceLists.
     */
    distinct?: PriceListScalarFieldEnum | PriceListScalarFieldEnum[]
  }

  /**
   * PriceList findMany
   */
  export type PriceListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * Filter, which PriceLists to fetch.
     */
    where?: PriceListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceLists to fetch.
     */
    orderBy?: PriceListOrderByWithRelationInput | PriceListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceLists.
     */
    cursor?: PriceListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceLists.
     */
    skip?: number
    distinct?: PriceListScalarFieldEnum | PriceListScalarFieldEnum[]
  }

  /**
   * PriceList create
   */
  export type PriceListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceList.
     */
    data: XOR<PriceListCreateInput, PriceListUncheckedCreateInput>
  }

  /**
   * PriceList createMany
   */
  export type PriceListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceLists.
     */
    data: PriceListCreateManyInput | PriceListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceList createManyAndReturn
   */
  export type PriceListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * The data used to create many PriceLists.
     */
    data: PriceListCreateManyInput | PriceListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceList update
   */
  export type PriceListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceList.
     */
    data: XOR<PriceListUpdateInput, PriceListUncheckedUpdateInput>
    /**
     * Choose, which PriceList to update.
     */
    where: PriceListWhereUniqueInput
  }

  /**
   * PriceList updateMany
   */
  export type PriceListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceLists.
     */
    data: XOR<PriceListUpdateManyMutationInput, PriceListUncheckedUpdateManyInput>
    /**
     * Filter which PriceLists to update
     */
    where?: PriceListWhereInput
    /**
     * Limit how many PriceLists to update.
     */
    limit?: number
  }

  /**
   * PriceList updateManyAndReturn
   */
  export type PriceListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * The data used to update PriceLists.
     */
    data: XOR<PriceListUpdateManyMutationInput, PriceListUncheckedUpdateManyInput>
    /**
     * Filter which PriceLists to update
     */
    where?: PriceListWhereInput
    /**
     * Limit how many PriceLists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceList upsert
   */
  export type PriceListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceList to update in case it exists.
     */
    where: PriceListWhereUniqueInput
    /**
     * In case the PriceList found by the `where` argument doesn't exist, create a new PriceList with this data.
     */
    create: XOR<PriceListCreateInput, PriceListUncheckedCreateInput>
    /**
     * In case the PriceList was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceListUpdateInput, PriceListUncheckedUpdateInput>
  }

  /**
   * PriceList delete
   */
  export type PriceListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
    /**
     * Filter which PriceList to delete.
     */
    where: PriceListWhereUniqueInput
  }

  /**
   * PriceList deleteMany
   */
  export type PriceListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceLists to delete
     */
    where?: PriceListWhereInput
    /**
     * Limit how many PriceLists to delete.
     */
    limit?: number
  }

  /**
   * PriceList without action
   */
  export type PriceListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceList
     */
    select?: PriceListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceList
     */
    omit?: PriceListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceListInclude<ExtArgs> | null
  }


  /**
   * Model Skin
   */

  export type AggregateSkin = {
    _count: SkinCountAggregateOutputType | null
    _avg: SkinAvgAggregateOutputType | null
    _sum: SkinSumAggregateOutputType | null
    _min: SkinMinAggregateOutputType | null
    _max: SkinMaxAggregateOutputType | null
  }

  export type SkinAvgAggregateOutputType = {
    id: number | null
  }

  export type SkinSumAggregateOutputType = {
    id: number | null
  }

  export type SkinMinAggregateOutputType = {
    id: number | null
    name: string | null
    imageUrl: string | null
    keyword: string | null
  }

  export type SkinMaxAggregateOutputType = {
    id: number | null
    name: string | null
    imageUrl: string | null
    keyword: string | null
  }

  export type SkinCountAggregateOutputType = {
    id: number
    name: number
    imageUrl: number
    keyword: number
    _all: number
  }


  export type SkinAvgAggregateInputType = {
    id?: true
  }

  export type SkinSumAggregateInputType = {
    id?: true
  }

  export type SkinMinAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    keyword?: true
  }

  export type SkinMaxAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    keyword?: true
  }

  export type SkinCountAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    keyword?: true
    _all?: true
  }

  export type SkinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skin to aggregate.
     */
    where?: SkinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skins to fetch.
     */
    orderBy?: SkinOrderByWithRelationInput | SkinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skins
    **/
    _count?: true | SkinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkinAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkinSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkinMaxAggregateInputType
  }

  export type GetSkinAggregateType<T extends SkinAggregateArgs> = {
        [P in keyof T & keyof AggregateSkin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkin[P]>
      : GetScalarType<T[P], AggregateSkin[P]>
  }




  export type SkinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkinWhereInput
    orderBy?: SkinOrderByWithAggregationInput | SkinOrderByWithAggregationInput[]
    by: SkinScalarFieldEnum[] | SkinScalarFieldEnum
    having?: SkinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkinCountAggregateInputType | true
    _avg?: SkinAvgAggregateInputType
    _sum?: SkinSumAggregateInputType
    _min?: SkinMinAggregateInputType
    _max?: SkinMaxAggregateInputType
  }

  export type SkinGroupByOutputType = {
    id: number
    name: string
    imageUrl: string
    keyword: string | null
    _count: SkinCountAggregateOutputType | null
    _avg: SkinAvgAggregateOutputType | null
    _sum: SkinSumAggregateOutputType | null
    _min: SkinMinAggregateOutputType | null
    _max: SkinMaxAggregateOutputType | null
  }

  type GetSkinGroupByPayload<T extends SkinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkinGroupByOutputType[P]>
            : GetScalarType<T[P], SkinGroupByOutputType[P]>
        }
      >
    >


  export type SkinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    keyword?: boolean
    accounts?: boolean | Skin$accountsArgs<ExtArgs>
    _count?: boolean | SkinCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skin"]>

  export type SkinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    keyword?: boolean
  }, ExtArgs["result"]["skin"]>

  export type SkinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    keyword?: boolean
  }, ExtArgs["result"]["skin"]>

  export type SkinSelectScalar = {
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    keyword?: boolean
  }

  export type SkinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "imageUrl" | "keyword", ExtArgs["result"]["skin"]>
  export type SkinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | Skin$accountsArgs<ExtArgs>
    _count?: boolean | SkinCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SkinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SkinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SkinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Skin"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      imageUrl: string
      keyword: string | null
    }, ExtArgs["result"]["skin"]>
    composites: {}
  }

  type SkinGetPayload<S extends boolean | null | undefined | SkinDefaultArgs> = $Result.GetResult<Prisma.$SkinPayload, S>

  type SkinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkinCountAggregateInputType | true
    }

  export interface SkinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Skin'], meta: { name: 'Skin' } }
    /**
     * Find zero or one Skin that matches the filter.
     * @param {SkinFindUniqueArgs} args - Arguments to find a Skin
     * @example
     * // Get one Skin
     * const skin = await prisma.skin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkinFindUniqueArgs>(args: SelectSubset<T, SkinFindUniqueArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Skin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkinFindUniqueOrThrowArgs} args - Arguments to find a Skin
     * @example
     * // Get one Skin
     * const skin = await prisma.skin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkinFindUniqueOrThrowArgs>(args: SelectSubset<T, SkinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Skin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkinFindFirstArgs} args - Arguments to find a Skin
     * @example
     * // Get one Skin
     * const skin = await prisma.skin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkinFindFirstArgs>(args?: SelectSubset<T, SkinFindFirstArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Skin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkinFindFirstOrThrowArgs} args - Arguments to find a Skin
     * @example
     * // Get one Skin
     * const skin = await prisma.skin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkinFindFirstOrThrowArgs>(args?: SelectSubset<T, SkinFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Skins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skins
     * const skins = await prisma.skin.findMany()
     * 
     * // Get first 10 Skins
     * const skins = await prisma.skin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skinWithIdOnly = await prisma.skin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkinFindManyArgs>(args?: SelectSubset<T, SkinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Skin.
     * @param {SkinCreateArgs} args - Arguments to create a Skin.
     * @example
     * // Create one Skin
     * const Skin = await prisma.skin.create({
     *   data: {
     *     // ... data to create a Skin
     *   }
     * })
     * 
     */
    create<T extends SkinCreateArgs>(args: SelectSubset<T, SkinCreateArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Skins.
     * @param {SkinCreateManyArgs} args - Arguments to create many Skins.
     * @example
     * // Create many Skins
     * const skin = await prisma.skin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkinCreateManyArgs>(args?: SelectSubset<T, SkinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Skins and returns the data saved in the database.
     * @param {SkinCreateManyAndReturnArgs} args - Arguments to create many Skins.
     * @example
     * // Create many Skins
     * const skin = await prisma.skin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Skins and only return the `id`
     * const skinWithIdOnly = await prisma.skin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkinCreateManyAndReturnArgs>(args?: SelectSubset<T, SkinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Skin.
     * @param {SkinDeleteArgs} args - Arguments to delete one Skin.
     * @example
     * // Delete one Skin
     * const Skin = await prisma.skin.delete({
     *   where: {
     *     // ... filter to delete one Skin
     *   }
     * })
     * 
     */
    delete<T extends SkinDeleteArgs>(args: SelectSubset<T, SkinDeleteArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Skin.
     * @param {SkinUpdateArgs} args - Arguments to update one Skin.
     * @example
     * // Update one Skin
     * const skin = await prisma.skin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkinUpdateArgs>(args: SelectSubset<T, SkinUpdateArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Skins.
     * @param {SkinDeleteManyArgs} args - Arguments to filter Skins to delete.
     * @example
     * // Delete a few Skins
     * const { count } = await prisma.skin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkinDeleteManyArgs>(args?: SelectSubset<T, SkinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skins
     * const skin = await prisma.skin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkinUpdateManyArgs>(args: SelectSubset<T, SkinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skins and returns the data updated in the database.
     * @param {SkinUpdateManyAndReturnArgs} args - Arguments to update many Skins.
     * @example
     * // Update many Skins
     * const skin = await prisma.skin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Skins and only return the `id`
     * const skinWithIdOnly = await prisma.skin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SkinUpdateManyAndReturnArgs>(args: SelectSubset<T, SkinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Skin.
     * @param {SkinUpsertArgs} args - Arguments to update or create a Skin.
     * @example
     * // Update or create a Skin
     * const skin = await prisma.skin.upsert({
     *   create: {
     *     // ... data to create a Skin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skin we want to update
     *   }
     * })
     */
    upsert<T extends SkinUpsertArgs>(args: SelectSubset<T, SkinUpsertArgs<ExtArgs>>): Prisma__SkinClient<$Result.GetResult<Prisma.$SkinPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Skins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkinCountArgs} args - Arguments to filter Skins to count.
     * @example
     * // Count the number of Skins
     * const count = await prisma.skin.count({
     *   where: {
     *     // ... the filter for the Skins we want to count
     *   }
     * })
    **/
    count<T extends SkinCountArgs>(
      args?: Subset<T, SkinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkinAggregateArgs>(args: Subset<T, SkinAggregateArgs>): Prisma.PrismaPromise<GetSkinAggregateType<T>>

    /**
     * Group by Skin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkinGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkinGroupByArgs['orderBy'] }
        : { orderBy?: SkinGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Skin model
   */
  readonly fields: SkinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends Skin$accountsArgs<ExtArgs> = {}>(args?: Subset<T, Skin$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Skin model
   */ 
  interface SkinFieldRefs {
    readonly id: FieldRef<"Skin", 'Int'>
    readonly name: FieldRef<"Skin", 'String'>
    readonly imageUrl: FieldRef<"Skin", 'String'>
    readonly keyword: FieldRef<"Skin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Skin findUnique
   */
  export type SkinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * Filter, which Skin to fetch.
     */
    where: SkinWhereUniqueInput
  }

  /**
   * Skin findUniqueOrThrow
   */
  export type SkinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * Filter, which Skin to fetch.
     */
    where: SkinWhereUniqueInput
  }

  /**
   * Skin findFirst
   */
  export type SkinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * Filter, which Skin to fetch.
     */
    where?: SkinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skins to fetch.
     */
    orderBy?: SkinOrderByWithRelationInput | SkinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skins.
     */
    cursor?: SkinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skins.
     */
    distinct?: SkinScalarFieldEnum | SkinScalarFieldEnum[]
  }

  /**
   * Skin findFirstOrThrow
   */
  export type SkinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * Filter, which Skin to fetch.
     */
    where?: SkinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skins to fetch.
     */
    orderBy?: SkinOrderByWithRelationInput | SkinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skins.
     */
    cursor?: SkinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skins.
     */
    distinct?: SkinScalarFieldEnum | SkinScalarFieldEnum[]
  }

  /**
   * Skin findMany
   */
  export type SkinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * Filter, which Skins to fetch.
     */
    where?: SkinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skins to fetch.
     */
    orderBy?: SkinOrderByWithRelationInput | SkinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skins.
     */
    cursor?: SkinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skins.
     */
    skip?: number
    distinct?: SkinScalarFieldEnum | SkinScalarFieldEnum[]
  }

  /**
   * Skin create
   */
  export type SkinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * The data needed to create a Skin.
     */
    data: XOR<SkinCreateInput, SkinUncheckedCreateInput>
  }

  /**
   * Skin createMany
   */
  export type SkinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skins.
     */
    data: SkinCreateManyInput | SkinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skin createManyAndReturn
   */
  export type SkinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * The data used to create many Skins.
     */
    data: SkinCreateManyInput | SkinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skin update
   */
  export type SkinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * The data needed to update a Skin.
     */
    data: XOR<SkinUpdateInput, SkinUncheckedUpdateInput>
    /**
     * Choose, which Skin to update.
     */
    where: SkinWhereUniqueInput
  }

  /**
   * Skin updateMany
   */
  export type SkinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skins.
     */
    data: XOR<SkinUpdateManyMutationInput, SkinUncheckedUpdateManyInput>
    /**
     * Filter which Skins to update
     */
    where?: SkinWhereInput
    /**
     * Limit how many Skins to update.
     */
    limit?: number
  }

  /**
   * Skin updateManyAndReturn
   */
  export type SkinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * The data used to update Skins.
     */
    data: XOR<SkinUpdateManyMutationInput, SkinUncheckedUpdateManyInput>
    /**
     * Filter which Skins to update
     */
    where?: SkinWhereInput
    /**
     * Limit how many Skins to update.
     */
    limit?: number
  }

  /**
   * Skin upsert
   */
  export type SkinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * The filter to search for the Skin to update in case it exists.
     */
    where: SkinWhereUniqueInput
    /**
     * In case the Skin found by the `where` argument doesn't exist, create a new Skin with this data.
     */
    create: XOR<SkinCreateInput, SkinUncheckedCreateInput>
    /**
     * In case the Skin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkinUpdateInput, SkinUncheckedUpdateInput>
  }

  /**
   * Skin delete
   */
  export type SkinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
    /**
     * Filter which Skin to delete.
     */
    where: SkinWhereUniqueInput
  }

  /**
   * Skin deleteMany
   */
  export type SkinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skins to delete
     */
    where?: SkinWhereInput
    /**
     * Limit how many Skins to delete.
     */
    limit?: number
  }

  /**
   * Skin.accounts
   */
  export type Skin$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Skin without action
   */
  export type SkinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skin
     */
    select?: SkinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skin
     */
    omit?: SkinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkinInclude<ExtArgs> | null
  }


  /**
   * Model ImageUpload
   */

  export type AggregateImageUpload = {
    _count: ImageUploadCountAggregateOutputType | null
    _avg: ImageUploadAvgAggregateOutputType | null
    _sum: ImageUploadSumAggregateOutputType | null
    _min: ImageUploadMinAggregateOutputType | null
    _max: ImageUploadMaxAggregateOutputType | null
  }

  export type ImageUploadAvgAggregateOutputType = {
    id: number | null
    accountId: number | null
  }

  export type ImageUploadSumAggregateOutputType = {
    id: number | null
    accountId: number | null
  }

  export type ImageUploadMinAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    type: $Enums.MediaType | null
    createdAt: Date | null
    updatedAt: Date | null
    accountId: number | null
  }

  export type ImageUploadMaxAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    type: $Enums.MediaType | null
    createdAt: Date | null
    updatedAt: Date | null
    accountId: number | null
  }

  export type ImageUploadCountAggregateOutputType = {
    id: number
    imageUrl: number
    type: number
    createdAt: number
    updatedAt: number
    accountId: number
    _all: number
  }


  export type ImageUploadAvgAggregateInputType = {
    id?: true
    accountId?: true
  }

  export type ImageUploadSumAggregateInputType = {
    id?: true
    accountId?: true
  }

  export type ImageUploadMinAggregateInputType = {
    id?: true
    imageUrl?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
  }

  export type ImageUploadMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
  }

  export type ImageUploadCountAggregateInputType = {
    id?: true
    imageUrl?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
    _all?: true
  }

  export type ImageUploadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageUpload to aggregate.
     */
    where?: ImageUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageUploads to fetch.
     */
    orderBy?: ImageUploadOrderByWithRelationInput | ImageUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImageUploads
    **/
    _count?: true | ImageUploadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImageUploadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImageUploadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageUploadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageUploadMaxAggregateInputType
  }

  export type GetImageUploadAggregateType<T extends ImageUploadAggregateArgs> = {
        [P in keyof T & keyof AggregateImageUpload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImageUpload[P]>
      : GetScalarType<T[P], AggregateImageUpload[P]>
  }




  export type ImageUploadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageUploadWhereInput
    orderBy?: ImageUploadOrderByWithAggregationInput | ImageUploadOrderByWithAggregationInput[]
    by: ImageUploadScalarFieldEnum[] | ImageUploadScalarFieldEnum
    having?: ImageUploadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageUploadCountAggregateInputType | true
    _avg?: ImageUploadAvgAggregateInputType
    _sum?: ImageUploadSumAggregateInputType
    _min?: ImageUploadMinAggregateInputType
    _max?: ImageUploadMaxAggregateInputType
  }

  export type ImageUploadGroupByOutputType = {
    id: number
    imageUrl: string
    type: $Enums.MediaType
    createdAt: Date
    updatedAt: Date
    accountId: number | null
    _count: ImageUploadCountAggregateOutputType | null
    _avg: ImageUploadAvgAggregateOutputType | null
    _sum: ImageUploadSumAggregateOutputType | null
    _min: ImageUploadMinAggregateOutputType | null
    _max: ImageUploadMaxAggregateOutputType | null
  }

  type GetImageUploadGroupByPayload<T extends ImageUploadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageUploadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageUploadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageUploadGroupByOutputType[P]>
            : GetScalarType<T[P], ImageUploadGroupByOutputType[P]>
        }
      >
    >


  export type ImageUploadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    thumbnailOf?: boolean | ImageUpload$thumbnailOfArgs<ExtArgs>
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
    slideOf?: boolean | ImageUpload$slideOfArgs<ExtArgs>
  }, ExtArgs["result"]["imageUpload"]>

  export type ImageUploadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
  }, ExtArgs["result"]["imageUpload"]>

  export type ImageUploadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
  }, ExtArgs["result"]["imageUpload"]>

  export type ImageUploadSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
  }

  export type ImageUploadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "type" | "createdAt" | "updatedAt" | "accountId", ExtArgs["result"]["imageUpload"]>
  export type ImageUploadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thumbnailOf?: boolean | ImageUpload$thumbnailOfArgs<ExtArgs>
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
    slideOf?: boolean | ImageUpload$slideOfArgs<ExtArgs>
  }
  export type ImageUploadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
  }
  export type ImageUploadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
  }

  export type $ImageUploadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImageUpload"
    objects: {
      thumbnailOf: Prisma.$AccountPayload<ExtArgs> | null
      account: Prisma.$AccountPayload<ExtArgs> | null
      slideOf: Prisma.$CarouselSlidePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imageUrl: string
      type: $Enums.MediaType
      createdAt: Date
      updatedAt: Date
      accountId: number | null
    }, ExtArgs["result"]["imageUpload"]>
    composites: {}
  }

  type ImageUploadGetPayload<S extends boolean | null | undefined | ImageUploadDefaultArgs> = $Result.GetResult<Prisma.$ImageUploadPayload, S>

  type ImageUploadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageUploadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageUploadCountAggregateInputType | true
    }

  export interface ImageUploadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImageUpload'], meta: { name: 'ImageUpload' } }
    /**
     * Find zero or one ImageUpload that matches the filter.
     * @param {ImageUploadFindUniqueArgs} args - Arguments to find a ImageUpload
     * @example
     * // Get one ImageUpload
     * const imageUpload = await prisma.imageUpload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageUploadFindUniqueArgs>(args: SelectSubset<T, ImageUploadFindUniqueArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one ImageUpload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageUploadFindUniqueOrThrowArgs} args - Arguments to find a ImageUpload
     * @example
     * // Get one ImageUpload
     * const imageUpload = await prisma.imageUpload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageUploadFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageUploadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first ImageUpload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUploadFindFirstArgs} args - Arguments to find a ImageUpload
     * @example
     * // Get one ImageUpload
     * const imageUpload = await prisma.imageUpload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageUploadFindFirstArgs>(args?: SelectSubset<T, ImageUploadFindFirstArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first ImageUpload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUploadFindFirstOrThrowArgs} args - Arguments to find a ImageUpload
     * @example
     * // Get one ImageUpload
     * const imageUpload = await prisma.imageUpload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageUploadFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageUploadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more ImageUploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUploadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImageUploads
     * const imageUploads = await prisma.imageUpload.findMany()
     * 
     * // Get first 10 ImageUploads
     * const imageUploads = await prisma.imageUpload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageUploadWithIdOnly = await prisma.imageUpload.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageUploadFindManyArgs>(args?: SelectSubset<T, ImageUploadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a ImageUpload.
     * @param {ImageUploadCreateArgs} args - Arguments to create a ImageUpload.
     * @example
     * // Create one ImageUpload
     * const ImageUpload = await prisma.imageUpload.create({
     *   data: {
     *     // ... data to create a ImageUpload
     *   }
     * })
     * 
     */
    create<T extends ImageUploadCreateArgs>(args: SelectSubset<T, ImageUploadCreateArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many ImageUploads.
     * @param {ImageUploadCreateManyArgs} args - Arguments to create many ImageUploads.
     * @example
     * // Create many ImageUploads
     * const imageUpload = await prisma.imageUpload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageUploadCreateManyArgs>(args?: SelectSubset<T, ImageUploadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImageUploads and returns the data saved in the database.
     * @param {ImageUploadCreateManyAndReturnArgs} args - Arguments to create many ImageUploads.
     * @example
     * // Create many ImageUploads
     * const imageUpload = await prisma.imageUpload.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImageUploads and only return the `id`
     * const imageUploadWithIdOnly = await prisma.imageUpload.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageUploadCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageUploadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a ImageUpload.
     * @param {ImageUploadDeleteArgs} args - Arguments to delete one ImageUpload.
     * @example
     * // Delete one ImageUpload
     * const ImageUpload = await prisma.imageUpload.delete({
     *   where: {
     *     // ... filter to delete one ImageUpload
     *   }
     * })
     * 
     */
    delete<T extends ImageUploadDeleteArgs>(args: SelectSubset<T, ImageUploadDeleteArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one ImageUpload.
     * @param {ImageUploadUpdateArgs} args - Arguments to update one ImageUpload.
     * @example
     * // Update one ImageUpload
     * const imageUpload = await prisma.imageUpload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageUploadUpdateArgs>(args: SelectSubset<T, ImageUploadUpdateArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more ImageUploads.
     * @param {ImageUploadDeleteManyArgs} args - Arguments to filter ImageUploads to delete.
     * @example
     * // Delete a few ImageUploads
     * const { count } = await prisma.imageUpload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageUploadDeleteManyArgs>(args?: SelectSubset<T, ImageUploadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImageUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUploadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImageUploads
     * const imageUpload = await prisma.imageUpload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageUploadUpdateManyArgs>(args: SelectSubset<T, ImageUploadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImageUploads and returns the data updated in the database.
     * @param {ImageUploadUpdateManyAndReturnArgs} args - Arguments to update many ImageUploads.
     * @example
     * // Update many ImageUploads
     * const imageUpload = await prisma.imageUpload.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImageUploads and only return the `id`
     * const imageUploadWithIdOnly = await prisma.imageUpload.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImageUploadUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageUploadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one ImageUpload.
     * @param {ImageUploadUpsertArgs} args - Arguments to update or create a ImageUpload.
     * @example
     * // Update or create a ImageUpload
     * const imageUpload = await prisma.imageUpload.upsert({
     *   create: {
     *     // ... data to create a ImageUpload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImageUpload we want to update
     *   }
     * })
     */
    upsert<T extends ImageUploadUpsertArgs>(args: SelectSubset<T, ImageUploadUpsertArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of ImageUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUploadCountArgs} args - Arguments to filter ImageUploads to count.
     * @example
     * // Count the number of ImageUploads
     * const count = await prisma.imageUpload.count({
     *   where: {
     *     // ... the filter for the ImageUploads we want to count
     *   }
     * })
    **/
    count<T extends ImageUploadCountArgs>(
      args?: Subset<T, ImageUploadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageUploadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImageUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUploadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageUploadAggregateArgs>(args: Subset<T, ImageUploadAggregateArgs>): Prisma.PrismaPromise<GetImageUploadAggregateType<T>>

    /**
     * Group by ImageUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUploadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageUploadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageUploadGroupByArgs['orderBy'] }
        : { orderBy?: ImageUploadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageUploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageUploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImageUpload model
   */
  readonly fields: ImageUploadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImageUpload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageUploadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    thumbnailOf<T extends ImageUpload$thumbnailOfArgs<ExtArgs> = {}>(args?: Subset<T, ImageUpload$thumbnailOfArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    account<T extends ImageUpload$accountArgs<ExtArgs> = {}>(args?: Subset<T, ImageUpload$accountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    slideOf<T extends ImageUpload$slideOfArgs<ExtArgs> = {}>(args?: Subset<T, ImageUpload$slideOfArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImageUpload model
   */ 
  interface ImageUploadFieldRefs {
    readonly id: FieldRef<"ImageUpload", 'Int'>
    readonly imageUrl: FieldRef<"ImageUpload", 'String'>
    readonly type: FieldRef<"ImageUpload", 'MediaType'>
    readonly createdAt: FieldRef<"ImageUpload", 'DateTime'>
    readonly updatedAt: FieldRef<"ImageUpload", 'DateTime'>
    readonly accountId: FieldRef<"ImageUpload", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ImageUpload findUnique
   */
  export type ImageUploadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * Filter, which ImageUpload to fetch.
     */
    where: ImageUploadWhereUniqueInput
  }

  /**
   * ImageUpload findUniqueOrThrow
   */
  export type ImageUploadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * Filter, which ImageUpload to fetch.
     */
    where: ImageUploadWhereUniqueInput
  }

  /**
   * ImageUpload findFirst
   */
  export type ImageUploadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * Filter, which ImageUpload to fetch.
     */
    where?: ImageUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageUploads to fetch.
     */
    orderBy?: ImageUploadOrderByWithRelationInput | ImageUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageUploads.
     */
    cursor?: ImageUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageUploads.
     */
    distinct?: ImageUploadScalarFieldEnum | ImageUploadScalarFieldEnum[]
  }

  /**
   * ImageUpload findFirstOrThrow
   */
  export type ImageUploadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * Filter, which ImageUpload to fetch.
     */
    where?: ImageUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageUploads to fetch.
     */
    orderBy?: ImageUploadOrderByWithRelationInput | ImageUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImageUploads.
     */
    cursor?: ImageUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImageUploads.
     */
    distinct?: ImageUploadScalarFieldEnum | ImageUploadScalarFieldEnum[]
  }

  /**
   * ImageUpload findMany
   */
  export type ImageUploadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * Filter, which ImageUploads to fetch.
     */
    where?: ImageUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImageUploads to fetch.
     */
    orderBy?: ImageUploadOrderByWithRelationInput | ImageUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImageUploads.
     */
    cursor?: ImageUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImageUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImageUploads.
     */
    skip?: number
    distinct?: ImageUploadScalarFieldEnum | ImageUploadScalarFieldEnum[]
  }

  /**
   * ImageUpload create
   */
  export type ImageUploadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * The data needed to create a ImageUpload.
     */
    data: XOR<ImageUploadCreateInput, ImageUploadUncheckedCreateInput>
  }

  /**
   * ImageUpload createMany
   */
  export type ImageUploadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImageUploads.
     */
    data: ImageUploadCreateManyInput | ImageUploadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImageUpload createManyAndReturn
   */
  export type ImageUploadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * The data used to create many ImageUploads.
     */
    data: ImageUploadCreateManyInput | ImageUploadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImageUpload update
   */
  export type ImageUploadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * The data needed to update a ImageUpload.
     */
    data: XOR<ImageUploadUpdateInput, ImageUploadUncheckedUpdateInput>
    /**
     * Choose, which ImageUpload to update.
     */
    where: ImageUploadWhereUniqueInput
  }

  /**
   * ImageUpload updateMany
   */
  export type ImageUploadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImageUploads.
     */
    data: XOR<ImageUploadUpdateManyMutationInput, ImageUploadUncheckedUpdateManyInput>
    /**
     * Filter which ImageUploads to update
     */
    where?: ImageUploadWhereInput
    /**
     * Limit how many ImageUploads to update.
     */
    limit?: number
  }

  /**
   * ImageUpload updateManyAndReturn
   */
  export type ImageUploadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * The data used to update ImageUploads.
     */
    data: XOR<ImageUploadUpdateManyMutationInput, ImageUploadUncheckedUpdateManyInput>
    /**
     * Filter which ImageUploads to update
     */
    where?: ImageUploadWhereInput
    /**
     * Limit how many ImageUploads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImageUpload upsert
   */
  export type ImageUploadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * The filter to search for the ImageUpload to update in case it exists.
     */
    where: ImageUploadWhereUniqueInput
    /**
     * In case the ImageUpload found by the `where` argument doesn't exist, create a new ImageUpload with this data.
     */
    create: XOR<ImageUploadCreateInput, ImageUploadUncheckedCreateInput>
    /**
     * In case the ImageUpload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUploadUpdateInput, ImageUploadUncheckedUpdateInput>
  }

  /**
   * ImageUpload delete
   */
  export type ImageUploadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
    /**
     * Filter which ImageUpload to delete.
     */
    where: ImageUploadWhereUniqueInput
  }

  /**
   * ImageUpload deleteMany
   */
  export type ImageUploadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImageUploads to delete
     */
    where?: ImageUploadWhereInput
    /**
     * Limit how many ImageUploads to delete.
     */
    limit?: number
  }

  /**
   * ImageUpload.thumbnailOf
   */
  export type ImageUpload$thumbnailOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * ImageUpload.account
   */
  export type ImageUpload$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * ImageUpload.slideOf
   */
  export type ImageUpload$slideOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    where?: CarouselSlideWhereInput
  }

  /**
   * ImageUpload without action
   */
  export type ImageUploadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImageUpload
     */
    select?: ImageUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImageUpload
     */
    omit?: ImageUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageUploadInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    id: number | null
  }

  export type CustomerSumAggregateOutputType = {
    id: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    passwordChangedAt: Date | null
    isActive: boolean | null
    passwordExpireAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    passwordChangedAt: Date | null
    isActive: boolean | null
    passwordExpireAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    username: number
    password: number
    createdAt: number
    updatedAt: number
    passwordChangedAt: number
    isActive: number
    passwordExpireAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    id?: true
  }

  export type CustomerSumAggregateInputType = {
    id?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    passwordChangedAt?: true
    isActive?: true
    passwordExpireAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    passwordChangedAt?: true
    isActive?: true
    passwordExpireAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    passwordChangedAt?: true
    isActive?: true
    passwordExpireAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: number
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
    passwordChangedAt: Date
    isActive: boolean
    passwordExpireAt: Date | null
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passwordChangedAt?: boolean
    isActive?: boolean
    passwordExpireAt?: boolean
    Booking?: boolean | Customer$BookingArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passwordChangedAt?: boolean
    isActive?: boolean
    passwordExpireAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passwordChangedAt?: boolean
    isActive?: boolean
    passwordExpireAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    passwordChangedAt?: boolean
    isActive?: boolean
    passwordExpireAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "createdAt" | "updatedAt" | "passwordChangedAt" | "isActive" | "passwordExpireAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Booking?: boolean | Customer$BookingArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      Booking: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      createdAt: Date
      updatedAt: Date
      passwordChangedAt: Date
      isActive: boolean
      passwordExpireAt: Date | null
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Booking<T extends Customer$BookingArgs<ExtArgs> = {}>(args?: Subset<T, Customer$BookingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'Int'>
    readonly username: FieldRef<"Customer", 'String'>
    readonly password: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
    readonly passwordChangedAt: FieldRef<"Customer", 'DateTime'>
    readonly isActive: FieldRef<"Customer", 'Boolean'>
    readonly passwordExpireAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.Booking
   */
  export type Customer$BookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model CarouselSlide
   */

  export type AggregateCarouselSlide = {
    _count: CarouselSlideCountAggregateOutputType | null
    _avg: CarouselSlideAvgAggregateOutputType | null
    _sum: CarouselSlideSumAggregateOutputType | null
    _min: CarouselSlideMinAggregateOutputType | null
    _max: CarouselSlideMaxAggregateOutputType | null
  }

  export type CarouselSlideAvgAggregateOutputType = {
    id: number | null
    imageId: number | null
    duration: number | null
  }

  export type CarouselSlideSumAggregateOutputType = {
    id: number | null
    imageId: number | null
    duration: number | null
  }

  export type CarouselSlideMinAggregateOutputType = {
    id: number | null
    imageId: number | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarouselSlideMaxAggregateOutputType = {
    id: number | null
    imageId: number | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarouselSlideCountAggregateOutputType = {
    id: number
    imageId: number
    duration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CarouselSlideAvgAggregateInputType = {
    id?: true
    imageId?: true
    duration?: true
  }

  export type CarouselSlideSumAggregateInputType = {
    id?: true
    imageId?: true
    duration?: true
  }

  export type CarouselSlideMinAggregateInputType = {
    id?: true
    imageId?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarouselSlideMaxAggregateInputType = {
    id?: true
    imageId?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarouselSlideCountAggregateInputType = {
    id?: true
    imageId?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CarouselSlideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarouselSlide to aggregate.
     */
    where?: CarouselSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarouselSlides to fetch.
     */
    orderBy?: CarouselSlideOrderByWithRelationInput | CarouselSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarouselSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarouselSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarouselSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CarouselSlides
    **/
    _count?: true | CarouselSlideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarouselSlideAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarouselSlideSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarouselSlideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarouselSlideMaxAggregateInputType
  }

  export type GetCarouselSlideAggregateType<T extends CarouselSlideAggregateArgs> = {
        [P in keyof T & keyof AggregateCarouselSlide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarouselSlide[P]>
      : GetScalarType<T[P], AggregateCarouselSlide[P]>
  }




  export type CarouselSlideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarouselSlideWhereInput
    orderBy?: CarouselSlideOrderByWithAggregationInput | CarouselSlideOrderByWithAggregationInput[]
    by: CarouselSlideScalarFieldEnum[] | CarouselSlideScalarFieldEnum
    having?: CarouselSlideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarouselSlideCountAggregateInputType | true
    _avg?: CarouselSlideAvgAggregateInputType
    _sum?: CarouselSlideSumAggregateInputType
    _min?: CarouselSlideMinAggregateInputType
    _max?: CarouselSlideMaxAggregateInputType
  }

  export type CarouselSlideGroupByOutputType = {
    id: number
    imageId: number
    duration: number
    createdAt: Date
    updatedAt: Date
    _count: CarouselSlideCountAggregateOutputType | null
    _avg: CarouselSlideAvgAggregateOutputType | null
    _sum: CarouselSlideSumAggregateOutputType | null
    _min: CarouselSlideMinAggregateOutputType | null
    _max: CarouselSlideMaxAggregateOutputType | null
  }

  type GetCarouselSlideGroupByPayload<T extends CarouselSlideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarouselSlideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarouselSlideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarouselSlideGroupByOutputType[P]>
            : GetScalarType<T[P], CarouselSlideGroupByOutputType[P]>
        }
      >
    >


  export type CarouselSlideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageId?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carouselSlide"]>

  export type CarouselSlideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageId?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carouselSlide"]>

  export type CarouselSlideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageId?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carouselSlide"]>

  export type CarouselSlideSelectScalar = {
    id?: boolean
    imageId?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CarouselSlideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageId" | "duration" | "createdAt" | "updatedAt", ExtArgs["result"]["carouselSlide"]>
  export type CarouselSlideInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }
  export type CarouselSlideIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }
  export type CarouselSlideIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }

  export type $CarouselSlidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CarouselSlide"
    objects: {
      image: Prisma.$ImageUploadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imageId: number
      duration: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["carouselSlide"]>
    composites: {}
  }

  type CarouselSlideGetPayload<S extends boolean | null | undefined | CarouselSlideDefaultArgs> = $Result.GetResult<Prisma.$CarouselSlidePayload, S>

  type CarouselSlideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CarouselSlideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarouselSlideCountAggregateInputType | true
    }

  export interface CarouselSlideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CarouselSlide'], meta: { name: 'CarouselSlide' } }
    /**
     * Find zero or one CarouselSlide that matches the filter.
     * @param {CarouselSlideFindUniqueArgs} args - Arguments to find a CarouselSlide
     * @example
     * // Get one CarouselSlide
     * const carouselSlide = await prisma.carouselSlide.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarouselSlideFindUniqueArgs>(args: SelectSubset<T, CarouselSlideFindUniqueArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CarouselSlide that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CarouselSlideFindUniqueOrThrowArgs} args - Arguments to find a CarouselSlide
     * @example
     * // Get one CarouselSlide
     * const carouselSlide = await prisma.carouselSlide.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarouselSlideFindUniqueOrThrowArgs>(args: SelectSubset<T, CarouselSlideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CarouselSlide that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarouselSlideFindFirstArgs} args - Arguments to find a CarouselSlide
     * @example
     * // Get one CarouselSlide
     * const carouselSlide = await prisma.carouselSlide.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarouselSlideFindFirstArgs>(args?: SelectSubset<T, CarouselSlideFindFirstArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CarouselSlide that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarouselSlideFindFirstOrThrowArgs} args - Arguments to find a CarouselSlide
     * @example
     * // Get one CarouselSlide
     * const carouselSlide = await prisma.carouselSlide.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarouselSlideFindFirstOrThrowArgs>(args?: SelectSubset<T, CarouselSlideFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CarouselSlides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarouselSlideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CarouselSlides
     * const carouselSlides = await prisma.carouselSlide.findMany()
     * 
     * // Get first 10 CarouselSlides
     * const carouselSlides = await prisma.carouselSlide.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carouselSlideWithIdOnly = await prisma.carouselSlide.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarouselSlideFindManyArgs>(args?: SelectSubset<T, CarouselSlideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CarouselSlide.
     * @param {CarouselSlideCreateArgs} args - Arguments to create a CarouselSlide.
     * @example
     * // Create one CarouselSlide
     * const CarouselSlide = await prisma.carouselSlide.create({
     *   data: {
     *     // ... data to create a CarouselSlide
     *   }
     * })
     * 
     */
    create<T extends CarouselSlideCreateArgs>(args: SelectSubset<T, CarouselSlideCreateArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CarouselSlides.
     * @param {CarouselSlideCreateManyArgs} args - Arguments to create many CarouselSlides.
     * @example
     * // Create many CarouselSlides
     * const carouselSlide = await prisma.carouselSlide.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarouselSlideCreateManyArgs>(args?: SelectSubset<T, CarouselSlideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CarouselSlides and returns the data saved in the database.
     * @param {CarouselSlideCreateManyAndReturnArgs} args - Arguments to create many CarouselSlides.
     * @example
     * // Create many CarouselSlides
     * const carouselSlide = await prisma.carouselSlide.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CarouselSlides and only return the `id`
     * const carouselSlideWithIdOnly = await prisma.carouselSlide.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarouselSlideCreateManyAndReturnArgs>(args?: SelectSubset<T, CarouselSlideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CarouselSlide.
     * @param {CarouselSlideDeleteArgs} args - Arguments to delete one CarouselSlide.
     * @example
     * // Delete one CarouselSlide
     * const CarouselSlide = await prisma.carouselSlide.delete({
     *   where: {
     *     // ... filter to delete one CarouselSlide
     *   }
     * })
     * 
     */
    delete<T extends CarouselSlideDeleteArgs>(args: SelectSubset<T, CarouselSlideDeleteArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CarouselSlide.
     * @param {CarouselSlideUpdateArgs} args - Arguments to update one CarouselSlide.
     * @example
     * // Update one CarouselSlide
     * const carouselSlide = await prisma.carouselSlide.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarouselSlideUpdateArgs>(args: SelectSubset<T, CarouselSlideUpdateArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CarouselSlides.
     * @param {CarouselSlideDeleteManyArgs} args - Arguments to filter CarouselSlides to delete.
     * @example
     * // Delete a few CarouselSlides
     * const { count } = await prisma.carouselSlide.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarouselSlideDeleteManyArgs>(args?: SelectSubset<T, CarouselSlideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarouselSlides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarouselSlideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CarouselSlides
     * const carouselSlide = await prisma.carouselSlide.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarouselSlideUpdateManyArgs>(args: SelectSubset<T, CarouselSlideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarouselSlides and returns the data updated in the database.
     * @param {CarouselSlideUpdateManyAndReturnArgs} args - Arguments to update many CarouselSlides.
     * @example
     * // Update many CarouselSlides
     * const carouselSlide = await prisma.carouselSlide.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CarouselSlides and only return the `id`
     * const carouselSlideWithIdOnly = await prisma.carouselSlide.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CarouselSlideUpdateManyAndReturnArgs>(args: SelectSubset<T, CarouselSlideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CarouselSlide.
     * @param {CarouselSlideUpsertArgs} args - Arguments to update or create a CarouselSlide.
     * @example
     * // Update or create a CarouselSlide
     * const carouselSlide = await prisma.carouselSlide.upsert({
     *   create: {
     *     // ... data to create a CarouselSlide
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CarouselSlide we want to update
     *   }
     * })
     */
    upsert<T extends CarouselSlideUpsertArgs>(args: SelectSubset<T, CarouselSlideUpsertArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CarouselSlides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarouselSlideCountArgs} args - Arguments to filter CarouselSlides to count.
     * @example
     * // Count the number of CarouselSlides
     * const count = await prisma.carouselSlide.count({
     *   where: {
     *     // ... the filter for the CarouselSlides we want to count
     *   }
     * })
    **/
    count<T extends CarouselSlideCountArgs>(
      args?: Subset<T, CarouselSlideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarouselSlideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CarouselSlide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarouselSlideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarouselSlideAggregateArgs>(args: Subset<T, CarouselSlideAggregateArgs>): Prisma.PrismaPromise<GetCarouselSlideAggregateType<T>>

    /**
     * Group by CarouselSlide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarouselSlideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarouselSlideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarouselSlideGroupByArgs['orderBy'] }
        : { orderBy?: CarouselSlideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarouselSlideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarouselSlideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CarouselSlide model
   */
  readonly fields: CarouselSlideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CarouselSlide.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarouselSlideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    image<T extends ImageUploadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageUploadDefaultArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CarouselSlide model
   */ 
  interface CarouselSlideFieldRefs {
    readonly id: FieldRef<"CarouselSlide", 'Int'>
    readonly imageId: FieldRef<"CarouselSlide", 'Int'>
    readonly duration: FieldRef<"CarouselSlide", 'Int'>
    readonly createdAt: FieldRef<"CarouselSlide", 'DateTime'>
    readonly updatedAt: FieldRef<"CarouselSlide", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CarouselSlide findUnique
   */
  export type CarouselSlideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * Filter, which CarouselSlide to fetch.
     */
    where: CarouselSlideWhereUniqueInput
  }

  /**
   * CarouselSlide findUniqueOrThrow
   */
  export type CarouselSlideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * Filter, which CarouselSlide to fetch.
     */
    where: CarouselSlideWhereUniqueInput
  }

  /**
   * CarouselSlide findFirst
   */
  export type CarouselSlideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * Filter, which CarouselSlide to fetch.
     */
    where?: CarouselSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarouselSlides to fetch.
     */
    orderBy?: CarouselSlideOrderByWithRelationInput | CarouselSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarouselSlides.
     */
    cursor?: CarouselSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarouselSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarouselSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarouselSlides.
     */
    distinct?: CarouselSlideScalarFieldEnum | CarouselSlideScalarFieldEnum[]
  }

  /**
   * CarouselSlide findFirstOrThrow
   */
  export type CarouselSlideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * Filter, which CarouselSlide to fetch.
     */
    where?: CarouselSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarouselSlides to fetch.
     */
    orderBy?: CarouselSlideOrderByWithRelationInput | CarouselSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarouselSlides.
     */
    cursor?: CarouselSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarouselSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarouselSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarouselSlides.
     */
    distinct?: CarouselSlideScalarFieldEnum | CarouselSlideScalarFieldEnum[]
  }

  /**
   * CarouselSlide findMany
   */
  export type CarouselSlideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * Filter, which CarouselSlides to fetch.
     */
    where?: CarouselSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarouselSlides to fetch.
     */
    orderBy?: CarouselSlideOrderByWithRelationInput | CarouselSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CarouselSlides.
     */
    cursor?: CarouselSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarouselSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarouselSlides.
     */
    skip?: number
    distinct?: CarouselSlideScalarFieldEnum | CarouselSlideScalarFieldEnum[]
  }

  /**
   * CarouselSlide create
   */
  export type CarouselSlideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * The data needed to create a CarouselSlide.
     */
    data: XOR<CarouselSlideCreateInput, CarouselSlideUncheckedCreateInput>
  }

  /**
   * CarouselSlide createMany
   */
  export type CarouselSlideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CarouselSlides.
     */
    data: CarouselSlideCreateManyInput | CarouselSlideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CarouselSlide createManyAndReturn
   */
  export type CarouselSlideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * The data used to create many CarouselSlides.
     */
    data: CarouselSlideCreateManyInput | CarouselSlideCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CarouselSlide update
   */
  export type CarouselSlideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * The data needed to update a CarouselSlide.
     */
    data: XOR<CarouselSlideUpdateInput, CarouselSlideUncheckedUpdateInput>
    /**
     * Choose, which CarouselSlide to update.
     */
    where: CarouselSlideWhereUniqueInput
  }

  /**
   * CarouselSlide updateMany
   */
  export type CarouselSlideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CarouselSlides.
     */
    data: XOR<CarouselSlideUpdateManyMutationInput, CarouselSlideUncheckedUpdateManyInput>
    /**
     * Filter which CarouselSlides to update
     */
    where?: CarouselSlideWhereInput
    /**
     * Limit how many CarouselSlides to update.
     */
    limit?: number
  }

  /**
   * CarouselSlide updateManyAndReturn
   */
  export type CarouselSlideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * The data used to update CarouselSlides.
     */
    data: XOR<CarouselSlideUpdateManyMutationInput, CarouselSlideUncheckedUpdateManyInput>
    /**
     * Filter which CarouselSlides to update
     */
    where?: CarouselSlideWhereInput
    /**
     * Limit how many CarouselSlides to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CarouselSlide upsert
   */
  export type CarouselSlideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * The filter to search for the CarouselSlide to update in case it exists.
     */
    where: CarouselSlideWhereUniqueInput
    /**
     * In case the CarouselSlide found by the `where` argument doesn't exist, create a new CarouselSlide with this data.
     */
    create: XOR<CarouselSlideCreateInput, CarouselSlideUncheckedCreateInput>
    /**
     * In case the CarouselSlide was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarouselSlideUpdateInput, CarouselSlideUncheckedUpdateInput>
  }

  /**
   * CarouselSlide delete
   */
  export type CarouselSlideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
    /**
     * Filter which CarouselSlide to delete.
     */
    where: CarouselSlideWhereUniqueInput
  }

  /**
   * CarouselSlide deleteMany
   */
  export type CarouselSlideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarouselSlides to delete
     */
    where?: CarouselSlideWhereInput
    /**
     * Limit how many CarouselSlides to delete.
     */
    limit?: number
  }

  /**
   * CarouselSlide without action
   */
  export type CarouselSlideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarouselSlide
     */
    select?: CarouselSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarouselSlide
     */
    omit?: CarouselSlideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarouselSlideInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    readableNumber: number | null
    customerId: number | null
    accountId: number | null
    quantity: number | null
    mainValuePerUnit: number | null
    othersValuePerUnit: number | null
    voucherAmount: number | null
    voucherMaxDiscount: number | null
    mainValue: number | null
    othersValue: number | null
    discount: number | null
    adminFee: number | null
    totalValue: number | null
    version: number | null
  }

  export type BookingSumAggregateOutputType = {
    readableNumber: bigint | null
    customerId: number | null
    accountId: number | null
    quantity: number | null
    mainValuePerUnit: number | null
    othersValuePerUnit: number | null
    voucherAmount: number | null
    voucherMaxDiscount: number | null
    mainValue: number | null
    othersValue: number | null
    discount: number | null
    adminFee: number | null
    totalValue: number | null
    version: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    readableNumber: bigint | null
    customerId: number | null
    accountId: number | null
    status: $Enums.BookingStatus | null
    duration: string | null
    quantity: number | null
    immediate: boolean | null
    startAt: Date | null
    endAt: Date | null
    expiredAt: Date | null
    mainValuePerUnit: number | null
    othersValuePerUnit: number | null
    voucherName: string | null
    voucherType: $Enums.Type | null
    voucherAmount: number | null
    voucherMaxDiscount: number | null
    mainValue: number | null
    othersValue: number | null
    discount: number | null
    adminFee: number | null
    totalValue: number | null
    createdAt: Date | null
    updatedAt: Date | null
    version: number | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    readableNumber: bigint | null
    customerId: number | null
    accountId: number | null
    status: $Enums.BookingStatus | null
    duration: string | null
    quantity: number | null
    immediate: boolean | null
    startAt: Date | null
    endAt: Date | null
    expiredAt: Date | null
    mainValuePerUnit: number | null
    othersValuePerUnit: number | null
    voucherName: string | null
    voucherType: $Enums.Type | null
    voucherAmount: number | null
    voucherMaxDiscount: number | null
    mainValue: number | null
    othersValue: number | null
    discount: number | null
    adminFee: number | null
    totalValue: number | null
    createdAt: Date | null
    updatedAt: Date | null
    version: number | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    readableNumber: number
    customerId: number
    accountId: number
    status: number
    duration: number
    quantity: number
    immediate: number
    startAt: number
    endAt: number
    expiredAt: number
    mainValuePerUnit: number
    othersValuePerUnit: number
    voucherName: number
    voucherType: number
    voucherAmount: number
    voucherMaxDiscount: number
    mainValue: number
    othersValue: number
    discount: number
    adminFee: number
    totalValue: number
    createdAt: number
    updatedAt: number
    version: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    readableNumber?: true
    customerId?: true
    accountId?: true
    quantity?: true
    mainValuePerUnit?: true
    othersValuePerUnit?: true
    voucherAmount?: true
    voucherMaxDiscount?: true
    mainValue?: true
    othersValue?: true
    discount?: true
    adminFee?: true
    totalValue?: true
    version?: true
  }

  export type BookingSumAggregateInputType = {
    readableNumber?: true
    customerId?: true
    accountId?: true
    quantity?: true
    mainValuePerUnit?: true
    othersValuePerUnit?: true
    voucherAmount?: true
    voucherMaxDiscount?: true
    mainValue?: true
    othersValue?: true
    discount?: true
    adminFee?: true
    totalValue?: true
    version?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    readableNumber?: true
    customerId?: true
    accountId?: true
    status?: true
    duration?: true
    quantity?: true
    immediate?: true
    startAt?: true
    endAt?: true
    expiredAt?: true
    mainValuePerUnit?: true
    othersValuePerUnit?: true
    voucherName?: true
    voucherType?: true
    voucherAmount?: true
    voucherMaxDiscount?: true
    mainValue?: true
    othersValue?: true
    discount?: true
    adminFee?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    version?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    readableNumber?: true
    customerId?: true
    accountId?: true
    status?: true
    duration?: true
    quantity?: true
    immediate?: true
    startAt?: true
    endAt?: true
    expiredAt?: true
    mainValuePerUnit?: true
    othersValuePerUnit?: true
    voucherName?: true
    voucherType?: true
    voucherAmount?: true
    voucherMaxDiscount?: true
    mainValue?: true
    othersValue?: true
    discount?: true
    adminFee?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    version?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    readableNumber?: true
    customerId?: true
    accountId?: true
    status?: true
    duration?: true
    quantity?: true
    immediate?: true
    startAt?: true
    endAt?: true
    expiredAt?: true
    mainValuePerUnit?: true
    othersValuePerUnit?: true
    voucherName?: true
    voucherType?: true
    voucherAmount?: true
    voucherMaxDiscount?: true
    mainValue?: true
    othersValue?: true
    discount?: true
    adminFee?: true
    totalValue?: true
    createdAt?: true
    updatedAt?: true
    version?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    readableNumber: bigint
    customerId: number | null
    accountId: number
    status: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt: Date | null
    endAt: Date | null
    expiredAt: Date | null
    mainValuePerUnit: number
    othersValuePerUnit: number | null
    voucherName: string | null
    voucherType: $Enums.Type | null
    voucherAmount: number | null
    voucherMaxDiscount: number | null
    mainValue: number
    othersValue: number | null
    discount: number | null
    adminFee: number | null
    totalValue: number
    createdAt: Date
    updatedAt: Date
    version: number
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readableNumber?: boolean
    customerId?: boolean
    accountId?: boolean
    status?: boolean
    duration?: boolean
    quantity?: boolean
    immediate?: boolean
    startAt?: boolean
    endAt?: boolean
    expiredAt?: boolean
    mainValuePerUnit?: boolean
    othersValuePerUnit?: boolean
    voucherName?: boolean
    voucherType?: boolean
    voucherAmount?: boolean
    voucherMaxDiscount?: boolean
    mainValue?: boolean
    othersValue?: boolean
    discount?: boolean
    adminFee?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    payments?: boolean | Booking$paymentsArgs<ExtArgs>
    customer?: boolean | Booking$customerArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readableNumber?: boolean
    customerId?: boolean
    accountId?: boolean
    status?: boolean
    duration?: boolean
    quantity?: boolean
    immediate?: boolean
    startAt?: boolean
    endAt?: boolean
    expiredAt?: boolean
    mainValuePerUnit?: boolean
    othersValuePerUnit?: boolean
    voucherName?: boolean
    voucherType?: boolean
    voucherAmount?: boolean
    voucherMaxDiscount?: boolean
    mainValue?: boolean
    othersValue?: boolean
    discount?: boolean
    adminFee?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    customer?: boolean | Booking$customerArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    readableNumber?: boolean
    customerId?: boolean
    accountId?: boolean
    status?: boolean
    duration?: boolean
    quantity?: boolean
    immediate?: boolean
    startAt?: boolean
    endAt?: boolean
    expiredAt?: boolean
    mainValuePerUnit?: boolean
    othersValuePerUnit?: boolean
    voucherName?: boolean
    voucherType?: boolean
    voucherAmount?: boolean
    voucherMaxDiscount?: boolean
    mainValue?: boolean
    othersValue?: boolean
    discount?: boolean
    adminFee?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    customer?: boolean | Booking$customerArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    readableNumber?: boolean
    customerId?: boolean
    accountId?: boolean
    status?: boolean
    duration?: boolean
    quantity?: boolean
    immediate?: boolean
    startAt?: boolean
    endAt?: boolean
    expiredAt?: boolean
    mainValuePerUnit?: boolean
    othersValuePerUnit?: boolean
    voucherName?: boolean
    voucherType?: boolean
    voucherAmount?: boolean
    voucherMaxDiscount?: boolean
    mainValue?: boolean
    othersValue?: boolean
    discount?: boolean
    adminFee?: boolean
    totalValue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "readableNumber" | "customerId" | "accountId" | "status" | "duration" | "quantity" | "immediate" | "startAt" | "endAt" | "expiredAt" | "mainValuePerUnit" | "othersValuePerUnit" | "voucherName" | "voucherType" | "voucherAmount" | "voucherMaxDiscount" | "mainValue" | "othersValue" | "discount" | "adminFee" | "totalValue" | "createdAt" | "updatedAt" | "version", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | Booking$paymentsArgs<ExtArgs>
    customer?: boolean | Booking$customerArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
    _count?: boolean | BookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Booking$customerArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }
  export type BookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Booking$customerArgs<ExtArgs>
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      account: Prisma.$AccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      readableNumber: bigint
      customerId: number | null
      accountId: number
      status: $Enums.BookingStatus
      duration: string
      quantity: number
      immediate: boolean
      startAt: Date | null
      endAt: Date | null
      expiredAt: Date | null
      mainValuePerUnit: number
      othersValuePerUnit: number | null
      voucherName: string | null
      voucherType: $Enums.Type | null
      voucherAmount: number | null
      voucherMaxDiscount: number | null
      mainValue: number
      othersValue: number | null
      discount: number | null
      adminFee: number | null
      totalValue: number
      createdAt: Date
      updatedAt: Date
      version: number
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payments<T extends Booking$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Booking$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    customer<T extends Booking$customerArgs<ExtArgs> = {}>(args?: Subset<T, Booking$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */ 
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly readableNumber: FieldRef<"Booking", 'BigInt'>
    readonly customerId: FieldRef<"Booking", 'Int'>
    readonly accountId: FieldRef<"Booking", 'Int'>
    readonly status: FieldRef<"Booking", 'BookingStatus'>
    readonly duration: FieldRef<"Booking", 'String'>
    readonly quantity: FieldRef<"Booking", 'Int'>
    readonly immediate: FieldRef<"Booking", 'Boolean'>
    readonly startAt: FieldRef<"Booking", 'DateTime'>
    readonly endAt: FieldRef<"Booking", 'DateTime'>
    readonly expiredAt: FieldRef<"Booking", 'DateTime'>
    readonly mainValuePerUnit: FieldRef<"Booking", 'Int'>
    readonly othersValuePerUnit: FieldRef<"Booking", 'Int'>
    readonly voucherName: FieldRef<"Booking", 'String'>
    readonly voucherType: FieldRef<"Booking", 'Type'>
    readonly voucherAmount: FieldRef<"Booking", 'Float'>
    readonly voucherMaxDiscount: FieldRef<"Booking", 'Float'>
    readonly mainValue: FieldRef<"Booking", 'Int'>
    readonly othersValue: FieldRef<"Booking", 'Int'>
    readonly discount: FieldRef<"Booking", 'Int'>
    readonly adminFee: FieldRef<"Booking", 'Int'>
    readonly totalValue: FieldRef<"Booking", 'Int'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
    readonly version: FieldRef<"Booking", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking updateManyAndReturn
   */
  export type BookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.payments
   */
  export type Booking$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Booking.customer
   */
  export type Booking$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    value: number | null
    refundedValue: number | null
  }

  export type PaymentSumAggregateOutputType = {
    value: number | null
    refundedValue: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    bookingId: string | null
    status: $Enums.PaymentStatus | null
    value: number | null
    currency: string | null
    provider: $Enums.Provider | null
    providerPaymentId: string | null
    paymentMethod: $Enums.PaymentMethodType | null
    qrUrl: string | null
    bankCode: string | null
    bankAccountNo: string | null
    bankAccountName: string | null
    paidAt: Date | null
    refundedValue: number | null
    refundedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    bookingId: string | null
    status: $Enums.PaymentStatus | null
    value: number | null
    currency: string | null
    provider: $Enums.Provider | null
    providerPaymentId: string | null
    paymentMethod: $Enums.PaymentMethodType | null
    qrUrl: string | null
    bankCode: string | null
    bankAccountNo: string | null
    bankAccountName: string | null
    paidAt: Date | null
    refundedValue: number | null
    refundedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    bookingId: number
    status: number
    value: number
    currency: number
    provider: number
    providerPaymentId: number
    paymentMethod: number
    qrUrl: number
    bankCode: number
    bankAccountNo: number
    bankAccountName: number
    paidAt: number
    refundedValue: number
    refundedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    value?: true
    refundedValue?: true
  }

  export type PaymentSumAggregateInputType = {
    value?: true
    refundedValue?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    bookingId?: true
    status?: true
    value?: true
    currency?: true
    provider?: true
    providerPaymentId?: true
    paymentMethod?: true
    qrUrl?: true
    bankCode?: true
    bankAccountNo?: true
    bankAccountName?: true
    paidAt?: true
    refundedValue?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    bookingId?: true
    status?: true
    value?: true
    currency?: true
    provider?: true
    providerPaymentId?: true
    paymentMethod?: true
    qrUrl?: true
    bankCode?: true
    bankAccountNo?: true
    bankAccountName?: true
    paidAt?: true
    refundedValue?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    bookingId?: true
    status?: true
    value?: true
    currency?: true
    provider?: true
    providerPaymentId?: true
    paymentMethod?: true
    qrUrl?: true
    bankCode?: true
    bankAccountNo?: true
    bankAccountName?: true
    paidAt?: true
    refundedValue?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    bookingId: string
    status: $Enums.PaymentStatus
    value: number
    currency: string
    provider: $Enums.Provider
    providerPaymentId: string | null
    paymentMethod: $Enums.PaymentMethodType | null
    qrUrl: string | null
    bankCode: string | null
    bankAccountNo: string | null
    bankAccountName: string | null
    paidAt: Date | null
    refundedValue: number
    refundedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    status?: boolean
    value?: boolean
    currency?: boolean
    provider?: boolean
    providerPaymentId?: boolean
    paymentMethod?: boolean
    qrUrl?: boolean
    bankCode?: boolean
    bankAccountNo?: boolean
    bankAccountName?: boolean
    paidAt?: boolean
    refundedValue?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | Payment$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    status?: boolean
    value?: boolean
    currency?: boolean
    provider?: boolean
    providerPaymentId?: boolean
    paymentMethod?: boolean
    qrUrl?: boolean
    bankCode?: boolean
    bankAccountNo?: boolean
    bankAccountName?: boolean
    paidAt?: boolean
    refundedValue?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | Payment$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingId?: boolean
    status?: boolean
    value?: boolean
    currency?: boolean
    provider?: boolean
    providerPaymentId?: boolean
    paymentMethod?: boolean
    qrUrl?: boolean
    bankCode?: boolean
    bankAccountNo?: boolean
    bankAccountName?: boolean
    paidAt?: boolean
    refundedValue?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    booking?: boolean | Payment$bookingArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    bookingId?: boolean
    status?: boolean
    value?: boolean
    currency?: boolean
    provider?: boolean
    providerPaymentId?: boolean
    paymentMethod?: boolean
    qrUrl?: boolean
    bankCode?: boolean
    bankAccountNo?: boolean
    bankAccountName?: boolean
    paidAt?: boolean
    refundedValue?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookingId" | "status" | "value" | "currency" | "provider" | "providerPaymentId" | "paymentMethod" | "qrUrl" | "bankCode" | "bankAccountNo" | "bankAccountName" | "paidAt" | "refundedValue" | "refundedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | Payment$bookingArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | Payment$bookingArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | Payment$bookingArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      booking: Prisma.$BookingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingId: string
      status: $Enums.PaymentStatus
      value: number
      currency: string
      provider: $Enums.Provider
      providerPaymentId: string | null
      paymentMethod: $Enums.PaymentMethodType | null
      qrUrl: string | null
      bankCode: string | null
      bankAccountNo: string | null
      bankAccountName: string | null
      paidAt: Date | null
      refundedValue: number
      refundedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends Payment$bookingArgs<ExtArgs> = {}>(args?: Subset<T, Payment$bookingArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly bookingId: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly value: FieldRef<"Payment", 'Int'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly provider: FieldRef<"Payment", 'Provider'>
    readonly providerPaymentId: FieldRef<"Payment", 'String'>
    readonly paymentMethod: FieldRef<"Payment", 'PaymentMethodType'>
    readonly qrUrl: FieldRef<"Payment", 'String'>
    readonly bankCode: FieldRef<"Payment", 'String'>
    readonly bankAccountNo: FieldRef<"Payment", 'String'>
    readonly bankAccountName: FieldRef<"Payment", 'String'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly refundedValue: FieldRef<"Payment", 'Int'>
    readonly refundedAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.booking
   */
  export type Payment$bookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Voucher
   */

  export type AggregateVoucher = {
    _count: VoucherCountAggregateOutputType | null
    _avg: VoucherAvgAggregateOutputType | null
    _sum: VoucherSumAggregateOutputType | null
    _min: VoucherMinAggregateOutputType | null
    _max: VoucherMaxAggregateOutputType | null
  }

  export type VoucherAvgAggregateOutputType = {
    id: number | null
    percentage: number | null
    nominal: number | null
    maxDiscount: number | null
  }

  export type VoucherSumAggregateOutputType = {
    id: number | null
    percentage: number | null
    nominal: number | null
    maxDiscount: number | null
  }

  export type VoucherMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    voucherName: string | null
    isValid: boolean | null
    isVisible: boolean | null
    type: $Enums.Type | null
    percentage: number | null
    nominal: number | null
    maxDiscount: number | null
    dateStart: Date | null
    dateEnd: Date | null
  }

  export type VoucherMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    voucherName: string | null
    isValid: boolean | null
    isVisible: boolean | null
    type: $Enums.Type | null
    percentage: number | null
    nominal: number | null
    maxDiscount: number | null
    dateStart: Date | null
    dateEnd: Date | null
  }

  export type VoucherCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    voucherName: number
    isValid: number
    isVisible: number
    type: number
    percentage: number
    nominal: number
    maxDiscount: number
    dateStart: number
    dateEnd: number
    _all: number
  }


  export type VoucherAvgAggregateInputType = {
    id?: true
    percentage?: true
    nominal?: true
    maxDiscount?: true
  }

  export type VoucherSumAggregateInputType = {
    id?: true
    percentage?: true
    nominal?: true
    maxDiscount?: true
  }

  export type VoucherMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    voucherName?: true
    isValid?: true
    isVisible?: true
    type?: true
    percentage?: true
    nominal?: true
    maxDiscount?: true
    dateStart?: true
    dateEnd?: true
  }

  export type VoucherMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    voucherName?: true
    isValid?: true
    isVisible?: true
    type?: true
    percentage?: true
    nominal?: true
    maxDiscount?: true
    dateStart?: true
    dateEnd?: true
  }

  export type VoucherCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    voucherName?: true
    isValid?: true
    isVisible?: true
    type?: true
    percentage?: true
    nominal?: true
    maxDiscount?: true
    dateStart?: true
    dateEnd?: true
    _all?: true
  }

  export type VoucherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Voucher to aggregate.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vouchers
    **/
    _count?: true | VoucherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoucherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoucherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoucherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoucherMaxAggregateInputType
  }

  export type GetVoucherAggregateType<T extends VoucherAggregateArgs> = {
        [P in keyof T & keyof AggregateVoucher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoucher[P]>
      : GetScalarType<T[P], AggregateVoucher[P]>
  }




  export type VoucherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherWhereInput
    orderBy?: VoucherOrderByWithAggregationInput | VoucherOrderByWithAggregationInput[]
    by: VoucherScalarFieldEnum[] | VoucherScalarFieldEnum
    having?: VoucherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoucherCountAggregateInputType | true
    _avg?: VoucherAvgAggregateInputType
    _sum?: VoucherSumAggregateInputType
    _min?: VoucherMinAggregateInputType
    _max?: VoucherMaxAggregateInputType
  }

  export type VoucherGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    voucherName: string
    isValid: boolean
    isVisible: boolean
    type: $Enums.Type
    percentage: number | null
    nominal: number | null
    maxDiscount: number | null
    dateStart: Date
    dateEnd: Date
    _count: VoucherCountAggregateOutputType | null
    _avg: VoucherAvgAggregateOutputType | null
    _sum: VoucherSumAggregateOutputType | null
    _min: VoucherMinAggregateOutputType | null
    _max: VoucherMaxAggregateOutputType | null
  }

  type GetVoucherGroupByPayload<T extends VoucherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoucherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoucherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoucherGroupByOutputType[P]>
            : GetScalarType<T[P], VoucherGroupByOutputType[P]>
        }
      >
    >


  export type VoucherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    voucherName?: boolean
    isValid?: boolean
    isVisible?: boolean
    type?: boolean
    percentage?: boolean
    nominal?: boolean
    maxDiscount?: boolean
    dateStart?: boolean
    dateEnd?: boolean
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    voucherName?: boolean
    isValid?: boolean
    isVisible?: boolean
    type?: boolean
    percentage?: boolean
    nominal?: boolean
    maxDiscount?: boolean
    dateStart?: boolean
    dateEnd?: boolean
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    voucherName?: boolean
    isValid?: boolean
    isVisible?: boolean
    type?: boolean
    percentage?: boolean
    nominal?: boolean
    maxDiscount?: boolean
    dateStart?: boolean
    dateEnd?: boolean
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    voucherName?: boolean
    isValid?: boolean
    isVisible?: boolean
    type?: boolean
    percentage?: boolean
    nominal?: boolean
    maxDiscount?: boolean
    dateStart?: boolean
    dateEnd?: boolean
  }

  export type VoucherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "voucherName" | "isValid" | "isVisible" | "type" | "percentage" | "nominal" | "maxDiscount" | "dateStart" | "dateEnd", ExtArgs["result"]["voucher"]>

  export type $VoucherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Voucher"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      voucherName: string
      isValid: boolean
      isVisible: boolean
      type: $Enums.Type
      percentage: number | null
      nominal: number | null
      maxDiscount: number | null
      dateStart: Date
      dateEnd: Date
    }, ExtArgs["result"]["voucher"]>
    composites: {}
  }

  type VoucherGetPayload<S extends boolean | null | undefined | VoucherDefaultArgs> = $Result.GetResult<Prisma.$VoucherPayload, S>

  type VoucherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoucherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoucherCountAggregateInputType | true
    }

  export interface VoucherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Voucher'], meta: { name: 'Voucher' } }
    /**
     * Find zero or one Voucher that matches the filter.
     * @param {VoucherFindUniqueArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoucherFindUniqueArgs>(args: SelectSubset<T, VoucherFindUniqueArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Voucher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoucherFindUniqueOrThrowArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoucherFindUniqueOrThrowArgs>(args: SelectSubset<T, VoucherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Voucher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindFirstArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoucherFindFirstArgs>(args?: SelectSubset<T, VoucherFindFirstArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Voucher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindFirstOrThrowArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoucherFindFirstOrThrowArgs>(args?: SelectSubset<T, VoucherFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Vouchers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vouchers
     * const vouchers = await prisma.voucher.findMany()
     * 
     * // Get first 10 Vouchers
     * const vouchers = await prisma.voucher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voucherWithIdOnly = await prisma.voucher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoucherFindManyArgs>(args?: SelectSubset<T, VoucherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Voucher.
     * @param {VoucherCreateArgs} args - Arguments to create a Voucher.
     * @example
     * // Create one Voucher
     * const Voucher = await prisma.voucher.create({
     *   data: {
     *     // ... data to create a Voucher
     *   }
     * })
     * 
     */
    create<T extends VoucherCreateArgs>(args: SelectSubset<T, VoucherCreateArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Vouchers.
     * @param {VoucherCreateManyArgs} args - Arguments to create many Vouchers.
     * @example
     * // Create many Vouchers
     * const voucher = await prisma.voucher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoucherCreateManyArgs>(args?: SelectSubset<T, VoucherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vouchers and returns the data saved in the database.
     * @param {VoucherCreateManyAndReturnArgs} args - Arguments to create many Vouchers.
     * @example
     * // Create many Vouchers
     * const voucher = await prisma.voucher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vouchers and only return the `id`
     * const voucherWithIdOnly = await prisma.voucher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoucherCreateManyAndReturnArgs>(args?: SelectSubset<T, VoucherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Voucher.
     * @param {VoucherDeleteArgs} args - Arguments to delete one Voucher.
     * @example
     * // Delete one Voucher
     * const Voucher = await prisma.voucher.delete({
     *   where: {
     *     // ... filter to delete one Voucher
     *   }
     * })
     * 
     */
    delete<T extends VoucherDeleteArgs>(args: SelectSubset<T, VoucherDeleteArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Voucher.
     * @param {VoucherUpdateArgs} args - Arguments to update one Voucher.
     * @example
     * // Update one Voucher
     * const voucher = await prisma.voucher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoucherUpdateArgs>(args: SelectSubset<T, VoucherUpdateArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Vouchers.
     * @param {VoucherDeleteManyArgs} args - Arguments to filter Vouchers to delete.
     * @example
     * // Delete a few Vouchers
     * const { count } = await prisma.voucher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoucherDeleteManyArgs>(args?: SelectSubset<T, VoucherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vouchers
     * const voucher = await prisma.voucher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoucherUpdateManyArgs>(args: SelectSubset<T, VoucherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vouchers and returns the data updated in the database.
     * @param {VoucherUpdateManyAndReturnArgs} args - Arguments to update many Vouchers.
     * @example
     * // Update many Vouchers
     * const voucher = await prisma.voucher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vouchers and only return the `id`
     * const voucherWithIdOnly = await prisma.voucher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoucherUpdateManyAndReturnArgs>(args: SelectSubset<T, VoucherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Voucher.
     * @param {VoucherUpsertArgs} args - Arguments to update or create a Voucher.
     * @example
     * // Update or create a Voucher
     * const voucher = await prisma.voucher.upsert({
     *   create: {
     *     // ... data to create a Voucher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Voucher we want to update
     *   }
     * })
     */
    upsert<T extends VoucherUpsertArgs>(args: SelectSubset<T, VoucherUpsertArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Vouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherCountArgs} args - Arguments to filter Vouchers to count.
     * @example
     * // Count the number of Vouchers
     * const count = await prisma.voucher.count({
     *   where: {
     *     // ... the filter for the Vouchers we want to count
     *   }
     * })
    **/
    count<T extends VoucherCountArgs>(
      args?: Subset<T, VoucherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoucherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Voucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoucherAggregateArgs>(args: Subset<T, VoucherAggregateArgs>): Prisma.PrismaPromise<GetVoucherAggregateType<T>>

    /**
     * Group by Voucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoucherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoucherGroupByArgs['orderBy'] }
        : { orderBy?: VoucherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoucherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoucherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Voucher model
   */
  readonly fields: VoucherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Voucher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoucherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Voucher model
   */ 
  interface VoucherFieldRefs {
    readonly id: FieldRef<"Voucher", 'Int'>
    readonly createdAt: FieldRef<"Voucher", 'DateTime'>
    readonly updatedAt: FieldRef<"Voucher", 'DateTime'>
    readonly voucherName: FieldRef<"Voucher", 'String'>
    readonly isValid: FieldRef<"Voucher", 'Boolean'>
    readonly isVisible: FieldRef<"Voucher", 'Boolean'>
    readonly type: FieldRef<"Voucher", 'Type'>
    readonly percentage: FieldRef<"Voucher", 'Float'>
    readonly nominal: FieldRef<"Voucher", 'Float'>
    readonly maxDiscount: FieldRef<"Voucher", 'Float'>
    readonly dateStart: FieldRef<"Voucher", 'DateTime'>
    readonly dateEnd: FieldRef<"Voucher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Voucher findUnique
   */
  export type VoucherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher findUniqueOrThrow
   */
  export type VoucherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher findFirst
   */
  export type VoucherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vouchers.
     */
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher findFirstOrThrow
   */
  export type VoucherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vouchers.
     */
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher findMany
   */
  export type VoucherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Filter, which Vouchers to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher create
   */
  export type VoucherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * The data needed to create a Voucher.
     */
    data: XOR<VoucherCreateInput, VoucherUncheckedCreateInput>
  }

  /**
   * Voucher createMany
   */
  export type VoucherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vouchers.
     */
    data: VoucherCreateManyInput | VoucherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Voucher createManyAndReturn
   */
  export type VoucherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * The data used to create many Vouchers.
     */
    data: VoucherCreateManyInput | VoucherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Voucher update
   */
  export type VoucherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * The data needed to update a Voucher.
     */
    data: XOR<VoucherUpdateInput, VoucherUncheckedUpdateInput>
    /**
     * Choose, which Voucher to update.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher updateMany
   */
  export type VoucherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vouchers.
     */
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyInput>
    /**
     * Filter which Vouchers to update
     */
    where?: VoucherWhereInput
    /**
     * Limit how many Vouchers to update.
     */
    limit?: number
  }

  /**
   * Voucher updateManyAndReturn
   */
  export type VoucherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * The data used to update Vouchers.
     */
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyInput>
    /**
     * Filter which Vouchers to update
     */
    where?: VoucherWhereInput
    /**
     * Limit how many Vouchers to update.
     */
    limit?: number
  }

  /**
   * Voucher upsert
   */
  export type VoucherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * The filter to search for the Voucher to update in case it exists.
     */
    where: VoucherWhereUniqueInput
    /**
     * In case the Voucher found by the `where` argument doesn't exist, create a new Voucher with this data.
     */
    create: XOR<VoucherCreateInput, VoucherUncheckedCreateInput>
    /**
     * In case the Voucher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoucherUpdateInput, VoucherUncheckedUpdateInput>
  }

  /**
   * Voucher delete
   */
  export type VoucherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Filter which Voucher to delete.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher deleteMany
   */
  export type VoucherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vouchers to delete
     */
    where?: VoucherWhereInput
    /**
     * Limit how many Vouchers to delete.
     */
    limit?: number
  }

  /**
   * Voucher without action
   */
  export type VoucherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
  }


  /**
   * Model GlobalSettings
   */

  export type AggregateGlobalSettings = {
    _count: GlobalSettingsCountAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  export type GlobalSettingsMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type GlobalSettingsMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type GlobalSettingsCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type GlobalSettingsMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type GlobalSettingsMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type GlobalSettingsCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type GlobalSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to aggregate.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalSettings
    **/
    _count?: true | GlobalSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GetGlobalSettingsAggregateType<T extends GlobalSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalSettings[P]>
      : GetScalarType<T[P], AggregateGlobalSettings[P]>
  }




  export type GlobalSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalSettingsWhereInput
    orderBy?: GlobalSettingsOrderByWithAggregationInput | GlobalSettingsOrderByWithAggregationInput[]
    by: GlobalSettingsScalarFieldEnum[] | GlobalSettingsScalarFieldEnum
    having?: GlobalSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalSettingsCountAggregateInputType | true
    _min?: GlobalSettingsMinAggregateInputType
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GlobalSettingsGroupByOutputType = {
    key: string
    value: string
    _count: GlobalSettingsCountAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  type GetGlobalSettingsGroupByPayload<T extends GlobalSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GlobalSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectScalar = {
    key?: boolean
    value?: boolean
  }

  export type GlobalSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value", ExtArgs["result"]["globalSettings"]>

  export type $GlobalSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
    }, ExtArgs["result"]["globalSettings"]>
    composites: {}
  }

  type GlobalSettingsGetPayload<S extends boolean | null | undefined | GlobalSettingsDefaultArgs> = $Result.GetResult<Prisma.$GlobalSettingsPayload, S>

  type GlobalSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GlobalSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GlobalSettingsCountAggregateInputType | true
    }

  export interface GlobalSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalSettings'], meta: { name: 'GlobalSettings' } }
    /**
     * Find zero or one GlobalSettings that matches the filter.
     * @param {GlobalSettingsFindUniqueArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalSettingsFindUniqueArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GlobalSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GlobalSettingsFindUniqueOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalSettingsFindFirstArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GlobalSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany()
     * 
     * // Get first 10 GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const globalSettingsWithKeyOnly = await prisma.globalSettings.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends GlobalSettingsFindManyArgs>(args?: SelectSubset<T, GlobalSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GlobalSettings.
     * @param {GlobalSettingsCreateArgs} args - Arguments to create a GlobalSettings.
     * @example
     * // Create one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.create({
     *   data: {
     *     // ... data to create a GlobalSettings
     *   }
     * })
     * 
     */
    create<T extends GlobalSettingsCreateArgs>(args: SelectSubset<T, GlobalSettingsCreateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GlobalSettings.
     * @param {GlobalSettingsCreateManyArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalSettingsCreateManyArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GlobalSettings and returns the data saved in the database.
     * @param {GlobalSettingsCreateManyAndReturnArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GlobalSettings and only return the `key`
     * const globalSettingsWithKeyOnly = await prisma.globalSettings.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GlobalSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GlobalSettings.
     * @param {GlobalSettingsDeleteArgs} args - Arguments to delete one GlobalSettings.
     * @example
     * // Delete one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.delete({
     *   where: {
     *     // ... filter to delete one GlobalSettings
     *   }
     * })
     * 
     */
    delete<T extends GlobalSettingsDeleteArgs>(args: SelectSubset<T, GlobalSettingsDeleteArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GlobalSettings.
     * @param {GlobalSettingsUpdateArgs} args - Arguments to update one GlobalSettings.
     * @example
     * // Update one GlobalSettings
     * const globalSettings = await prisma.globalSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalSettingsUpdateArgs>(args: SelectSubset<T, GlobalSettingsUpdateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GlobalSettings.
     * @param {GlobalSettingsDeleteManyArgs} args - Arguments to filter GlobalSettings to delete.
     * @example
     * // Delete a few GlobalSettings
     * const { count } = await prisma.globalSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalSettingsDeleteManyArgs>(args?: SelectSubset<T, GlobalSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalSettingsUpdateManyArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings and returns the data updated in the database.
     * @param {GlobalSettingsUpdateManyAndReturnArgs} args - Arguments to update many GlobalSettings.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GlobalSettings and only return the `key`
     * const globalSettingsWithKeyOnly = await prisma.globalSettings.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GlobalSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GlobalSettings.
     * @param {GlobalSettingsUpsertArgs} args - Arguments to update or create a GlobalSettings.
     * @example
     * // Update or create a GlobalSettings
     * const globalSettings = await prisma.globalSettings.upsert({
     *   create: {
     *     // ... data to create a GlobalSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalSettings we want to update
     *   }
     * })
     */
    upsert<T extends GlobalSettingsUpsertArgs>(args: SelectSubset<T, GlobalSettingsUpsertArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsCountArgs} args - Arguments to filter GlobalSettings to count.
     * @example
     * // Count the number of GlobalSettings
     * const count = await prisma.globalSettings.count({
     *   where: {
     *     // ... the filter for the GlobalSettings we want to count
     *   }
     * })
    **/
    count<T extends GlobalSettingsCountArgs>(
      args?: Subset<T, GlobalSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalSettingsAggregateArgs>(args: Subset<T, GlobalSettingsAggregateArgs>): Prisma.PrismaPromise<GetGlobalSettingsAggregateType<T>>

    /**
     * Group by GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GlobalSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalSettings model
   */
  readonly fields: GlobalSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalSettings model
   */ 
  interface GlobalSettingsFieldRefs {
    readonly key: FieldRef<"GlobalSettings", 'String'>
    readonly value: FieldRef<"GlobalSettings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GlobalSettings findUnique
   */
  export type GlobalSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findUniqueOrThrow
   */
  export type GlobalSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findFirst
   */
  export type GlobalSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findFirstOrThrow
   */
  export type GlobalSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findMany
   */
  export type GlobalSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings create
   */
  export type GlobalSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a GlobalSettings.
     */
    data: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
  }

  /**
   * GlobalSettings createMany
   */
  export type GlobalSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings createManyAndReturn
   */
  export type GlobalSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalSettings update
   */
  export type GlobalSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
    /**
     * Choose, which GlobalSettings to update.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings updateMany
   */
  export type GlobalSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings updateManyAndReturn
   */
  export type GlobalSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings upsert
   */
  export type GlobalSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the GlobalSettings to update in case it exists.
     */
    where: GlobalSettingsWhereUniqueInput
    /**
     * In case the GlobalSettings found by the `where` argument doesn't exist, create a new GlobalSettings with this data.
     */
    create: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
    /**
     * In case the GlobalSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
  }

  /**
   * GlobalSettings delete
   */
  export type GlobalSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter which GlobalSettings to delete.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings deleteMany
   */
  export type GlobalSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to delete
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to delete.
     */
    limit?: number
  }

  /**
   * GlobalSettings without action
   */
  export type GlobalSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    username: 'username',
    nickname: 'nickname',
    accountCode: 'accountCode',
    description: 'description',
    accountRank: 'accountRank',
    availabilityStatus: 'availabilityStatus',
    currentBookingDate: 'currentBookingDate',
    currentBookingDuration: 'currentBookingDuration',
    currentExpireAt: 'currentExpireAt',
    nextBookingDate: 'nextBookingDate',
    nextBookingDuration: 'nextBookingDuration',
    nextExpireAt: 'nextExpireAt',
    totalRentHour: 'totalRentHour',
    rentHourUpdated: 'rentHourUpdated',
    password: 'password',
    passwordResetRequired: 'passwordResetRequired',
    skinCount: 'skinCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isLowRank: 'isLowRank',
    isRecommended: 'isRecommended',
    priceTierId: 'priceTierId',
    thumbnailId: 'thumbnailId'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const AccountResetLogScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    previousExpireAt: 'previousExpireAt',
    resetAt: 'resetAt'
  };

  export type AccountResetLogScalarFieldEnum = (typeof AccountResetLogScalarFieldEnum)[keyof typeof AccountResetLogScalarFieldEnum]


  export const PriceTierScalarFieldEnum: {
    id: 'id',
    code: 'code',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PriceTierScalarFieldEnum = (typeof PriceTierScalarFieldEnum)[keyof typeof PriceTierScalarFieldEnum]


  export const PriceListScalarFieldEnum: {
    id: 'id',
    duration: 'duration',
    normalPrice: 'normalPrice',
    lowPrice: 'lowPrice',
    tierId: 'tierId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PriceListScalarFieldEnum = (typeof PriceListScalarFieldEnum)[keyof typeof PriceListScalarFieldEnum]


  export const SkinScalarFieldEnum: {
    id: 'id',
    name: 'name',
    imageUrl: 'imageUrl',
    keyword: 'keyword'
  };

  export type SkinScalarFieldEnum = (typeof SkinScalarFieldEnum)[keyof typeof SkinScalarFieldEnum]


  export const ImageUploadScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    accountId: 'accountId'
  };

  export type ImageUploadScalarFieldEnum = (typeof ImageUploadScalarFieldEnum)[keyof typeof ImageUploadScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    passwordChangedAt: 'passwordChangedAt',
    isActive: 'isActive',
    passwordExpireAt: 'passwordExpireAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const CarouselSlideScalarFieldEnum: {
    id: 'id',
    imageId: 'imageId',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CarouselSlideScalarFieldEnum = (typeof CarouselSlideScalarFieldEnum)[keyof typeof CarouselSlideScalarFieldEnum]


  export const BookingScalarFieldEnum: {
    id: 'id',
    readableNumber: 'readableNumber',
    customerId: 'customerId',
    accountId: 'accountId',
    status: 'status',
    duration: 'duration',
    quantity: 'quantity',
    immediate: 'immediate',
    startAt: 'startAt',
    endAt: 'endAt',
    expiredAt: 'expiredAt',
    mainValuePerUnit: 'mainValuePerUnit',
    othersValuePerUnit: 'othersValuePerUnit',
    voucherName: 'voucherName',
    voucherType: 'voucherType',
    voucherAmount: 'voucherAmount',
    voucherMaxDiscount: 'voucherMaxDiscount',
    mainValue: 'mainValue',
    othersValue: 'othersValue',
    discount: 'discount',
    adminFee: 'adminFee',
    totalValue: 'totalValue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    version: 'version'
  };

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    bookingId: 'bookingId',
    status: 'status',
    value: 'value',
    currency: 'currency',
    provider: 'provider',
    providerPaymentId: 'providerPaymentId',
    paymentMethod: 'paymentMethod',
    qrUrl: 'qrUrl',
    bankCode: 'bankCode',
    bankAccountNo: 'bankAccountNo',
    bankAccountName: 'bankAccountName',
    paidAt: 'paidAt',
    refundedValue: 'refundedValue',
    refundedAt: 'refundedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const VoucherScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    voucherName: 'voucherName',
    isValid: 'isValid',
    isVisible: 'isVisible',
    type: 'type',
    percentage: 'percentage',
    nominal: 'nominal',
    maxDiscount: 'maxDiscount',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd'
  };

  export type VoucherScalarFieldEnum = (typeof VoucherScalarFieldEnum)[keyof typeof VoucherScalarFieldEnum]


  export const GlobalSettingsScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type GlobalSettingsScalarFieldEnum = (typeof GlobalSettingsScalarFieldEnum)[keyof typeof GlobalSettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'MediaType[]'
   */
  export type ListEnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'Type'
   */
  export type EnumTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Type'>
    


  /**
   * Reference to a field of type 'Type[]'
   */
  export type ListEnumTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Type[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'Provider'
   */
  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  /**
   * Reference to a field of type 'Provider[]'
   */
  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    


  /**
   * Reference to a field of type 'PaymentMethodType'
   */
  export type EnumPaymentMethodTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethodType'>
    


  /**
   * Reference to a field of type 'PaymentMethodType[]'
   */
  export type ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethodType[]'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: IntFilter<"Account"> | number
    username?: StringFilter<"Account"> | string
    nickname?: StringFilter<"Account"> | string
    accountCode?: StringFilter<"Account"> | string
    description?: StringNullableFilter<"Account"> | string | null
    accountRank?: StringFilter<"Account"> | string
    availabilityStatus?: EnumStatusFilter<"Account"> | $Enums.Status
    currentBookingDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    currentBookingDuration?: IntNullableFilter<"Account"> | number | null
    currentExpireAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextBookingDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextBookingDuration?: IntNullableFilter<"Account"> | number | null
    nextExpireAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    totalRentHour?: IntFilter<"Account"> | number
    rentHourUpdated?: BoolFilter<"Account"> | boolean
    password?: StringFilter<"Account"> | string
    passwordResetRequired?: BoolFilter<"Account"> | boolean
    skinCount?: IntFilter<"Account"> | number
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    isLowRank?: BoolFilter<"Account"> | boolean
    isRecommended?: BoolFilter<"Account"> | boolean
    priceTierId?: IntFilter<"Account"> | number
    thumbnailId?: IntNullableFilter<"Account"> | number | null
    skinList?: SkinListRelationFilter
    priceTier?: XOR<PriceTierScalarRelationFilter, PriceTierWhereInput>
    thumbnail?: XOR<ImageUploadNullableScalarRelationFilter, ImageUploadWhereInput> | null
    otherImages?: ImageUploadListRelationFilter
    resetLogs?: AccountResetLogListRelationFilter
    Booking?: BookingListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    nickname?: SortOrder
    accountCode?: SortOrder
    description?: SortOrderInput | SortOrder
    accountRank?: SortOrder
    availabilityStatus?: SortOrder
    currentBookingDate?: SortOrderInput | SortOrder
    currentBookingDuration?: SortOrderInput | SortOrder
    currentExpireAt?: SortOrderInput | SortOrder
    nextBookingDate?: SortOrderInput | SortOrder
    nextBookingDuration?: SortOrderInput | SortOrder
    nextExpireAt?: SortOrderInput | SortOrder
    totalRentHour?: SortOrder
    rentHourUpdated?: SortOrder
    password?: SortOrder
    passwordResetRequired?: SortOrder
    skinCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isLowRank?: SortOrder
    isRecommended?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrderInput | SortOrder
    skinList?: SkinOrderByRelationAggregateInput
    priceTier?: PriceTierOrderByWithRelationInput
    thumbnail?: ImageUploadOrderByWithRelationInput
    otherImages?: ImageUploadOrderByRelationAggregateInput
    resetLogs?: AccountResetLogOrderByRelationAggregateInput
    Booking?: BookingOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    accountCode?: string
    thumbnailId?: number
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    username?: StringFilter<"Account"> | string
    nickname?: StringFilter<"Account"> | string
    description?: StringNullableFilter<"Account"> | string | null
    accountRank?: StringFilter<"Account"> | string
    availabilityStatus?: EnumStatusFilter<"Account"> | $Enums.Status
    currentBookingDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    currentBookingDuration?: IntNullableFilter<"Account"> | number | null
    currentExpireAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextBookingDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextBookingDuration?: IntNullableFilter<"Account"> | number | null
    nextExpireAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    totalRentHour?: IntFilter<"Account"> | number
    rentHourUpdated?: BoolFilter<"Account"> | boolean
    password?: StringFilter<"Account"> | string
    passwordResetRequired?: BoolFilter<"Account"> | boolean
    skinCount?: IntFilter<"Account"> | number
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    isLowRank?: BoolFilter<"Account"> | boolean
    isRecommended?: BoolFilter<"Account"> | boolean
    priceTierId?: IntFilter<"Account"> | number
    skinList?: SkinListRelationFilter
    priceTier?: XOR<PriceTierScalarRelationFilter, PriceTierWhereInput>
    thumbnail?: XOR<ImageUploadNullableScalarRelationFilter, ImageUploadWhereInput> | null
    otherImages?: ImageUploadListRelationFilter
    resetLogs?: AccountResetLogListRelationFilter
    Booking?: BookingListRelationFilter
  }, "id" | "accountCode" | "thumbnailId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    nickname?: SortOrder
    accountCode?: SortOrder
    description?: SortOrderInput | SortOrder
    accountRank?: SortOrder
    availabilityStatus?: SortOrder
    currentBookingDate?: SortOrderInput | SortOrder
    currentBookingDuration?: SortOrderInput | SortOrder
    currentExpireAt?: SortOrderInput | SortOrder
    nextBookingDate?: SortOrderInput | SortOrder
    nextBookingDuration?: SortOrderInput | SortOrder
    nextExpireAt?: SortOrderInput | SortOrder
    totalRentHour?: SortOrder
    rentHourUpdated?: SortOrder
    password?: SortOrder
    passwordResetRequired?: SortOrder
    skinCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isLowRank?: SortOrder
    isRecommended?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Account"> | number
    username?: StringWithAggregatesFilter<"Account"> | string
    nickname?: StringWithAggregatesFilter<"Account"> | string
    accountCode?: StringWithAggregatesFilter<"Account"> | string
    description?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accountRank?: StringWithAggregatesFilter<"Account"> | string
    availabilityStatus?: EnumStatusWithAggregatesFilter<"Account"> | $Enums.Status
    currentBookingDate?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    currentBookingDuration?: IntNullableWithAggregatesFilter<"Account"> | number | null
    currentExpireAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    nextBookingDate?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    nextBookingDuration?: IntNullableWithAggregatesFilter<"Account"> | number | null
    nextExpireAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    totalRentHour?: IntWithAggregatesFilter<"Account"> | number
    rentHourUpdated?: BoolWithAggregatesFilter<"Account"> | boolean
    password?: StringWithAggregatesFilter<"Account"> | string
    passwordResetRequired?: BoolWithAggregatesFilter<"Account"> | boolean
    skinCount?: IntWithAggregatesFilter<"Account"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    isLowRank?: BoolWithAggregatesFilter<"Account"> | boolean
    isRecommended?: BoolWithAggregatesFilter<"Account"> | boolean
    priceTierId?: IntWithAggregatesFilter<"Account"> | number
    thumbnailId?: IntNullableWithAggregatesFilter<"Account"> | number | null
  }

  export type AccountResetLogWhereInput = {
    AND?: AccountResetLogWhereInput | AccountResetLogWhereInput[]
    OR?: AccountResetLogWhereInput[]
    NOT?: AccountResetLogWhereInput | AccountResetLogWhereInput[]
    id?: IntFilter<"AccountResetLog"> | number
    accountId?: IntFilter<"AccountResetLog"> | number
    previousExpireAt?: DateTimeNullableFilter<"AccountResetLog"> | Date | string | null
    resetAt?: DateTimeFilter<"AccountResetLog"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }

  export type AccountResetLogOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    previousExpireAt?: SortOrderInput | SortOrder
    resetAt?: SortOrder
    account?: AccountOrderByWithRelationInput
  }

  export type AccountResetLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AccountResetLogWhereInput | AccountResetLogWhereInput[]
    OR?: AccountResetLogWhereInput[]
    NOT?: AccountResetLogWhereInput | AccountResetLogWhereInput[]
    accountId?: IntFilter<"AccountResetLog"> | number
    previousExpireAt?: DateTimeNullableFilter<"AccountResetLog"> | Date | string | null
    resetAt?: DateTimeFilter<"AccountResetLog"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }, "id">

  export type AccountResetLogOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    previousExpireAt?: SortOrderInput | SortOrder
    resetAt?: SortOrder
    _count?: AccountResetLogCountOrderByAggregateInput
    _avg?: AccountResetLogAvgOrderByAggregateInput
    _max?: AccountResetLogMaxOrderByAggregateInput
    _min?: AccountResetLogMinOrderByAggregateInput
    _sum?: AccountResetLogSumOrderByAggregateInput
  }

  export type AccountResetLogScalarWhereWithAggregatesInput = {
    AND?: AccountResetLogScalarWhereWithAggregatesInput | AccountResetLogScalarWhereWithAggregatesInput[]
    OR?: AccountResetLogScalarWhereWithAggregatesInput[]
    NOT?: AccountResetLogScalarWhereWithAggregatesInput | AccountResetLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AccountResetLog"> | number
    accountId?: IntWithAggregatesFilter<"AccountResetLog"> | number
    previousExpireAt?: DateTimeNullableWithAggregatesFilter<"AccountResetLog"> | Date | string | null
    resetAt?: DateTimeWithAggregatesFilter<"AccountResetLog"> | Date | string
  }

  export type PriceTierWhereInput = {
    AND?: PriceTierWhereInput | PriceTierWhereInput[]
    OR?: PriceTierWhereInput[]
    NOT?: PriceTierWhereInput | PriceTierWhereInput[]
    id?: IntFilter<"PriceTier"> | number
    code?: StringFilter<"PriceTier"> | string
    createdAt?: DateTimeFilter<"PriceTier"> | Date | string
    updatedAt?: DateTimeFilter<"PriceTier"> | Date | string
    accounts?: AccountListRelationFilter
    priceList?: PriceListListRelationFilter
  }

  export type PriceTierOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    priceList?: PriceListOrderByRelationAggregateInput
  }

  export type PriceTierWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: PriceTierWhereInput | PriceTierWhereInput[]
    OR?: PriceTierWhereInput[]
    NOT?: PriceTierWhereInput | PriceTierWhereInput[]
    createdAt?: DateTimeFilter<"PriceTier"> | Date | string
    updatedAt?: DateTimeFilter<"PriceTier"> | Date | string
    accounts?: AccountListRelationFilter
    priceList?: PriceListListRelationFilter
  }, "id" | "code">

  export type PriceTierOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PriceTierCountOrderByAggregateInput
    _avg?: PriceTierAvgOrderByAggregateInput
    _max?: PriceTierMaxOrderByAggregateInput
    _min?: PriceTierMinOrderByAggregateInput
    _sum?: PriceTierSumOrderByAggregateInput
  }

  export type PriceTierScalarWhereWithAggregatesInput = {
    AND?: PriceTierScalarWhereWithAggregatesInput | PriceTierScalarWhereWithAggregatesInput[]
    OR?: PriceTierScalarWhereWithAggregatesInput[]
    NOT?: PriceTierScalarWhereWithAggregatesInput | PriceTierScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PriceTier"> | number
    code?: StringWithAggregatesFilter<"PriceTier"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PriceTier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PriceTier"> | Date | string
  }

  export type PriceListWhereInput = {
    AND?: PriceListWhereInput | PriceListWhereInput[]
    OR?: PriceListWhereInput[]
    NOT?: PriceListWhereInput | PriceListWhereInput[]
    id?: IntFilter<"PriceList"> | number
    duration?: StringFilter<"PriceList"> | string
    normalPrice?: IntFilter<"PriceList"> | number
    lowPrice?: IntFilter<"PriceList"> | number
    tierId?: IntFilter<"PriceList"> | number
    createdAt?: DateTimeFilter<"PriceList"> | Date | string
    updatedAt?: DateTimeFilter<"PriceList"> | Date | string
    tier?: XOR<PriceTierScalarRelationFilter, PriceTierWhereInput>
  }

  export type PriceListOrderByWithRelationInput = {
    id?: SortOrder
    duration?: SortOrder
    normalPrice?: SortOrder
    lowPrice?: SortOrder
    tierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tier?: PriceTierOrderByWithRelationInput
  }

  export type PriceListWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PriceListWhereInput | PriceListWhereInput[]
    OR?: PriceListWhereInput[]
    NOT?: PriceListWhereInput | PriceListWhereInput[]
    duration?: StringFilter<"PriceList"> | string
    normalPrice?: IntFilter<"PriceList"> | number
    lowPrice?: IntFilter<"PriceList"> | number
    tierId?: IntFilter<"PriceList"> | number
    createdAt?: DateTimeFilter<"PriceList"> | Date | string
    updatedAt?: DateTimeFilter<"PriceList"> | Date | string
    tier?: XOR<PriceTierScalarRelationFilter, PriceTierWhereInput>
  }, "id">

  export type PriceListOrderByWithAggregationInput = {
    id?: SortOrder
    duration?: SortOrder
    normalPrice?: SortOrder
    lowPrice?: SortOrder
    tierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PriceListCountOrderByAggregateInput
    _avg?: PriceListAvgOrderByAggregateInput
    _max?: PriceListMaxOrderByAggregateInput
    _min?: PriceListMinOrderByAggregateInput
    _sum?: PriceListSumOrderByAggregateInput
  }

  export type PriceListScalarWhereWithAggregatesInput = {
    AND?: PriceListScalarWhereWithAggregatesInput | PriceListScalarWhereWithAggregatesInput[]
    OR?: PriceListScalarWhereWithAggregatesInput[]
    NOT?: PriceListScalarWhereWithAggregatesInput | PriceListScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PriceList"> | number
    duration?: StringWithAggregatesFilter<"PriceList"> | string
    normalPrice?: IntWithAggregatesFilter<"PriceList"> | number
    lowPrice?: IntWithAggregatesFilter<"PriceList"> | number
    tierId?: IntWithAggregatesFilter<"PriceList"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PriceList"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PriceList"> | Date | string
  }

  export type SkinWhereInput = {
    AND?: SkinWhereInput | SkinWhereInput[]
    OR?: SkinWhereInput[]
    NOT?: SkinWhereInput | SkinWhereInput[]
    id?: IntFilter<"Skin"> | number
    name?: StringFilter<"Skin"> | string
    imageUrl?: StringFilter<"Skin"> | string
    keyword?: StringNullableFilter<"Skin"> | string | null
    accounts?: AccountListRelationFilter
  }

  export type SkinOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    keyword?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type SkinWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: SkinWhereInput | SkinWhereInput[]
    OR?: SkinWhereInput[]
    NOT?: SkinWhereInput | SkinWhereInput[]
    imageUrl?: StringFilter<"Skin"> | string
    keyword?: StringNullableFilter<"Skin"> | string | null
    accounts?: AccountListRelationFilter
  }, "id" | "name">

  export type SkinOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    keyword?: SortOrderInput | SortOrder
    _count?: SkinCountOrderByAggregateInput
    _avg?: SkinAvgOrderByAggregateInput
    _max?: SkinMaxOrderByAggregateInput
    _min?: SkinMinOrderByAggregateInput
    _sum?: SkinSumOrderByAggregateInput
  }

  export type SkinScalarWhereWithAggregatesInput = {
    AND?: SkinScalarWhereWithAggregatesInput | SkinScalarWhereWithAggregatesInput[]
    OR?: SkinScalarWhereWithAggregatesInput[]
    NOT?: SkinScalarWhereWithAggregatesInput | SkinScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Skin"> | number
    name?: StringWithAggregatesFilter<"Skin"> | string
    imageUrl?: StringWithAggregatesFilter<"Skin"> | string
    keyword?: StringNullableWithAggregatesFilter<"Skin"> | string | null
  }

  export type ImageUploadWhereInput = {
    AND?: ImageUploadWhereInput | ImageUploadWhereInput[]
    OR?: ImageUploadWhereInput[]
    NOT?: ImageUploadWhereInput | ImageUploadWhereInput[]
    id?: IntFilter<"ImageUpload"> | number
    imageUrl?: StringFilter<"ImageUpload"> | string
    type?: EnumMediaTypeFilter<"ImageUpload"> | $Enums.MediaType
    createdAt?: DateTimeFilter<"ImageUpload"> | Date | string
    updatedAt?: DateTimeFilter<"ImageUpload"> | Date | string
    accountId?: IntNullableFilter<"ImageUpload"> | number | null
    thumbnailOf?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    slideOf?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
  }

  export type ImageUploadOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrderInput | SortOrder
    thumbnailOf?: AccountOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    slideOf?: CarouselSlideOrderByWithRelationInput
  }

  export type ImageUploadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ImageUploadWhereInput | ImageUploadWhereInput[]
    OR?: ImageUploadWhereInput[]
    NOT?: ImageUploadWhereInput | ImageUploadWhereInput[]
    imageUrl?: StringFilter<"ImageUpload"> | string
    type?: EnumMediaTypeFilter<"ImageUpload"> | $Enums.MediaType
    createdAt?: DateTimeFilter<"ImageUpload"> | Date | string
    updatedAt?: DateTimeFilter<"ImageUpload"> | Date | string
    accountId?: IntNullableFilter<"ImageUpload"> | number | null
    thumbnailOf?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    slideOf?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
  }, "id">

  export type ImageUploadOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrderInput | SortOrder
    _count?: ImageUploadCountOrderByAggregateInput
    _avg?: ImageUploadAvgOrderByAggregateInput
    _max?: ImageUploadMaxOrderByAggregateInput
    _min?: ImageUploadMinOrderByAggregateInput
    _sum?: ImageUploadSumOrderByAggregateInput
  }

  export type ImageUploadScalarWhereWithAggregatesInput = {
    AND?: ImageUploadScalarWhereWithAggregatesInput | ImageUploadScalarWhereWithAggregatesInput[]
    OR?: ImageUploadScalarWhereWithAggregatesInput[]
    NOT?: ImageUploadScalarWhereWithAggregatesInput | ImageUploadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ImageUpload"> | number
    imageUrl?: StringWithAggregatesFilter<"ImageUpload"> | string
    type?: EnumMediaTypeWithAggregatesFilter<"ImageUpload"> | $Enums.MediaType
    createdAt?: DateTimeWithAggregatesFilter<"ImageUpload"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ImageUpload"> | Date | string
    accountId?: IntNullableWithAggregatesFilter<"ImageUpload"> | number | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: IntFilter<"Customer"> | number
    username?: StringFilter<"Customer"> | string
    password?: StringFilter<"Customer"> | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    passwordChangedAt?: DateTimeFilter<"Customer"> | Date | string
    isActive?: BoolFilter<"Customer"> | boolean
    passwordExpireAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    Booking?: BookingListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passwordChangedAt?: SortOrder
    isActive?: SortOrder
    passwordExpireAt?: SortOrderInput | SortOrder
    Booking?: BookingOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    password?: StringFilter<"Customer"> | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    passwordChangedAt?: DateTimeFilter<"Customer"> | Date | string
    isActive?: BoolFilter<"Customer"> | boolean
    passwordExpireAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    Booking?: BookingListRelationFilter
  }, "id" | "username">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passwordChangedAt?: SortOrder
    isActive?: SortOrder
    passwordExpireAt?: SortOrderInput | SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Customer"> | number
    username?: StringWithAggregatesFilter<"Customer"> | string
    password?: StringWithAggregatesFilter<"Customer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    passwordChangedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Customer"> | boolean
    passwordExpireAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
  }

  export type CarouselSlideWhereInput = {
    AND?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    OR?: CarouselSlideWhereInput[]
    NOT?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    id?: IntFilter<"CarouselSlide"> | number
    imageId?: IntFilter<"CarouselSlide"> | number
    duration?: IntFilter<"CarouselSlide"> | number
    createdAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    updatedAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    image?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
  }

  export type CarouselSlideOrderByWithRelationInput = {
    id?: SortOrder
    imageId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: ImageUploadOrderByWithRelationInput
  }

  export type CarouselSlideWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    imageId?: number
    AND?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    OR?: CarouselSlideWhereInput[]
    NOT?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    duration?: IntFilter<"CarouselSlide"> | number
    createdAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    updatedAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    image?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
  }, "id" | "imageId">

  export type CarouselSlideOrderByWithAggregationInput = {
    id?: SortOrder
    imageId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CarouselSlideCountOrderByAggregateInput
    _avg?: CarouselSlideAvgOrderByAggregateInput
    _max?: CarouselSlideMaxOrderByAggregateInput
    _min?: CarouselSlideMinOrderByAggregateInput
    _sum?: CarouselSlideSumOrderByAggregateInput
  }

  export type CarouselSlideScalarWhereWithAggregatesInput = {
    AND?: CarouselSlideScalarWhereWithAggregatesInput | CarouselSlideScalarWhereWithAggregatesInput[]
    OR?: CarouselSlideScalarWhereWithAggregatesInput[]
    NOT?: CarouselSlideScalarWhereWithAggregatesInput | CarouselSlideScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CarouselSlide"> | number
    imageId?: IntWithAggregatesFilter<"CarouselSlide"> | number
    duration?: IntWithAggregatesFilter<"CarouselSlide"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CarouselSlide"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CarouselSlide"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    readableNumber?: BigIntFilter<"Booking"> | bigint | number
    customerId?: IntNullableFilter<"Booking"> | number | null
    accountId?: IntFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    duration?: StringFilter<"Booking"> | string
    quantity?: IntFilter<"Booking"> | number
    immediate?: BoolFilter<"Booking"> | boolean
    startAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    expiredAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    mainValuePerUnit?: IntFilter<"Booking"> | number
    othersValuePerUnit?: IntNullableFilter<"Booking"> | number | null
    voucherName?: StringNullableFilter<"Booking"> | string | null
    voucherType?: EnumTypeNullableFilter<"Booking"> | $Enums.Type | null
    voucherAmount?: FloatNullableFilter<"Booking"> | number | null
    voucherMaxDiscount?: FloatNullableFilter<"Booking"> | number | null
    mainValue?: IntFilter<"Booking"> | number
    othersValue?: IntNullableFilter<"Booking"> | number | null
    discount?: IntNullableFilter<"Booking"> | number | null
    adminFee?: IntNullableFilter<"Booking"> | number | null
    totalValue?: IntFilter<"Booking"> | number
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    version?: IntFilter<"Booking"> | number
    payments?: PaymentListRelationFilter
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    readableNumber?: SortOrder
    customerId?: SortOrderInput | SortOrder
    accountId?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    quantity?: SortOrder
    immediate?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    expiredAt?: SortOrderInput | SortOrder
    mainValuePerUnit?: SortOrder
    othersValuePerUnit?: SortOrderInput | SortOrder
    voucherName?: SortOrderInput | SortOrder
    voucherType?: SortOrderInput | SortOrder
    voucherAmount?: SortOrderInput | SortOrder
    voucherMaxDiscount?: SortOrderInput | SortOrder
    mainValue?: SortOrder
    othersValue?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    adminFee?: SortOrderInput | SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    payments?: PaymentOrderByRelationAggregateInput
    customer?: CustomerOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    readableNumber?: bigint | number
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    customerId?: IntNullableFilter<"Booking"> | number | null
    accountId?: IntFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    duration?: StringFilter<"Booking"> | string
    quantity?: IntFilter<"Booking"> | number
    immediate?: BoolFilter<"Booking"> | boolean
    startAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    expiredAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    mainValuePerUnit?: IntFilter<"Booking"> | number
    othersValuePerUnit?: IntNullableFilter<"Booking"> | number | null
    voucherName?: StringNullableFilter<"Booking"> | string | null
    voucherType?: EnumTypeNullableFilter<"Booking"> | $Enums.Type | null
    voucherAmount?: FloatNullableFilter<"Booking"> | number | null
    voucherMaxDiscount?: FloatNullableFilter<"Booking"> | number | null
    mainValue?: IntFilter<"Booking"> | number
    othersValue?: IntNullableFilter<"Booking"> | number | null
    discount?: IntNullableFilter<"Booking"> | number | null
    adminFee?: IntNullableFilter<"Booking"> | number | null
    totalValue?: IntFilter<"Booking"> | number
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    version?: IntFilter<"Booking"> | number
    payments?: PaymentListRelationFilter
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }, "id" | "readableNumber">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    readableNumber?: SortOrder
    customerId?: SortOrderInput | SortOrder
    accountId?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    quantity?: SortOrder
    immediate?: SortOrder
    startAt?: SortOrderInput | SortOrder
    endAt?: SortOrderInput | SortOrder
    expiredAt?: SortOrderInput | SortOrder
    mainValuePerUnit?: SortOrder
    othersValuePerUnit?: SortOrderInput | SortOrder
    voucherName?: SortOrderInput | SortOrder
    voucherType?: SortOrderInput | SortOrder
    voucherAmount?: SortOrderInput | SortOrder
    voucherMaxDiscount?: SortOrderInput | SortOrder
    mainValue?: SortOrder
    othersValue?: SortOrderInput | SortOrder
    discount?: SortOrderInput | SortOrder
    adminFee?: SortOrderInput | SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    readableNumber?: BigIntWithAggregatesFilter<"Booking"> | bigint | number
    customerId?: IntNullableWithAggregatesFilter<"Booking"> | number | null
    accountId?: IntWithAggregatesFilter<"Booking"> | number
    status?: EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus
    duration?: StringWithAggregatesFilter<"Booking"> | string
    quantity?: IntWithAggregatesFilter<"Booking"> | number
    immediate?: BoolWithAggregatesFilter<"Booking"> | boolean
    startAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    endAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    expiredAt?: DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null
    mainValuePerUnit?: IntWithAggregatesFilter<"Booking"> | number
    othersValuePerUnit?: IntNullableWithAggregatesFilter<"Booking"> | number | null
    voucherName?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    voucherType?: EnumTypeNullableWithAggregatesFilter<"Booking"> | $Enums.Type | null
    voucherAmount?: FloatNullableWithAggregatesFilter<"Booking"> | number | null
    voucherMaxDiscount?: FloatNullableWithAggregatesFilter<"Booking"> | number | null
    mainValue?: IntWithAggregatesFilter<"Booking"> | number
    othersValue?: IntNullableWithAggregatesFilter<"Booking"> | number | null
    discount?: IntNullableWithAggregatesFilter<"Booking"> | number | null
    adminFee?: IntNullableWithAggregatesFilter<"Booking"> | number | null
    totalValue?: IntWithAggregatesFilter<"Booking"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    version?: IntWithAggregatesFilter<"Booking"> | number
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    bookingId?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    value?: IntFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    provider?: EnumProviderFilter<"Payment"> | $Enums.Provider
    providerPaymentId?: StringNullableFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodTypeNullableFilter<"Payment"> | $Enums.PaymentMethodType | null
    qrUrl?: StringNullableFilter<"Payment"> | string | null
    bankCode?: StringNullableFilter<"Payment"> | string | null
    bankAccountNo?: StringNullableFilter<"Payment"> | string | null
    bankAccountName?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    refundedValue?: IntFilter<"Payment"> | number
    refundedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerPaymentId?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    qrUrl?: SortOrderInput | SortOrder
    bankCode?: SortOrderInput | SortOrder
    bankAccountNo?: SortOrderInput | SortOrder
    bankAccountName?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    refundedValue?: SortOrder
    refundedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    booking?: BookingOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    bookingId?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    value?: IntFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    provider?: EnumProviderFilter<"Payment"> | $Enums.Provider
    providerPaymentId?: StringNullableFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodTypeNullableFilter<"Payment"> | $Enums.PaymentMethodType | null
    qrUrl?: StringNullableFilter<"Payment"> | string | null
    bankCode?: StringNullableFilter<"Payment"> | string | null
    bankAccountNo?: StringNullableFilter<"Payment"> | string | null
    bankAccountName?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    refundedValue?: IntFilter<"Payment"> | number
    refundedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    booking?: XOR<BookingNullableScalarRelationFilter, BookingWhereInput> | null
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerPaymentId?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    qrUrl?: SortOrderInput | SortOrder
    bankCode?: SortOrderInput | SortOrder
    bankAccountNo?: SortOrderInput | SortOrder
    bankAccountName?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    refundedValue?: SortOrder
    refundedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    bookingId?: StringWithAggregatesFilter<"Payment"> | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    value?: IntWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    provider?: EnumProviderWithAggregatesFilter<"Payment"> | $Enums.Provider
    providerPaymentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodTypeNullableWithAggregatesFilter<"Payment"> | $Enums.PaymentMethodType | null
    qrUrl?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    bankCode?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    bankAccountNo?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    bankAccountName?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    refundedValue?: IntWithAggregatesFilter<"Payment"> | number
    refundedAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type VoucherWhereInput = {
    AND?: VoucherWhereInput | VoucherWhereInput[]
    OR?: VoucherWhereInput[]
    NOT?: VoucherWhereInput | VoucherWhereInput[]
    id?: IntFilter<"Voucher"> | number
    createdAt?: DateTimeFilter<"Voucher"> | Date | string
    updatedAt?: DateTimeFilter<"Voucher"> | Date | string
    voucherName?: StringFilter<"Voucher"> | string
    isValid?: BoolFilter<"Voucher"> | boolean
    isVisible?: BoolFilter<"Voucher"> | boolean
    type?: EnumTypeFilter<"Voucher"> | $Enums.Type
    percentage?: FloatNullableFilter<"Voucher"> | number | null
    nominal?: FloatNullableFilter<"Voucher"> | number | null
    maxDiscount?: FloatNullableFilter<"Voucher"> | number | null
    dateStart?: DateTimeFilter<"Voucher"> | Date | string
    dateEnd?: DateTimeFilter<"Voucher"> | Date | string
  }

  export type VoucherOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    voucherName?: SortOrder
    isValid?: SortOrder
    isVisible?: SortOrder
    type?: SortOrder
    percentage?: SortOrderInput | SortOrder
    nominal?: SortOrderInput | SortOrder
    maxDiscount?: SortOrderInput | SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
  }

  export type VoucherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    voucherName?: string
    AND?: VoucherWhereInput | VoucherWhereInput[]
    OR?: VoucherWhereInput[]
    NOT?: VoucherWhereInput | VoucherWhereInput[]
    createdAt?: DateTimeFilter<"Voucher"> | Date | string
    updatedAt?: DateTimeFilter<"Voucher"> | Date | string
    isValid?: BoolFilter<"Voucher"> | boolean
    isVisible?: BoolFilter<"Voucher"> | boolean
    type?: EnumTypeFilter<"Voucher"> | $Enums.Type
    percentage?: FloatNullableFilter<"Voucher"> | number | null
    nominal?: FloatNullableFilter<"Voucher"> | number | null
    maxDiscount?: FloatNullableFilter<"Voucher"> | number | null
    dateStart?: DateTimeFilter<"Voucher"> | Date | string
    dateEnd?: DateTimeFilter<"Voucher"> | Date | string
  }, "id" | "voucherName">

  export type VoucherOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    voucherName?: SortOrder
    isValid?: SortOrder
    isVisible?: SortOrder
    type?: SortOrder
    percentage?: SortOrderInput | SortOrder
    nominal?: SortOrderInput | SortOrder
    maxDiscount?: SortOrderInput | SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
    _count?: VoucherCountOrderByAggregateInput
    _avg?: VoucherAvgOrderByAggregateInput
    _max?: VoucherMaxOrderByAggregateInput
    _min?: VoucherMinOrderByAggregateInput
    _sum?: VoucherSumOrderByAggregateInput
  }

  export type VoucherScalarWhereWithAggregatesInput = {
    AND?: VoucherScalarWhereWithAggregatesInput | VoucherScalarWhereWithAggregatesInput[]
    OR?: VoucherScalarWhereWithAggregatesInput[]
    NOT?: VoucherScalarWhereWithAggregatesInput | VoucherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Voucher"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
    voucherName?: StringWithAggregatesFilter<"Voucher"> | string
    isValid?: BoolWithAggregatesFilter<"Voucher"> | boolean
    isVisible?: BoolWithAggregatesFilter<"Voucher"> | boolean
    type?: EnumTypeWithAggregatesFilter<"Voucher"> | $Enums.Type
    percentage?: FloatNullableWithAggregatesFilter<"Voucher"> | number | null
    nominal?: FloatNullableWithAggregatesFilter<"Voucher"> | number | null
    maxDiscount?: FloatNullableWithAggregatesFilter<"Voucher"> | number | null
    dateStart?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
    dateEnd?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
  }

  export type GlobalSettingsWhereInput = {
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    key?: StringFilter<"GlobalSettings"> | string
    value?: StringFilter<"GlobalSettings"> | string
  }

  export type GlobalSettingsOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type GlobalSettingsWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    value?: StringFilter<"GlobalSettings"> | string
  }, "key">

  export type GlobalSettingsOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: GlobalSettingsCountOrderByAggregateInput
    _max?: GlobalSettingsMaxOrderByAggregateInput
    _min?: GlobalSettingsMinOrderByAggregateInput
  }

  export type GlobalSettingsScalarWhereWithAggregatesInput = {
    AND?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    OR?: GlobalSettingsScalarWhereWithAggregatesInput[]
    NOT?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"GlobalSettings"> | string
    value?: StringWithAggregatesFilter<"GlobalSettings"> | string
  }

  export type AccountCreateInput = {
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    skinList?: SkinCreateNestedManyWithoutAccountsInput
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
    Booking?: BookingCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId: number
    thumbnailId?: number | null
    skinList?: SkinUncheckedCreateNestedManyWithoutAccountsInput
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
    Booking?: BookingUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    skinList?: SkinUpdateManyWithoutAccountsNestedInput
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
    Booking?: BookingUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    skinList?: SkinUncheckedUpdateManyWithoutAccountsNestedInput
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
    Booking?: BookingUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId: number
    thumbnailId?: number | null
  }

  export type AccountUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountResetLogCreateInput = {
    previousExpireAt?: Date | string | null
    resetAt?: Date | string
    account: AccountCreateNestedOneWithoutResetLogsInput
  }

  export type AccountResetLogUncheckedCreateInput = {
    id?: number
    accountId: number
    previousExpireAt?: Date | string | null
    resetAt?: Date | string
  }

  export type AccountResetLogUpdateInput = {
    previousExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutResetLogsNestedInput
  }

  export type AccountResetLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    previousExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountResetLogCreateManyInput = {
    id?: number
    accountId: number
    previousExpireAt?: Date | string | null
    resetAt?: Date | string
  }

  export type AccountResetLogUpdateManyMutationInput = {
    previousExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountResetLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    previousExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceTierCreateInput = {
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutPriceTierInput
    priceList?: PriceListCreateNestedManyWithoutTierInput
  }

  export type PriceTierUncheckedCreateInput = {
    id?: number
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutPriceTierInput
    priceList?: PriceListUncheckedCreateNestedManyWithoutTierInput
  }

  export type PriceTierUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutPriceTierNestedInput
    priceList?: PriceListUpdateManyWithoutTierNestedInput
  }

  export type PriceTierUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutPriceTierNestedInput
    priceList?: PriceListUncheckedUpdateManyWithoutTierNestedInput
  }

  export type PriceTierCreateManyInput = {
    id?: number
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceTierUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceTierUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceListCreateInput = {
    duration: string
    normalPrice: number
    lowPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tier: PriceTierCreateNestedOneWithoutPriceListInput
  }

  export type PriceListUncheckedCreateInput = {
    id?: number
    duration: string
    normalPrice: number
    lowPrice: number
    tierId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceListUpdateInput = {
    duration?: StringFieldUpdateOperationsInput | string
    normalPrice?: IntFieldUpdateOperationsInput | number
    lowPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tier?: PriceTierUpdateOneRequiredWithoutPriceListNestedInput
  }

  export type PriceListUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    normalPrice?: IntFieldUpdateOperationsInput | number
    lowPrice?: IntFieldUpdateOperationsInput | number
    tierId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceListCreateManyInput = {
    id?: number
    duration: string
    normalPrice: number
    lowPrice: number
    tierId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceListUpdateManyMutationInput = {
    duration?: StringFieldUpdateOperationsInput | string
    normalPrice?: IntFieldUpdateOperationsInput | number
    lowPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceListUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    normalPrice?: IntFieldUpdateOperationsInput | number
    lowPrice?: IntFieldUpdateOperationsInput | number
    tierId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkinCreateInput = {
    name: string
    imageUrl: string
    keyword?: string | null
    accounts?: AccountCreateNestedManyWithoutSkinListInput
  }

  export type SkinUncheckedCreateInput = {
    id?: number
    name: string
    imageUrl: string
    keyword?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutSkinListInput
  }

  export type SkinUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutSkinListNestedInput
  }

  export type SkinUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutSkinListNestedInput
  }

  export type SkinCreateManyInput = {
    id?: number
    name: string
    imageUrl: string
    keyword?: string | null
  }

  export type SkinUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkinUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImageUploadCreateInput = {
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    account?: AccountCreateNestedOneWithoutOtherImagesInput
    slideOf?: CarouselSlideCreateNestedOneWithoutImageInput
  }

  export type ImageUploadUncheckedCreateInput = {
    id?: number
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
    slideOf?: CarouselSlideUncheckedCreateNestedOneWithoutImageInput
  }

  export type ImageUploadUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
    slideOf?: CarouselSlideUpdateOneWithoutImageNestedInput
  }

  export type ImageUploadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
    slideOf?: CarouselSlideUncheckedUpdateOneWithoutImageNestedInput
  }

  export type ImageUploadCreateManyInput = {
    id?: number
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
  }

  export type ImageUploadUpdateManyMutationInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUploadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateInput = {
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordChangedAt?: Date | string
    isActive?: boolean
    passwordExpireAt?: Date | string | null
    Booking?: BookingCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordChangedAt?: Date | string
    isActive?: boolean
    passwordExpireAt?: Date | string | null
    Booking?: BookingUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    passwordExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Booking?: BookingUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    passwordExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Booking?: BookingUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: number
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordChangedAt?: Date | string
    isActive?: boolean
    passwordExpireAt?: Date | string | null
  }

  export type CustomerUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    passwordExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    passwordExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CarouselSlideCreateInput = {
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    image: ImageUploadCreateNestedOneWithoutSlideOfInput
  }

  export type CarouselSlideUncheckedCreateInput = {
    id?: number
    imageId: number
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideUpdateInput = {
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: ImageUploadUpdateOneRequiredWithoutSlideOfNestedInput
  }

  export type CarouselSlideUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageId?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarouselSlideCreateManyInput = {
    id?: number
    imageId: number
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideUpdateManyMutationInput = {
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarouselSlideUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageId?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    readableNumber?: bigint | number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    payments?: PaymentCreateNestedManyWithoutBookingInput
    customer?: CustomerCreateNestedOneWithoutBookingInput
    account: AccountCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    readableNumber?: bigint | number
    customerId?: number | null
    accountId: number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUpdateManyWithoutBookingNestedInput
    customer?: CustomerUpdateOneWithoutBookingNestedInput
    account?: AccountUpdateOneRequiredWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    accountId?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingCreateManyInput = {
    id?: string
    readableNumber?: bigint | number
    customerId?: number | null
    accountId: number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    accountId?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentCreateInput = {
    id?: string
    status: $Enums.PaymentStatus
    value: number
    currency?: string
    provider: $Enums.Provider
    providerPaymentId?: string | null
    paymentMethod?: $Enums.PaymentMethodType | null
    qrUrl?: string | null
    bankCode?: string | null
    bankAccountNo?: string | null
    bankAccountName?: string | null
    paidAt?: Date | string | null
    refundedValue?: number
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    booking?: BookingCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    bookingId: string
    status: $Enums.PaymentStatus
    value: number
    currency?: string
    provider: $Enums.Provider
    providerPaymentId?: string | null
    paymentMethod?: $Enums.PaymentMethodType | null
    qrUrl?: string | null
    bankCode?: string | null
    bankAccountNo?: string | null
    bankAccountName?: string | null
    paidAt?: Date | string | null
    refundedValue?: number
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    value?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType | null
    qrUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountNo?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedValue?: IntFieldUpdateOperationsInput | number
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: BookingUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    value?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType | null
    qrUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountNo?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedValue?: IntFieldUpdateOperationsInput | number
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    bookingId: string
    status: $Enums.PaymentStatus
    value: number
    currency?: string
    provider: $Enums.Provider
    providerPaymentId?: string | null
    paymentMethod?: $Enums.PaymentMethodType | null
    qrUrl?: string | null
    bankCode?: string | null
    bankAccountNo?: string | null
    bankAccountName?: string | null
    paidAt?: Date | string | null
    refundedValue?: number
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    value?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType | null
    qrUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountNo?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedValue?: IntFieldUpdateOperationsInput | number
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingId?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    value?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType | null
    qrUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountNo?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedValue?: IntFieldUpdateOperationsInput | number
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    voucherName: string
    isValid?: boolean
    isVisible?: boolean
    type: $Enums.Type
    percentage?: number | null
    nominal?: number | null
    maxDiscount?: number | null
    dateStart: Date | string
    dateEnd: Date | string
  }

  export type VoucherUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    voucherName: string
    isValid?: boolean
    isVisible?: boolean
    type: $Enums.Type
    percentage?: number | null
    nominal?: number | null
    maxDiscount?: number | null
    dateStart: Date | string
    dateEnd: Date | string
  }

  export type VoucherUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voucherName?: StringFieldUpdateOperationsInput | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumTypeFieldUpdateOperationsInput | $Enums.Type
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    nominal?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voucherName?: StringFieldUpdateOperationsInput | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumTypeFieldUpdateOperationsInput | $Enums.Type
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    nominal?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    voucherName: string
    isValid?: boolean
    isVisible?: boolean
    type: $Enums.Type
    percentage?: number | null
    nominal?: number | null
    maxDiscount?: number | null
    dateStart: Date | string
    dateEnd: Date | string
  }

  export type VoucherUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voucherName?: StringFieldUpdateOperationsInput | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumTypeFieldUpdateOperationsInput | $Enums.Type
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    nominal?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voucherName?: StringFieldUpdateOperationsInput | string
    isValid?: BoolFieldUpdateOperationsInput | boolean
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumTypeFieldUpdateOperationsInput | $Enums.Type
    percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    nominal?: NullableFloatFieldUpdateOperationsInput | number | null
    maxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    dateStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateEnd?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateInput = {
    key: string
    value: string
  }

  export type GlobalSettingsUncheckedCreateInput = {
    key: string
    value: string
  }

  export type GlobalSettingsUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GlobalSettingsUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GlobalSettingsCreateManyInput = {
    key: string
    value: string
  }

  export type GlobalSettingsUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GlobalSettingsUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SkinListRelationFilter = {
    every?: SkinWhereInput
    some?: SkinWhereInput
    none?: SkinWhereInput
  }

  export type PriceTierScalarRelationFilter = {
    is?: PriceTierWhereInput
    isNot?: PriceTierWhereInput
  }

  export type ImageUploadNullableScalarRelationFilter = {
    is?: ImageUploadWhereInput | null
    isNot?: ImageUploadWhereInput | null
  }

  export type ImageUploadListRelationFilter = {
    every?: ImageUploadWhereInput
    some?: ImageUploadWhereInput
    none?: ImageUploadWhereInput
  }

  export type AccountResetLogListRelationFilter = {
    every?: AccountResetLogWhereInput
    some?: AccountResetLogWhereInput
    none?: AccountResetLogWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SkinOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImageUploadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountResetLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    nickname?: SortOrder
    accountCode?: SortOrder
    description?: SortOrder
    accountRank?: SortOrder
    availabilityStatus?: SortOrder
    currentBookingDate?: SortOrder
    currentBookingDuration?: SortOrder
    currentExpireAt?: SortOrder
    nextBookingDate?: SortOrder
    nextBookingDuration?: SortOrder
    nextExpireAt?: SortOrder
    totalRentHour?: SortOrder
    rentHourUpdated?: SortOrder
    password?: SortOrder
    passwordResetRequired?: SortOrder
    skinCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isLowRank?: SortOrder
    isRecommended?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    id?: SortOrder
    currentBookingDuration?: SortOrder
    nextBookingDuration?: SortOrder
    totalRentHour?: SortOrder
    skinCount?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    nickname?: SortOrder
    accountCode?: SortOrder
    description?: SortOrder
    accountRank?: SortOrder
    availabilityStatus?: SortOrder
    currentBookingDate?: SortOrder
    currentBookingDuration?: SortOrder
    currentExpireAt?: SortOrder
    nextBookingDate?: SortOrder
    nextBookingDuration?: SortOrder
    nextExpireAt?: SortOrder
    totalRentHour?: SortOrder
    rentHourUpdated?: SortOrder
    password?: SortOrder
    passwordResetRequired?: SortOrder
    skinCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isLowRank?: SortOrder
    isRecommended?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    nickname?: SortOrder
    accountCode?: SortOrder
    description?: SortOrder
    accountRank?: SortOrder
    availabilityStatus?: SortOrder
    currentBookingDate?: SortOrder
    currentBookingDuration?: SortOrder
    currentExpireAt?: SortOrder
    nextBookingDate?: SortOrder
    nextBookingDuration?: SortOrder
    nextExpireAt?: SortOrder
    totalRentHour?: SortOrder
    rentHourUpdated?: SortOrder
    password?: SortOrder
    passwordResetRequired?: SortOrder
    skinCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isLowRank?: SortOrder
    isRecommended?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    id?: SortOrder
    currentBookingDuration?: SortOrder
    nextBookingDuration?: SortOrder
    totalRentHour?: SortOrder
    skinCount?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AccountScalarRelationFilter = {
    is?: AccountWhereInput
    isNot?: AccountWhereInput
  }

  export type AccountResetLogCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    previousExpireAt?: SortOrder
    resetAt?: SortOrder
  }

  export type AccountResetLogAvgOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
  }

  export type AccountResetLogMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    previousExpireAt?: SortOrder
    resetAt?: SortOrder
  }

  export type AccountResetLogMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    previousExpireAt?: SortOrder
    resetAt?: SortOrder
  }

  export type AccountResetLogSumOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type PriceListListRelationFilter = {
    every?: PriceListWhereInput
    some?: PriceListWhereInput
    none?: PriceListWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriceListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriceTierCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceTierAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PriceTierMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceTierMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceTierSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PriceListCountOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    normalPrice?: SortOrder
    lowPrice?: SortOrder
    tierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceListAvgOrderByAggregateInput = {
    id?: SortOrder
    normalPrice?: SortOrder
    lowPrice?: SortOrder
    tierId?: SortOrder
  }

  export type PriceListMaxOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    normalPrice?: SortOrder
    lowPrice?: SortOrder
    tierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceListMinOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    normalPrice?: SortOrder
    lowPrice?: SortOrder
    tierId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceListSumOrderByAggregateInput = {
    id?: SortOrder
    normalPrice?: SortOrder
    lowPrice?: SortOrder
    tierId?: SortOrder
  }

  export type SkinCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    keyword?: SortOrder
  }

  export type SkinAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SkinMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    keyword?: SortOrder
  }

  export type SkinMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    keyword?: SortOrder
  }

  export type SkinSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type AccountNullableScalarRelationFilter = {
    is?: AccountWhereInput | null
    isNot?: AccountWhereInput | null
  }

  export type CarouselSlideNullableScalarRelationFilter = {
    is?: CarouselSlideWhereInput | null
    isNot?: CarouselSlideWhereInput | null
  }

  export type ImageUploadCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
  }

  export type ImageUploadAvgOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
  }

  export type ImageUploadMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
  }

  export type ImageUploadMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
  }

  export type ImageUploadSumOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
  }

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passwordChangedAt?: SortOrder
    isActive?: SortOrder
    passwordExpireAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passwordChangedAt?: SortOrder
    isActive?: SortOrder
    passwordExpireAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    passwordChangedAt?: SortOrder
    isActive?: SortOrder
    passwordExpireAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ImageUploadScalarRelationFilter = {
    is?: ImageUploadWhereInput
    isNot?: ImageUploadWhereInput
  }

  export type CarouselSlideCountOrderByAggregateInput = {
    id?: SortOrder
    imageId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarouselSlideAvgOrderByAggregateInput = {
    id?: SortOrder
    imageId?: SortOrder
    duration?: SortOrder
  }

  export type CarouselSlideMaxOrderByAggregateInput = {
    id?: SortOrder
    imageId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarouselSlideMinOrderByAggregateInput = {
    id?: SortOrder
    imageId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarouselSlideSumOrderByAggregateInput = {
    id?: SortOrder
    imageId?: SortOrder
    duration?: SortOrder
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type EnumTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeNullableFilter<$PrismaModel> | $Enums.Type | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    readableNumber?: SortOrder
    customerId?: SortOrder
    accountId?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    quantity?: SortOrder
    immediate?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    expiredAt?: SortOrder
    mainValuePerUnit?: SortOrder
    othersValuePerUnit?: SortOrder
    voucherName?: SortOrder
    voucherType?: SortOrder
    voucherAmount?: SortOrder
    voucherMaxDiscount?: SortOrder
    mainValue?: SortOrder
    othersValue?: SortOrder
    discount?: SortOrder
    adminFee?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    readableNumber?: SortOrder
    customerId?: SortOrder
    accountId?: SortOrder
    quantity?: SortOrder
    mainValuePerUnit?: SortOrder
    othersValuePerUnit?: SortOrder
    voucherAmount?: SortOrder
    voucherMaxDiscount?: SortOrder
    mainValue?: SortOrder
    othersValue?: SortOrder
    discount?: SortOrder
    adminFee?: SortOrder
    totalValue?: SortOrder
    version?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    readableNumber?: SortOrder
    customerId?: SortOrder
    accountId?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    quantity?: SortOrder
    immediate?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    expiredAt?: SortOrder
    mainValuePerUnit?: SortOrder
    othersValuePerUnit?: SortOrder
    voucherName?: SortOrder
    voucherType?: SortOrder
    voucherAmount?: SortOrder
    voucherMaxDiscount?: SortOrder
    mainValue?: SortOrder
    othersValue?: SortOrder
    discount?: SortOrder
    adminFee?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    readableNumber?: SortOrder
    customerId?: SortOrder
    accountId?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    quantity?: SortOrder
    immediate?: SortOrder
    startAt?: SortOrder
    endAt?: SortOrder
    expiredAt?: SortOrder
    mainValuePerUnit?: SortOrder
    othersValuePerUnit?: SortOrder
    voucherName?: SortOrder
    voucherType?: SortOrder
    voucherAmount?: SortOrder
    voucherMaxDiscount?: SortOrder
    mainValue?: SortOrder
    othersValue?: SortOrder
    discount?: SortOrder
    adminFee?: SortOrder
    totalValue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    readableNumber?: SortOrder
    customerId?: SortOrder
    accountId?: SortOrder
    quantity?: SortOrder
    mainValuePerUnit?: SortOrder
    othersValuePerUnit?: SortOrder
    voucherAmount?: SortOrder
    voucherMaxDiscount?: SortOrder
    mainValue?: SortOrder
    othersValue?: SortOrder
    discount?: SortOrder
    adminFee?: SortOrder
    totalValue?: SortOrder
    version?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type EnumTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.Type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumTypeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type EnumPaymentMethodTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethodType | EnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodTypeNullableFilter<$PrismaModel> | $Enums.PaymentMethodType | null
  }

  export type BookingNullableScalarRelationFilter = {
    is?: BookingWhereInput | null
    isNot?: BookingWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerPaymentId?: SortOrder
    paymentMethod?: SortOrder
    qrUrl?: SortOrder
    bankCode?: SortOrder
    bankAccountNo?: SortOrder
    bankAccountName?: SortOrder
    paidAt?: SortOrder
    refundedValue?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    value?: SortOrder
    refundedValue?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerPaymentId?: SortOrder
    paymentMethod?: SortOrder
    qrUrl?: SortOrder
    bankCode?: SortOrder
    bankAccountNo?: SortOrder
    bankAccountName?: SortOrder
    paidAt?: SortOrder
    refundedValue?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    bookingId?: SortOrder
    status?: SortOrder
    value?: SortOrder
    currency?: SortOrder
    provider?: SortOrder
    providerPaymentId?: SortOrder
    paymentMethod?: SortOrder
    qrUrl?: SortOrder
    bankCode?: SortOrder
    bankAccountNo?: SortOrder
    bankAccountName?: SortOrder
    paidAt?: SortOrder
    refundedValue?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    value?: SortOrder
    refundedValue?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type EnumPaymentMethodTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethodType | EnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethodType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodTypeNullableFilter<$PrismaModel>
  }

  export type EnumTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeFilter<$PrismaModel> | $Enums.Type
  }

  export type VoucherCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    voucherName?: SortOrder
    isValid?: SortOrder
    isVisible?: SortOrder
    type?: SortOrder
    percentage?: SortOrder
    nominal?: SortOrder
    maxDiscount?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
  }

  export type VoucherAvgOrderByAggregateInput = {
    id?: SortOrder
    percentage?: SortOrder
    nominal?: SortOrder
    maxDiscount?: SortOrder
  }

  export type VoucherMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    voucherName?: SortOrder
    isValid?: SortOrder
    isVisible?: SortOrder
    type?: SortOrder
    percentage?: SortOrder
    nominal?: SortOrder
    maxDiscount?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
  }

  export type VoucherMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    voucherName?: SortOrder
    isValid?: SortOrder
    isVisible?: SortOrder
    type?: SortOrder
    percentage?: SortOrder
    nominal?: SortOrder
    maxDiscount?: SortOrder
    dateStart?: SortOrder
    dateEnd?: SortOrder
  }

  export type VoucherSumOrderByAggregateInput = {
    id?: SortOrder
    percentage?: SortOrder
    nominal?: SortOrder
    maxDiscount?: SortOrder
  }

  export type EnumTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeWithAggregatesFilter<$PrismaModel> | $Enums.Type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeFilter<$PrismaModel>
    _max?: NestedEnumTypeFilter<$PrismaModel>
  }

  export type GlobalSettingsCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type GlobalSettingsMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type GlobalSettingsMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SkinCreateNestedManyWithoutAccountsInput = {
    create?: XOR<SkinCreateWithoutAccountsInput, SkinUncheckedCreateWithoutAccountsInput> | SkinCreateWithoutAccountsInput[] | SkinUncheckedCreateWithoutAccountsInput[]
    connectOrCreate?: SkinCreateOrConnectWithoutAccountsInput | SkinCreateOrConnectWithoutAccountsInput[]
    connect?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
  }

  export type PriceTierCreateNestedOneWithoutAccountsInput = {
    create?: XOR<PriceTierCreateWithoutAccountsInput, PriceTierUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: PriceTierCreateOrConnectWithoutAccountsInput
    connect?: PriceTierWhereUniqueInput
  }

  export type ImageUploadCreateNestedOneWithoutThumbnailOfInput = {
    create?: XOR<ImageUploadCreateWithoutThumbnailOfInput, ImageUploadUncheckedCreateWithoutThumbnailOfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutThumbnailOfInput
    connect?: ImageUploadWhereUniqueInput
  }

  export type ImageUploadCreateNestedManyWithoutAccountInput = {
    create?: XOR<ImageUploadCreateWithoutAccountInput, ImageUploadUncheckedCreateWithoutAccountInput> | ImageUploadCreateWithoutAccountInput[] | ImageUploadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ImageUploadCreateOrConnectWithoutAccountInput | ImageUploadCreateOrConnectWithoutAccountInput[]
    createMany?: ImageUploadCreateManyAccountInputEnvelope
    connect?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
  }

  export type AccountResetLogCreateNestedManyWithoutAccountInput = {
    create?: XOR<AccountResetLogCreateWithoutAccountInput, AccountResetLogUncheckedCreateWithoutAccountInput> | AccountResetLogCreateWithoutAccountInput[] | AccountResetLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountResetLogCreateOrConnectWithoutAccountInput | AccountResetLogCreateOrConnectWithoutAccountInput[]
    createMany?: AccountResetLogCreateManyAccountInputEnvelope
    connect?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutAccountInput = {
    create?: XOR<BookingCreateWithoutAccountInput, BookingUncheckedCreateWithoutAccountInput> | BookingCreateWithoutAccountInput[] | BookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutAccountInput | BookingCreateOrConnectWithoutAccountInput[]
    createMany?: BookingCreateManyAccountInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type SkinUncheckedCreateNestedManyWithoutAccountsInput = {
    create?: XOR<SkinCreateWithoutAccountsInput, SkinUncheckedCreateWithoutAccountsInput> | SkinCreateWithoutAccountsInput[] | SkinUncheckedCreateWithoutAccountsInput[]
    connectOrCreate?: SkinCreateOrConnectWithoutAccountsInput | SkinCreateOrConnectWithoutAccountsInput[]
    connect?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
  }

  export type ImageUploadUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<ImageUploadCreateWithoutAccountInput, ImageUploadUncheckedCreateWithoutAccountInput> | ImageUploadCreateWithoutAccountInput[] | ImageUploadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ImageUploadCreateOrConnectWithoutAccountInput | ImageUploadCreateOrConnectWithoutAccountInput[]
    createMany?: ImageUploadCreateManyAccountInputEnvelope
    connect?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
  }

  export type AccountResetLogUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<AccountResetLogCreateWithoutAccountInput, AccountResetLogUncheckedCreateWithoutAccountInput> | AccountResetLogCreateWithoutAccountInput[] | AccountResetLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountResetLogCreateOrConnectWithoutAccountInput | AccountResetLogCreateOrConnectWithoutAccountInput[]
    createMany?: AccountResetLogCreateManyAccountInputEnvelope
    connect?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<BookingCreateWithoutAccountInput, BookingUncheckedCreateWithoutAccountInput> | BookingCreateWithoutAccountInput[] | BookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutAccountInput | BookingCreateOrConnectWithoutAccountInput[]
    createMany?: BookingCreateManyAccountInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SkinUpdateManyWithoutAccountsNestedInput = {
    create?: XOR<SkinCreateWithoutAccountsInput, SkinUncheckedCreateWithoutAccountsInput> | SkinCreateWithoutAccountsInput[] | SkinUncheckedCreateWithoutAccountsInput[]
    connectOrCreate?: SkinCreateOrConnectWithoutAccountsInput | SkinCreateOrConnectWithoutAccountsInput[]
    upsert?: SkinUpsertWithWhereUniqueWithoutAccountsInput | SkinUpsertWithWhereUniqueWithoutAccountsInput[]
    set?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    disconnect?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    delete?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    connect?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    update?: SkinUpdateWithWhereUniqueWithoutAccountsInput | SkinUpdateWithWhereUniqueWithoutAccountsInput[]
    updateMany?: SkinUpdateManyWithWhereWithoutAccountsInput | SkinUpdateManyWithWhereWithoutAccountsInput[]
    deleteMany?: SkinScalarWhereInput | SkinScalarWhereInput[]
  }

  export type PriceTierUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<PriceTierCreateWithoutAccountsInput, PriceTierUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: PriceTierCreateOrConnectWithoutAccountsInput
    upsert?: PriceTierUpsertWithoutAccountsInput
    connect?: PriceTierWhereUniqueInput
    update?: XOR<XOR<PriceTierUpdateToOneWithWhereWithoutAccountsInput, PriceTierUpdateWithoutAccountsInput>, PriceTierUncheckedUpdateWithoutAccountsInput>
  }

  export type ImageUploadUpdateOneWithoutThumbnailOfNestedInput = {
    create?: XOR<ImageUploadCreateWithoutThumbnailOfInput, ImageUploadUncheckedCreateWithoutThumbnailOfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutThumbnailOfInput
    upsert?: ImageUploadUpsertWithoutThumbnailOfInput
    disconnect?: ImageUploadWhereInput | boolean
    delete?: ImageUploadWhereInput | boolean
    connect?: ImageUploadWhereUniqueInput
    update?: XOR<XOR<ImageUploadUpdateToOneWithWhereWithoutThumbnailOfInput, ImageUploadUpdateWithoutThumbnailOfInput>, ImageUploadUncheckedUpdateWithoutThumbnailOfInput>
  }

  export type ImageUploadUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ImageUploadCreateWithoutAccountInput, ImageUploadUncheckedCreateWithoutAccountInput> | ImageUploadCreateWithoutAccountInput[] | ImageUploadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ImageUploadCreateOrConnectWithoutAccountInput | ImageUploadCreateOrConnectWithoutAccountInput[]
    upsert?: ImageUploadUpsertWithWhereUniqueWithoutAccountInput | ImageUploadUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ImageUploadCreateManyAccountInputEnvelope
    set?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    disconnect?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    delete?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    connect?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    update?: ImageUploadUpdateWithWhereUniqueWithoutAccountInput | ImageUploadUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ImageUploadUpdateManyWithWhereWithoutAccountInput | ImageUploadUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ImageUploadScalarWhereInput | ImageUploadScalarWhereInput[]
  }

  export type AccountResetLogUpdateManyWithoutAccountNestedInput = {
    create?: XOR<AccountResetLogCreateWithoutAccountInput, AccountResetLogUncheckedCreateWithoutAccountInput> | AccountResetLogCreateWithoutAccountInput[] | AccountResetLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountResetLogCreateOrConnectWithoutAccountInput | AccountResetLogCreateOrConnectWithoutAccountInput[]
    upsert?: AccountResetLogUpsertWithWhereUniqueWithoutAccountInput | AccountResetLogUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: AccountResetLogCreateManyAccountInputEnvelope
    set?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    disconnect?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    delete?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    connect?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    update?: AccountResetLogUpdateWithWhereUniqueWithoutAccountInput | AccountResetLogUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: AccountResetLogUpdateManyWithWhereWithoutAccountInput | AccountResetLogUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: AccountResetLogScalarWhereInput | AccountResetLogScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutAccountNestedInput = {
    create?: XOR<BookingCreateWithoutAccountInput, BookingUncheckedCreateWithoutAccountInput> | BookingCreateWithoutAccountInput[] | BookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutAccountInput | BookingCreateOrConnectWithoutAccountInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutAccountInput | BookingUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: BookingCreateManyAccountInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutAccountInput | BookingUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutAccountInput | BookingUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type SkinUncheckedUpdateManyWithoutAccountsNestedInput = {
    create?: XOR<SkinCreateWithoutAccountsInput, SkinUncheckedCreateWithoutAccountsInput> | SkinCreateWithoutAccountsInput[] | SkinUncheckedCreateWithoutAccountsInput[]
    connectOrCreate?: SkinCreateOrConnectWithoutAccountsInput | SkinCreateOrConnectWithoutAccountsInput[]
    upsert?: SkinUpsertWithWhereUniqueWithoutAccountsInput | SkinUpsertWithWhereUniqueWithoutAccountsInput[]
    set?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    disconnect?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    delete?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    connect?: SkinWhereUniqueInput | SkinWhereUniqueInput[]
    update?: SkinUpdateWithWhereUniqueWithoutAccountsInput | SkinUpdateWithWhereUniqueWithoutAccountsInput[]
    updateMany?: SkinUpdateManyWithWhereWithoutAccountsInput | SkinUpdateManyWithWhereWithoutAccountsInput[]
    deleteMany?: SkinScalarWhereInput | SkinScalarWhereInput[]
  }

  export type ImageUploadUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ImageUploadCreateWithoutAccountInput, ImageUploadUncheckedCreateWithoutAccountInput> | ImageUploadCreateWithoutAccountInput[] | ImageUploadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ImageUploadCreateOrConnectWithoutAccountInput | ImageUploadCreateOrConnectWithoutAccountInput[]
    upsert?: ImageUploadUpsertWithWhereUniqueWithoutAccountInput | ImageUploadUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ImageUploadCreateManyAccountInputEnvelope
    set?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    disconnect?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    delete?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    connect?: ImageUploadWhereUniqueInput | ImageUploadWhereUniqueInput[]
    update?: ImageUploadUpdateWithWhereUniqueWithoutAccountInput | ImageUploadUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ImageUploadUpdateManyWithWhereWithoutAccountInput | ImageUploadUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ImageUploadScalarWhereInput | ImageUploadScalarWhereInput[]
  }

  export type AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<AccountResetLogCreateWithoutAccountInput, AccountResetLogUncheckedCreateWithoutAccountInput> | AccountResetLogCreateWithoutAccountInput[] | AccountResetLogUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: AccountResetLogCreateOrConnectWithoutAccountInput | AccountResetLogCreateOrConnectWithoutAccountInput[]
    upsert?: AccountResetLogUpsertWithWhereUniqueWithoutAccountInput | AccountResetLogUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: AccountResetLogCreateManyAccountInputEnvelope
    set?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    disconnect?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    delete?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    connect?: AccountResetLogWhereUniqueInput | AccountResetLogWhereUniqueInput[]
    update?: AccountResetLogUpdateWithWhereUniqueWithoutAccountInput | AccountResetLogUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: AccountResetLogUpdateManyWithWhereWithoutAccountInput | AccountResetLogUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: AccountResetLogScalarWhereInput | AccountResetLogScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<BookingCreateWithoutAccountInput, BookingUncheckedCreateWithoutAccountInput> | BookingCreateWithoutAccountInput[] | BookingUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutAccountInput | BookingCreateOrConnectWithoutAccountInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutAccountInput | BookingUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: BookingCreateManyAccountInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutAccountInput | BookingUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutAccountInput | BookingUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutResetLogsInput = {
    create?: XOR<AccountCreateWithoutResetLogsInput, AccountUncheckedCreateWithoutResetLogsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutResetLogsInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountUpdateOneRequiredWithoutResetLogsNestedInput = {
    create?: XOR<AccountCreateWithoutResetLogsInput, AccountUncheckedCreateWithoutResetLogsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutResetLogsInput
    upsert?: AccountUpsertWithoutResetLogsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutResetLogsInput, AccountUpdateWithoutResetLogsInput>, AccountUncheckedUpdateWithoutResetLogsInput>
  }

  export type AccountCreateNestedManyWithoutPriceTierInput = {
    create?: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput> | AccountCreateWithoutPriceTierInput[] | AccountUncheckedCreateWithoutPriceTierInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutPriceTierInput | AccountCreateOrConnectWithoutPriceTierInput[]
    createMany?: AccountCreateManyPriceTierInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PriceListCreateNestedManyWithoutTierInput = {
    create?: XOR<PriceListCreateWithoutTierInput, PriceListUncheckedCreateWithoutTierInput> | PriceListCreateWithoutTierInput[] | PriceListUncheckedCreateWithoutTierInput[]
    connectOrCreate?: PriceListCreateOrConnectWithoutTierInput | PriceListCreateOrConnectWithoutTierInput[]
    createMany?: PriceListCreateManyTierInputEnvelope
    connect?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutPriceTierInput = {
    create?: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput> | AccountCreateWithoutPriceTierInput[] | AccountUncheckedCreateWithoutPriceTierInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutPriceTierInput | AccountCreateOrConnectWithoutPriceTierInput[]
    createMany?: AccountCreateManyPriceTierInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PriceListUncheckedCreateNestedManyWithoutTierInput = {
    create?: XOR<PriceListCreateWithoutTierInput, PriceListUncheckedCreateWithoutTierInput> | PriceListCreateWithoutTierInput[] | PriceListUncheckedCreateWithoutTierInput[]
    connectOrCreate?: PriceListCreateOrConnectWithoutTierInput | PriceListCreateOrConnectWithoutTierInput[]
    createMany?: PriceListCreateManyTierInputEnvelope
    connect?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
  }

  export type AccountUpdateManyWithoutPriceTierNestedInput = {
    create?: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput> | AccountCreateWithoutPriceTierInput[] | AccountUncheckedCreateWithoutPriceTierInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutPriceTierInput | AccountCreateOrConnectWithoutPriceTierInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutPriceTierInput | AccountUpsertWithWhereUniqueWithoutPriceTierInput[]
    createMany?: AccountCreateManyPriceTierInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutPriceTierInput | AccountUpdateWithWhereUniqueWithoutPriceTierInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutPriceTierInput | AccountUpdateManyWithWhereWithoutPriceTierInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PriceListUpdateManyWithoutTierNestedInput = {
    create?: XOR<PriceListCreateWithoutTierInput, PriceListUncheckedCreateWithoutTierInput> | PriceListCreateWithoutTierInput[] | PriceListUncheckedCreateWithoutTierInput[]
    connectOrCreate?: PriceListCreateOrConnectWithoutTierInput | PriceListCreateOrConnectWithoutTierInput[]
    upsert?: PriceListUpsertWithWhereUniqueWithoutTierInput | PriceListUpsertWithWhereUniqueWithoutTierInput[]
    createMany?: PriceListCreateManyTierInputEnvelope
    set?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    disconnect?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    delete?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    connect?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    update?: PriceListUpdateWithWhereUniqueWithoutTierInput | PriceListUpdateWithWhereUniqueWithoutTierInput[]
    updateMany?: PriceListUpdateManyWithWhereWithoutTierInput | PriceListUpdateManyWithWhereWithoutTierInput[]
    deleteMany?: PriceListScalarWhereInput | PriceListScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutPriceTierNestedInput = {
    create?: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput> | AccountCreateWithoutPriceTierInput[] | AccountUncheckedCreateWithoutPriceTierInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutPriceTierInput | AccountCreateOrConnectWithoutPriceTierInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutPriceTierInput | AccountUpsertWithWhereUniqueWithoutPriceTierInput[]
    createMany?: AccountCreateManyPriceTierInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutPriceTierInput | AccountUpdateWithWhereUniqueWithoutPriceTierInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutPriceTierInput | AccountUpdateManyWithWhereWithoutPriceTierInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PriceListUncheckedUpdateManyWithoutTierNestedInput = {
    create?: XOR<PriceListCreateWithoutTierInput, PriceListUncheckedCreateWithoutTierInput> | PriceListCreateWithoutTierInput[] | PriceListUncheckedCreateWithoutTierInput[]
    connectOrCreate?: PriceListCreateOrConnectWithoutTierInput | PriceListCreateOrConnectWithoutTierInput[]
    upsert?: PriceListUpsertWithWhereUniqueWithoutTierInput | PriceListUpsertWithWhereUniqueWithoutTierInput[]
    createMany?: PriceListCreateManyTierInputEnvelope
    set?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    disconnect?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    delete?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    connect?: PriceListWhereUniqueInput | PriceListWhereUniqueInput[]
    update?: PriceListUpdateWithWhereUniqueWithoutTierInput | PriceListUpdateWithWhereUniqueWithoutTierInput[]
    updateMany?: PriceListUpdateManyWithWhereWithoutTierInput | PriceListUpdateManyWithWhereWithoutTierInput[]
    deleteMany?: PriceListScalarWhereInput | PriceListScalarWhereInput[]
  }

  export type PriceTierCreateNestedOneWithoutPriceListInput = {
    create?: XOR<PriceTierCreateWithoutPriceListInput, PriceTierUncheckedCreateWithoutPriceListInput>
    connectOrCreate?: PriceTierCreateOrConnectWithoutPriceListInput
    connect?: PriceTierWhereUniqueInput
  }

  export type PriceTierUpdateOneRequiredWithoutPriceListNestedInput = {
    create?: XOR<PriceTierCreateWithoutPriceListInput, PriceTierUncheckedCreateWithoutPriceListInput>
    connectOrCreate?: PriceTierCreateOrConnectWithoutPriceListInput
    upsert?: PriceTierUpsertWithoutPriceListInput
    connect?: PriceTierWhereUniqueInput
    update?: XOR<XOR<PriceTierUpdateToOneWithWhereWithoutPriceListInput, PriceTierUpdateWithoutPriceListInput>, PriceTierUncheckedUpdateWithoutPriceListInput>
  }

  export type AccountCreateNestedManyWithoutSkinListInput = {
    create?: XOR<AccountCreateWithoutSkinListInput, AccountUncheckedCreateWithoutSkinListInput> | AccountCreateWithoutSkinListInput[] | AccountUncheckedCreateWithoutSkinListInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutSkinListInput | AccountCreateOrConnectWithoutSkinListInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutSkinListInput = {
    create?: XOR<AccountCreateWithoutSkinListInput, AccountUncheckedCreateWithoutSkinListInput> | AccountCreateWithoutSkinListInput[] | AccountUncheckedCreateWithoutSkinListInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutSkinListInput | AccountCreateOrConnectWithoutSkinListInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type AccountUpdateManyWithoutSkinListNestedInput = {
    create?: XOR<AccountCreateWithoutSkinListInput, AccountUncheckedCreateWithoutSkinListInput> | AccountCreateWithoutSkinListInput[] | AccountUncheckedCreateWithoutSkinListInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutSkinListInput | AccountCreateOrConnectWithoutSkinListInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutSkinListInput | AccountUpsertWithWhereUniqueWithoutSkinListInput[]
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutSkinListInput | AccountUpdateWithWhereUniqueWithoutSkinListInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutSkinListInput | AccountUpdateManyWithWhereWithoutSkinListInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutSkinListNestedInput = {
    create?: XOR<AccountCreateWithoutSkinListInput, AccountUncheckedCreateWithoutSkinListInput> | AccountCreateWithoutSkinListInput[] | AccountUncheckedCreateWithoutSkinListInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutSkinListInput | AccountCreateOrConnectWithoutSkinListInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutSkinListInput | AccountUpsertWithWhereUniqueWithoutSkinListInput[]
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutSkinListInput | AccountUpdateWithWhereUniqueWithoutSkinListInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutSkinListInput | AccountUpdateManyWithWhereWithoutSkinListInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutThumbnailInput = {
    create?: XOR<AccountCreateWithoutThumbnailInput, AccountUncheckedCreateWithoutThumbnailInput>
    connectOrCreate?: AccountCreateOrConnectWithoutThumbnailInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutOtherImagesInput = {
    create?: XOR<AccountCreateWithoutOtherImagesInput, AccountUncheckedCreateWithoutOtherImagesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutOtherImagesInput
    connect?: AccountWhereUniqueInput
  }

  export type CarouselSlideCreateNestedOneWithoutImageInput = {
    create?: XOR<CarouselSlideCreateWithoutImageInput, CarouselSlideUncheckedCreateWithoutImageInput>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImageInput
    connect?: CarouselSlideWhereUniqueInput
  }

  export type AccountUncheckedCreateNestedOneWithoutThumbnailInput = {
    create?: XOR<AccountCreateWithoutThumbnailInput, AccountUncheckedCreateWithoutThumbnailInput>
    connectOrCreate?: AccountCreateOrConnectWithoutThumbnailInput
    connect?: AccountWhereUniqueInput
  }

  export type CarouselSlideUncheckedCreateNestedOneWithoutImageInput = {
    create?: XOR<CarouselSlideCreateWithoutImageInput, CarouselSlideUncheckedCreateWithoutImageInput>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImageInput
    connect?: CarouselSlideWhereUniqueInput
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type AccountUpdateOneWithoutThumbnailNestedInput = {
    create?: XOR<AccountCreateWithoutThumbnailInput, AccountUncheckedCreateWithoutThumbnailInput>
    connectOrCreate?: AccountCreateOrConnectWithoutThumbnailInput
    upsert?: AccountUpsertWithoutThumbnailInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutThumbnailInput, AccountUpdateWithoutThumbnailInput>, AccountUncheckedUpdateWithoutThumbnailInput>
  }

  export type AccountUpdateOneWithoutOtherImagesNestedInput = {
    create?: XOR<AccountCreateWithoutOtherImagesInput, AccountUncheckedCreateWithoutOtherImagesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutOtherImagesInput
    upsert?: AccountUpsertWithoutOtherImagesInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutOtherImagesInput, AccountUpdateWithoutOtherImagesInput>, AccountUncheckedUpdateWithoutOtherImagesInput>
  }

  export type CarouselSlideUpdateOneWithoutImageNestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImageInput, CarouselSlideUncheckedCreateWithoutImageInput>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImageInput
    upsert?: CarouselSlideUpsertWithoutImageInput
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImageInput, CarouselSlideUpdateWithoutImageInput>, CarouselSlideUncheckedUpdateWithoutImageInput>
  }

  export type AccountUncheckedUpdateOneWithoutThumbnailNestedInput = {
    create?: XOR<AccountCreateWithoutThumbnailInput, AccountUncheckedCreateWithoutThumbnailInput>
    connectOrCreate?: AccountCreateOrConnectWithoutThumbnailInput
    upsert?: AccountUpsertWithoutThumbnailInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutThumbnailInput, AccountUpdateWithoutThumbnailInput>, AccountUncheckedUpdateWithoutThumbnailInput>
  }

  export type CarouselSlideUncheckedUpdateOneWithoutImageNestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImageInput, CarouselSlideUncheckedCreateWithoutImageInput>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImageInput
    upsert?: CarouselSlideUpsertWithoutImageInput
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImageInput, CarouselSlideUpdateWithoutImageInput>, CarouselSlideUncheckedUpdateWithoutImageInput>
  }

  export type BookingCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type BookingUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput> | BookingCreateWithoutCustomerInput[] | BookingUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutCustomerInput | BookingCreateOrConnectWithoutCustomerInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutCustomerInput | BookingUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: BookingCreateManyCustomerInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutCustomerInput | BookingUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutCustomerInput | BookingUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type ImageUploadCreateNestedOneWithoutSlideOfInput = {
    create?: XOR<ImageUploadCreateWithoutSlideOfInput, ImageUploadUncheckedCreateWithoutSlideOfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlideOfInput
    connect?: ImageUploadWhereUniqueInput
  }

  export type ImageUploadUpdateOneRequiredWithoutSlideOfNestedInput = {
    create?: XOR<ImageUploadCreateWithoutSlideOfInput, ImageUploadUncheckedCreateWithoutSlideOfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlideOfInput
    upsert?: ImageUploadUpsertWithoutSlideOfInput
    connect?: ImageUploadWhereUniqueInput
    update?: XOR<XOR<ImageUploadUpdateToOneWithWhereWithoutSlideOfInput, ImageUploadUpdateWithoutSlideOfInput>, ImageUploadUncheckedUpdateWithoutSlideOfInput>
  }

  export type PaymentCreateNestedManyWithoutBookingInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput> | PaymentCreateWithoutBookingInput[] | PaymentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput | PaymentCreateOrConnectWithoutBookingInput[]
    createMany?: PaymentCreateManyBookingInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CustomerCreateNestedOneWithoutBookingInput = {
    create?: XOR<CustomerCreateWithoutBookingInput, CustomerUncheckedCreateWithoutBookingInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBookingInput
    connect?: CustomerWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutBookingInput = {
    create?: XOR<AccountCreateWithoutBookingInput, AccountUncheckedCreateWithoutBookingInput>
    connectOrCreate?: AccountCreateOrConnectWithoutBookingInput
    connect?: AccountWhereUniqueInput
  }

  export type PaymentUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput> | PaymentCreateWithoutBookingInput[] | PaymentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput | PaymentCreateOrConnectWithoutBookingInput[]
    createMany?: PaymentCreateManyBookingInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type NullableEnumTypeFieldUpdateOperationsInput = {
    set?: $Enums.Type | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PaymentUpdateManyWithoutBookingNestedInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput> | PaymentCreateWithoutBookingInput[] | PaymentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput | PaymentCreateOrConnectWithoutBookingInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutBookingInput | PaymentUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: PaymentCreateManyBookingInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutBookingInput | PaymentUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutBookingInput | PaymentUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CustomerUpdateOneWithoutBookingNestedInput = {
    create?: XOR<CustomerCreateWithoutBookingInput, CustomerUncheckedCreateWithoutBookingInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutBookingInput
    upsert?: CustomerUpsertWithoutBookingInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutBookingInput, CustomerUpdateWithoutBookingInput>, CustomerUncheckedUpdateWithoutBookingInput>
  }

  export type AccountUpdateOneRequiredWithoutBookingNestedInput = {
    create?: XOR<AccountCreateWithoutBookingInput, AccountUncheckedCreateWithoutBookingInput>
    connectOrCreate?: AccountCreateOrConnectWithoutBookingInput
    upsert?: AccountUpsertWithoutBookingInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutBookingInput, AccountUpdateWithoutBookingInput>, AccountUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput> | PaymentCreateWithoutBookingInput[] | PaymentUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutBookingInput | PaymentCreateOrConnectWithoutBookingInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutBookingInput | PaymentUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: PaymentCreateManyBookingInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutBookingInput | PaymentUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutBookingInput | PaymentUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type BookingCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentsInput
    connect?: BookingWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: $Enums.Provider
  }

  export type NullableEnumPaymentMethodTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethodType | null
  }

  export type BookingUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: BookingCreateOrConnectWithoutPaymentsInput
    upsert?: BookingUpsertWithoutPaymentsInput
    disconnect?: BookingWhereInput | boolean
    delete?: BookingWhereInput | boolean
    connect?: BookingWhereUniqueInput
    update?: XOR<XOR<BookingUpdateToOneWithWhereWithoutPaymentsInput, BookingUpdateWithoutPaymentsInput>, BookingUncheckedUpdateWithoutPaymentsInput>
  }

  export type EnumTypeFieldUpdateOperationsInput = {
    set?: $Enums.Type
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeNullableFilter<$PrismaModel> | $Enums.Type | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.Type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumTypeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type NestedEnumPaymentMethodTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethodType | EnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodTypeNullableFilter<$PrismaModel> | $Enums.PaymentMethodType | null
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethodType | EnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethodType[] | ListEnumPaymentMethodTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethodType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeFilter<$PrismaModel> | $Enums.Type
  }

  export type NestedEnumTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Type | EnumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Type[] | ListEnumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTypeWithAggregatesFilter<$PrismaModel> | $Enums.Type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTypeFilter<$PrismaModel>
    _max?: NestedEnumTypeFilter<$PrismaModel>
  }

  export type SkinCreateWithoutAccountsInput = {
    name: string
    imageUrl: string
    keyword?: string | null
  }

  export type SkinUncheckedCreateWithoutAccountsInput = {
    id?: number
    name: string
    imageUrl: string
    keyword?: string | null
  }

  export type SkinCreateOrConnectWithoutAccountsInput = {
    where: SkinWhereUniqueInput
    create: XOR<SkinCreateWithoutAccountsInput, SkinUncheckedCreateWithoutAccountsInput>
  }

  export type PriceTierCreateWithoutAccountsInput = {
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    priceList?: PriceListCreateNestedManyWithoutTierInput
  }

  export type PriceTierUncheckedCreateWithoutAccountsInput = {
    id?: number
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    priceList?: PriceListUncheckedCreateNestedManyWithoutTierInput
  }

  export type PriceTierCreateOrConnectWithoutAccountsInput = {
    where: PriceTierWhereUniqueInput
    create: XOR<PriceTierCreateWithoutAccountsInput, PriceTierUncheckedCreateWithoutAccountsInput>
  }

  export type ImageUploadCreateWithoutThumbnailOfInput = {
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    account?: AccountCreateNestedOneWithoutOtherImagesInput
    slideOf?: CarouselSlideCreateNestedOneWithoutImageInput
  }

  export type ImageUploadUncheckedCreateWithoutThumbnailOfInput = {
    id?: number
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    slideOf?: CarouselSlideUncheckedCreateNestedOneWithoutImageInput
  }

  export type ImageUploadCreateOrConnectWithoutThumbnailOfInput = {
    where: ImageUploadWhereUniqueInput
    create: XOR<ImageUploadCreateWithoutThumbnailOfInput, ImageUploadUncheckedCreateWithoutThumbnailOfInput>
  }

  export type ImageUploadCreateWithoutAccountInput = {
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    slideOf?: CarouselSlideCreateNestedOneWithoutImageInput
  }

  export type ImageUploadUncheckedCreateWithoutAccountInput = {
    id?: number
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
    slideOf?: CarouselSlideUncheckedCreateNestedOneWithoutImageInput
  }

  export type ImageUploadCreateOrConnectWithoutAccountInput = {
    where: ImageUploadWhereUniqueInput
    create: XOR<ImageUploadCreateWithoutAccountInput, ImageUploadUncheckedCreateWithoutAccountInput>
  }

  export type ImageUploadCreateManyAccountInputEnvelope = {
    data: ImageUploadCreateManyAccountInput | ImageUploadCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type AccountResetLogCreateWithoutAccountInput = {
    previousExpireAt?: Date | string | null
    resetAt?: Date | string
  }

  export type AccountResetLogUncheckedCreateWithoutAccountInput = {
    id?: number
    previousExpireAt?: Date | string | null
    resetAt?: Date | string
  }

  export type AccountResetLogCreateOrConnectWithoutAccountInput = {
    where: AccountResetLogWhereUniqueInput
    create: XOR<AccountResetLogCreateWithoutAccountInput, AccountResetLogUncheckedCreateWithoutAccountInput>
  }

  export type AccountResetLogCreateManyAccountInputEnvelope = {
    data: AccountResetLogCreateManyAccountInput | AccountResetLogCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutAccountInput = {
    id?: string
    readableNumber?: bigint | number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    payments?: PaymentCreateNestedManyWithoutBookingInput
    customer?: CustomerCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutAccountInput = {
    id?: string
    readableNumber?: bigint | number
    customerId?: number | null
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutAccountInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutAccountInput, BookingUncheckedCreateWithoutAccountInput>
  }

  export type BookingCreateManyAccountInputEnvelope = {
    data: BookingCreateManyAccountInput | BookingCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type SkinUpsertWithWhereUniqueWithoutAccountsInput = {
    where: SkinWhereUniqueInput
    update: XOR<SkinUpdateWithoutAccountsInput, SkinUncheckedUpdateWithoutAccountsInput>
    create: XOR<SkinCreateWithoutAccountsInput, SkinUncheckedCreateWithoutAccountsInput>
  }

  export type SkinUpdateWithWhereUniqueWithoutAccountsInput = {
    where: SkinWhereUniqueInput
    data: XOR<SkinUpdateWithoutAccountsInput, SkinUncheckedUpdateWithoutAccountsInput>
  }

  export type SkinUpdateManyWithWhereWithoutAccountsInput = {
    where: SkinScalarWhereInput
    data: XOR<SkinUpdateManyMutationInput, SkinUncheckedUpdateManyWithoutAccountsInput>
  }

  export type SkinScalarWhereInput = {
    AND?: SkinScalarWhereInput | SkinScalarWhereInput[]
    OR?: SkinScalarWhereInput[]
    NOT?: SkinScalarWhereInput | SkinScalarWhereInput[]
    id?: IntFilter<"Skin"> | number
    name?: StringFilter<"Skin"> | string
    imageUrl?: StringFilter<"Skin"> | string
    keyword?: StringNullableFilter<"Skin"> | string | null
  }

  export type PriceTierUpsertWithoutAccountsInput = {
    update: XOR<PriceTierUpdateWithoutAccountsInput, PriceTierUncheckedUpdateWithoutAccountsInput>
    create: XOR<PriceTierCreateWithoutAccountsInput, PriceTierUncheckedCreateWithoutAccountsInput>
    where?: PriceTierWhereInput
  }

  export type PriceTierUpdateToOneWithWhereWithoutAccountsInput = {
    where?: PriceTierWhereInput
    data: XOR<PriceTierUpdateWithoutAccountsInput, PriceTierUncheckedUpdateWithoutAccountsInput>
  }

  export type PriceTierUpdateWithoutAccountsInput = {
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceList?: PriceListUpdateManyWithoutTierNestedInput
  }

  export type PriceTierUncheckedUpdateWithoutAccountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceList?: PriceListUncheckedUpdateManyWithoutTierNestedInput
  }

  export type ImageUploadUpsertWithoutThumbnailOfInput = {
    update: XOR<ImageUploadUpdateWithoutThumbnailOfInput, ImageUploadUncheckedUpdateWithoutThumbnailOfInput>
    create: XOR<ImageUploadCreateWithoutThumbnailOfInput, ImageUploadUncheckedCreateWithoutThumbnailOfInput>
    where?: ImageUploadWhereInput
  }

  export type ImageUploadUpdateToOneWithWhereWithoutThumbnailOfInput = {
    where?: ImageUploadWhereInput
    data: XOR<ImageUploadUpdateWithoutThumbnailOfInput, ImageUploadUncheckedUpdateWithoutThumbnailOfInput>
  }

  export type ImageUploadUpdateWithoutThumbnailOfInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
    slideOf?: CarouselSlideUpdateOneWithoutImageNestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutThumbnailOfInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    slideOf?: CarouselSlideUncheckedUpdateOneWithoutImageNestedInput
  }

  export type ImageUploadUpsertWithWhereUniqueWithoutAccountInput = {
    where: ImageUploadWhereUniqueInput
    update: XOR<ImageUploadUpdateWithoutAccountInput, ImageUploadUncheckedUpdateWithoutAccountInput>
    create: XOR<ImageUploadCreateWithoutAccountInput, ImageUploadUncheckedCreateWithoutAccountInput>
  }

  export type ImageUploadUpdateWithWhereUniqueWithoutAccountInput = {
    where: ImageUploadWhereUniqueInput
    data: XOR<ImageUploadUpdateWithoutAccountInput, ImageUploadUncheckedUpdateWithoutAccountInput>
  }

  export type ImageUploadUpdateManyWithWhereWithoutAccountInput = {
    where: ImageUploadScalarWhereInput
    data: XOR<ImageUploadUpdateManyMutationInput, ImageUploadUncheckedUpdateManyWithoutAccountInput>
  }

  export type ImageUploadScalarWhereInput = {
    AND?: ImageUploadScalarWhereInput | ImageUploadScalarWhereInput[]
    OR?: ImageUploadScalarWhereInput[]
    NOT?: ImageUploadScalarWhereInput | ImageUploadScalarWhereInput[]
    id?: IntFilter<"ImageUpload"> | number
    imageUrl?: StringFilter<"ImageUpload"> | string
    type?: EnumMediaTypeFilter<"ImageUpload"> | $Enums.MediaType
    createdAt?: DateTimeFilter<"ImageUpload"> | Date | string
    updatedAt?: DateTimeFilter<"ImageUpload"> | Date | string
    accountId?: IntNullableFilter<"ImageUpload"> | number | null
  }

  export type AccountResetLogUpsertWithWhereUniqueWithoutAccountInput = {
    where: AccountResetLogWhereUniqueInput
    update: XOR<AccountResetLogUpdateWithoutAccountInput, AccountResetLogUncheckedUpdateWithoutAccountInput>
    create: XOR<AccountResetLogCreateWithoutAccountInput, AccountResetLogUncheckedCreateWithoutAccountInput>
  }

  export type AccountResetLogUpdateWithWhereUniqueWithoutAccountInput = {
    where: AccountResetLogWhereUniqueInput
    data: XOR<AccountResetLogUpdateWithoutAccountInput, AccountResetLogUncheckedUpdateWithoutAccountInput>
  }

  export type AccountResetLogUpdateManyWithWhereWithoutAccountInput = {
    where: AccountResetLogScalarWhereInput
    data: XOR<AccountResetLogUpdateManyMutationInput, AccountResetLogUncheckedUpdateManyWithoutAccountInput>
  }

  export type AccountResetLogScalarWhereInput = {
    AND?: AccountResetLogScalarWhereInput | AccountResetLogScalarWhereInput[]
    OR?: AccountResetLogScalarWhereInput[]
    NOT?: AccountResetLogScalarWhereInput | AccountResetLogScalarWhereInput[]
    id?: IntFilter<"AccountResetLog"> | number
    accountId?: IntFilter<"AccountResetLog"> | number
    previousExpireAt?: DateTimeNullableFilter<"AccountResetLog"> | Date | string | null
    resetAt?: DateTimeFilter<"AccountResetLog"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutAccountInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutAccountInput, BookingUncheckedUpdateWithoutAccountInput>
    create: XOR<BookingCreateWithoutAccountInput, BookingUncheckedCreateWithoutAccountInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutAccountInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutAccountInput, BookingUncheckedUpdateWithoutAccountInput>
  }

  export type BookingUpdateManyWithWhereWithoutAccountInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutAccountInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    readableNumber?: BigIntFilter<"Booking"> | bigint | number
    customerId?: IntNullableFilter<"Booking"> | number | null
    accountId?: IntFilter<"Booking"> | number
    status?: EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus
    duration?: StringFilter<"Booking"> | string
    quantity?: IntFilter<"Booking"> | number
    immediate?: BoolFilter<"Booking"> | boolean
    startAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    endAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    expiredAt?: DateTimeNullableFilter<"Booking"> | Date | string | null
    mainValuePerUnit?: IntFilter<"Booking"> | number
    othersValuePerUnit?: IntNullableFilter<"Booking"> | number | null
    voucherName?: StringNullableFilter<"Booking"> | string | null
    voucherType?: EnumTypeNullableFilter<"Booking"> | $Enums.Type | null
    voucherAmount?: FloatNullableFilter<"Booking"> | number | null
    voucherMaxDiscount?: FloatNullableFilter<"Booking"> | number | null
    mainValue?: IntFilter<"Booking"> | number
    othersValue?: IntNullableFilter<"Booking"> | number | null
    discount?: IntNullableFilter<"Booking"> | number | null
    adminFee?: IntNullableFilter<"Booking"> | number | null
    totalValue?: IntFilter<"Booking"> | number
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    version?: IntFilter<"Booking"> | number
  }

  export type AccountCreateWithoutResetLogsInput = {
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    skinList?: SkinCreateNestedManyWithoutAccountsInput
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    Booking?: BookingCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutResetLogsInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId: number
    thumbnailId?: number | null
    skinList?: SkinUncheckedCreateNestedManyWithoutAccountsInput
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    Booking?: BookingUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutResetLogsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutResetLogsInput, AccountUncheckedCreateWithoutResetLogsInput>
  }

  export type AccountUpsertWithoutResetLogsInput = {
    update: XOR<AccountUpdateWithoutResetLogsInput, AccountUncheckedUpdateWithoutResetLogsInput>
    create: XOR<AccountCreateWithoutResetLogsInput, AccountUncheckedCreateWithoutResetLogsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutResetLogsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutResetLogsInput, AccountUncheckedUpdateWithoutResetLogsInput>
  }

  export type AccountUpdateWithoutResetLogsInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    skinList?: SkinUpdateManyWithoutAccountsNestedInput
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    Booking?: BookingUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutResetLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    skinList?: SkinUncheckedUpdateManyWithoutAccountsNestedInput
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    Booking?: BookingUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateWithoutPriceTierInput = {
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    skinList?: SkinCreateNestedManyWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
    Booking?: BookingCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutPriceTierInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    thumbnailId?: number | null
    skinList?: SkinUncheckedCreateNestedManyWithoutAccountsInput
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
    Booking?: BookingUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutPriceTierInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput>
  }

  export type AccountCreateManyPriceTierInputEnvelope = {
    data: AccountCreateManyPriceTierInput | AccountCreateManyPriceTierInput[]
    skipDuplicates?: boolean
  }

  export type PriceListCreateWithoutTierInput = {
    duration: string
    normalPrice: number
    lowPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceListUncheckedCreateWithoutTierInput = {
    id?: number
    duration: string
    normalPrice: number
    lowPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceListCreateOrConnectWithoutTierInput = {
    where: PriceListWhereUniqueInput
    create: XOR<PriceListCreateWithoutTierInput, PriceListUncheckedCreateWithoutTierInput>
  }

  export type PriceListCreateManyTierInputEnvelope = {
    data: PriceListCreateManyTierInput | PriceListCreateManyTierInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutPriceTierInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutPriceTierInput, AccountUncheckedUpdateWithoutPriceTierInput>
    create: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutPriceTierInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutPriceTierInput, AccountUncheckedUpdateWithoutPriceTierInput>
  }

  export type AccountUpdateManyWithWhereWithoutPriceTierInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutPriceTierInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: IntFilter<"Account"> | number
    username?: StringFilter<"Account"> | string
    nickname?: StringFilter<"Account"> | string
    accountCode?: StringFilter<"Account"> | string
    description?: StringNullableFilter<"Account"> | string | null
    accountRank?: StringFilter<"Account"> | string
    availabilityStatus?: EnumStatusFilter<"Account"> | $Enums.Status
    currentBookingDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    currentBookingDuration?: IntNullableFilter<"Account"> | number | null
    currentExpireAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextBookingDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextBookingDuration?: IntNullableFilter<"Account"> | number | null
    nextExpireAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    totalRentHour?: IntFilter<"Account"> | number
    rentHourUpdated?: BoolFilter<"Account"> | boolean
    password?: StringFilter<"Account"> | string
    passwordResetRequired?: BoolFilter<"Account"> | boolean
    skinCount?: IntFilter<"Account"> | number
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    isLowRank?: BoolFilter<"Account"> | boolean
    isRecommended?: BoolFilter<"Account"> | boolean
    priceTierId?: IntFilter<"Account"> | number
    thumbnailId?: IntNullableFilter<"Account"> | number | null
  }

  export type PriceListUpsertWithWhereUniqueWithoutTierInput = {
    where: PriceListWhereUniqueInput
    update: XOR<PriceListUpdateWithoutTierInput, PriceListUncheckedUpdateWithoutTierInput>
    create: XOR<PriceListCreateWithoutTierInput, PriceListUncheckedCreateWithoutTierInput>
  }

  export type PriceListUpdateWithWhereUniqueWithoutTierInput = {
    where: PriceListWhereUniqueInput
    data: XOR<PriceListUpdateWithoutTierInput, PriceListUncheckedUpdateWithoutTierInput>
  }

  export type PriceListUpdateManyWithWhereWithoutTierInput = {
    where: PriceListScalarWhereInput
    data: XOR<PriceListUpdateManyMutationInput, PriceListUncheckedUpdateManyWithoutTierInput>
  }

  export type PriceListScalarWhereInput = {
    AND?: PriceListScalarWhereInput | PriceListScalarWhereInput[]
    OR?: PriceListScalarWhereInput[]
    NOT?: PriceListScalarWhereInput | PriceListScalarWhereInput[]
    id?: IntFilter<"PriceList"> | number
    duration?: StringFilter<"PriceList"> | string
    normalPrice?: IntFilter<"PriceList"> | number
    lowPrice?: IntFilter<"PriceList"> | number
    tierId?: IntFilter<"PriceList"> | number
    createdAt?: DateTimeFilter<"PriceList"> | Date | string
    updatedAt?: DateTimeFilter<"PriceList"> | Date | string
  }

  export type PriceTierCreateWithoutPriceListInput = {
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutPriceTierInput
  }

  export type PriceTierUncheckedCreateWithoutPriceListInput = {
    id?: number
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutPriceTierInput
  }

  export type PriceTierCreateOrConnectWithoutPriceListInput = {
    where: PriceTierWhereUniqueInput
    create: XOR<PriceTierCreateWithoutPriceListInput, PriceTierUncheckedCreateWithoutPriceListInput>
  }

  export type PriceTierUpsertWithoutPriceListInput = {
    update: XOR<PriceTierUpdateWithoutPriceListInput, PriceTierUncheckedUpdateWithoutPriceListInput>
    create: XOR<PriceTierCreateWithoutPriceListInput, PriceTierUncheckedCreateWithoutPriceListInput>
    where?: PriceTierWhereInput
  }

  export type PriceTierUpdateToOneWithWhereWithoutPriceListInput = {
    where?: PriceTierWhereInput
    data: XOR<PriceTierUpdateWithoutPriceListInput, PriceTierUncheckedUpdateWithoutPriceListInput>
  }

  export type PriceTierUpdateWithoutPriceListInput = {
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutPriceTierNestedInput
  }

  export type PriceTierUncheckedUpdateWithoutPriceListInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutPriceTierNestedInput
  }

  export type AccountCreateWithoutSkinListInput = {
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
    Booking?: BookingCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutSkinListInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId: number
    thumbnailId?: number | null
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
    Booking?: BookingUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutSkinListInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutSkinListInput, AccountUncheckedCreateWithoutSkinListInput>
  }

  export type AccountUpsertWithWhereUniqueWithoutSkinListInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutSkinListInput, AccountUncheckedUpdateWithoutSkinListInput>
    create: XOR<AccountCreateWithoutSkinListInput, AccountUncheckedCreateWithoutSkinListInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutSkinListInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutSkinListInput, AccountUncheckedUpdateWithoutSkinListInput>
  }

  export type AccountUpdateManyWithWhereWithoutSkinListInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutSkinListInput>
  }

  export type AccountCreateWithoutThumbnailInput = {
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    skinList?: SkinCreateNestedManyWithoutAccountsInput
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
    Booking?: BookingCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutThumbnailInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId: number
    skinList?: SkinUncheckedCreateNestedManyWithoutAccountsInput
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
    Booking?: BookingUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutThumbnailInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutThumbnailInput, AccountUncheckedCreateWithoutThumbnailInput>
  }

  export type AccountCreateWithoutOtherImagesInput = {
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    skinList?: SkinCreateNestedManyWithoutAccountsInput
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
    Booking?: BookingCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutOtherImagesInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId: number
    thumbnailId?: number | null
    skinList?: SkinUncheckedCreateNestedManyWithoutAccountsInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
    Booking?: BookingUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutOtherImagesInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutOtherImagesInput, AccountUncheckedCreateWithoutOtherImagesInput>
  }

  export type CarouselSlideCreateWithoutImageInput = {
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideUncheckedCreateWithoutImageInput = {
    id?: number
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideCreateOrConnectWithoutImageInput = {
    where: CarouselSlideWhereUniqueInput
    create: XOR<CarouselSlideCreateWithoutImageInput, CarouselSlideUncheckedCreateWithoutImageInput>
  }

  export type AccountUpsertWithoutThumbnailInput = {
    update: XOR<AccountUpdateWithoutThumbnailInput, AccountUncheckedUpdateWithoutThumbnailInput>
    create: XOR<AccountCreateWithoutThumbnailInput, AccountUncheckedCreateWithoutThumbnailInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutThumbnailInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutThumbnailInput, AccountUncheckedUpdateWithoutThumbnailInput>
  }

  export type AccountUpdateWithoutThumbnailInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    skinList?: SkinUpdateManyWithoutAccountsNestedInput
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
    Booking?: BookingUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutThumbnailInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    skinList?: SkinUncheckedUpdateManyWithoutAccountsNestedInput
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
    Booking?: BookingUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountUpsertWithoutOtherImagesInput = {
    update: XOR<AccountUpdateWithoutOtherImagesInput, AccountUncheckedUpdateWithoutOtherImagesInput>
    create: XOR<AccountCreateWithoutOtherImagesInput, AccountUncheckedCreateWithoutOtherImagesInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutOtherImagesInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutOtherImagesInput, AccountUncheckedUpdateWithoutOtherImagesInput>
  }

  export type AccountUpdateWithoutOtherImagesInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    skinList?: SkinUpdateManyWithoutAccountsNestedInput
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
    Booking?: BookingUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutOtherImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    skinList?: SkinUncheckedUpdateManyWithoutAccountsNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
    Booking?: BookingUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type CarouselSlideUpsertWithoutImageInput = {
    update: XOR<CarouselSlideUpdateWithoutImageInput, CarouselSlideUncheckedUpdateWithoutImageInput>
    create: XOR<CarouselSlideCreateWithoutImageInput, CarouselSlideUncheckedCreateWithoutImageInput>
    where?: CarouselSlideWhereInput
  }

  export type CarouselSlideUpdateToOneWithWhereWithoutImageInput = {
    where?: CarouselSlideWhereInput
    data: XOR<CarouselSlideUpdateWithoutImageInput, CarouselSlideUncheckedUpdateWithoutImageInput>
  }

  export type CarouselSlideUpdateWithoutImageInput = {
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarouselSlideUncheckedUpdateWithoutImageInput = {
    id?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateWithoutCustomerInput = {
    id?: string
    readableNumber?: bigint | number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    payments?: PaymentCreateNestedManyWithoutBookingInput
    account: AccountCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutCustomerInput = {
    id?: string
    readableNumber?: bigint | number
    accountId: number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    payments?: PaymentUncheckedCreateNestedManyWithoutBookingInput
  }

  export type BookingCreateOrConnectWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingCreateManyCustomerInputEnvelope = {
    data: BookingCreateManyCustomerInput | BookingCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type BookingUpsertWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
    create: XOR<BookingCreateWithoutCustomerInput, BookingUncheckedCreateWithoutCustomerInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutCustomerInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutCustomerInput, BookingUncheckedUpdateWithoutCustomerInput>
  }

  export type BookingUpdateManyWithWhereWithoutCustomerInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutCustomerInput>
  }

  export type ImageUploadCreateWithoutSlideOfInput = {
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    account?: AccountCreateNestedOneWithoutOtherImagesInput
  }

  export type ImageUploadUncheckedCreateWithoutSlideOfInput = {
    id?: number
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
  }

  export type ImageUploadCreateOrConnectWithoutSlideOfInput = {
    where: ImageUploadWhereUniqueInput
    create: XOR<ImageUploadCreateWithoutSlideOfInput, ImageUploadUncheckedCreateWithoutSlideOfInput>
  }

  export type ImageUploadUpsertWithoutSlideOfInput = {
    update: XOR<ImageUploadUpdateWithoutSlideOfInput, ImageUploadUncheckedUpdateWithoutSlideOfInput>
    create: XOR<ImageUploadCreateWithoutSlideOfInput, ImageUploadUncheckedCreateWithoutSlideOfInput>
    where?: ImageUploadWhereInput
  }

  export type ImageUploadUpdateToOneWithWhereWithoutSlideOfInput = {
    where?: ImageUploadWhereInput
    data: XOR<ImageUploadUpdateWithoutSlideOfInput, ImageUploadUncheckedUpdateWithoutSlideOfInput>
  }

  export type ImageUploadUpdateWithoutSlideOfInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutSlideOfInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
  }

  export type PaymentCreateWithoutBookingInput = {
    id?: string
    status: $Enums.PaymentStatus
    value: number
    currency?: string
    provider: $Enums.Provider
    providerPaymentId?: string | null
    paymentMethod?: $Enums.PaymentMethodType | null
    qrUrl?: string | null
    bankCode?: string | null
    bankAccountNo?: string | null
    bankAccountName?: string | null
    paidAt?: Date | string | null
    refundedValue?: number
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutBookingInput = {
    id?: string
    status: $Enums.PaymentStatus
    value: number
    currency?: string
    provider: $Enums.Provider
    providerPaymentId?: string | null
    paymentMethod?: $Enums.PaymentMethodType | null
    qrUrl?: string | null
    bankCode?: string | null
    bankAccountNo?: string | null
    bankAccountName?: string | null
    paidAt?: Date | string | null
    refundedValue?: number
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
  }

  export type PaymentCreateManyBookingInputEnvelope = {
    data: PaymentCreateManyBookingInput | PaymentCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type CustomerCreateWithoutBookingInput = {
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordChangedAt?: Date | string
    isActive?: boolean
    passwordExpireAt?: Date | string | null
  }

  export type CustomerUncheckedCreateWithoutBookingInput = {
    id?: number
    username: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    passwordChangedAt?: Date | string
    isActive?: boolean
    passwordExpireAt?: Date | string | null
  }

  export type CustomerCreateOrConnectWithoutBookingInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutBookingInput, CustomerUncheckedCreateWithoutBookingInput>
  }

  export type AccountCreateWithoutBookingInput = {
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    skinList?: SkinCreateNestedManyWithoutAccountsInput
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutBookingInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    priceTierId: number
    thumbnailId?: number | null
    skinList?: SkinUncheckedCreateNestedManyWithoutAccountsInput
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutBookingInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutBookingInput, AccountUncheckedCreateWithoutBookingInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
    create: XOR<PaymentCreateWithoutBookingInput, PaymentUncheckedCreateWithoutBookingInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutBookingInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutBookingInput, PaymentUncheckedUpdateWithoutBookingInput>
  }

  export type PaymentUpdateManyWithWhereWithoutBookingInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutBookingInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    bookingId?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    value?: IntFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    provider?: EnumProviderFilter<"Payment"> | $Enums.Provider
    providerPaymentId?: StringNullableFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodTypeNullableFilter<"Payment"> | $Enums.PaymentMethodType | null
    qrUrl?: StringNullableFilter<"Payment"> | string | null
    bankCode?: StringNullableFilter<"Payment"> | string | null
    bankAccountNo?: StringNullableFilter<"Payment"> | string | null
    bankAccountName?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    refundedValue?: IntFilter<"Payment"> | number
    refundedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type CustomerUpsertWithoutBookingInput = {
    update: XOR<CustomerUpdateWithoutBookingInput, CustomerUncheckedUpdateWithoutBookingInput>
    create: XOR<CustomerCreateWithoutBookingInput, CustomerUncheckedCreateWithoutBookingInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutBookingInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutBookingInput, CustomerUncheckedUpdateWithoutBookingInput>
  }

  export type CustomerUpdateWithoutBookingInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    passwordExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CustomerUncheckedUpdateWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    passwordExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountUpsertWithoutBookingInput = {
    update: XOR<AccountUpdateWithoutBookingInput, AccountUncheckedUpdateWithoutBookingInput>
    create: XOR<AccountCreateWithoutBookingInput, AccountUncheckedCreateWithoutBookingInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutBookingInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutBookingInput, AccountUncheckedUpdateWithoutBookingInput>
  }

  export type AccountUpdateWithoutBookingInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    skinList?: SkinUpdateManyWithoutAccountsNestedInput
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutBookingInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    skinList?: SkinUncheckedUpdateManyWithoutAccountsNestedInput
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type BookingCreateWithoutPaymentsInput = {
    id?: string
    readableNumber?: bigint | number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    customer?: CustomerCreateNestedOneWithoutBookingInput
    account: AccountCreateNestedOneWithoutBookingInput
  }

  export type BookingUncheckedCreateWithoutPaymentsInput = {
    id?: string
    readableNumber?: bigint | number
    customerId?: number | null
    accountId: number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
  }

  export type BookingCreateOrConnectWithoutPaymentsInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
  }

  export type BookingUpsertWithoutPaymentsInput = {
    update: XOR<BookingUpdateWithoutPaymentsInput, BookingUncheckedUpdateWithoutPaymentsInput>
    create: XOR<BookingCreateWithoutPaymentsInput, BookingUncheckedCreateWithoutPaymentsInput>
    where?: BookingWhereInput
  }

  export type BookingUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: BookingWhereInput
    data: XOR<BookingUpdateWithoutPaymentsInput, BookingUncheckedUpdateWithoutPaymentsInput>
  }

  export type BookingUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    customer?: CustomerUpdateOneWithoutBookingNestedInput
    account?: AccountUpdateOneRequiredWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    accountId?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
  }

  export type ImageUploadCreateManyAccountInput = {
    id?: number
    imageUrl: string
    type?: $Enums.MediaType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountResetLogCreateManyAccountInput = {
    id?: number
    previousExpireAt?: Date | string | null
    resetAt?: Date | string
  }

  export type BookingCreateManyAccountInput = {
    id?: string
    readableNumber?: bigint | number
    customerId?: number | null
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
  }

  export type SkinUpdateWithoutAccountsInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkinUncheckedUpdateWithoutAccountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkinUncheckedUpdateManyWithoutAccountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    keyword?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ImageUploadUpdateWithoutAccountInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    slideOf?: CarouselSlideUpdateOneWithoutImageNestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutAccountInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
    slideOf?: CarouselSlideUncheckedUpdateOneWithoutImageNestedInput
  }

  export type ImageUploadUncheckedUpdateManyWithoutAccountInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountResetLogUpdateWithoutAccountInput = {
    previousExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountResetLogUncheckedUpdateWithoutAccountInput = {
    id?: IntFieldUpdateOperationsInput | number
    previousExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountResetLogUncheckedUpdateManyWithoutAccountInput = {
    id?: IntFieldUpdateOperationsInput | number
    previousExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUpdateManyWithoutBookingNestedInput
    customer?: CustomerUpdateOneWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    customerId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
  }

  export type AccountCreateManyPriceTierInput = {
    id?: number
    username: string
    nickname: string
    accountCode: string
    description?: string | null
    accountRank: string
    availabilityStatus?: $Enums.Status
    currentBookingDate?: Date | string | null
    currentBookingDuration?: number | null
    currentExpireAt?: Date | string | null
    nextBookingDate?: Date | string | null
    nextBookingDuration?: number | null
    nextExpireAt?: Date | string | null
    totalRentHour?: number
    rentHourUpdated?: boolean
    password: string
    passwordResetRequired?: boolean
    skinCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    isLowRank?: boolean
    isRecommended?: boolean
    thumbnailId?: number | null
  }

  export type PriceListCreateManyTierInput = {
    id?: number
    duration: string
    normalPrice: number
    lowPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutPriceTierInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    skinList?: SkinUpdateManyWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
    Booking?: BookingUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutPriceTierInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    skinList?: SkinUncheckedUpdateManyWithoutAccountsNestedInput
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
    Booking?: BookingUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutPriceTierInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PriceListUpdateWithoutTierInput = {
    duration?: StringFieldUpdateOperationsInput | string
    normalPrice?: IntFieldUpdateOperationsInput | number
    lowPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceListUncheckedUpdateWithoutTierInput = {
    id?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    normalPrice?: IntFieldUpdateOperationsInput | number
    lowPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceListUncheckedUpdateManyWithoutTierInput = {
    id?: IntFieldUpdateOperationsInput | number
    duration?: StringFieldUpdateOperationsInput | string
    normalPrice?: IntFieldUpdateOperationsInput | number
    lowPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUpdateWithoutSkinListInput = {
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
    Booking?: BookingUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutSkinListInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
    Booking?: BookingUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutSkinListInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    accountCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    accountRank?: StringFieldUpdateOperationsInput | string
    availabilityStatus?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    currentBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    currentExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextBookingDuration?: NullableIntFieldUpdateOperationsInput | number | null
    nextExpireAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRentHour?: IntFieldUpdateOperationsInput | number
    rentHourUpdated?: BoolFieldUpdateOperationsInput | boolean
    password?: StringFieldUpdateOperationsInput | string
    passwordResetRequired?: BoolFieldUpdateOperationsInput | boolean
    skinCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isLowRank?: BoolFieldUpdateOperationsInput | boolean
    isRecommended?: BoolFieldUpdateOperationsInput | boolean
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BookingCreateManyCustomerInput = {
    id?: string
    readableNumber?: bigint | number
    accountId: number
    status?: $Enums.BookingStatus
    duration: string
    quantity: number
    immediate: boolean
    startAt?: Date | string | null
    endAt?: Date | string | null
    expiredAt?: Date | string | null
    mainValuePerUnit: number
    othersValuePerUnit?: number | null
    voucherName?: string | null
    voucherType?: $Enums.Type | null
    voucherAmount?: number | null
    voucherMaxDiscount?: number | null
    mainValue: number
    othersValue?: number | null
    discount?: number | null
    adminFee?: number | null
    totalValue: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
  }

  export type BookingUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUpdateManyWithoutBookingNestedInput
    account?: AccountUpdateOneRequiredWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    accountId?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type BookingUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    readableNumber?: BigIntFieldUpdateOperationsInput | bigint | number
    accountId?: IntFieldUpdateOperationsInput | number
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    duration?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    immediate?: BoolFieldUpdateOperationsInput | boolean
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mainValuePerUnit?: IntFieldUpdateOperationsInput | number
    othersValuePerUnit?: NullableIntFieldUpdateOperationsInput | number | null
    voucherName?: NullableStringFieldUpdateOperationsInput | string | null
    voucherType?: NullableEnumTypeFieldUpdateOperationsInput | $Enums.Type | null
    voucherAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    voucherMaxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
    mainValue?: IntFieldUpdateOperationsInput | number
    othersValue?: NullableIntFieldUpdateOperationsInput | number | null
    discount?: NullableIntFieldUpdateOperationsInput | number | null
    adminFee?: NullableIntFieldUpdateOperationsInput | number | null
    totalValue?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentCreateManyBookingInput = {
    id?: string
    status: $Enums.PaymentStatus
    value: number
    currency?: string
    provider: $Enums.Provider
    providerPaymentId?: string | null
    paymentMethod?: $Enums.PaymentMethodType | null
    qrUrl?: string | null
    bankCode?: string | null
    bankAccountNo?: string | null
    bankAccountName?: string | null
    paidAt?: Date | string | null
    refundedValue?: number
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    value?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType | null
    qrUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountNo?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedValue?: IntFieldUpdateOperationsInput | number
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    value?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType | null
    qrUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountNo?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedValue?: IntFieldUpdateOperationsInput | number
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    value?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType | null
    qrUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bankCode?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountNo?: NullableStringFieldUpdateOperationsInput | string | null
    bankAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedValue?: IntFieldUpdateOperationsInput | number
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}