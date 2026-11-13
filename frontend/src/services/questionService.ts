import { IQuestion } from "@/types/question";
import { API_URL } from "./api";

export async function getQuestions(): Promise<IQuestion[]> {
  const response = await fetch(`${API_URL}/questions`);

  if (!response.ok) {
    throw new Error("Sorular alınamadı.");
  }

  return response.json();
}
