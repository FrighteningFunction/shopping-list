import { IconChooser } from "../icon-chooser/IconChooser";

type EditableIconFieldProps = {
  icon: string;
  setIcon: (v: string) => void;
  isEditing: boolean;
  setEditing: (v: boolean) => void;
};

/**
 * Renders an editable icon field that toggles between a read-only button
 * showing the currently selected icon and an interactive icon chooser.
 *
 * @param icon - The currently selected icon's CSS class name.
 * @param setIcon - Updates the parent's icon state when the user selects a new one.
 * @param isEditing - Whether the field is currently in editing mode.
 * @param setEditing - Toggles editing mode on or off.
 */
export function EditableIconField({
  icon,
  setIcon,
  isEditing,
  setEditing,
}: Readonly<EditableIconFieldProps>) {
  if (isEditing) {
    return (
      <IconChooser
        setIsEditing={setEditing}
        setSelectedIcon={setIcon}
      />
    );
  }

  return (
    <button
      type="button"
      className="btn btn-light mb-2"
      onClick={() => setEditing(true)}
    >
      {icon ? <i className={icon}></i> : "No icon yet, click to choose one"}
    </button>
  );
}
