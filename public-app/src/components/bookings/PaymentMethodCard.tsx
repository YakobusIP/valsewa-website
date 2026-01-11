type PaymentMethodCardProps = {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function PaymentMethodCard({
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
