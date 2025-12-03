
type EditableNoteFieldProps = {
  value: string;
  setValue: (v: string) => void;
  isEditing: boolean;
  setEditing: (v: boolean) => void;
};

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