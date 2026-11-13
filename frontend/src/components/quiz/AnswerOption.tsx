interface AnswerOptionProps {
  optionKey: string;
  value: string;
  selected: boolean;
  disabled: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  onClick: () => void;
}

export default function AnswerOption({
  optionKey,
  value,
  selected,
  disabled,
  isCorrect,
  isWrong,
  onClick,
}: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl border p-4 text-left text-gray-900 transition-colors hover:cursor-pointer ${
        isCorrect
          ? "border-green-500 bg-green-100 text-green-900"
          : isWrong
            ? "border-red-500 bg-red-100 text-red-900"
            : selected
              ? "border-blue-500 bg-blue-100 text-blue-900"
              : "border-gray-300 bg-white text-gray-900 hover:border-blue-400"
      }`}
    >
      <span className="mr-3 font-semibold">{optionKey}</span>
      {value}
    </button>
  );
}
