import { useMemo } from "react";
import { type ListFilter, type ListItem } from "./ListItem";
import { useListItems } from "./ListItemsContext";

function ShoppingListItem({ listItem }: Readonly<{ listItem: ListItem }>) {
  const { deleteItem, updateItem } = useListItems();

  const handleDelete = () => {
    deleteItem(listItem.id);
  };

  const handleDoneToggle = () => {
  updateItem({
    ...listItem,         
    done: !listItem.done 
  });
};

  let markDoneButton = null;

  if (listItem.done) {
    markDoneButton = (
      <button className="btn btn-sm btn-outline-secondary mx-2" onClick={handleDoneToggle}>
        Mark Undone
      </button>
    );
  } else {
    markDoneButton = (
      <button className="btn btn-sm btn-outline-secondary mx-2" onClick={handleDoneToggle}>
        Mark Done
      </button>
    );
  }

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${listItem.done ? "list-group-item-secondary" : ""}`}>
      <span>{listItem.name}</span>
      <span >
        <button className="btn btn-sm btn-outline-primary me-2">Details</button>
        <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
          <i className="bi bi-trash me-1"></i>{"Delete"}</button>
        {markDoneButton}
      </span>
    </li>
  );
}

export function ShoppingListDisplay({
  listItems,
  filter,
}: Readonly<{ listItems: ListItem[]; filter: ListFilter }>) {
  let content: React.ReactNode = null;

  const filteredItems = useMemo(() => listItems.filter((item) => {
    if (!filter.showDone && item.done) {
      return false;
    }
    if (filter.category === "Show All") {
      return true;
    }
    if (filter.category && item.category !== filter.category) {
      return false;
    }
    return true;
  }),[listItems, filter]);

  if (filteredItems.length === 0) {
    content = (
      <p className="mt-5">Your shopping list is empty. Let's get planning!</p>
    );
  } else {
    content = (
      <ul className="list-group">
        {filteredItems.map((item) => (
          <ShoppingListItem key={item.id} listItem={item} />
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
