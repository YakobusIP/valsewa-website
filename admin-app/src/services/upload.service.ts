import { UploadResponse } from "@/types/upload.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_UPLOAD_URL = "/api/upload";

const createUploadService = () => {
  const uploadAccountImages = async (images: File[]) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await interceptedAxios.post<UploadResponse[]>(
        `${BASE_UPLOAD_URL}/account-images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const uploadCarouselImages = async (images: File[]) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await interceptedAxios.post<UploadResponse[]>(
        `${BASE_UPLOAD_URL}/carousel-images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { uploadAccountImages, uploadCarouselImages };
};

const uploadService = createUploadService();

export { uploadService };
