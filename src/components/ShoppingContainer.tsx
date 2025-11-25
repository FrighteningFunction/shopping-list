import React from "react";
import { getListItems } from "./ListItem";
import { ShoppingListDisplay } from "./ShoppingListDisplay";
import { ShopppingItemForm } from "./ShoppingItemForm";

export function ShoppingContainer() {

    const [isAdding, setIsAdding] = React.useState(false);

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
            <ShoppingListDisplay listItems={getListItems()} />
            {addPanel}
        </div>
    )
}