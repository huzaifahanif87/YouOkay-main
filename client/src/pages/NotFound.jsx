import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fdf6f0] to-[#f6f0ff] px-4">
      <div className="text-center max-w-md bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Go Back Home
        </button>
      </div>
      <div className="mt-8 text-gray-600 text-sm">
        If you think this is a mistake, check the URL or contact support.
      </div>
    </div>
  );
}
