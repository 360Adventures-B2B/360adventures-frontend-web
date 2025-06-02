import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline"; // npm install @heroicons/react
import { useError } from "@/context/ErrorContext";

const ErrorModal = () => {
  const { error, hideError } = useError();

  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fade-in">
        <div className="flex items-start gap-3">
          <XCircleIcon className="h-6 w-6 text-red-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Terjadi Kesalahan</h2>
            <p className="text-sm text-gray-600">{error.message || "Terjadi kesalahan yang tidak diketahui."}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={hideError}
            className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Tutup
          </button>
          {error.backUrl && (
            <button
              onClick={() => {
                hideError();
                window.location.href = error.backUrl;
              }}
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Kembali
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
