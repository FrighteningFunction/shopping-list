import { type ListItem } from "./ListItem";
import { useListItems } from "./ListItemsContext";

function ShoppingListItem({ listItem }: Readonly<{ listItem: ListItem }>) {
  const { deleteItem } = useListItems();

  const handleDelete = () => {
    deleteItem(listItem.id);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{listItem.name}</span>
      <span >
        <button className="btn btn-sm btn-outline-primary me-2">Details</button>
        <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
          <i className="bi bi-trash me-1"></i>{"Delete"}</button>
      </span>
    </li>
  );
}

export function ShoppingListDisplay({
  listItems,
}: Readonly<{ listItems: ListItem[] }>) {
  let content: React.ReactNode = null;

  if (listItems.length === 0) {
    content = (
      <p className="mt-5">Your shopping list is empty. Let's get planning!</p>
    );
  } else {
    content = (
      <ul className="list-group">
        {listItems.map((item) => (
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
