import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/AdminProductos.css";

import monitorAcer from "../assets/images/monitor.png";
import tarjetaGrafica from "../assets/images/tarjeta-grafica.png";
import intelI9 from "../assets/images/intel-i9.png";
import ramCorsair from "../assets/images/ram.png";
import placaBase from "../assets/images/placa.png";
import ssdSamsung from "../assets/images/ssd-samsung.png";
import fuenteEVGA from "../assets/images/fuente.png";
import tecladoCorsair from "../assets/images/teclado.png";
import auricularesSteelSeries from "../assets/images/auriculares.png";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    fechaCreacion: "",
    categoria: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [editar, setEditar] = useState(null);

  useEffect(() => {
    api.get("/productos").then((res) => setProductos(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.descripcion || !formData.fechaCreacion || !formData.categoria) {
      setMensaje("Por favor completa todos los campos");
      setTipoMensaje("error");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }

    if (editar) {
      api.put(`/productos/${editar}`, formData).then((res) => {
        setProductos(productos.map((p) => (p.id === editar ? res.data : p)));
        limpiarFormulario();
        mostrarMensaje("Producto actualizado", "success");
      });
    } else {
      api.post("/productos", formData).then((res) => {
        setProductos([...productos, res.data]);
        limpiarFormulario();
        mostrarMensaje("Producto creado", "success");
      });
    }
  };

  const handleEdit = (producto) => {
    setFormData(producto);
    setEditar(producto.id);
  };

  const handleDelete = (id) => {
    api.delete(`/productos/${id}`).then(() => {
      setProductos(productos.filter((p) => p.id !== id));
      mostrarMensaje("Producto eliminado", "success");
    });
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      imagen: "",
      fechaCreacion: "",
      categoria: "",
    });
    setEditar(null);
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(""), 2000);
  };

  const imagenesLocales = {
    "Tarjeta Gráfica RTX 4090": tarjetaGrafica,
    "Procesador Intel i9-13900K": intelI9,
    "Memoria RAM Corsair Vengeance": ramCorsair,
    "Placa Base ASUS ROG Strix": placaBase,
    "SSD Samsung 970 EVO 1TB": ssdSamsung,
    "Fuente de Poder EVGA 750W": fuenteEVGA,
    "Teclado Mecánico Corsair K70": tecladoCorsair,
    "Monitor Acer Predator": monitorAcer,
    "Auriculares SteelSeries Arctis 7": auricularesSteelSeries,
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Gestión de Productos</h2>
        <p>Administra los productos de NeonByte</p>
      </header>

      <form onSubmit={handleSubmit} className="formulario">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
        <input type="text" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} />
        <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />
        <input type="text" name="imagen" placeholder="URL de Imagen" value={formData.imagen} onChange={handleChange} />
        <input type="date" name="fechaCreacion" value={formData.fechaCreacion} onChange={handleChange} />
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          <option value="Tarjetas Gráficas">Tarjetas Gráficas</option>
          <option value="Procesadores">Procesadores</option>
          <option value="Memoria RAM">Memoria RAM</option>
          <option value="Placas Base">Placas Base</option>
          <option value="Almacenamiento">Almacenamiento</option>
          <option value="Fuentes de Poder">Fuentes de Poder</option>
          <option value="Periféricos">Periféricos</option>
        </select>
        <button type="submit" className="btn-crear">{editar ? "Actualizar" : "Crear"}</button>
      </form>

      {mensaje && <div className={`toast-mensaje ${tipoMensaje}`}>{mensaje}</div>}

      <section className="tabla-productos">
        <div className="table-container">
          <table className="productos-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td className="imagen-cell">
                    <img
                      src={imagenesLocales[p.nombre] || p.imagen || "/placeholder.svg"}
                      alt={p.nombre}
                      className="producto-imagen-mini"
                      onError={(e) => e.target.src = "/placeholder.svg"}
                    />
                  </td>
                  <td className="nombre-cell">
                    <strong>{p.nombre}</strong>
                    <p className="descripcion-mini">{p.descripcion}</p>
                  </td>
                  <td className="precio-cell">${p.precio}</td>
                  <td>{p.categoria}</td>
                  <td>{new Date(p.fechaCreacion).toLocaleDateString()}</td>
                  <td className="acciones-cell">
                    <button className="btn-editar" onClick={() => handleEdit(p)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleDelete(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminProductos;
