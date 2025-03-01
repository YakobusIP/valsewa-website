import { InternalServerError } from "../lib/error";
import { prisma } from "../lib/prisma";

export class StatisticService {
  getAll = async () => {
    try {
      const accounts = await prisma.account.groupBy({
        by: ["availabilityStatus"],
        _count: { availabilityStatus: true }
      });

      const availableAccounts =
        accounts.find((a) => a.availabilityStatus === "AVAILABLE")?._count
          .availabilityStatus || 0;
      const inUseAccounts =
        accounts.find((a) => a.availabilityStatus === "IN_USE")?._count
          .availabilityStatus || 0;

      const totalForRatio = availableAccounts + inUseAccounts;
      const rentedRatio = totalForRatio
        ? (inUseAccounts / totalForRatio) * 100
        : 0;

      const totalAccounts = accounts.reduce(
        (sum, { _count }) => sum + _count.availabilityStatus,
        0
      );

      return {
        rentedRatio,
        availableAccounts,
        inUseAccounts,
        totalAccounts
      };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
