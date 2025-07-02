import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ carrito }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo">
          NEONBYTE<span className="logo-icon">N</span>
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Principal</Link></li>
        <li><Link to="/register">Registro</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/acerca">Acerca de Nosotros</Link></li>
        <li><Link to="/admin-productos">Admin Productos</Link></li>
      </ul>

      <div className="navbar-icons">
        {/* Logo de Usuario - link a la página de login */}
        <Link to="/login">
          <img src="/assets/images/logo-usuario.png" alt="Usuario" className="icon" />
        </Link>
        {/* Logo de Carrito - enlace al carrito en Admin Productos */}
        <Link to="/admin-productos">
          <img src="/assets/images/carrito.png" alt="Carrito" className="icon" />
          {carrito.length > 0 && (
            <span className="cart-count">
              {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

