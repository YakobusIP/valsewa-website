import { BookingWithAccountEntity, PAYMENT_METHOD_TYPE } from "@/types/booking.type";
import { TYPE, VoucherEntity } from "@/types/voucher.type";
import { Instrument_Sans, Staatliches } from "next/font/google";
import { useState } from "react";

const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
}) 

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

type PaymentSummaryProps = {
  booking: BookingWithAccountEntity;
  paymentMethod: PAYMENT_METHOD_TYPE | null;
  voucher: VoucherEntity | null;
  setVoucher: (value: VoucherEntity | null) => void;
  fetchVoucher: (voucherName: string) => Promise<VoucherEntity | null>;
  onSubmit: () => void;
}

export default function PaymentSummary({ booking, paymentMethod, voucher, setVoucher, fetchVoucher, onSubmit }: PaymentSummaryProps) {
  const isDisabled = !booking || !paymentMethod;
  const [voucherName, setVoucherName] = useState<string>("");

  if (!booking) return null;

  const calculateDiscount = () => {
    let discount = 0;
    if (voucher) {
      if (voucher.type === TYPE.PERSENTASE) {
        const voucherAmount = voucher.percentage ?? 0;
        discount = booking.mainValue * voucherAmount * 0.01;
      } else {
        const voucherAmount = voucher.nominal ?? 0;
        discount = voucherAmount;
      }
      
      if (voucher.maxDiscount) {
        const voucherMaxDiscount = voucher.maxDiscount;
        discount = Math.min(discount, voucherMaxDiscount);
      }
      
      discount = Math.min(discount, booking.mainValue);
    }

    return discount;
  }

  const onApplyVoucher = async () => {
    if (!voucherName.trim()) return;

    try {
      const result = await fetchVoucher(voucherName);
      setVoucher(result);
    } catch (err) {
      console.error("Failed to apply voucher", err);
    }
  };

  if (!booking) return;
  return (
    <div className={`w-3/4 space-y-6 rounded-lg ${instrumentSans.className}`}>
      <div>
        <h1 className={`text-2xl font-semibold leading-[1.2] ${staatliches.className}`}>PROMO CODE</h1>
        <button className="text text-[#E8C545] mt-2 underline">
          Explore Promo Codes
        </button>
        <div className="flex gap-2 mt-2">
          <input
            value={voucherName}
            onChange={(e) => setVoucherName(e.target.value)}
            placeholder="Enter Promo Code"
            className="flex-1 px-3 py-2 text-sm bg-gray-800 rounded outline-none"
          />

          <button
            onClick={onApplyVoucher}
            disabled={!voucherName.trim()}
            className="px-4 font-semibold text-black bg-white rounded disabled:opacity-50"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className={`text-lg font-semibold leading-[1.2]`}>Valorant Account</h2>
        <span className="">
          {booking.account.priceTier.code} - {booking.account.accountCode} - {booking.account.accountRank}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>IDR {booking.mainValue.toLocaleString()}</span>
        </div>
        {voucher && (
          <div className="flex justify-between text-green-400">
            <span>Promo</span>
            <span>-IDR {calculateDiscount().toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Other Fee</span>
          <span>IDR {booking.othersValue?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Payment Method</span>
          <span>{paymentMethod ?? "-"}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <span className="text-lg font-semibold text-red-500">
          Total Payment
        </span>
        <span className="text-lg font-bold text-red-500">
          IDR {(booking.totalValue - calculateDiscount()).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col gap-2 space-y-2 text-center text-white">
        <button
          onClick={onSubmit}
          disabled={isDisabled}
          className={`w-full text-xl transition py-3 rounded font-semibold
            ${isDisabled
              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
            }
          `}
        >
          IDR {(booking.totalValue - calculateDiscount()).toLocaleString()} | Rent Now
        </button>
        <p className="text-xs">Any Questions?</p>
        <button className="w-full py-2 text-sm font-semibold rounded-md bg-neutral-700 hover:bg-neutral-600">
          Ask Our Team
        </button>
      </div>
    </div>
  );
}
