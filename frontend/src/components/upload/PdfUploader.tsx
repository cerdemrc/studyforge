import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import { uploadPdf } from "@/services/uploadService";

export default function PDFUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return;

    if (
      !selectedFile.name.toLowerCase().endsWith(".pdf") ||
      selectedFile.type !== "application/pdf"
    ) {
      setError("Lütfen geçerli bir PDF dosyası seçin.");
      return;
    }

    setFile(selectedFile);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;

    try {
      setIsLoading(true);
      setError("");

      await uploadPdf(file);

      router.push("/quiz");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-indigo-100/50 sm:p-8"
    >
      <div className="mb-6 text-left">
        <h2 className="text-xl font-bold text-gray-900">
          Çalışma materyalini yükle
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          PDF dosyanı yükle, StudyForge senin için sorular hazırlasın.
        </p>
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          selectFile(event.dataTransfer.files[0]);
        }}
        onClick={() => !isLoading && inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-5 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          disabled={isLoading}
          onChange={(event) => selectFile(event.target.files?.[0])}
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
          📄
        </div>

        <p className="mt-4 font-semibold text-gray-800">
          PDF dosyanı buraya bırak
        </p>

        <p className="mt-2 text-sm text-gray-500">
          veya dosya seçmek için tıkla
        </p>

        <span className="mt-4 inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-indigo-600">
          PDF formatı
        </span>
      </div>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 p-3">
          <span className="text-2xl">📑</span>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold text-gray-800">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-sm text-gray-400 hover:text-red-500"
          >
            Kaldır
          </button>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {isLoading && (
        <div className="mt-6 rounded-2xl bg-indigo-50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

            <div>
              <p className="text-sm font-semibold text-indigo-950">
                StudyForge çalışıyor!
              </p>
              <p className="text-xs text-indigo-700">
                PDF&apos;in analiz ediliyor ve sorular hazırlanıyor.
              </p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-indigo-200">
            <div className="h-full w-1/3 animate-progress rounded-full bg-linear-to-r from-indigo-500 to-violet-500" />
          </div>

          <p className="mt-3 text-center text-xs text-indigo-600">
            Biraz sabret, öğrenme yolculuğun başlıyor ✨
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !file}
        className="mt-6 w-full rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isLoading ? "Sorular hazırlanıyor..." : "Sorularımı Oluştur →"}
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        Kaynağına dayalı, sana özel çoktan seçmeli sorular.
      </p>
    </form>
  );
}
