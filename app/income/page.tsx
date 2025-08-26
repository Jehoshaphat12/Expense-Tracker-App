"use client";
import { useCurrency } from "@/context/CurrencyContext";
import { currencies } from "../components/CountryCodes";
import ExpenseBalance from "../components/ExpenseBalance";
import ExpenseList from "../components/ExpenseList";
import { useTransactions } from "../hook/useTransactions";
import Link from "next/link";

export default function IncomePage() {
  const { transactions, income } = useTransactions();
  const { currency } = useCurrency();

  const incomeTransactions = transactions.filter((t) => t.amount > 0);

  function findCurrencySymbol(code: string) {
    for (const curr of currencies) {
      if (curr.code === code) {
        return curr.symbol;
      }
    }
  }
  return (
    <div className="dark:bg-gray-800 dark:text-gray-50 py-4">
      <div className="flex justify-center w-full py-4">
      <h2 className="w-full text-blue-500 text-md font-semibold text-center">
        Income Trans.
      </h2>
      <Link href={"/expense"} className="w-full flex justify-center text-md font-semibold text-center hover:text-blue-500"> Expenses Trans.</Link>
      </div>

      <div className="w-full mb-3 text-black flex items-center justify-center space-x-5">
        <p className="font-semibold text-sm text-gray-400">Total Income:</p>
        <h2 className="text-sm font-semibold text-right text-gray-400">
          {findCurrencySymbol(currency)}{" "}
          {income.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
      </div>
      <div className="h-[80dvh] flex flex-col overflow-y-auto overflow-x-hidden md:p-4">
        <ExpenseList transactions={incomeTransactions} />
      </div>
    </div>
  );
}
