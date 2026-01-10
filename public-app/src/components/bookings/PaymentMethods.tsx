import { PAYMENT_METHOD_TYPE } from "@/types/booking.type";
import { QrCode } from "lucide-react";
import { Instrument_Sans, Staatliches } from "next/font/google";

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

type PaymentMethodsProps = {
  paymentMethod: PAYMENT_METHOD_TYPE | null;
  setPaymentMethod: (value: PAYMENT_METHOD_TYPE) => void;
}

export default function PaymentMethods({ paymentMethod, setPaymentMethod }: PaymentMethodsProps) {
  return (
    <div className={instrumentSans.className}>
      <h1 className={`text-3xl font-semibold mb-4 leading-[1.2] ${staatliches.className}`}>SELECT A PAYMENT METHOD</h1>

      <div
        onClick={() => setPaymentMethod(PAYMENT_METHOD_TYPE.QRIS)}
        className={`
          w-48 p-4 rounded-md cursor-pointer border-2
          ${
            paymentMethod === PAYMENT_METHOD_TYPE.QRIS
              ? "border-red-500"
              : "border-white hover:border-red-500"
          }
          group
        `}
      >
        <div
          className={`
            w-full h-40 flex items-center justify-center rounded-md
            ${paymentMethod === PAYMENT_METHOD_TYPE.QRIS ? "text-red-500" : "text-white group-hover:text-red-400"}
          `}
        >
          <QrCode
            className={`
              w-40 h-40
              ${paymentMethod === PAYMENT_METHOD_TYPE.QRIS ? "text-red-500" : "text-white group-hover:text-red-400"}
            `}
          />
        </div>

        <p
          className={`
            text-center mt-2 font-semibold
            ${paymentMethod === PAYMENT_METHOD_TYPE.QRIS ? "text-red-500" : "text-white group-hover:text-red-400"}
          `}
        >
          QRIS
        </p>
      </div>
    </div>
  );
}
