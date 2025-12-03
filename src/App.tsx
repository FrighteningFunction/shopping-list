import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShoppingContainer } from "./components/ShoppingContainer";
import { ListItemsProvider } from "./context/ListItemsContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastProvider } from "./toast/ToastContext";
import { ToastContainer } from "./toast/ToastContainer";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ListItemsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ShoppingContainer />} />
            </Routes>
          </BrowserRouter>
        </ListItemsProvider>
        <ToastContainer/>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
