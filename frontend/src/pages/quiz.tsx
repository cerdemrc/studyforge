import { useEffect, useState } from "react";
import type { IQuestion } from "@/types/question";
import { getQuestions } from "@/services/questionService";

import QuestionCard from "@/components/quiz/QuestionCard";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizResult from "@/components/quiz/QuizResult";

export default function Quiz() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getQuestions()
      .then((data) => setQuestions(data))
      .catch(() => setError("Sorular yüklenirken bir hata oluştu."))
      .finally(() => setIsLoading(false));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isChecked || !currentQuestion) return;

    setIsChecked(true);

    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer("");
    setIsChecked(false);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setIsChecked(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Sorular yükleniyor...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Henüz soru bulunmuyor.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            StudyForge
          </h1>

          <p className="mt-2 text-gray-500">
            Bilginizi test edin, eksiklerinizi keşfedin.
          </p>
        </header>

        {isFinished ? (
          <QuizResult
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <div className="mb-8">
              <QuizProgress
                current={currentQuestionIndex + 1}
                total={questions.length}
              />
            </div>

            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              isChecked={isChecked}
              onSelect={setSelectedAnswer}
              onCheck={handleCheckAnswer}
              onNext={handleNextQuestion}
            />
          </>
        )}
      </div>
    </main>
  );
}
