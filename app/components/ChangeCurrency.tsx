import { useCurrency } from "@/context/CurrencyContext";
import { currencies } from "./CountryCodes";

export default function ChangeCurrency() {
  const { currency, setCurrency } = useCurrency();

  const countryCode = currency.substring(0, 2);

  function findCurrencySymbol(code: string) {
    for (const curr of currencies) {
      if (curr.code === code) {
        return curr.symbol;
      }
    }
  }

  return (
    <div className="flex items-center gap-0.5 px-1 py-0.5 sm:px-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400">
      <img
        src={`https://flagsapi.com/${countryCode}/flat/64.png`}
        alt="Flag"
        className="w-[20px]"
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-1 text-xs text-white font-semibold focus:outline-none"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code} className="text-black">
            {curr.code}
          </option>
        ))}
      </select>
    </div>
  );
}
