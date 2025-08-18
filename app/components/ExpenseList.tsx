"use client";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { IoFastFoodOutline, IoGiftOutline } from "react-icons/io5";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineSpeakerPhone } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { currencies } from "./CountryCodes";
import { useCurrency } from "@/context/CurrencyContext";
import { FaRegHandshake } from "react-icons/fa";
import { useState } from "react";
import { IoIosMore } from "react-icons/io";

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
  const [filter, setFilter] = useState("all")

  const iconsList = [
    {
      iconName: "food",
      category: "food",
      icon: <IoFastFoodOutline size={25} />,
    },
    {
      iconName: "airtime",
      category: "airtime",
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
      category: "income",
      icon: <IoGiftOutline size={20} />,
    },
    {
      iconName: "other",
      category: "others",
      icon: <LuBoxes size={20} />,
    },
    {
      iconName: "freelance",
      category: "freelance",
      icon: <FaRegHandshake size={20} />,
    },
    {
      iconName: "food",
      category: "foods",
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

  // ========== DATE HELPERS =========
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)


  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  function isSameWeek(date: Date, baseDate: Date) {
    const startOfWeek = new Date(baseDate)
    startOfWeek.setDate(baseDate.getDate() - baseDate.getDate())
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 99)

    return date >= startOfWeek && date <= endOfWeek
  }

  function isSameMonth(date: Date, baseDate: Date) {
    return (
      date.getFullYear() === baseDate.getFullYear() &&
      date.getMonth() === baseDate.getMonth()
    );
  }

  // ====== FILTERING ======
  const filteredTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date)

    switch (filter) {
      case "today":
        return isSameDay(txDate, today);
      case "yesterday":
        return isSameDay(txDate, yesterday);
      case "this Week":
        return isSameWeek(txDate, today);
      case "last Week":
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        return isSameWeek(txDate, lastWeek);
      case "this Month":
        return isSameMonth(txDate, today);
      default:
        return true; // all
    }
  })

  const sortList = [
          {key: "all", label: "All"},
          { key: "today", label: "Today" },
          { key: "yesterday", label: "Yesterday" },
          { key: "this Week", label: "This Week" },
          { key: "last Week", label: "Last Week" },
          { key: "this Month", label: "This Month" },
  ]

  // useEffect(() => {
  //   setExpenses(getExpensesFromStorage());
  // }, []);

//   Object.defineProperty(String.prototype, 'capitalize', {
//   value: function() {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   },
//   enumerable: false
// });

  return (
    <>
    {/* <Filters /> */}
              {/* Filter Bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-md text-gray-900 font-semibold mb-2 first-letter:capitalize">
              {filter}&apos;s Entries
            </h3>
            <div className="sort relative group">
              <button
                aria-label="Sort Options"
                type="button"
                className="flex items-center p-0.5 px-1 rounded-md hover:bg-gray-100 transition"
                >
                <IoIosMore size={30} className="text-gray-800 cursor-pointer" />
              </button>
              <ul className="absolute z-100 hidden group-hover:block right-4 top-5 bg-white shadow-lg rounded-lg  space-y-1">
                {sortList.map(({key, label}) => (
                  <li key={key} onClick={() => setFilter(key)} className="hover:bg-gray-100 p-3 px-4 text-nowrap">{label}</li>
                  
                ))}
                
                <li className="hover:bg-gray-100 p-3 px-4">
                  <Link href={"/expenses"}>More...</Link>
                </li>
              </ul>
            </div>
          </div>


    <div className="h-full overflow-y-auto overflow-x-hidden md:px-3 pb-30 rounded-3xl">
      
     
    <ul className="space-y-2 pb-3">
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction, i) => (
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
    </div>
        </>
  );
}
