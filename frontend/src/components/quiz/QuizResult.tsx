interface QuizResultProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export default function QuizResult({
  score,
  total,
  onRestart,
}: QuizResultProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Sınav Tamamlandı!</h1>

      <div className="my-8">
        <p className="text-5xl font-bold text-blue-600">%{percentage}</p>

        <p className="mt-3 text-gray-500">
          {score} doğru / {total} soru
        </p>
      </div>

      <button
        onClick={onRestart}
        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Tekrar Çöz
      </button>
    </div>
  );
}
