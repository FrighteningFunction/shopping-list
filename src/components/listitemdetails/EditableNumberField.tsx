type EditableNumberFieldProps = {
  value: number;
  setValue: (v: number) => void;
  isEditing: boolean;
  setEditing: (v: boolean) => void;
};

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
