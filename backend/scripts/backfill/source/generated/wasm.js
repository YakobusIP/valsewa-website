
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.1
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.1",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
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

exports.Prisma.AccountResetLogScalarFieldEnum = {
  id: 'id',
  accountId: 'accountId',
  previousExpireAt: 'previousExpireAt',
  resetAt: 'resetAt'
};

exports.Prisma.PriceTierScalarFieldEnum = {
  id: 'id',
  code: 'code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PriceListScalarFieldEnum = {
  id: 'id',
  duration: 'duration',
  normalPrice: 'normalPrice',
  lowPrice: 'lowPrice',
  tierId: 'tierId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SkinScalarFieldEnum = {
  id: 'id',
  name: 'name',
  imageUrl: 'imageUrl',
  keyword: 'keyword'
};

exports.Prisma.ImageUploadScalarFieldEnum = {
  id: 'id',
  imageUrl: 'imageUrl',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  accountId: 'accountId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  passwordChangedAt: 'passwordChangedAt',
  isActive: 'isActive',
  passwordExpireAt: 'passwordExpireAt'
};

exports.Prisma.CarouselSlideScalarFieldEnum = {
  id: 'id',
  imageId: 'imageId',
  duration: 'duration',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BookingScalarFieldEnum = {
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

exports.Prisma.PaymentScalarFieldEnum = {
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

exports.Prisma.VoucherScalarFieldEnum = {
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

exports.Prisma.GlobalSettingsScalarFieldEnum = {
  key: 'key',
  value: 'value'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Status = exports.$Enums.Status = {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN_USE',
  NOT_AVAILABLE: 'NOT_AVAILABLE'
};

exports.MediaType = exports.$Enums.MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

exports.BookingStatus = exports.$Enums.BookingStatus = {
  HOLD: 'HOLD',
  RESERVED: 'RESERVED',
  EXPIRED: 'EXPIRED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

exports.Type = exports.$Enums.Type = {
  PERSENTASE: 'PERSENTASE',
  NOMINAL: 'NOMINAL'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  EXPIRED: 'EXPIRED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

exports.Provider = exports.$Enums.Provider = {
  FASPAY: 'FASPAY',
  MANUAL: 'MANUAL'
};

exports.PaymentMethodType = exports.$Enums.PaymentMethodType = {
  QRIS: 'QRIS',
  VIRTUAL_ACCOUNT: 'VIRTUAL_ACCOUNT',
  MANUAL: 'MANUAL'
};

exports.Prisma.ModelName = {
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

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
