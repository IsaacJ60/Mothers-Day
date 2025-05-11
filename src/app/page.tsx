// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
      <h1 className="text-4xl font-bold text-center">Welcome!</h1>
      <p className="text-center p-4">Click below to create a personalized Mother’s Day message.</p>
      <Link
        href="/mother-info"
        className="backdrop-blur-sm outline-solid outline-1 shadow-md text-white px-6 py-3 rounded-xl hover:bg-pink-300 ease-in-out duration-200"
      >
        Get Started
      </Link>
    </main>
  );
}
