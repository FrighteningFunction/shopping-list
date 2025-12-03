
type EditableNoteFieldProps = {
  value: string;
  setValue: (v: string) => void;
  isEditing: boolean;
  setEditing: (v: boolean) => void;
};

/**
 * Inline editable field for an item's note, switching to a textarea in edit mode.
 *
 * @param value - Current note text displayed in the field.
 * @param setValue - Updates the parent's note state on user input.
 * @param isEditing - Whether the note is currently being edited.
 * @param setEditing - Toggles editing mode on or off.
 */
export function EditableNoteField({
  value,
  setValue,
  isEditing,
  setEditing,
}: Readonly<EditableNoteFieldProps>) {
    if (isEditing) {
      return (
        <textarea
          className="form-control"
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEditing(false)}
        />
      );
    }

    return (
      <span onClick={() => setEditing(true)}>
        {value || "Add a note"}
      </span>
    );
}
