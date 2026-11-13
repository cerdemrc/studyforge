const API_URL = "http://localhost:8000";

interface UploadResponse {
  message: string;
  question_count: number;
}

export async function uploadPdf(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "PDF yüklenemedi.");
  }

  return data;
}
