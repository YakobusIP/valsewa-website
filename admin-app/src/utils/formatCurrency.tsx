export const formatNumeric = (value: number | string): string => {
  if (value === null || value === undefined) return "0";

  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) return "0";

  return number.toLocaleString("id-ID");
};

export const formatRupiah = (value: number | string): string => {
  return `Rp ${formatNumeric(value)}`;
};
