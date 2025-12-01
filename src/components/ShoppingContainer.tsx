import React from "react";
import { ShoppingListDisplay } from "./ShoppingListDisplay";
import { ShopppingItemForm } from "./ShoppingItemForm";
import { useListItems } from "./ListItemsContext";
import { categories, type ListFilter } from "./ListItem";

export function ShoppingContainer() {
  const [isAdding, setIsAdding] = React.useState(false);
  const [isViewing, setIsViewing] = React.useState(false);
  const [filter, setFilter] = React.useState<ListFilter>({
    showDone: true,
    category: undefined,
  });

  const { listItems } = useListItems();

  let addPanel: React.ReactNode = null;

  if (isAdding) {
    addPanel = <ShopppingItemForm setIsAdding={setIsAdding} />;
  } else {
    addPanel = (
      <button
        className="btn btn-primary mt-4"
        onClick={() => setIsAdding(true)}
      >
        Add Item
      </button>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Shopping List</h1>
      <ShoppingListFilterPanel setFilter={setFilter} />
      <ShoppingListDisplay listItems={listItems} filter={filter} />
      {addPanel}
    </div>
  );
}

function ShoppingListFilterPanel({
  setFilter,
}: Readonly<{ setFilter: React.Dispatch<React.SetStateAction<ListFilter>> }>) {
  return (
    <div className="mb-4">
      <h4>Filter Options</h4>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="showDoneCheckbox"
          className="form-check-input me-2"
          defaultChecked={true}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              showDone: e.target.checked,
            }))
          }
        />
        <label htmlFor="showDoneCheckbox" className="form-check-label">
          Show Done Items
        </label>
      </div>
      <div className="dropdown">
        <a
          className="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Show category
        </a>

        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li key={category}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setFilter((prev) => ({ ...prev, category }))}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
