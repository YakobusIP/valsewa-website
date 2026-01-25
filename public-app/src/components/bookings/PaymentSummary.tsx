import { memo, useCallback, useMemo, useState } from "react";

import {
  BookingWithAccountEntity,
  PAYMENT_METHOD_REQUEST
} from "@/types/booking.type";
import { VoucherEntity } from "@/types/voucher.type";

import { PAYMENT_METHOD_LABELS } from "@/lib/constants";
import { instrumentSans, staatliches } from "@/lib/fonts";
import { calculateAdminFee, calculateVoucherDiscount, cn } from "@/lib/utils";

import VoucherModal from "./VoucherModal";

type PaymentSummaryProps = {
  booking: BookingWithAccountEntity;
  paymentMethod: PAYMENT_METHOD_REQUEST | null;
  voucher: VoucherEntity | null;
  setVoucher: (value: VoucherEntity | null) => void;
  fetchVoucher: (voucherName: string) => Promise<VoucherEntity | null>;
  onSubmit: () => Promise<void>;
};

function PaymentSummary({
  booking,
  paymentMethod,
  voucher,
  setVoucher,
  fetchVoucher,
  onSubmit
}: PaymentSummaryProps) {
  const [loading, setLoading] = useState(false);
  const [voucherName, setVoucherName] = useState("");
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);

  const isDisabled = !booking || !paymentMethod;

  const discount = useMemo(
    () => calculateVoucherDiscount(voucher, booking.mainValue),
    [voucher, booking.mainValue]
  );

  const subtotalPayment = useMemo(
    () => booking.totalValue - discount,
    [booking.totalValue, discount]
  );

  const isBookingFree = booking && subtotalPayment === 0;

  const adminFee = useMemo(
    () =>
      isBookingFree ? 0 : calculateAdminFee(subtotalPayment, paymentMethod),
    [isBookingFree, subtotalPayment, paymentMethod]
  );

  const totalPayment = useMemo(
    () => subtotalPayment + adminFee,
    [adminFee, subtotalPayment]
  );

  const paymentMethodLabel = useMemo(() => {
    if (!paymentMethod) return "-";
    return (
      PAYMENT_METHOD_LABELS[paymentMethod] || paymentMethod.replace("_", " ")
    );
  }, [paymentMethod]);

  const onApplyVoucher = useCallback(
    async (voucherName: string) => {
      if (!voucherName.trim() || isApplyingVoucher) return;

      try {
        setIsApplyingVoucher(true);
        const result = await fetchVoucher(voucherName);
        setVoucher(result);
        if (!result) {
          setVoucherName("");
        }
      } catch (err) {
        console.error("Failed to apply voucher", err);
      } finally {
        setIsApplyingVoucher(false);
      }
    },
    [isApplyingVoucher, fetchVoucher, setVoucher]
  );

  const handleVoucherKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && voucherName.trim()) {
        onApplyVoucher(voucherName);
      }
    },
    [voucherName, onApplyVoucher]
  );

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };

  if (!booking) return null;

  return (
    <div
      className={cn(
        "w-full lg:w-3/4 space-y-4 sm:space-y-6 rounded-lg",
        instrumentSans.className
      )}
    >
      <div>
        <h1
          className={`text-xl sm:text-2xl font-semibold leading-[1.2] ${staatliches.className}`}
        >
          PROMO CODE
        </h1>
        <VoucherModal
          voucher={voucher}
          handleApplyVoucher={onApplyVoucher}
          isApplyingVoucher={isApplyingVoucher}
        />
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <input
            type="text"
            value={voucherName}
            onChange={(e) => setVoucherName(e.target.value)}
            onKeyPress={handleVoucherKeyPress}
            placeholder="Enter Promo Code"
            className="flex-1 px-3 py-2 text-sm bg-gray-800 rounded outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Promo code input"
            disabled={isApplyingVoucher}
          />

          <button
            type="button"
            onClick={() => onApplyVoucher(voucherName)}
            disabled={!voucherName.trim() || isApplyingVoucher}
            className="px-4 py-2 text-sm sm:text-base font-semibold text-black bg-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Apply promo code"
          >
            {isApplyingVoucher ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base sm:text-lg font-semibold leading-[1.2]">
          Valorant Account
        </h2>
        <span className="text-sm sm:text-base text-gray-300 break-words">
          {booking.account.priceTierCode} - {booking.account.accountCode} -{" "}
          {booking.account.accountRank}
        </span>
      </div>

      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>IDR {booking.mainValue.toLocaleString()}</span>
        </div>
        {voucher && (
          <div className="flex justify-between text-green-400">
            <span>Promo ({voucher.voucherName})</span>
            <span>-IDR {discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Other Fee</span>
          <span>IDR {booking.othersValue?.toLocaleString() ?? "0"}</span>
        </div>
        {adminFee !== 0 && (
          <div className="flex justify-between">
            <span>Admin Fee</span>
            <span>IDR {adminFee?.toLocaleString() ?? "0"}</span>
          </div>
        )}
        {!isBookingFree ? (
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span>{paymentMethodLabel}</span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <span className="text-base sm:text-lg font-semibold text-red-500">
          Total Payment
        </span>
        <span className="text-base sm:text-lg font-bold text-red-500 break-words">
          {isBookingFree ? "Free" : "IDR " + totalPayment.toLocaleString()}
        </span>
      </div>

      <div className="hidden lg:flex flex-col gap-2 space-y-2 text-center text-white">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || loading}
          className={cn(
            "w-full text-base sm:text-lg lg:text-xl transition py-2.5 sm:py-3 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black",
            isDisabled || loading
              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          )}
          aria-label={`${isBookingFree ? "Free" : "Pay IDR " + totalPayment.toLocaleString()} and rent now`}
        >
          {loading
            ? "Loading..."
            : `${isBookingFree ? "Free" : "IDR " + totalPayment.toLocaleString()} | Rent Now`}
        </button>
        <p className="text-xs sm:text-sm">Any Questions?</p>
        <button
          type="button"
          className="w-full py-2 text-xs sm:text-sm font-semibold rounded-md bg-neutral-700 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black"
          onClick={() =>
            window.open(
              "https://wa.me/6285175343447?text=Halo%20admin%20VALSEWA%20aku%20butuh%20bantuan%20dong",
              "_blank"
            )
          }
        >
          Ask Our Team
        </button>
      </div>
    </div>
  );
}

export default memo(PaymentSummary);
