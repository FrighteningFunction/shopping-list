import React, { useMemo } from "react";
import { categories } from "./ListItem";
import { useListItems } from "./ListItemsContext";

// Shows a quick count of items per category in a footer bar.
export function CategoryFooter() {
  const { listItems } = useListItems();

  const counts = useMemo(() => {
    const initialCounts = Object.fromEntries(
      categories
        .filter((cat) => cat !== "Show All")
        .map((cat) => [cat, 0])
    ) as Record<string, number>;

    return listItems.reduce((acc, item) => {
      const key = item.category && item.category in acc ? item.category : "Other";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, initialCounts);
  }, [listItems]);

  return (
    <footer className="mt-4 pt-3 border-top">
      <h6 className="text-muted mb-2">Items by category</h6>
      <div className="d-flex flex-wrap gap-3">
        {Object.entries(counts).map(([category, count]) => (
          <span key={category} className="badge text-bg-light">
            {category}: {count}
          </span>
        ))}
      </div>
    </footer>
  );
}
