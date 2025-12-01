import { categories } from "./ListItem";

export function CategoriesDropDownMenu({
  action,
}: Readonly<{ action: (category: string) => void }>) {
  return (
    <ul className="dropdown-menu">
      {categories.map((category) => (
        <li key={category}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => action(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
}
