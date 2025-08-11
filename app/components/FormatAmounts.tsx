import { useCurrency } from "@/context/CurrencyContext";

export default function FormatAmounts({ amount }: { amount: number }) {
  const { currency } = useCurrency();

  return (
    <>
      {currency}
      {amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </>
  );
}
