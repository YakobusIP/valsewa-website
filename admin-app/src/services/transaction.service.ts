import { ApiResponseList, MessageResponse } from "@/types/api.type";
import {
  BOOKING_STATUS,
  CreateBookingRequest,
  PaymentEntity,
  UpdateBookingRequest
} from "@/types/booking.type";
import { CreateVoucherPayload, VoucherType } from "@/types/voucher.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

export type BookingEntity = {
  id: string;
  customerId: number | null;
  accountId: number;
  status: BOOKING_STATUS;
  duration: string;
  quantity: number;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date | null;
  expiredAt: Date | null;
  mainValuePerUnit: number;
  othersValuePerUnit: number | null;
  voucherName: string | null;
  voucherType: VoucherType | null;
  voucherAmount: number | null;
  voucherMaxDiscount: number | null;
  mainValue: number;
  othersValue: number | null;
  discount: number | null;
  totalValue: number;
  payments: PaymentEntity[];
};

const BASE_BOOKING_URL = "/api/bookings";

const createBookingService = () => {
  const fetchAll = async () => {
    try {
      const response =
        await interceptedAxios.get<ApiResponseList<BookingEntity>>(
          BASE_BOOKING_URL
        );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: CreateBookingRequest) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        `${BASE_BOOKING_URL}/create`,
        data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (id: string, data: UpdateBookingRequest) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_BOOKING_URL}/update/${id}`,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const getAccountRented = async (startDate?: string, endDate?: string) => {
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<BookingEntity>
      >(`${BASE_BOOKING_URL}/rented`, {
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return {
    fetchAll,
    create,
    update,
    getAccountRented
  };
};

export const bookingService = createBookingService();
