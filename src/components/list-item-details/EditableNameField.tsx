
type EditableNameFieldProps = {
  value: string;
  setValue: (v: string) => void;
  isEditing: boolean;
  setEditing: (v: boolean) => void;
};

export function EditableNameField({
  value,
  setValue,
  isEditing,
  setEditing,
}: Readonly<EditableNameFieldProps>) {
    if (isEditing) {
      return (
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEditing(false)}
        />
      );
    }

    return (
      <span onClick={() => setEditing(true)}>
        {value}
      </span>
    );
}
