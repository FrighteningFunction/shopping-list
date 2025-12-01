export interface ListItem {
    id: number;
    name: string;
    quantity: number;
    note: string;
    done: boolean;
    category?: string;
}

export interface ListFilter {
    showDone: boolean;
    nameSearch?: string;
    category?: string;
}

export const categories = ["Grocery", "Electronics", "Clothing", "Household", "Other", "Show All"];
export type NewListItem = Omit<ListItem, "id" | "done"> & Partial<Pick<ListItem, "done">>;

// Helper to read persisted data
export function getListItems(): ListItem[] {
    const listitemsStr = localStorage.getItem("listitems");
    if (!listitemsStr) return [];

    try {
        return JSON.parse(listitemsStr) as ListItem[];
    } catch {
        return [];
    }
}

export function saveListItems(listItems: ListItem[]): void {
    localStorage.setItem("listitems", JSON.stringify(listItems));
}
