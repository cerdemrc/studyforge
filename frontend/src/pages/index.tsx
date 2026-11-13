import PDFUploader from "@/components/upload/PdfUploader";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f9ff] transition-colors duration-300 dark:bg-[#080d1b]">
      {" "}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white">
            ✦
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            StudyForge
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-medium text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-violet-300 sm:inline-block">
            AI-powered learning
          </span>
          <ThemeToggle />
        </div>
      </header>
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-2 lg:gap-20 lg:pt-20">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
            <span>✦</span>
            Öğrenmenin yeni yolu
          </div>

          <h1 className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-slate-100 sm:text-6xl">
            Kendi kaynaklarınla
            <span className="block bg-linear-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              daha akıllıca öğren.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-500 dark:text-slate-400">
            Ders notlarını yükle, yapay zekâ kaynaklarını analiz etsin ve sana
            özel sorular hazırlasın. Öğren, kendini test et, gelişimini keşfet.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-200">
                01
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-500">
                PDF yükle
              </p>
            </div>

            <div className="h-12 w-px bg-gray-200 dark:bg-slate-800" />

            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-200">
                02
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-500">
                Sorularını oluştur
              </p>
            </div>

            <div className="h-12 w-px bg-gray-200 dark:bg-slate-800" />

            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-200">
                03
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-500">
                Bilgini test et
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />

          <div className="relative z-10">
            <PDFUploader />
          </div>
        </div>
      </section>
      <footer className="border-t border-gray-200/70 py-6 text-center text-sm text-gray-400">
        StudyForge · Learn from your own materials.
      </footer>
    </main>
  );
}
