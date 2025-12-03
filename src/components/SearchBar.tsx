import type { ListFilter } from "./ListItem";

export function SearchBar({
  setFilter,
}: Readonly<{ setFilter: React.Dispatch<React.SetStateAction<ListFilter>> }>) {
  return (
    <>
      <div className="row mb-4 align-items-center justify-content-start">
        <div className="col-12 col-md-6 mb-3 d-flex align-items-center">
          <i className="bi bi-search me-2"></i>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            id="nameSearchInput"
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                nameSearch: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </>
  );
}
