import { categories } from "./ListItem";

/**
 * Dropdown menu listing all available categories and invoking a callback when one is selected.
 *
 * @param action - Callback executed with the chosen category.
 */
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
