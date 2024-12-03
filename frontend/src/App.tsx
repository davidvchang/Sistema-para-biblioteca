import Dashboard from "./pages/Dashboard";
import LateralMenu from "./pages/LateralMenu"

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <main className="flex font-Poppins">
        <LateralMenu/>

        <Routes>
          <Route path="/" element={<Dashboard/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
