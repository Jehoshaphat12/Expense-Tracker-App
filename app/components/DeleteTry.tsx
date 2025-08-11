"use client";
import { useTransactions } from "@/app/hook/useTransactions";
import { useState, useEffect } from "react";

export default function DeleteDialogueBox({
  transactionId,
}: {
  transactionId: number;
}) {
  const { deleteTransaction } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(transactionId);
      setIsOpen(false); // Close the dialog after deletion
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-3 w-full font-semibold bg-white text-red-600 py-2 rounded-2xl hover:bg-red-700 hover:text-white transition"
      >
        Delete Transaction
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this transaction?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
