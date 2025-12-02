import { useMemo } from "react";
import { type ListFilter, type ListItem } from "./ListItem";
import { useListItems } from "./ListItemsContext";
import { NoteDisplay } from "./NoteDisplay";

function ShoppingListItem({
  listItem,
  onSelect,
}: Readonly<{
  listItem: ListItem;
  onSelect: (item: ListItem) => void;
}>) {
  const { deleteItem, updateItem } = useListItems();

  const handleDelete = () => {
    deleteItem(listItem.id);
  };

  const handleDoneToggle = () => {
    updateItem({
      ...listItem,
      done: !listItem.done,
    });
  };

  let markDoneButton = null;

  if (listItem.done) {
    markDoneButton = (
      <button
        className="btn btn-sm btn-outline-secondary mx-2"
        onClick={handleDoneToggle}
      >
        Mark Undone
      </button>
    );
  } else {
    markDoneButton = (
      <button
        className="btn btn-sm btn-outline-secondary mx-2"
        onClick={handleDoneToggle}
      >
        Mark Done
      </button>
    );
  }

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        listItem.done ? "list-group-item-secondary" : ""
      }`}
    >
      <div className="d-flex flex-row align-items-center">
        {listItem.icon && <i className={`${listItem.icon} fs-4 me-2`}></i>}
        {listItem.name}
      </div>
      <span>
        <NoteDisplay listItem={listItem} />
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleDelete}
        >
          <i className="bi bi-trash me-1"></i>
          {"Delete"}
        </button>
        {markDoneButton}
        <button
          className="btn btn-outline-primary m-1"
          data-bs-toggle="offcanvas"
          data-bs-target="#detailsViewer"
          type="button"
          aria-controls="detailsViewer"
          onClick={() => onSelect(listItem)}
        >
          Details
        </button>
      </span>
    </li>
  );
}

export function ShoppingListDisplay({
  listItems,
  filter,
  onSelectItem,
}: Readonly<{
  listItems: ListItem[];
  filter: ListFilter;
  onSelectItem: (item: ListItem) => void;
}>) {
  let content: React.ReactNode = null;

  const filteredItems = useMemo(() => {
    const normalizedSearch = filter.nameSearch?.trim().toLowerCase();

    return listItems.filter((item) => {
      if (!filter.showDone && item.done) {
        return false;
      }

      if (filter.category && filter.category !== "Show All") {
        if (item.category !== filter.category) {
          return false;
        }
      }

      if (normalizedSearch) {
        return item.name.toLowerCase().includes(normalizedSearch);
      }

      return true;
    });
  }, [listItems, filter]);

  if (filteredItems.length === 0) {
    content = (
      <p className="mt-5">Your shopping list is empty. Let's get planning!</p>
    );
  } else {
    content = (
      <ul className="list-group">
        {filteredItems.map((item) => (
          <ShoppingListItem
            key={item.id}
            listItem={item}
            onSelect={onSelectItem}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className="row">
      <div className="col-md-8">{content}</div>
    </div>
  );
}
