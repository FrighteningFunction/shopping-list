import React from "react";
import { IconChooser } from "../iconchooser/IconChooser";

type EditableIconFieldProps = {
  icon: string;
  setIcon: (v: string) => void;
  isEditing: boolean;
  setEditing: (v: boolean) => void;
};

export function EditableIconField({
  icon,
  setIcon,
  isEditing,
  setEditing,
}: EditableIconFieldProps) {
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
