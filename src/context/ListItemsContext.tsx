import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getListItems, saveListItems, type ListItem, type NewListItem } from "../components/ListItem";

type ListItemsContextValue = {
  listItems: ListItem[];
  addItem: (item: NewListItem) => void;
  deleteItem: (id: number) => void;
  updateItem: (item: ListItem) => void;
};

const ListItemsContext = createContext<ListItemsContextValue | null>(null);

/**
 * Provides list item state and CRUD helpers to descendent components.
 * @param children React nodes that can consume the list items context.
 */
export function ListItemsProvider({ children }: { children: React.ReactNode }) {
  const [listItems, setListItems] = useState<ListItem[]>(() => getListItems());
  const nextIdRef = useRef(
    listItems.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1
  );

  const addItem = useCallback((item: NewListItem) => {
    setListItems((prev) => {
      const newItem: ListItem = {
        id: nextIdRef.current++,
        name: item.name,
        quantity: item.quantity,
        note: item.note,
        category: item.category,
        done: item.done ?? false,
      };
      return [...prev, newItem];
    });
  }, []);

  const deleteItem = useCallback((id: number) => {
    setListItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateItem = useCallback((updated: ListItem) => {
    setListItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  }, []);

  // Persist whenever the list changes
  useEffect(() => {
    saveListItems(listItems);
  }, [listItems]);

  const value = useMemo(
    () => ({
      listItems,
      addItem,
      deleteItem,
      updateItem,
    }),
    [addItem, deleteItem, listItems, updateItem]
  );

  return (
    <ListItemsContext.Provider value={value}>
      {children}
    </ListItemsContext.Provider>
  );
}

/**
 * Accessor hook for the list items context.
 * @throws If used outside of `ListItemsProvider`.
 */
export function useListItems() {
  const ctx = useContext(ListItemsContext);
  if (!ctx) throw new Error("useListItems must be used inside ListItemsProvider");
  return ctx;
}
