import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ShoppingContainer } from "./components/ShoppingContainer"
import { ListItemsProvider } from "./components/ListItemsContext"

function App() {

  return (
    <ListItemsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingContainer />} />
        </Routes>      
      </BrowserRouter>
    </ListItemsProvider>
  )
}

export default App
