import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Temayı değiştir"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl text-gray-700 transition hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-300 dark:hover:bg-slate-700"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
