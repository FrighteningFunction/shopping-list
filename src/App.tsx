import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShoppingContainer } from "./components/ShoppingContainer";
import { ListItemsProvider } from "./components/ListItemsContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ListItemsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShoppingContainer />} />
          </Routes>
        </BrowserRouter>
      </ListItemsProvider>
    </ErrorBoundary>
  );
}

export default App;
