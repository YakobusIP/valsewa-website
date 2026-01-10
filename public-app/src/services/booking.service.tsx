import { interceptedAxios } from "@/lib/axios";
import { BookingEntity, BookingWithAccountEntity, CreateBookingRequest, PayBookingRequest, PaymentEntity, VerifyPaymentRequest } from "@/types/booking.type";

const createBookingService = () => {
  const fetchBookingById = async (bookingId: string): Promise<BookingWithAccountEntity | null> => {
    try {
      const response = await interceptedAxios.get<BookingWithAccountEntity>(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/bookings/${bookingId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error when creating booking:", error);
      throw error;
    }
  }

  const fetchPaymentById = async (paymentId: string): Promise<PaymentEntity | null> => {
    try {
      const response = await interceptedAxios.get<PaymentEntity>(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/bookings/payments/${paymentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error when creating payment:", error);
      throw error;
    }
  }

  const createBooking = async (data: CreateBookingRequest): Promise<BookingEntity | null> => {
    try {
      const response = await interceptedAxios.post<BookingEntity>(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/bookings/book`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error when creating booking:", error);
      throw error;
    }
  }

  const payBooking = async (data: PayBookingRequest): Promise<PaymentEntity | null> => {
    try {
      const response = await interceptedAxios.post<PaymentEntity>(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/bookings/pay`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error when paying booking:", error);
      throw error;
    }
  }

  const verifyPayment = async (data: VerifyPaymentRequest): Promise<PaymentEntity | null> => {
    try {
      const response = await interceptedAxios.post<PaymentEntity>(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/bookings/verify-payment`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error when verifying payment:", error);
      throw error;
    }
  }

  return { fetchBookingById, fetchPaymentById, createBooking, payBooking, verifyPayment };
}

const bookingService = createBookingService();

export { bookingService };