import axios from "axios";

const API_URL = "http://localhost:5000/api/upload";

type UploadResponse = {
  result: string; // Define o que você espera da API
};

export async function sendFileToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<UploadResponse>(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
}
