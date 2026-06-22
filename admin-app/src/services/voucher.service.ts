import { ApiResponseList, MessageResponse } from "@/types/api.type";
import {
  CreateVoucherPayload,
  UpdateVoucherPayload,
  VoucherType,
  VoucherUsageBookingRow,
  VoucherUsageSummary
} from "@/types/voucher.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

export type VoucherEntity = {
  id: number;
  voucherCode: string;
  voucherName: string;
  isValid: boolean;
  isVisible: boolean;
  type: VoucherType;
  percentage?: number | null;
  nominal?: number | null;
  maxDiscount?: number | null;
  minOrderValue?: number | null;
  maxGlobalUsage?: number | null;
  maxUsagePerUser?: number | null;
  usageCount: number;
  dateStart: Date;
  dateEnd: Date;
  createdAt: Date;
};

const BASE_VOUCHER_URL = "/api/vouchers";

const createVoucherService = () => {
  const fetchAll = async (page?: number, limit?: number, query?: string) => {
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<VoucherEntity>
      >(BASE_VOUCHER_URL, {
        params: { page, limit, q: query }
      });

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: CreateVoucherPayload) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        BASE_VOUCHER_URL,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const remove = async (id: number) => {
    try {
      await interceptedAxios.delete(`${BASE_VOUCHER_URL}/${id}`);
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (id: number, data: UpdateVoucherPayload) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_VOUCHER_URL}/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const findById = async (id: number) => {
    try {
      const response = await interceptedAxios.get<{
        data: VoucherEntity;
      }>(`${BASE_VOUCHER_URL}/${id}`);

      return response.data.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const fetchUsageSummary = async (id: number) => {
    try {
      const response = await interceptedAxios.get<{
        data: VoucherUsageSummary;
      }>(`${BASE_VOUCHER_URL}/${id}/usage/summary`);

      return response.data.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const fetchUsageBookings = async (id: number, page = 1, limit = 20) => {
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<VoucherUsageBookingRow>
      >(`${BASE_VOUCHER_URL}/${id}/usage/bookings`, {
        params: { page, limit }
      });

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      const res = await interceptedAxios.patch<MessageResponse>(
        `${BASE_VOUCHER_URL}/${id}/toggle`
      );

      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const toggleStatusVisibility = async (id: number) => {
    try {
      const res = await interceptedAxios.patch<MessageResponse>(
        `${BASE_VOUCHER_URL}/${id}/toggleVisibility`
      );

      return res.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return {
    fetchAll,
    create,
    remove,
    update,
    findById,
    fetchUsageSummary,
    fetchUsageBookings,
    toggleStatus,
    toggleStatusVisibility
  };
};

export const voucherService = createVoucherService();
