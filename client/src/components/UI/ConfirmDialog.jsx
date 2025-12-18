import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
        <div className="text-gray-700 text-sm space-y-1">{message}</div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
