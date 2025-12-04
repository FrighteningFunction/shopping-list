import React, { useState } from "react";
import { useListItems } from "../context/ListItemsContext";
import "./shoppingitemform.css";
import { useToasts } from "../toast/ToastContext";

/**
 * Form for creating a new shopping list item, handling submission, validation,
 * and closing of the add-item panel after completion.
 *
 * @param setIsAdding - Setter used to close the add-item panel.
 */
export function ShopppingItemForm({
  setIsAdding,
}: Readonly<{ setIsAdding?: React.Dispatch<React.SetStateAction<boolean>> }>) {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const { addItem } = useListItems();
  const { addToast } = useToasts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    addItem({ name, quantity, note });
    addToast("Item added successfully!");
    setName("");
    setQuantity(1);
    setNote("");
    setIsAdding?.(false);
  };

  const handleCancel = () => {
    setIsAdding?.(false);
  };

  return (
    <>
      <div>
        <h4 className="my-4">Add New Shopping Item</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name of your shopping item
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="quantityInput" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantityInput"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="noteInput" className="form-label">
              {"Note (Optional)"}
            </label>
            <input
              className="form-control note-input"
              id="noteInput"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-plus-lg me-1"></i>
              {"Add Item"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleCancel}
            >
              <i className="bi bi-x-lg me-1"></i>
              {"Cancel"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
