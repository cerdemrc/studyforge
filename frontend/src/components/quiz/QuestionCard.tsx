import type { IQuestion } from "@/types/question";
import AnswerOption from "./AnswerOption";

interface QuestionCardProps {
  question: IQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string;
  isChecked: boolean;
  onSelect: (answer: string) => void;
  onCheck: () => void;
  onNext: () => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isChecked,
  onSelect,
  onCheck,
  onNext,
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correct_answer;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <span className="text-sm font-medium text-blue-600">
          Soru {questionNumber} / {totalQuestions}
        </span>

        <h2 className="mt-3 text-xl font-semibold leading-relaxed text-gray-900">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <AnswerOption
            key={key}
            optionKey={key}
            value={value}
            selected={selectedAnswer === key}
            disabled={isChecked}
            isCorrect={isChecked && key === question.correct_answer}
            isWrong={isChecked && key === selectedAnswer && !isCorrect}
            onClick={() => onSelect(key)}
          />
        ))}
      </div>

      {isChecked && (
        <div
          className={`mt-6 rounded-xl p-4 ${
            isCorrect ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <h3
            className={`font-semibold ${
              isCorrect ? "text-green-700" : "text-red-700"
            }`}
          >
            {isCorrect ? "Doğru!" : "Yanlış!"}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            {question.explanation}
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Kaynak sayfa: {question.source_pages.join(", ")}
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        {!isChecked ? (
          <button
            onClick={onCheck}
            disabled={!selectedAnswer}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cevabını Kontrol Et
          </button>
        ) : (
          <button
            onClick={onNext}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            {questionNumber === totalQuestions ? "Cevabı Gör" : "Sıradaki"}
          </button>
        )}
      </div>
    </div>
  );
}
