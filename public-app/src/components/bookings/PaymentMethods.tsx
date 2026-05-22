"use client";

import { memo, useMemo } from "react";

import { PAYMENT_METHOD_REQUEST } from "@/types/booking.type";

import { instrumentSans, staatliches } from "@/lib/fonts";

import Image from "next/image";

import PaymentMethodCard from "./PaymentMethodCard";

const VA_METHODS = [
  {
    type: PAYMENT_METHOD_REQUEST.QRIS,
    label: "QRIS",
    logo: "/paymentMethods/QRIS.svg"
  },
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
  // const handleQRISSelect = useMemo(
  //   () => () => setPaymentMethod(PAYMENT_METHOD_REQUEST.QRIS),
  //   [setPaymentMethod]
  // );

  const handleVASelect = useMemo(
    () => (type: PAYMENT_METHOD_REQUEST) => () => setPaymentMethod(type),
    [setPaymentMethod]
  );

  return (
    <div className={`p-[20px] flex flex-col ${instrumentSans.className}`}>
      <h1
        className={`text-xl sm:text-3xl font-semibold mb-4 sm:mb-2 leading-[1.2] ${staatliches.className}`}
      >
        CHECKOUT
      </h1>
      <h3
        className={`text-xs sm:text-xl mb-4 sm:mb-6 leading-[1.2] ${instrumentSans.className}`}
      >
        Select a payment method
      </h3>

      <div
        className="flex flex-col gap-6 sm:gap-8"
        role="radiogroup"
        aria-label="Payment methods"
      >


        <div>
          <div className="grid grid-cols-2 sm:grid-cols-none sm:flex sm:flex-wrap gap-3 sm:gap-4">
            {VA_METHODS.map((method) => (
              <div key={method.type} className="w-auto">
                <PaymentMethodCard
                  active={paymentMethod === method.type}
                  onClick={handleVASelect(method.type)}
                  label={method.label}
                  className="w-full h-full"
                >
                  <div className="flex flex-col items-center w-full h-full py-2">
                    <Image
                      src={method.logo}
                      alt={`${method.label} payment method`}
                      width={128}
                      height={128}
                      className="object-contain h-[85%]"
                    />
                    <p className="text-xs sm:text-sm text-center mt-1">
                      {method.label}
                    </p>
                  </div>
                </PaymentMethodCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PaymentMethods);
