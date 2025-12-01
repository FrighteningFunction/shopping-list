import React, { useEffect, useMemo } from "react";
import { categories, type ListItem } from "./ListItem";
import { useListItems } from "./ListItemsContext";

export function ListItemDetailViewer({
  listItem,
}: Readonly<{ listItem: ListItem | null }>) {
  const { updateItem } = useListItems();

  const [name, setName] = React.useState<string>(listItem?.name ?? "");
  const [quantity, setQuantity] = React.useState<number>(listItem?.quantity ?? 1);
  const [category, setCategory] = React.useState<string | undefined>(listItem?.category);
  const [note, setNote] = React.useState<string>(listItem?.note ?? "");

  const [nameEdit, setNameEdit] = React.useState<boolean>(false);
  const [quantityEdit, setQuantityEdit] = React.useState<boolean>(false);
  const [categoryEdit, setCategoryEdit] = React.useState<boolean>(false);
  const [noteEdit, setNoteEdit] = React.useState<boolean>(false);

  useEffect(() => {
    if (!listItem) return;
    setName(listItem.name);
    setQuantity(listItem.quantity);
    setCategory(listItem.category);
    setNote(listItem.note);
    setNameEdit(false);
    setQuantityEdit(false);
    setCategoryEdit(false);
    setNoteEdit(false);
  }, [listItem]);

  const nameField = useMemo(() => {
    if (nameEdit) {
      return (
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameEdit(false)}
        />
      );
    } else {
      return <span onClick={() => setNameEdit(true)}>{name}</span>;
    }
  }, [name, nameEdit]);

  const quantityField = useMemo(() => {
    if (quantityEdit) {
      return (
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          onBlur={() => setQuantityEdit(false)}
        />
      );
    }
    return <span onClick={() => setQuantityEdit(true)}>{quantity}</span>;
  }, [quantity, quantityEdit]);

  const categoryField = useMemo(() => {
    if (categoryEdit) {
      return (
        <select
          className="form-select"
          value={category ?? ""}
          onChange={(e) => setCategory(e.target.value || undefined)}
          onBlur={() => setCategoryEdit(false)}
        >
          <option value="">No category</option>
          {categories
            .filter((cat) => cat !== "Show All")
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>
      );
    }

    return (
      <span onClick={() => setCategoryEdit(true)}>
        {category ? category : "No category yet, click to choose one"}
      </span>
    );
  }, [category, categoryEdit]);

  const noteField = useMemo(() => {
    if (noteEdit) {
      return (
        <textarea
          className="form-control"
          value={note}
          rows={3}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => setNoteEdit(false)}
        />
      );
    }

    return (
      <span className="text-wrap" onClick={() => setNoteEdit(true)}>
        {note || "Add a note"}
      </span>
    );
  }, [note, noteEdit]);

  const onSaveClick = () => {
    if (!listItem) return;
    updateItem({
      ...listItem,
      name,
      quantity,
      category,
      note
    })
  }

  return (
    <div
      className="offcanvas offcanvas-end"
      id="detailsViewer"
      aria-labelledby="detailsViewerLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="detailsViewerLabel">
          Todo Details
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <p>Double click on a field to edit it!</p>
        {!listItem ? (
          <p className="text-muted">Select an item to view its details.</p>
        ) : (
          <>
        <div className="mb-3">
          <p className="mb-1 fw-semibold">Name</p>
          {nameField}
        </div>
        <div className="mb-3">
          <p className="mb-1 fw-semibold">Quantity</p>
          {quantityField}
        </div>
        <div className="mb-3">
          <p className="mb-1 fw-semibold">Category</p>
          {categoryField}
        </div>
        <div className="mb-3">
          <p className="mb-1 fw-semibold">Note</p>
          {noteField}
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={onSaveClick}>
            Save Changes
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
