import type { ListItem } from "./ListItem";

/**
 * Displays a button that reveals the item's note in a Bootstrap tooltip, if the note exists.
 *
 * @param listItem - The item whose note is displayed on hover.
 */
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
            <i className="bi bi-eye me-1"></i>
            {"Peek Note"}
          </button>
        ) : null
    )
}
