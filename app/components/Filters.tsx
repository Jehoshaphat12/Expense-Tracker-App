import React from "react";
import { useTransactions } from "../hook/useTransactions";

const Filters: React.FC = () => {
  const { filters, setFilters } = useTransactions();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="all">All Categories</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="entertainment">Entertainment</option>
      </select>

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
      />

      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
      />

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="amount-high">Amount: High to Low</option>
        <option value="amount-low">Amount: Low to High</option>
      </select>
    </div>
  );
};

export default Filters;
