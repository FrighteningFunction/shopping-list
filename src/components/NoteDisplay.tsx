import type { ListItem } from "./ListItem";

export function NoteDisplay({ listItem }: { listItem: ListItem }) {
    return (
        listItem.note ? (
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            data-bs-toggle="tooltip"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={listItem.note}
          >
            Peek Note
          </button>
        ) : null
    )
}