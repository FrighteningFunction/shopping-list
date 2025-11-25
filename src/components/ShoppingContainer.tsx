import { getListItems } from "./ListItem";
import { ShoppingListDisplay } from "./ShoppingListDisplay";

export function ShoppingContainer() {
    return (
        <div className="container mt-4">
            <h1>Shopping List</h1>
            <ShoppingListDisplay listItems={getListItems()} />
        </div>
    )
}