import { ApiResponseList, MessageResponse } from "@/types/api.type";
import {
  BookingEntity,
  CreateAdminBookingRequest,
  CreateBookingRequest,
  UpdateBookingRequest
} from "@/types/booking.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

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

  const overrideBooking = async (id: string, newAccountId: number) => {
    try {
      const response = await interceptedAxios.post<
        ApiResponseList<BookingEntity>
      >(`${BASE_BOOKING_URL}/override`, {
        bookingId: id,
        accountId: newAccountId
      });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const createAdminBooking = async (data: CreateAdminBookingRequest) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        `${BASE_BOOKING_URL}/create-admin`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return {
    fetchAll,
    create,
    update,
    getAccountRented,
    overrideBooking,
    createAdminBooking
  };
};

export const bookingService = createBookingService();
