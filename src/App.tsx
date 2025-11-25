import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ShoppingContainer } from "./components/ShoppingContainer"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoppingContainer />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
