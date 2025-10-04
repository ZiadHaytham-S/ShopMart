import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 text-center">
      {/* الرقم 404 */}
      <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

      {/* الرسالة */}
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* زر العودة للرئيسية */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-medium text-white shadow hover:bg-blue-600 transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      {/* عناصر زخرفية */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-100 rounded-full blur-2xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
    </div>
  );
}
    