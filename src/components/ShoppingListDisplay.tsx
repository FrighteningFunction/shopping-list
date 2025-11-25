import type { ListItem } from "./ListItem";

function ShoppingListItem({ listItem }: Readonly<{ listItem: ListItem }>) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <span>{listItem.name}</span>
    </div>
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
      <div className="list-group">
        {listItems.map((item) => (
          <ShoppingListItem key={item.id} listItem={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-8">{content}</div>
    </div>
  );
}
