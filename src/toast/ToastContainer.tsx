import { useToasts } from "./ToastContext";

/**
 * Displays active toast notifications from the toast context in a fixed container.
 */
export function ToastContainer() {
  const { toasts } = useToasts();

  const bgForType = (type: "success" | "error" | "info") => {
    switch (type) {
      case "error":
        return "bg-danger";
      case "info":
        return "bg-info";
      default:
        return "bg-success";
    }
  };

  return (
    <div
      id="toast-container"
      className="toast-container position-fixed bottom-0 end-0 p-3"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="toast show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
          <div className={`toast-header ${bgForType(toast.type)} text-white`}>
            <i className="bi bi-check-circle-fill me-2"></i>
            <strong className="me-auto text-white">
              {toast.type === "error" ? "Error" : toast.type === "info" ? "Info" : "Success"}
            </strong>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
