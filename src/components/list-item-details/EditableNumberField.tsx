type EditableNumberFieldProps = {
  value: number;
  setValue: (v: number) => void;
  isEditing: boolean;
  setEditing: (v: boolean) => void;
};

/**
 * Inline editable numeric field for modifying an item's quantity.
 *
 * @param value - Current numeric value shown in the field.
 * @param setValue - Updates the parent's quantity state on user input.
 * @param isEditing - Whether the field is currently in editing mode.
 * @param setEditing - Toggles editing mode on or off.
 */
export function EditableNumberField({
  value,
  setValue,
  isEditing,
  setEditing,
}: Readonly<EditableNumberFieldProps>) {
    if (isEditing) {
      return (
        <input
          type="number"
          className="form-control"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onBlur={() => setEditing(false)}
        />
      );
    }

    return <span onClick={() => setEditing(true)}>{value}</span>;
}
