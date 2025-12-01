import React, { useCallback, useEffect } from "react";
import { ShoppingListDisplay } from "./ShoppingListDisplay";
import { ShopppingItemForm } from "./ShoppingItemForm";
import { useListItems } from "./ListItemsContext";
import { type ListFilter, type ListItem } from "./ListItem";
import { ListItemDetailViewer } from "./ListItemDetailViewer";
import { CategoriesDropDownMenu } from "./CategoriesDropDownMenu";
import { SearchBar } from "./SearchBar";
import { CategoryFooter } from "./CategoryFooter";

export function ShoppingContainer() {
  const [isAdding, setIsAdding] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<ListItem | null>(null);
  const [filter, setFilter] = React.useState<ListFilter>({
    showDone: true,
    category: undefined,
  });

  const { listItems } = useListItems();

  useEffect(() => {
    if (!selectedItem && listItems.length > 0) {
      setSelectedItem(listItems[0]);
    }
  }, [listItems, selectedItem]);

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
      <SearchBar setFilter={setFilter} />
      <ShoppingListFilterPanel setFilter={setFilter} />
      <ShoppingListDisplay
        listItems={listItems}
        filter={filter}
        onSelectItem={setSelectedItem}
      />
      <ListItemDetailViewer listItem={selectedItem} />
      {addPanel}
      <CategoryFooter />
    </div>
  );
}

function ShoppingListFilterPanel({
  setFilter,
}: Readonly<{ setFilter: React.Dispatch<React.SetStateAction<ListFilter>> }>) {
  const updateFilter = useCallback(
    (category: string) => {
      setFilter((prev) => ({ ...prev, category }));
    },
    [setFilter]
  );
  return (
    <>
      <h4 className="mb-4">Filter Options</h4>
      <div className="row mb-4 align-items-center justify-content-start">
        <div className="col-12 col-md-4 mb-3">
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
        <div className="col-12 col-md-2">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Choose Category
            </button>
            <CategoriesDropDownMenu action={updateFilter} />
          </div>
        </div>
      </div>
    </>
  );
}
