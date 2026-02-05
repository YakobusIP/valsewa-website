import { VoucherEntity } from "@/types/voucher.type";

import { interceptedAxios } from "@/lib/axios";

const createVoucherService = () => {
  const fetchActiveVouchers = async (): Promise<VoucherEntity[]> => {
    try {
      const response = await interceptedAxios.get<VoucherEntity[]>(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/vouchers/active`
      );
      return response.data;
    } catch (error) {
      console.error("Error when fetching active voucher by name:", error);
      throw error;
    }
  };

  const fetchActiveVoucherByVoucherName = async (
    voucherName: string
  ): Promise<VoucherEntity | null> => {
    try {
      const response = await interceptedAxios.get<VoucherEntity>(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/vouchers/active/${voucherName}`
      );
      return response.data;
    } catch (error) {
      console.error("Error when fetching active voucher by name:", error);
      throw error;
    }
  };

  return { fetchActiveVouchers, fetchActiveVoucherByVoucherName };
};

const voucherService = createVoucherService();

export { voucherService };
