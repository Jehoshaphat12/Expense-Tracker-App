"use client";

import { useTransactions } from "@/app/hook/useTransactions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteDialogBox({
  transactionId,
}: {
  transactionId: number;
}) {
  const { deleteTransaction } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    deleteTransaction(transactionId);
    setIsOpen(false); // Close the dialog after deletion
    router.push("/expenses");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-3 w-full font-semibold bg-white dark:bg-gray-800 text-red-600 py-2 rounded-2xl  hover:bg-red-700 hover:text-white transition"
      >
        {" "}
        Delete Transaction
      </button>
      {isOpen && (
        <div className="fixed  z-20 inset-0 flex items-center justify-center bg-gray-800/65">
          <div className="bg-white dark:bg-gray-900 dark:text-gray-50 w-[80%] max-w-[400px] p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confrim Delete</h2>
            <p>Are you sure you want to delete this transaction?</p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
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
