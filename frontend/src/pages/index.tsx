import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">StudyForge</h1>

        <p className="mt-3 text-gray-500">
          Kendi kaynaklarınla sınava hazırlan.
        </p>

        <Link
          href="/quiz"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Sınava Başla
        </Link>
      </div>
    </main>
  );
}
