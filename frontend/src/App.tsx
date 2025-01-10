import Books from "./pages/Books";
import Dashboard from "./pages/Dashboard";
import LateralMenu from "./pages/LateralMenu"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function App() {

  return (
    <BrowserRouter>
      <main className="flex font-Poppins">
        <LateralMenu/>
        <div className="w-full pl-72">
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/Libros" element={<Books/>}/>
            <Route path="/Usuarios" element={<Users/>}/>
            <Route path="/Configuracion" element={<Settings/>}/>
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App
