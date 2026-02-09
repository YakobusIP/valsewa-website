import { collapseBookings } from "../utils";
import type { PriceTierIdMap } from "./priceTier";

export async function migrateAccounts(
  tx: any,
  source: any,
  priceTierMap: PriceTierIdMap
) {
  const accounts = await source.account.findMany({
    include: {
      skinList: true,
      Booking: true,
      priceTier: true // IMPORTANT: get code
    }
  });

  for (const acc of accounts) {
    const bookingData = collapseBookings(acc.Booking);

    const baseTierCode = acc.priceTier.code;

    const normalId = priceTierMap.normalByCode.get(baseTierCode);
    if (!normalId) {
      throw new Error(`Missing normal PriceTier for code: ${baseTierCode}`);
    }

    const lowId = priceTierMap.lowByCode.get(baseTierCode);
    const targetPriceTierId = acc.isLowRank && lowId ? lowId : normalId;

    await tx.account.create({
      data: {
        id: acc.id,
        username: acc.username,
        nickname: acc.nickname,
        accountCode: acc.accountCode,
        description: acc.description,
        accountRank: acc.accountRank,
        availabilityStatus: bookingData.currentBookingDate
          ? "IN_USE"
          : "AVAILABLE",
        totalRentHour: acc.totalRentHour,
        rentHourUpdated: acc.rentHourUpdated,
        password: acc.password,
        passwordResetRequired: acc.passwordResetRequired,
        skinList: acc.skinList.map((s: any) => s.name),
        priceTierId: targetPriceTierId,
        thumbnailId: acc.thumbnailId,
        createdAt: acc.createdAt,
        updatedAt: acc.updatedAt,
        ...bookingData
      }
    });
  }

  console.log(`✓ Accounts migrated: ${accounts.length}`);
}
