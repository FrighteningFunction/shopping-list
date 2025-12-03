import { ShoppingContainer } from "./components/ShoppingContainer";
import { ListItemsProvider } from "./context/ListItemsContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastProvider } from "./toast/ToastContext";
import { ToastContainer } from "./toast/ToastContainer";

/**
 * Assembles the application
 */
function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ListItemsProvider>
          <ShoppingContainer />
        </ListItemsProvider>
        <ToastContainer />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
