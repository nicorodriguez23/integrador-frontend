"use client"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar" // Asegúrate de importar el Navbar
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Contacto from "./pages/Contacto"
import Register from "./pages/Register"
import Acerca from "./pages/Acerca"
import AdminProductos from "./pages/AdminProductos"
import AdminUsuarios from "./pages/AdminUsuarios"
import "./styles/global.css"

import DetalleProducto from "./pages/DetallesProductos/DetalleProducto"

function App() {
  const [carrito, setCarrito] = useState([])

  return (
    <BrowserRouter>
      {/* Navbar siempre visible en todas las páginas */}
      <Navbar carrito={carrito} setCarrito={setCarrito} />

      <Routes>
        <Route path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/register" element={<Register />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/admin-productos" element={<AdminProductos carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/admin-usuarios" element={<AdminUsuarios />} />
        <Route path="/producto/:id" element={<DetalleProducto carrito={carrito} setCarrito={setCarrito} />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
