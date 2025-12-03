export interface ListItem {
    id: number;
    name: string;
    quantity: number;
    note: string;
    done: boolean;
    category?: string;
    icon?: string;
}

export interface ListFilter {
    showDone: boolean;
    nameSearch?: string;
    category?: string;
}

export const categories = ["Grocery", "Electronics", "Clothing", "Household", "Other", "Show All"];
export type NewListItem = Omit<ListItem, "id" | "done"> & Partial<Pick<ListItem, "done">>;

/**
 * Reads persisted list items from local storage.
 * @returns Parsed list item array or an empty array when not available.
 */
export function getListItems(): ListItem[] {
    const listitemsStr = localStorage.getItem("listitems");
    if (!listitemsStr) return [];

    try {
        return JSON.parse(listitemsStr) as ListItem[];
    } catch {
        return [];
    }
}

/**
 * Persists the list items array to local storage.
 * @param listItems Items to serialize and store.
 */
export function saveListItems(listItems: ListItem[]): void {
    localStorage.setItem("listitems", JSON.stringify(listItems));
}
