import React from "react";
import { ShoppingListDisplay } from "./ShoppingListDisplay";
import { ShopppingItemForm } from "./ShoppingItemForm";
import { useListItems } from "./ListItemsContext";

export function ShoppingContainer() {

    const [isAdding, setIsAdding] = React.useState(false);
    const [isViewing, setIsViewing] = React.useState(false);

    const {listItems} = useListItems();

    let addPanel : React.ReactNode = null;

    if(isAdding) {
        addPanel = (
            <ShopppingItemForm setIsAdding={setIsAdding}/>
        )
    }else{
        addPanel = (
            <button className="btn btn-primary mt-4" onClick={() => setIsAdding(true)}>Add Item</button>
        )
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Shopping List</h1>
            <ShoppingListDisplay listItems={listItems} />
            {addPanel}
        </div>
    )
}
