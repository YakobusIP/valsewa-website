import { InternalServerError } from "../lib/error";
import { prisma } from "../lib/prisma";

export class StatisticService {
  getAll = async () => {
    try {
      const accounts = await prisma.account.groupBy({
        by: ["availabilityStatus"],
        _count: { availabilityStatus: true }
      });

      const totalAccounts = accounts.reduce(
        (sum, { _count }) => sum + _count.availabilityStatus,
        0
      );
      const availableAccounts =
        accounts.find((a) => a.availabilityStatus === "AVAILABLE")?._count
          .availabilityStatus || 0;
      const inUseAccounts =
        accounts.find((a) => a.availabilityStatus === "IN_USE")?._count
          .availabilityStatus || 0;

      return {
        rentedRatio: availableAccounts
          ? (inUseAccounts / availableAccounts) * 100
          : 0,
        availableAccounts,
        inUseAccounts,
        totalAccounts
      };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
