import { memo, useCallback, useEffect, useMemo, useState } from "react";

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
  setBookingFree: (value: boolean) => void;
  setTotalPayment: (value: number) => void;
  onSubmit: () => Promise<void>;
};

function PaymentSummary({
  booking,
  paymentMethod,
  voucher,
  setVoucher,
  fetchVoucher,
  setBookingFree,
  setTotalPayment,
  onSubmit
}: PaymentSummaryProps) {
  const [loading, setLoading] = useState(false);
  const [voucherName, setVoucherName] = useState("");
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);

  const isDisabled = !booking || !paymentMethod;

  const isDailyDropBooking =
    !booking.voucherName && (booking.discount ?? 0) > 0;
  const dailyDropDiscount = isDailyDropBooking ? booking.discount ?? 0 : 0;

  const voucherDiscount = useMemo(
    () => calculateVoucherDiscount(voucher, booking.mainValue),
    [voucher, booking.mainValue]
  );

  const subtotalPayment = useMemo(
    () =>
      booking.mainValue +
      (booking.othersValue ?? 0) -
      (isDailyDropBooking ? dailyDropDiscount : voucherDiscount),
    [
      booking.mainValue,
      booking.othersValue,
      isDailyDropBooking,
      dailyDropDiscount,
      voucherDiscount
    ]
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
    async (voucherName: string | null) => {
      if (!voucherName || !voucherName.trim() || isApplyingVoucher) return;

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

  useEffect(() => {
    setBookingFree(isBookingFree);
  }, [isBookingFree, setBookingFree]);

  useEffect(() => {
    setTotalPayment(totalPayment);
  }, [totalPayment, setTotalPayment]);


  if (!booking) return null;

  return (
    <div
      className={cn(
        "w-full lg:w-full space-y-4 sm:space-y-4 rounded-lg p-[20px] flex flex-col",
        instrumentSans.className
      )}
    >
      <div>
        <h1
          className={`text-xl sm:text-3xl font-semibold mb-4 sm:mb-6 leading-[1.2] ${staatliches.className}`}
        >
          ORDER SUMMARY
        </h1>
        <div className="mt-2">
          <label className="text-xs sm:text-sm text-[#D9D9D9]">Promo Code</label>
          <div className="flex flex-row gap-2 max-tablet:gap-0 border border-[#F9FAFB] rounded-lg p-3 mt-2">
            <input
              type="text"
              value={voucherName}
              onChange={(e) => setVoucherName(e.target.value)}
              onKeyPress={handleVoucherKeyPress}
              placeholder="Enter Promo Code"
              className="flex-1 px-3 py-2 text-sm bg-[#1C1C1C] rounded outline-none"
              aria-label="Promo code input"
              disabled={isApplyingVoucher || isDailyDropBooking}
            />

            <button
              type="button"
              onClick={() => onApplyVoucher(voucherName)}
              disabled={!voucherName.trim() || isApplyingVoucher}
              className="px-4 py-2 text-sm sm:text-base bg-[#C70515] text-[#D9D9D9] font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#b81a1a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Apply promo code"
            >
              {isApplyingVoucher ? "Applying..." : "Apply"}
            </button>
          </div>
        </div>

        <div className="text-end text-xs pt-2">
          <VoucherModal
            voucher={voucher}
            handleApplyVoucher={onApplyVoucher}
            isApplyingVoucher={isApplyingVoucher}
            isDailyDrop={isDailyDropBooking}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs sm:text-sm font-semibold leading-[1.2]">
          Valorant Account
        </span>
      </div>

      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>IDR {booking.mainValue.toLocaleString()}</span>
        </div>
        {isDailyDropBooking ? (
          <div className="flex justify-between text-yellow-400">
            <span>Daily Drop Discount</span>
            <span>-IDR {dailyDropDiscount.toLocaleString()}</span>
          </div>
        ) : voucher ? (
          <div className="flex justify-between text-yellow-400">
            <span>Promo ({voucher.voucherName})</span>
            <span>-IDR {voucherDiscount.toLocaleString()}</span>
          </div>
        ) : null}
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
        <span className="text-base sm:text-base font-semibold">
          Total Payment
        </span>
        <span className="text-base sm:text-lg font-bold break-words">
          {isBookingFree ? "Free" : "IDR " + totalPayment.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col gap-2 space-y-2 text-center text-white">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled || loading}
          className={cn(
            "w-full text-base sm:text-lg lg:text-xl transition py-2.5 sm:py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black",
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
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-xs sm:text-sm whitespace-nowrap">
            Any Questions?
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <button
          type="button"
          className="w-full py-2 text-xs sm:text-sm font-semibold rounded-xl bg-neutral-700 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black"
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
