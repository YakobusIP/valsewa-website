import { PAYMENT_METHOD_REQUEST } from "@/types/booking.type";

import { Instrument_Sans, Staatliches } from "next/font/google";
import Image from "next/image";

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

type PaymentMethodsProps = {
  paymentMethod: PAYMENT_METHOD_REQUEST | null;
  setPaymentMethod: (value: PAYMENT_METHOD_REQUEST) => void;
};

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
type PaymentMethodCardProps = {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
};

function PaymentMethodCard({
  active,
  label,
  onClick,
  children
}: PaymentMethodCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group w-fit rounded-md cursor-pointer border-2 transition-all
        ${active ? "bg-white border-red-500" : "border-white hover:border-red-500"}
        ${label === "QRIS" ? "p-8" : "p-4 hover:bg-white"}
      `}
    >
      <div
        className={`
          w-full flex items-center justify-center rounded-md transition-all
          ${active ? "grayscale-0" : "grayscale group-hover:grayscale-0"}
        `}
      >
        {children}
      </div>

      <p
        className={`
          text-center mt-2 font-semibold transition-colors
          ${active ? "text-red-500" : "text-white group-hover:text-red-400"}
        `}
      >
        {label}
      </p>
    </div>
  );
}

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
