export interface Expense {
  id: number;
  title?: string; // Optional title for the expense
  amount: number;
  category: string;
  date: string;
}
