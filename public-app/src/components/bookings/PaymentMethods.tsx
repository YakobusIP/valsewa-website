import { PAYMENT_METHOD_REQUEST } from "@/types/booking.type";

import { Instrument_Sans, Staatliches } from "next/font/google";
import Image from "next/image";

import PaymentMethodCard from "./PaymentMethodCard";

const staatliches = Staatliches({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap"
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const VA_METHODS = [
  {
    type: PAYMENT_METHOD_REQUEST.VA_BNI,
    label: "VA BNI",
    logo: "/paymentMethods/VA_BNI.svg"
  },
  {
    type: PAYMENT_METHOD_REQUEST.VA_PERMATA,
    label: "VA PERMATA",
    logo: "/paymentMethods/VA_PERMATA.svg"
  },
  {
    type: PAYMENT_METHOD_REQUEST.VA_BRI,
    label: "VA BRI",
    logo: "/paymentMethods/VA_BRI.svg"
  }
];

type PaymentMethodsProps = {
  paymentMethod: PAYMENT_METHOD_REQUEST | null;
  setPaymentMethod: (value: PAYMENT_METHOD_REQUEST) => void;
};

export default function PaymentMethods({
  paymentMethod,
  setPaymentMethod
}: PaymentMethodsProps) {
  return (
    <div className={instrumentSans.className}>
      <h1
        className={`text-3xl font-semibold mb-6 leading-[1.2] ${staatliches.className}`}
      >
        SELECT A PAYMENT METHOD
      </h1>

      <div className="flex flex-col gap-8">
        {/* QRIS */}
        <PaymentMethodCard
          active={paymentMethod === PAYMENT_METHOD_REQUEST.QRIS}
          onClick={() => setPaymentMethod(PAYMENT_METHOD_REQUEST.QRIS)}
          label="QRIS"
        >
          <Image
            src="/paymentMethods/QRIS.svg"
            alt="QRIS"
            height={128}
            width={128}
            className="w-32 h-32 object-contain"
          />
        </PaymentMethodCard>

        {/* Other Methods */}
        <div>
          <p className="mb-3 flex items-center gap-2 text-white font-semibold">
            Other Methods
          </p>

          <div className="flex gap-4">
            {VA_METHODS.map((method) => (
              <PaymentMethodCard
                key={method.type}
                active={paymentMethod === method.type}
                onClick={() => setPaymentMethod(method.type)}
                label={method.label}
              >
                <Image
                  src={method.logo}
                  alt={method.label}
                  height={64}
                  width={64}
                  className="w-16 h-16 object-contain"
                />
              </PaymentMethodCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
