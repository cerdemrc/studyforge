import { IQuestion } from "@/types/question";

const API_URL = "http://localhost:8000";

export async function getQuestions(): Promise<IQuestion[]> {
  const response = await fetch(`${API_URL}/questions`);

  if (!response.ok) {
    throw new Error("Sorular alınamadı.");
  }

  return response.json();
}
