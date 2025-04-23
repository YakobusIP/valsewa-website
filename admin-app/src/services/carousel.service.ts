import { ApiResponseList, MessageResponse } from "@/types/api.type";
import { CarouselSlide, CarouselSlideRequest } from "@/types/carousel.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_CAROUSEL_URL = "/api/carousels";

const createCarouselSlideService = () => {
  const fetchAll = async () => {
    try {
      const response =
        await interceptedAxios.get<ApiResponseList<CarouselSlide>>(
          BASE_CAROUSEL_URL
        );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: CarouselSlideRequest) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        BASE_CAROUSEL_URL,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (id: number, data: Partial<CarouselSlideRequest>) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_CAROUSEL_URL}/${id}`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const deleteSlide = async (id: number) => {
    try {
      await interceptedAxios.delete(`${BASE_CAROUSEL_URL}/${id}`);
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { fetchAll, create, update, deleteSlide };
};

const carouselSlideService = createCarouselSlideService();

export { carouselSlideService };
