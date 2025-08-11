// import React from "react";

// interface Transaction {
//   title: string;
//   amount: number;

//   // color: "green";
// }

// interface Props {
//   transactions: Transaction[];
// }

// export default function TransactionList({ transactions }: Props) {
//   return (
//     <ul className="space-y-2 px-3 overflow-auto h-[20rem]">
//       {transactions.map((transaction, i) => (
//         <li
//           key={i}
//           className={`flex items-center justify-between bg-white shadow-lg p-2 px-3 rounded-xl border-r-4 border-${transaction.color}-600 hover:translate-x-1 transition cursor-pointer`}
//         >
//           <div className="flex items-center space-x-2">
//             <span className="bg-gray-200 p-2 rounded-lg text-gray-600">
//               {/* {transaction.icon} */}
//             </span>
//             <span className="text-gray-800">{transaction.title}</span>
//           </div>
//           <span className={`text-green-600 font-semibold`}>
//             {transaction.amount > 0 ? "+" : "-"}₵
//             {Math.abs(transaction.amount).toFixed(2)}
//           </span>
//         </li>
//       ))}
//     </ul>
//   );
// }
