"use client"

import { useState, useEffect } from "react"
import api from "../services/api" 

import "../styles/AdminUsuarios.css"

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    fechaNacimiento: "",
  })
  const [mensaje, setMensaje] = useState("")
  const [editar, setEditar] = useState(null) 

  
  useEffect(() => {
    api
      .get("/usuarios")
      .then((response) => {
        setUsuarios(response.data)
      })
      .catch((error) => console.error("Error al obtener usuarios:", error))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.email || !formData.password || !formData.fechaNacimiento) {
      setMensaje("Todos los campos son obligatorios.")
      return
    }

    
    if (editar) {
      api
        .put(`/usuarios/${editar}`, formData)
        .then((response) => {
          setUsuarios(usuarios.map((user) => (user.id === editar ? response.data : user)))
          setMensaje("Usuario actualizado con éxito.")
          setEditar(null) 
        })
        
    } else {

      api
        .post("/usuarios", formData)
        .then((response) => {
          setUsuarios([...usuarios, response.data])
          setMensaje("Usuario creado con éxito.")
        })
        
    }

    setFormData({
      nombre: "",
      email: "",
      password: "",
      fechaNacimiento: "",
    })
  }

  
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      api
        .delete(`/usuarios/${id}`)
        .then(() => {
          setUsuarios(usuarios.filter((user) => user.id !== id))
          setMensaje("Usuario eliminado con éxito.")
        })
        
    }
  }

  
  const handleEdit = (user) => {
    setFormData({
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      fechaNacimiento: user.fechaNacimiento,
    })
    setEditar(user.id)
  }

  return (
    <div className="admin-container">
      <header className="header">
        <h2>Aministracion de Usuarios</h2>
      </header>

      <section className="formulario">
        <h3>{editar ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre Completo*</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Contraseña*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Fecha de Nacimiento*</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">{editar ? "Actualizar Usuario" : "Crear Usuario"}</button>
        </form>
      </section>

      {mensaje && <div className="toast-mensaje">{mensaje}</div>}

      <section className="tabla-usuarios">
        <h3>Usuarios Registrados</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.fechaNacimiento}</td>
                <td>
                  <button onClick={() => handleEdit(usuario)}>Editar</button>
                  <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default AdminUsuarios
