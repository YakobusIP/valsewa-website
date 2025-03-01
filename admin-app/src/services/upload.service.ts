import { UploadResponse } from "@/types/upload.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_UPLOAD_URL = "/api/upload";

const createUploadService = () => {
  const uploadImages = async (images: File[]) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await interceptedAxios.post<UploadResponse[]>(
        `${BASE_UPLOAD_URL}`,
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

  return { uploadImages };
};

const uploadService = createUploadService();

export { uploadService };
