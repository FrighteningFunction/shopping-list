import { icons } from "./icons";

export function IconChooser({
  setSelectedIcon,
  setIsEditing,
}: {
  setSelectedIcon: (icon: string) => void;
  setIsEditing: (isEditing: boolean) => void;
}) {
  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    setIsEditing(false);
  };

  return (
    <div className="row">
      {Object.entries(icons).map(([key, className]) => (
        <div key={key} className="col-2 text-center">
          <button
            type="button"
            className="btn btn-light mb-2"
            onClick={() => handleIconClick(className)}
          >
            <i className={className} style={{ fontSize: "2rem" }}></i>
          </button>
        </div>
      ))}
    </div>
  );
}
