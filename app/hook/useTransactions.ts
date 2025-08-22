"use client";
import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  icon?: React.ReactNode;
  date: string;
  category: string;
  note?: string;
  color?: "green" | "red";
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: number) => void;
  income: number;
  expenses: number;
  balance: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const isInitialLoad = useRef(true);
  const [filters, setFilters] = useState({
    category: "all",
    startDate: "",
    endDate: "",
    sort: "newest", // newest | oldest | amount-high | amount-low
  });

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    try {
      setTransactions((prev) => [transaction, ...prev]);
      toast.success("Transaction added successfully.")
    } catch (err) {
      toast.error("Failed to add transaction. Try again.")
    }
  };
  
  const deleteTransaction = (id: number) => {
    try {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transaction deleted successfully.")
    } catch (err) {
      toast.error("Failed to delete transaction. Try again.")

    }
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expenses;

  const updateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const filteredTransactions = transactions
    .filter((t) => {
      if (filters.category !== "all" && t.category !== filters.category) {
        return false;
      }
      if (filters.startDate && new Date(t.date) < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && new Date(t.date) < new Date(filters.endDate)) {
        return true;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (filters.sort === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (filters.sort === "amount-high") return b.amount - a.amount;
      if (filters.sort === "amount-low") return a.amount - b.amount;
      return 0;
    });

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    income,
    expenses,
    balance,
    filteredTransactions,
    filters,
    setFilters,
  };
}

// export const useTransactions = (): TransactionContextType => {
//   const context = useContext(TransactionContext);
//   if (!context) {
//     throw new Error(
//       "useTransactions must be used within a TransactionProvider"
//     );
//   }
//   return context;
// };
