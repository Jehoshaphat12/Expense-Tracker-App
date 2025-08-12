"use client";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { IoFastFoodOutline, IoGiftOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineSpeakerPhone } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { currencies } from "./CountryCodes";
import { useCurrency } from "@/context/CurrencyContext";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseListProps {
  transactions: Transaction[];
}

export default function ExpenseList({ transactions }: ExpenseListProps) {
  // const { transactions } = useTransactions();

  const { currency } = useCurrency();

  const iconsList = [
    {
      iconName: "food",
      icon: <IoFastFoodOutline size={25} />,
    },
    {
      iconName: "airtime",
      icon: <MdOutlineSpeakerPhone size={20} />,
    },
    {
      iconName: "food",
      category: "food",
      icon: <IoFastFoodOutline size={21} />,
    },
    {
      iconName: "salary",
      category: "income",
      icon: <RiMoneyDollarCircleLine size={20} />,
    },
    {
      iconName: "gift",
      icon: <IoGiftOutline size={20} />,
    },
    {
      iconName: "other",
      category: "others",
      icon: <LuBoxes size={20} />,
    },
    {
      iconName: "freelance",
      category: "income",
      icon: <RiMoneyDollarCircleLine size={20} />,
    },
    {
      iconName: "food",
      icon: <IoFastFoodOutline size={20} />,
    },
  ];

  function findIcon(iconName: string, categoryName: string) {
    for (let i = 0; i < iconsList.length; i++) {
      if (
        iconsList[i].iconName === iconName.toLowerCase() ||
        iconsList[i].category === categoryName.toLowerCase()
      ) {
        console.log(iconsList[i].icon);
        return iconsList[i].icon;
      }
    }
  }

  function findCurrencySymbol(code: string) {
    for (const curr of currencies) {
      if (curr.code === code) {
        return curr.symbol;
      }
    }
  }

  // useEffect(() => {
  //   setExpenses(getExpensesFromStorage());
  // }, []);

  return (
    <ul className="space-y-2 md:px-3 overflow-y-auto">
      {transactions.length > 0 ? (
        transactions.map((transaction, i) => (
          <li
            key={i}
            className={`flex items-center justify-between bg-white shadow-lg p-2 px-3 rounded-xl border-r-4 ${
              transaction.amount > 0 ? "border-green-600" : "border-red-600"
            } hover:translate-x-1 transition cursor-pointer`}
          >
            <Link
              href={`/expenses/${transaction.id}`}
              className="flex justify-between w-full items-center"
            >
              <div className="flex items-center space-x-2">
                <span className="bg-gray-200 p-2 rounded-lg text-gray-600">
                  {findIcon(transaction.title, transaction.category)}
                </span>
                <span>{transaction.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`${
                    transaction.amount > 0 ? "text-green-600" : "text-gray-600"
                  } text-sm`}
                >
                  {transaction.amount > 0 ? "+" : "-"}
                  {findCurrencySymbol(currency)}{" "}
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
                <Link href={`/expenses/${transaction.id}/edit`}>
                  <FiEdit
                    className="text-gray-500 cursor-pointer ml-2"
                    onClick={() => {
                      // Handle edit action
                      console.log("Edit transaction", transaction.id);
                    }}
                  />
                </Link>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <p className="text-center text-gray-500">No Transactions yet.</p>
      )}
    </ul>
  );
}
