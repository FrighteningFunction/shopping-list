export interface ListItem {
    id: number;
    name: string;
    quantity: number;
    note: string;
}

let id = 0;

export function addListItem(name: string, quantity: number = 1, note: string = ""): ListItem {
    let listitemsStr = localStorage.getItem("listitems");

    if (!listitemsStr) {
        listitemsStr = "[]";
    }

    let listitems: ListItem[] = JSON.parse(listitemsStr);

    const newItem: ListItem = {
        id: ++id,
        name,
        quantity,
        note
    };

    listitems.push(newItem);
    localStorage.setItem("listitems", JSON.stringify(listitems));

    return newItem;
}

/**
 * Returns all list items stored in localStorage.
 */
export function getListItems(): ListItem[] {
    const listitemsStr = localStorage.getItem("listitems");
    if (!listitemsStr) return [];

    try {
        return JSON.parse(listitemsStr);
    } catch {
        return [];
    }
}


export function deleteListItem(idToDelete: number): boolean {
    const listitems = getListItems();

    const newList = listitems.filter(item => item.id !== idToDelete);

    // Nothing deleted
    if (newList.length === listitems.length) {
        return false;
    }

    localStorage.setItem("listitems", JSON.stringify(newList));
    return true;
}
