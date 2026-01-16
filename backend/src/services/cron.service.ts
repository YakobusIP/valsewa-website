import cron from "node-cron";
import { CustomerService } from "./customer.service";
import { VoucherService } from "./voucher.service";
import { prisma } from "../lib/prisma";

export class CronService {
  private customerService: CustomerService;
  private voucherService: VoucherService;

  constructor() {
    this.customerService = new CustomerService();
    this.voucherService = new VoucherService();
  }

  public init() {
    // Run every hour
    cron.schedule("0 * * * *", async () => {
      console.log("Running password expiration check...");
      await this.checkPasswordExpiration();
    });

    // Run every 1 day
    cron.schedule("0 0 * * *", async () => {
      console.log("Running voucher expiration check...");
      await this.checkVoucherExpiration();
    });
  }
  
  private async checkPasswordExpiration() {
    try {
      const today = new Date();

      // Find all active customers whose password has expired
      const expiredCustomers = await prisma.customer.findMany({
        where: {
          isActive: true,
          passwordExpireAt: {
            lt: today
          }
        }
      });

      console.log(`Found ${expiredCustomers.length} expired customers.`);

      for (const customer of expiredCustomers) {
        console.log(`Deactivating customer: ${customer.username}`);
        await this.customerService.toggleCustomerActiveStatus(customer.id, false);
      }
    } catch (error) {
      console.error("Error in checkPasswordExpiration cron job:", error);
    }
  }

  private async checkVoucherExpiration() {
    try {
      const today = new Date();

      // Find all valid vouchers whose end date has passed
      const expiredVouchers = await prisma.voucher.findMany({
        where: {
          isValid: true,
          dateEnd: {
            lt: today
          }
        }
      });

      console.log(`Found ${expiredVouchers.length} expired vouchers.`);

      for (const voucher of expiredVouchers) {
        console.log(`Deactivating voucher: ${voucher.voucherName}`);
        await this.voucherService.toggleVoucherValidity(voucher.id, false);
      }
    } catch (error) {
      console.error("Error in checkVoucherExpiration cron job:", error);
    }
  }
}

export const cronService = new CronService();
