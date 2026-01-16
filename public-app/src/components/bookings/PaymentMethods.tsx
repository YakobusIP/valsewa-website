import { memo, useMemo } from "react";

import { PAYMENT_METHOD_REQUEST } from "@/types/booking.type";

import { instrumentSans, staatliches } from "@/lib/fonts";

import Image from "next/image";

import PaymentMethodCard from "./PaymentMethodCard";

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
] as const;

type PaymentMethodsProps = {
  paymentMethod: PAYMENT_METHOD_REQUEST | null;
  setPaymentMethod: (value: PAYMENT_METHOD_REQUEST) => void;
};

function PaymentMethods({
  paymentMethod,
  setPaymentMethod
}: PaymentMethodsProps) {
  const handleQRISSelect = useMemo(
    () => () => setPaymentMethod(PAYMENT_METHOD_REQUEST.QRIS),
    [setPaymentMethod]
  );

  const handleVASelect = useMemo(
    () => (type: PAYMENT_METHOD_REQUEST) => () => setPaymentMethod(type),
    [setPaymentMethod]
  );

  return (
    <div className={instrumentSans.className}>
      <h1
        className={`text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 leading-[1.2] ${staatliches.className}`}
      >
        SELECT A PAYMENT METHOD
      </h1>

      <div
        className="flex flex-col gap-6 sm:gap-8"
        role="radiogroup"
        aria-label="Payment methods"
      >
        <PaymentMethodCard
          active={paymentMethod === PAYMENT_METHOD_REQUEST.QRIS}
          onClick={handleQRISSelect}
          label="QRIS"
        >
          <Image
            src="/paymentMethods/QRIS.svg"
            alt="QRIS payment method"
            height={128}
            width={128}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            priority
          />
        </PaymentMethodCard>

        <div>
          <p className="mb-3 text-sm sm:text-base flex items-center gap-2 text-white font-semibold">
            Other Methods
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {VA_METHODS.map((method) => (
              <PaymentMethodCard
                key={method.type}
                active={paymentMethod === method.type}
                onClick={handleVASelect(method.type)}
                label={method.label}
              >
                <Image
                  src={method.logo}
                  alt={`${method.label} payment method`}
                  height={64}
                  width={64}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
              </PaymentMethodCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PaymentMethods);
