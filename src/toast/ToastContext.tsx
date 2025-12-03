import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

type ToastContextValue = {
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Provides toast state and helper to enqueue toasts to descendant components.
 * @param children React nodes that can consume the toast context.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextIdRef = useRef(1);

  const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = nextIdRef.current++;

    const newToast: Toast = {
      id,
      message,
      type,
    };

    // Add toast
    setToasts((prev) => [...prev, newToast]);

    // Remove after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      addToast,
    }),
    [toasts, addToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

/**
 * Accessor hook for the toast context.
 * @throws If used outside of `ToastProvider`.
 */
export function useToasts() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToasts must be used inside ToastProvider");
  return ctx;
}
