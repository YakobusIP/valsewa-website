
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
 * Model CarouselSlide
 * 
 */
export type CarouselSlide = $Result.DefaultSelection<Prisma.$CarouselSlidePayload>

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

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

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
   * `prisma.carouselSlide`: Exposes CRUD operations for the **CarouselSlide** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CarouselSlides
    * const carouselSlides = await prisma.carouselSlide.findMany()
    * ```
    */
  get carouselSlide(): Prisma.CarouselSlideDelegate<ExtArgs, ClientOptions>;
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
    ImageUpload: 'ImageUpload',
    User: 'User',
    CarouselSlide: 'CarouselSlide'
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
      modelProps: "account" | "accountResetLog" | "priceTier" | "imageUpload" | "user" | "carouselSlide"
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
    imageUpload?: ImageUploadOmit
    user?: UserOmit
    carouselSlide?: CarouselSlideOmit
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
    otherImages: number
    resetLogs: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    otherImages?: boolean | AccountCountOutputTypeCountOtherImagesArgs
    resetLogs?: boolean | AccountCountOutputTypeCountResetLogsArgs
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
   * Count Type PriceTierCountOutputType
   */

  export type PriceTierCountOutputType = {
    accounts: number
  }

  export type PriceTierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | PriceTierCountOutputTypeCountAccountsArgs
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
    priceTierId: number | null
    thumbnailId: number | null
  }

  export type AccountSumAggregateOutputType = {
    id: number | null
    currentBookingDuration: number | null
    nextBookingDuration: number | null
    totalRentHour: number | null
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
    createdAt: Date | null
    updatedAt: Date | null
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
    createdAt: Date | null
    updatedAt: Date | null
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
    skinList: number
    createdAt: number
    updatedAt: number
    priceTierId: number
    thumbnailId: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    id?: true
    currentBookingDuration?: true
    nextBookingDuration?: true
    totalRentHour?: true
    priceTierId?: true
    thumbnailId?: true
  }

  export type AccountSumAggregateInputType = {
    id?: true
    currentBookingDuration?: true
    nextBookingDuration?: true
    totalRentHour?: true
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
    createdAt?: true
    updatedAt?: true
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
    createdAt?: true
    updatedAt?: true
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
    skinList?: true
    createdAt?: true
    updatedAt?: true
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
    skinList: string[]
    createdAt: Date
    updatedAt: Date
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
    skinList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    priceTierId?: boolean
    thumbnailId?: boolean
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
    otherImages?: boolean | Account$otherImagesArgs<ExtArgs>
    resetLogs?: boolean | Account$resetLogsArgs<ExtArgs>
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
    skinList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
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
    skinList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
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
    skinList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    priceTierId?: boolean
    thumbnailId?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "nickname" | "accountCode" | "description" | "accountRank" | "availabilityStatus" | "currentBookingDate" | "currentBookingDuration" | "currentExpireAt" | "nextBookingDate" | "nextBookingDuration" | "nextExpireAt" | "totalRentHour" | "rentHourUpdated" | "password" | "passwordResetRequired" | "skinList" | "createdAt" | "updatedAt" | "priceTierId" | "thumbnailId", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    priceTier?: boolean | PriceTierDefaultArgs<ExtArgs>
    thumbnail?: boolean | Account$thumbnailArgs<ExtArgs>
    otherImages?: boolean | Account$otherImagesArgs<ExtArgs>
    resetLogs?: boolean | Account$resetLogsArgs<ExtArgs>
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
      priceTier: Prisma.$PriceTierPayload<ExtArgs>
      thumbnail: Prisma.$ImageUploadPayload<ExtArgs> | null
      otherImages: Prisma.$ImageUploadPayload<ExtArgs>[]
      resetLogs: Prisma.$AccountResetLogPayload<ExtArgs>[]
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
      skinList: string[]
      createdAt: Date
      updatedAt: Date
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
    priceTier<T extends PriceTierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PriceTierDefaultArgs<ExtArgs>>): Prisma__PriceTierClient<$Result.GetResult<Prisma.$PriceTierPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    thumbnail<T extends Account$thumbnailArgs<ExtArgs> = {}>(args?: Subset<T, Account$thumbnailArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    otherImages<T extends Account$otherImagesArgs<ExtArgs> = {}>(args?: Subset<T, Account$otherImagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    resetLogs<T extends Account$resetLogsArgs<ExtArgs> = {}>(args?: Subset<T, Account$resetLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountResetLogPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
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
    readonly skinList: FieldRef<"Account", 'String[]'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
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
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceTierMaxAggregateOutputType = {
    id: number | null
    code: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PriceTierCountAggregateOutputType = {
    id: number
    code: number
    description: number
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
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceTierMaxAggregateInputType = {
    id?: true
    code?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PriceTierCountAggregateInputType = {
    id?: true
    code?: true
    description?: true
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
    description: string
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
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | PriceTier$accountsArgs<ExtArgs>
    _count?: boolean | PriceTierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priceTier"]>

  export type PriceTierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["priceTier"]>

  export type PriceTierSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["priceTier"]>

  export type PriceTierSelectScalar = {
    id?: boolean
    code?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PriceTierOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["priceTier"]>
  export type PriceTierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | PriceTier$accountsArgs<ExtArgs>
    _count?: boolean | PriceTierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PriceTierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PriceTierIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PriceTierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceTier"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      description: string
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
    readonly description: FieldRef<"PriceTier", 'String'>
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
    createdAt: Date | null
    updatedAt: Date | null
    accountId: number | null
  }

  export type ImageUploadMaxAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accountId: number | null
  }

  export type ImageUploadCountAggregateOutputType = {
    id: number
    imageUrl: number
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
    createdAt?: true
    updatedAt?: true
    accountId?: true
  }

  export type ImageUploadMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    accountId?: true
  }

  export type ImageUploadCountAggregateInputType = {
    id?: true
    imageUrl?: true
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
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    thumbnailOf?: boolean | ImageUpload$thumbnailOfArgs<ExtArgs>
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
    slide123Of?: boolean | ImageUpload$slide123OfArgs<ExtArgs>
    slide126Of?: boolean | ImageUpload$slide126OfArgs<ExtArgs>
    slide129Of?: boolean | ImageUpload$slide129OfArgs<ExtArgs>
  }, ExtArgs["result"]["imageUpload"]>

  export type ImageUploadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
  }, ExtArgs["result"]["imageUpload"]>

  export type ImageUploadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
  }, ExtArgs["result"]["imageUpload"]>

  export type ImageUploadSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accountId?: boolean
  }

  export type ImageUploadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "createdAt" | "updatedAt" | "accountId", ExtArgs["result"]["imageUpload"]>
  export type ImageUploadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    thumbnailOf?: boolean | ImageUpload$thumbnailOfArgs<ExtArgs>
    account?: boolean | ImageUpload$accountArgs<ExtArgs>
    slide123Of?: boolean | ImageUpload$slide123OfArgs<ExtArgs>
    slide126Of?: boolean | ImageUpload$slide126OfArgs<ExtArgs>
    slide129Of?: boolean | ImageUpload$slide129OfArgs<ExtArgs>
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
      slide123Of: Prisma.$CarouselSlidePayload<ExtArgs> | null
      slide126Of: Prisma.$CarouselSlidePayload<ExtArgs> | null
      slide129Of: Prisma.$CarouselSlidePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imageUrl: string
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
    slide123Of<T extends ImageUpload$slide123OfArgs<ExtArgs> = {}>(args?: Subset<T, ImageUpload$slide123OfArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    slide126Of<T extends ImageUpload$slide126OfArgs<ExtArgs> = {}>(args?: Subset<T, ImageUpload$slide126OfArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    slide129Of<T extends ImageUpload$slide129OfArgs<ExtArgs> = {}>(args?: Subset<T, ImageUpload$slide129OfArgs<ExtArgs>>): Prisma__CarouselSlideClient<$Result.GetResult<Prisma.$CarouselSlidePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
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
   * ImageUpload.slide123Of
   */
  export type ImageUpload$slide123OfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * ImageUpload.slide126Of
   */
  export type ImageUpload$slide126OfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * ImageUpload.slide129Of
   */
  export type ImageUpload$slide129OfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    image123Id: number | null
    image126Id: number | null
    image129Id: number | null
  }

  export type CarouselSlideSumAggregateOutputType = {
    id: number | null
    image123Id: number | null
    image126Id: number | null
    image129Id: number | null
  }

  export type CarouselSlideMinAggregateOutputType = {
    id: number | null
    image123Id: number | null
    image126Id: number | null
    image129Id: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarouselSlideMaxAggregateOutputType = {
    id: number | null
    image123Id: number | null
    image126Id: number | null
    image129Id: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarouselSlideCountAggregateOutputType = {
    id: number
    image123Id: number
    image126Id: number
    image129Id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CarouselSlideAvgAggregateInputType = {
    id?: true
    image123Id?: true
    image126Id?: true
    image129Id?: true
  }

  export type CarouselSlideSumAggregateInputType = {
    id?: true
    image123Id?: true
    image126Id?: true
    image129Id?: true
  }

  export type CarouselSlideMinAggregateInputType = {
    id?: true
    image123Id?: true
    image126Id?: true
    image129Id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarouselSlideMaxAggregateInputType = {
    id?: true
    image123Id?: true
    image126Id?: true
    image129Id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarouselSlideCountAggregateInputType = {
    id?: true
    image123Id?: true
    image126Id?: true
    image129Id?: true
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
    image123Id: number
    image126Id: number
    image129Id: number
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
    image123Id?: boolean
    image126Id?: boolean
    image129Id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image123?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image126?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image129?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carouselSlide"]>

  export type CarouselSlideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    image123Id?: boolean
    image126Id?: boolean
    image129Id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image123?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image126?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image129?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carouselSlide"]>

  export type CarouselSlideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    image123Id?: boolean
    image126Id?: boolean
    image129Id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image123?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image126?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image129?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carouselSlide"]>

  export type CarouselSlideSelectScalar = {
    id?: boolean
    image123Id?: boolean
    image126Id?: boolean
    image129Id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CarouselSlideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "image123Id" | "image126Id" | "image129Id" | "createdAt" | "updatedAt", ExtArgs["result"]["carouselSlide"]>
  export type CarouselSlideInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image123?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image126?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image129?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }
  export type CarouselSlideIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image123?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image126?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image129?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }
  export type CarouselSlideIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image123?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image126?: boolean | ImageUploadDefaultArgs<ExtArgs>
    image129?: boolean | ImageUploadDefaultArgs<ExtArgs>
  }

  export type $CarouselSlidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CarouselSlide"
    objects: {
      image123: Prisma.$ImageUploadPayload<ExtArgs>
      image126: Prisma.$ImageUploadPayload<ExtArgs>
      image129: Prisma.$ImageUploadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      image123Id: number
      image126Id: number
      image129Id: number
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
    image123<T extends ImageUploadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageUploadDefaultArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    image126<T extends ImageUploadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageUploadDefaultArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    image129<T extends ImageUploadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ImageUploadDefaultArgs<ExtArgs>>): Prisma__ImageUploadClient<$Result.GetResult<Prisma.$ImageUploadPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
    readonly image123Id: FieldRef<"CarouselSlide", 'Int'>
    readonly image126Id: FieldRef<"CarouselSlide", 'Int'>
    readonly image129Id: FieldRef<"CarouselSlide", 'Int'>
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
    skinList: 'skinList',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
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
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PriceTierScalarFieldEnum = (typeof PriceTierScalarFieldEnum)[keyof typeof PriceTierScalarFieldEnum]


  export const ImageUploadScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
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


  export const CarouselSlideScalarFieldEnum: {
    id: 'id',
    image123Id: 'image123Id',
    image126Id: 'image126Id',
    image129Id: 'image129Id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CarouselSlideScalarFieldEnum = (typeof CarouselSlideScalarFieldEnum)[keyof typeof CarouselSlideScalarFieldEnum]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
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
    skinList?: StringNullableListFilter<"Account">
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    priceTierId?: IntFilter<"Account"> | number
    thumbnailId?: IntNullableFilter<"Account"> | number | null
    priceTier?: XOR<PriceTierScalarRelationFilter, PriceTierWhereInput>
    thumbnail?: XOR<ImageUploadNullableScalarRelationFilter, ImageUploadWhereInput> | null
    otherImages?: ImageUploadListRelationFilter
    resetLogs?: AccountResetLogListRelationFilter
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
    skinList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrderInput | SortOrder
    priceTier?: PriceTierOrderByWithRelationInput
    thumbnail?: ImageUploadOrderByWithRelationInput
    otherImages?: ImageUploadOrderByRelationAggregateInput
    resetLogs?: AccountResetLogOrderByRelationAggregateInput
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
    skinList?: StringNullableListFilter<"Account">
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    priceTierId?: IntFilter<"Account"> | number
    priceTier?: XOR<PriceTierScalarRelationFilter, PriceTierWhereInput>
    thumbnail?: XOR<ImageUploadNullableScalarRelationFilter, ImageUploadWhereInput> | null
    otherImages?: ImageUploadListRelationFilter
    resetLogs?: AccountResetLogListRelationFilter
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
    skinList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    skinList?: StringNullableListFilter<"Account">
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
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
    description?: StringFilter<"PriceTier"> | string
    createdAt?: DateTimeFilter<"PriceTier"> | Date | string
    updatedAt?: DateTimeFilter<"PriceTier"> | Date | string
    accounts?: AccountListRelationFilter
  }

  export type PriceTierOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type PriceTierWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: PriceTierWhereInput | PriceTierWhereInput[]
    OR?: PriceTierWhereInput[]
    NOT?: PriceTierWhereInput | PriceTierWhereInput[]
    description?: StringFilter<"PriceTier"> | string
    createdAt?: DateTimeFilter<"PriceTier"> | Date | string
    updatedAt?: DateTimeFilter<"PriceTier"> | Date | string
    accounts?: AccountListRelationFilter
  }, "id" | "code">

  export type PriceTierOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
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
    description?: StringWithAggregatesFilter<"PriceTier"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PriceTier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PriceTier"> | Date | string
  }

  export type ImageUploadWhereInput = {
    AND?: ImageUploadWhereInput | ImageUploadWhereInput[]
    OR?: ImageUploadWhereInput[]
    NOT?: ImageUploadWhereInput | ImageUploadWhereInput[]
    id?: IntFilter<"ImageUpload"> | number
    imageUrl?: StringFilter<"ImageUpload"> | string
    createdAt?: DateTimeFilter<"ImageUpload"> | Date | string
    updatedAt?: DateTimeFilter<"ImageUpload"> | Date | string
    accountId?: IntNullableFilter<"ImageUpload"> | number | null
    thumbnailOf?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    slide123Of?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
    slide126Of?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
    slide129Of?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
  }

  export type ImageUploadOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrderInput | SortOrder
    thumbnailOf?: AccountOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    slide123Of?: CarouselSlideOrderByWithRelationInput
    slide126Of?: CarouselSlideOrderByWithRelationInput
    slide129Of?: CarouselSlideOrderByWithRelationInput
  }

  export type ImageUploadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ImageUploadWhereInput | ImageUploadWhereInput[]
    OR?: ImageUploadWhereInput[]
    NOT?: ImageUploadWhereInput | ImageUploadWhereInput[]
    imageUrl?: StringFilter<"ImageUpload"> | string
    createdAt?: DateTimeFilter<"ImageUpload"> | Date | string
    updatedAt?: DateTimeFilter<"ImageUpload"> | Date | string
    accountId?: IntNullableFilter<"ImageUpload"> | number | null
    thumbnailOf?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    slide123Of?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
    slide126Of?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
    slide129Of?: XOR<CarouselSlideNullableScalarRelationFilter, CarouselSlideWhereInput> | null
  }, "id">

  export type ImageUploadOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
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

  export type CarouselSlideWhereInput = {
    AND?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    OR?: CarouselSlideWhereInput[]
    NOT?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    id?: IntFilter<"CarouselSlide"> | number
    image123Id?: IntFilter<"CarouselSlide"> | number
    image126Id?: IntFilter<"CarouselSlide"> | number
    image129Id?: IntFilter<"CarouselSlide"> | number
    createdAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    updatedAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    image123?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
    image126?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
    image129?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
  }

  export type CarouselSlideOrderByWithRelationInput = {
    id?: SortOrder
    image123Id?: SortOrder
    image126Id?: SortOrder
    image129Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image123?: ImageUploadOrderByWithRelationInput
    image126?: ImageUploadOrderByWithRelationInput
    image129?: ImageUploadOrderByWithRelationInput
  }

  export type CarouselSlideWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    image123Id?: number
    image126Id?: number
    image129Id?: number
    AND?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    OR?: CarouselSlideWhereInput[]
    NOT?: CarouselSlideWhereInput | CarouselSlideWhereInput[]
    createdAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    updatedAt?: DateTimeFilter<"CarouselSlide"> | Date | string
    image123?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
    image126?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
    image129?: XOR<ImageUploadScalarRelationFilter, ImageUploadWhereInput>
  }, "id" | "image123Id" | "image126Id" | "image129Id">

  export type CarouselSlideOrderByWithAggregationInput = {
    id?: SortOrder
    image123Id?: SortOrder
    image126Id?: SortOrder
    image129Id?: SortOrder
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
    image123Id?: IntWithAggregatesFilter<"CarouselSlide"> | number
    image126Id?: IntWithAggregatesFilter<"CarouselSlide"> | number
    image129Id?: IntWithAggregatesFilter<"CarouselSlide"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CarouselSlide"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CarouselSlide"> | Date | string
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTierId: number
    thumbnailId?: number | null
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutPriceTierInput
  }

  export type PriceTierUncheckedCreateInput = {
    id?: number
    code: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutPriceTierInput
  }

  export type PriceTierUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutPriceTierNestedInput
  }

  export type PriceTierUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutPriceTierNestedInput
  }

  export type PriceTierCreateManyInput = {
    id?: number
    code: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceTierUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceTierUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUploadCreateInput = {
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    account?: AccountCreateNestedOneWithoutOtherImagesInput
    slide123Of?: CarouselSlideCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadUncheckedCreateInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
    slide123Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
    slide123Of?: CarouselSlideUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
    slide123Of?: CarouselSlideUncheckedUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUncheckedUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUncheckedUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadCreateManyInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
  }

  export type ImageUploadUpdateManyMutationInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUploadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
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

  export type CarouselSlideCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    image123: ImageUploadCreateNestedOneWithoutSlide123OfInput
    image126: ImageUploadCreateNestedOneWithoutSlide126OfInput
    image129: ImageUploadCreateNestedOneWithoutSlide129OfInput
  }

  export type CarouselSlideUncheckedCreateInput = {
    id?: number
    image123Id: number
    image126Id: number
    image129Id: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image123?: ImageUploadUpdateOneRequiredWithoutSlide123OfNestedInput
    image126?: ImageUploadUpdateOneRequiredWithoutSlide126OfNestedInput
    image129?: ImageUploadUpdateOneRequiredWithoutSlide129OfNestedInput
  }

  export type CarouselSlideUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    image123Id?: IntFieldUpdateOperationsInput | number
    image126Id?: IntFieldUpdateOperationsInput | number
    image129Id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarouselSlideCreateManyInput = {
    id?: number
    image123Id: number
    image126Id: number
    image129Id: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarouselSlideUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    image123Id?: IntFieldUpdateOperationsInput | number
    image126Id?: IntFieldUpdateOperationsInput | number
    image129Id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ImageUploadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountResetLogOrderByRelationAggregateInput = {
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
    skinList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    id?: SortOrder
    currentBookingDuration?: SortOrder
    nextBookingDuration?: SortOrder
    totalRentHour?: SortOrder
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    priceTierId?: SortOrder
    thumbnailId?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    id?: SortOrder
    currentBookingDuration?: SortOrder
    nextBookingDuration?: SortOrder
    totalRentHour?: SortOrder
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

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PriceTierCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceTierAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PriceTierMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceTierMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PriceTierSumOrderByAggregateInput = {
    id?: SortOrder
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
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
  }

  export type ImageUploadMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accountId?: SortOrder
  }

  export type ImageUploadSumOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
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

  export type ImageUploadScalarRelationFilter = {
    is?: ImageUploadWhereInput
    isNot?: ImageUploadWhereInput
  }

  export type CarouselSlideCountOrderByAggregateInput = {
    id?: SortOrder
    image123Id?: SortOrder
    image126Id?: SortOrder
    image129Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarouselSlideAvgOrderByAggregateInput = {
    id?: SortOrder
    image123Id?: SortOrder
    image126Id?: SortOrder
    image129Id?: SortOrder
  }

  export type CarouselSlideMaxOrderByAggregateInput = {
    id?: SortOrder
    image123Id?: SortOrder
    image126Id?: SortOrder
    image129Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarouselSlideMinOrderByAggregateInput = {
    id?: SortOrder
    image123Id?: SortOrder
    image126Id?: SortOrder
    image129Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarouselSlideSumOrderByAggregateInput = {
    id?: SortOrder
    image123Id?: SortOrder
    image126Id?: SortOrder
    image129Id?: SortOrder
  }

  export type AccountCreateskinListInput = {
    set: string[]
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

  export type AccountUpdateskinListInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type AccountUncheckedCreateNestedManyWithoutPriceTierInput = {
    create?: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput> | AccountCreateWithoutPriceTierInput[] | AccountUncheckedCreateWithoutPriceTierInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutPriceTierInput | AccountCreateOrConnectWithoutPriceTierInput[]
    createMany?: AccountCreateManyPriceTierInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
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

  export type CarouselSlideCreateNestedOneWithoutImage123Input = {
    create?: XOR<CarouselSlideCreateWithoutImage123Input, CarouselSlideUncheckedCreateWithoutImage123Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage123Input
    connect?: CarouselSlideWhereUniqueInput
  }

  export type CarouselSlideCreateNestedOneWithoutImage126Input = {
    create?: XOR<CarouselSlideCreateWithoutImage126Input, CarouselSlideUncheckedCreateWithoutImage126Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage126Input
    connect?: CarouselSlideWhereUniqueInput
  }

  export type CarouselSlideCreateNestedOneWithoutImage129Input = {
    create?: XOR<CarouselSlideCreateWithoutImage129Input, CarouselSlideUncheckedCreateWithoutImage129Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage129Input
    connect?: CarouselSlideWhereUniqueInput
  }

  export type AccountUncheckedCreateNestedOneWithoutThumbnailInput = {
    create?: XOR<AccountCreateWithoutThumbnailInput, AccountUncheckedCreateWithoutThumbnailInput>
    connectOrCreate?: AccountCreateOrConnectWithoutThumbnailInput
    connect?: AccountWhereUniqueInput
  }

  export type CarouselSlideUncheckedCreateNestedOneWithoutImage123Input = {
    create?: XOR<CarouselSlideCreateWithoutImage123Input, CarouselSlideUncheckedCreateWithoutImage123Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage123Input
    connect?: CarouselSlideWhereUniqueInput
  }

  export type CarouselSlideUncheckedCreateNestedOneWithoutImage126Input = {
    create?: XOR<CarouselSlideCreateWithoutImage126Input, CarouselSlideUncheckedCreateWithoutImage126Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage126Input
    connect?: CarouselSlideWhereUniqueInput
  }

  export type CarouselSlideUncheckedCreateNestedOneWithoutImage129Input = {
    create?: XOR<CarouselSlideCreateWithoutImage129Input, CarouselSlideUncheckedCreateWithoutImage129Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage129Input
    connect?: CarouselSlideWhereUniqueInput
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

  export type CarouselSlideUpdateOneWithoutImage123NestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImage123Input, CarouselSlideUncheckedCreateWithoutImage123Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage123Input
    upsert?: CarouselSlideUpsertWithoutImage123Input
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImage123Input, CarouselSlideUpdateWithoutImage123Input>, CarouselSlideUncheckedUpdateWithoutImage123Input>
  }

  export type CarouselSlideUpdateOneWithoutImage126NestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImage126Input, CarouselSlideUncheckedCreateWithoutImage126Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage126Input
    upsert?: CarouselSlideUpsertWithoutImage126Input
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImage126Input, CarouselSlideUpdateWithoutImage126Input>, CarouselSlideUncheckedUpdateWithoutImage126Input>
  }

  export type CarouselSlideUpdateOneWithoutImage129NestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImage129Input, CarouselSlideUncheckedCreateWithoutImage129Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage129Input
    upsert?: CarouselSlideUpsertWithoutImage129Input
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImage129Input, CarouselSlideUpdateWithoutImage129Input>, CarouselSlideUncheckedUpdateWithoutImage129Input>
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

  export type CarouselSlideUncheckedUpdateOneWithoutImage123NestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImage123Input, CarouselSlideUncheckedCreateWithoutImage123Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage123Input
    upsert?: CarouselSlideUpsertWithoutImage123Input
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImage123Input, CarouselSlideUpdateWithoutImage123Input>, CarouselSlideUncheckedUpdateWithoutImage123Input>
  }

  export type CarouselSlideUncheckedUpdateOneWithoutImage126NestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImage126Input, CarouselSlideUncheckedCreateWithoutImage126Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage126Input
    upsert?: CarouselSlideUpsertWithoutImage126Input
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImage126Input, CarouselSlideUpdateWithoutImage126Input>, CarouselSlideUncheckedUpdateWithoutImage126Input>
  }

  export type CarouselSlideUncheckedUpdateOneWithoutImage129NestedInput = {
    create?: XOR<CarouselSlideCreateWithoutImage129Input, CarouselSlideUncheckedCreateWithoutImage129Input>
    connectOrCreate?: CarouselSlideCreateOrConnectWithoutImage129Input
    upsert?: CarouselSlideUpsertWithoutImage129Input
    disconnect?: CarouselSlideWhereInput | boolean
    delete?: CarouselSlideWhereInput | boolean
    connect?: CarouselSlideWhereUniqueInput
    update?: XOR<XOR<CarouselSlideUpdateToOneWithWhereWithoutImage129Input, CarouselSlideUpdateWithoutImage129Input>, CarouselSlideUncheckedUpdateWithoutImage129Input>
  }

  export type ImageUploadCreateNestedOneWithoutSlide123OfInput = {
    create?: XOR<ImageUploadCreateWithoutSlide123OfInput, ImageUploadUncheckedCreateWithoutSlide123OfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlide123OfInput
    connect?: ImageUploadWhereUniqueInput
  }

  export type ImageUploadCreateNestedOneWithoutSlide126OfInput = {
    create?: XOR<ImageUploadCreateWithoutSlide126OfInput, ImageUploadUncheckedCreateWithoutSlide126OfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlide126OfInput
    connect?: ImageUploadWhereUniqueInput
  }

  export type ImageUploadCreateNestedOneWithoutSlide129OfInput = {
    create?: XOR<ImageUploadCreateWithoutSlide129OfInput, ImageUploadUncheckedCreateWithoutSlide129OfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlide129OfInput
    connect?: ImageUploadWhereUniqueInput
  }

  export type ImageUploadUpdateOneRequiredWithoutSlide123OfNestedInput = {
    create?: XOR<ImageUploadCreateWithoutSlide123OfInput, ImageUploadUncheckedCreateWithoutSlide123OfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlide123OfInput
    upsert?: ImageUploadUpsertWithoutSlide123OfInput
    connect?: ImageUploadWhereUniqueInput
    update?: XOR<XOR<ImageUploadUpdateToOneWithWhereWithoutSlide123OfInput, ImageUploadUpdateWithoutSlide123OfInput>, ImageUploadUncheckedUpdateWithoutSlide123OfInput>
  }

  export type ImageUploadUpdateOneRequiredWithoutSlide126OfNestedInput = {
    create?: XOR<ImageUploadCreateWithoutSlide126OfInput, ImageUploadUncheckedCreateWithoutSlide126OfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlide126OfInput
    upsert?: ImageUploadUpsertWithoutSlide126OfInput
    connect?: ImageUploadWhereUniqueInput
    update?: XOR<XOR<ImageUploadUpdateToOneWithWhereWithoutSlide126OfInput, ImageUploadUpdateWithoutSlide126OfInput>, ImageUploadUncheckedUpdateWithoutSlide126OfInput>
  }

  export type ImageUploadUpdateOneRequiredWithoutSlide129OfNestedInput = {
    create?: XOR<ImageUploadCreateWithoutSlide129OfInput, ImageUploadUncheckedCreateWithoutSlide129OfInput>
    connectOrCreate?: ImageUploadCreateOrConnectWithoutSlide129OfInput
    upsert?: ImageUploadUpsertWithoutSlide129OfInput
    connect?: ImageUploadWhereUniqueInput
    update?: XOR<XOR<ImageUploadUpdateToOneWithWhereWithoutSlide129OfInput, ImageUploadUpdateWithoutSlide129OfInput>, ImageUploadUncheckedUpdateWithoutSlide129OfInput>
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

  export type PriceTierCreateWithoutAccountsInput = {
    code: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceTierUncheckedCreateWithoutAccountsInput = {
    id?: number
    code: string
    description: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceTierCreateOrConnectWithoutAccountsInput = {
    where: PriceTierWhereUniqueInput
    create: XOR<PriceTierCreateWithoutAccountsInput, PriceTierUncheckedCreateWithoutAccountsInput>
  }

  export type ImageUploadCreateWithoutThumbnailOfInput = {
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    account?: AccountCreateNestedOneWithoutOtherImagesInput
    slide123Of?: CarouselSlideCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadUncheckedCreateWithoutThumbnailOfInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    slide123Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadCreateOrConnectWithoutThumbnailOfInput = {
    where: ImageUploadWhereUniqueInput
    create: XOR<ImageUploadCreateWithoutThumbnailOfInput, ImageUploadUncheckedCreateWithoutThumbnailOfInput>
  }

  export type ImageUploadCreateWithoutAccountInput = {
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    slide123Of?: CarouselSlideCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadUncheckedCreateWithoutAccountInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
    slide123Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage129Input
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
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceTierUncheckedUpdateWithoutAccountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
    slide123Of?: CarouselSlideUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutThumbnailOfInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    slide123Of?: CarouselSlideUncheckedUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUncheckedUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUncheckedUpdateOneWithoutImage129NestedInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTierId: number
    thumbnailId?: number | null
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailId?: number | null
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutPriceTierInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutPriceTierInput, AccountUncheckedCreateWithoutPriceTierInput>
  }

  export type AccountCreateManyPriceTierInputEnvelope = {
    data: AccountCreateManyPriceTierInput | AccountCreateManyPriceTierInput[]
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
    skinList?: StringNullableListFilter<"Account">
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    priceTierId?: IntFilter<"Account"> | number
    thumbnailId?: IntNullableFilter<"Account"> | number | null
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    otherImages?: ImageUploadCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTierId: number
    otherImages?: ImageUploadUncheckedCreateNestedManyWithoutAccountInput
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTier: PriceTierCreateNestedOneWithoutAccountsInput
    thumbnail?: ImageUploadCreateNestedOneWithoutThumbnailOfInput
    resetLogs?: AccountResetLogCreateNestedManyWithoutAccountInput
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    priceTierId: number
    thumbnailId?: number | null
    resetLogs?: AccountResetLogUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutOtherImagesInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutOtherImagesInput, AccountUncheckedCreateWithoutOtherImagesInput>
  }

  export type CarouselSlideCreateWithoutImage123Input = {
    createdAt?: Date | string
    updatedAt?: Date | string
    image126: ImageUploadCreateNestedOneWithoutSlide126OfInput
    image129: ImageUploadCreateNestedOneWithoutSlide129OfInput
  }

  export type CarouselSlideUncheckedCreateWithoutImage123Input = {
    id?: number
    image126Id: number
    image129Id: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideCreateOrConnectWithoutImage123Input = {
    where: CarouselSlideWhereUniqueInput
    create: XOR<CarouselSlideCreateWithoutImage123Input, CarouselSlideUncheckedCreateWithoutImage123Input>
  }

  export type CarouselSlideCreateWithoutImage126Input = {
    createdAt?: Date | string
    updatedAt?: Date | string
    image123: ImageUploadCreateNestedOneWithoutSlide123OfInput
    image129: ImageUploadCreateNestedOneWithoutSlide129OfInput
  }

  export type CarouselSlideUncheckedCreateWithoutImage126Input = {
    id?: number
    image123Id: number
    image129Id: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideCreateOrConnectWithoutImage126Input = {
    where: CarouselSlideWhereUniqueInput
    create: XOR<CarouselSlideCreateWithoutImage126Input, CarouselSlideUncheckedCreateWithoutImage126Input>
  }

  export type CarouselSlideCreateWithoutImage129Input = {
    createdAt?: Date | string
    updatedAt?: Date | string
    image123: ImageUploadCreateNestedOneWithoutSlide123OfInput
    image126: ImageUploadCreateNestedOneWithoutSlide126OfInput
  }

  export type CarouselSlideUncheckedCreateWithoutImage129Input = {
    id?: number
    image123Id: number
    image126Id: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarouselSlideCreateOrConnectWithoutImage129Input = {
    where: CarouselSlideWhereUniqueInput
    create: XOR<CarouselSlideCreateWithoutImage129Input, CarouselSlideUncheckedCreateWithoutImage129Input>
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTierId?: IntFieldUpdateOperationsInput | number
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTier?: PriceTierUpdateOneRequiredWithoutAccountsNestedInput
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceTierId?: IntFieldUpdateOperationsInput | number
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type CarouselSlideUpsertWithoutImage123Input = {
    update: XOR<CarouselSlideUpdateWithoutImage123Input, CarouselSlideUncheckedUpdateWithoutImage123Input>
    create: XOR<CarouselSlideCreateWithoutImage123Input, CarouselSlideUncheckedCreateWithoutImage123Input>
    where?: CarouselSlideWhereInput
  }

  export type CarouselSlideUpdateToOneWithWhereWithoutImage123Input = {
    where?: CarouselSlideWhereInput
    data: XOR<CarouselSlideUpdateWithoutImage123Input, CarouselSlideUncheckedUpdateWithoutImage123Input>
  }

  export type CarouselSlideUpdateWithoutImage123Input = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image126?: ImageUploadUpdateOneRequiredWithoutSlide126OfNestedInput
    image129?: ImageUploadUpdateOneRequiredWithoutSlide129OfNestedInput
  }

  export type CarouselSlideUncheckedUpdateWithoutImage123Input = {
    id?: IntFieldUpdateOperationsInput | number
    image126Id?: IntFieldUpdateOperationsInput | number
    image129Id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarouselSlideUpsertWithoutImage126Input = {
    update: XOR<CarouselSlideUpdateWithoutImage126Input, CarouselSlideUncheckedUpdateWithoutImage126Input>
    create: XOR<CarouselSlideCreateWithoutImage126Input, CarouselSlideUncheckedCreateWithoutImage126Input>
    where?: CarouselSlideWhereInput
  }

  export type CarouselSlideUpdateToOneWithWhereWithoutImage126Input = {
    where?: CarouselSlideWhereInput
    data: XOR<CarouselSlideUpdateWithoutImage126Input, CarouselSlideUncheckedUpdateWithoutImage126Input>
  }

  export type CarouselSlideUpdateWithoutImage126Input = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image123?: ImageUploadUpdateOneRequiredWithoutSlide123OfNestedInput
    image129?: ImageUploadUpdateOneRequiredWithoutSlide129OfNestedInput
  }

  export type CarouselSlideUncheckedUpdateWithoutImage126Input = {
    id?: IntFieldUpdateOperationsInput | number
    image123Id?: IntFieldUpdateOperationsInput | number
    image129Id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarouselSlideUpsertWithoutImage129Input = {
    update: XOR<CarouselSlideUpdateWithoutImage129Input, CarouselSlideUncheckedUpdateWithoutImage129Input>
    create: XOR<CarouselSlideCreateWithoutImage129Input, CarouselSlideUncheckedCreateWithoutImage129Input>
    where?: CarouselSlideWhereInput
  }

  export type CarouselSlideUpdateToOneWithWhereWithoutImage129Input = {
    where?: CarouselSlideWhereInput
    data: XOR<CarouselSlideUpdateWithoutImage129Input, CarouselSlideUncheckedUpdateWithoutImage129Input>
  }

  export type CarouselSlideUpdateWithoutImage129Input = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image123?: ImageUploadUpdateOneRequiredWithoutSlide123OfNestedInput
    image126?: ImageUploadUpdateOneRequiredWithoutSlide126OfNestedInput
  }

  export type CarouselSlideUncheckedUpdateWithoutImage129Input = {
    id?: IntFieldUpdateOperationsInput | number
    image123Id?: IntFieldUpdateOperationsInput | number
    image126Id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUploadCreateWithoutSlide123OfInput = {
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    account?: AccountCreateNestedOneWithoutOtherImagesInput
    slide126Of?: CarouselSlideCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadUncheckedCreateWithoutSlide123OfInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
    slide126Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage126Input
    slide129Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadCreateOrConnectWithoutSlide123OfInput = {
    where: ImageUploadWhereUniqueInput
    create: XOR<ImageUploadCreateWithoutSlide123OfInput, ImageUploadUncheckedCreateWithoutSlide123OfInput>
  }

  export type ImageUploadCreateWithoutSlide126OfInput = {
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    account?: AccountCreateNestedOneWithoutOtherImagesInput
    slide123Of?: CarouselSlideCreateNestedOneWithoutImage123Input
    slide129Of?: CarouselSlideCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadUncheckedCreateWithoutSlide126OfInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
    slide123Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage123Input
    slide129Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage129Input
  }

  export type ImageUploadCreateOrConnectWithoutSlide126OfInput = {
    where: ImageUploadWhereUniqueInput
    create: XOR<ImageUploadCreateWithoutSlide126OfInput, ImageUploadUncheckedCreateWithoutSlide126OfInput>
  }

  export type ImageUploadCreateWithoutSlide129OfInput = {
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailOf?: AccountCreateNestedOneWithoutThumbnailInput
    account?: AccountCreateNestedOneWithoutOtherImagesInput
    slide123Of?: CarouselSlideCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideCreateNestedOneWithoutImage126Input
  }

  export type ImageUploadUncheckedCreateWithoutSlide129OfInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accountId?: number | null
    thumbnailOf?: AccountUncheckedCreateNestedOneWithoutThumbnailInput
    slide123Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage123Input
    slide126Of?: CarouselSlideUncheckedCreateNestedOneWithoutImage126Input
  }

  export type ImageUploadCreateOrConnectWithoutSlide129OfInput = {
    where: ImageUploadWhereUniqueInput
    create: XOR<ImageUploadCreateWithoutSlide129OfInput, ImageUploadUncheckedCreateWithoutSlide129OfInput>
  }

  export type ImageUploadUpsertWithoutSlide123OfInput = {
    update: XOR<ImageUploadUpdateWithoutSlide123OfInput, ImageUploadUncheckedUpdateWithoutSlide123OfInput>
    create: XOR<ImageUploadCreateWithoutSlide123OfInput, ImageUploadUncheckedCreateWithoutSlide123OfInput>
    where?: ImageUploadWhereInput
  }

  export type ImageUploadUpdateToOneWithWhereWithoutSlide123OfInput = {
    where?: ImageUploadWhereInput
    data: XOR<ImageUploadUpdateWithoutSlide123OfInput, ImageUploadUncheckedUpdateWithoutSlide123OfInput>
  }

  export type ImageUploadUpdateWithoutSlide123OfInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
    slide126Of?: CarouselSlideUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutSlide123OfInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
    slide126Of?: CarouselSlideUncheckedUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUncheckedUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUpsertWithoutSlide126OfInput = {
    update: XOR<ImageUploadUpdateWithoutSlide126OfInput, ImageUploadUncheckedUpdateWithoutSlide126OfInput>
    create: XOR<ImageUploadCreateWithoutSlide126OfInput, ImageUploadUncheckedCreateWithoutSlide126OfInput>
    where?: ImageUploadWhereInput
  }

  export type ImageUploadUpdateToOneWithWhereWithoutSlide126OfInput = {
    where?: ImageUploadWhereInput
    data: XOR<ImageUploadUpdateWithoutSlide126OfInput, ImageUploadUncheckedUpdateWithoutSlide126OfInput>
  }

  export type ImageUploadUpdateWithoutSlide126OfInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
    slide123Of?: CarouselSlideUpdateOneWithoutImage123NestedInput
    slide129Of?: CarouselSlideUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutSlide126OfInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
    slide123Of?: CarouselSlideUncheckedUpdateOneWithoutImage123NestedInput
    slide129Of?: CarouselSlideUncheckedUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUpsertWithoutSlide129OfInput = {
    update: XOR<ImageUploadUpdateWithoutSlide129OfInput, ImageUploadUncheckedUpdateWithoutSlide129OfInput>
    create: XOR<ImageUploadCreateWithoutSlide129OfInput, ImageUploadUncheckedCreateWithoutSlide129OfInput>
    where?: ImageUploadWhereInput
  }

  export type ImageUploadUpdateToOneWithWhereWithoutSlide129OfInput = {
    where?: ImageUploadWhereInput
    data: XOR<ImageUploadUpdateWithoutSlide129OfInput, ImageUploadUncheckedUpdateWithoutSlide129OfInput>
  }

  export type ImageUploadUpdateWithoutSlide129OfInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    account?: AccountUpdateOneWithoutOtherImagesNestedInput
    slide123Of?: CarouselSlideUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUpdateOneWithoutImage126NestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutSlide129OfInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accountId?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
    slide123Of?: CarouselSlideUncheckedUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUncheckedUpdateOneWithoutImage126NestedInput
  }

  export type ImageUploadCreateManyAccountInput = {
    id?: number
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountResetLogCreateManyAccountInput = {
    id?: number
    previousExpireAt?: Date | string | null
    resetAt?: Date | string
  }

  export type ImageUploadUpdateWithoutAccountInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUpdateOneWithoutThumbnailNestedInput
    slide123Of?: CarouselSlideUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUncheckedUpdateWithoutAccountInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailOf?: AccountUncheckedUpdateOneWithoutThumbnailNestedInput
    slide123Of?: CarouselSlideUncheckedUpdateOneWithoutImage123NestedInput
    slide126Of?: CarouselSlideUncheckedUpdateOneWithoutImage126NestedInput
    slide129Of?: CarouselSlideUncheckedUpdateOneWithoutImage129NestedInput
  }

  export type ImageUploadUncheckedUpdateManyWithoutAccountInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
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
    skinList?: AccountCreateskinListInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    thumbnailId?: number | null
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnail?: ImageUploadUpdateOneWithoutThumbnailOfNestedInput
    otherImages?: ImageUploadUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
    otherImages?: ImageUploadUncheckedUpdateManyWithoutAccountNestedInput
    resetLogs?: AccountResetLogUncheckedUpdateManyWithoutAccountNestedInput
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
    skinList?: AccountUpdateskinListInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailId?: NullableIntFieldUpdateOperationsInput | number | null
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