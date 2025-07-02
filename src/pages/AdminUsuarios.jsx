"use client"

import { useState, useEffect } from "react"
import api from "../services/api" // Asegúrate de que esta sea la URL correcta de la API

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
  const [editar, setEditar] = useState(null) // Para determinar si estamos editando un usuario

  // Cargar usuarios desde MockAPI
  useEffect(() => {
    api
      .get("/usuarios")
      .then((response) => {
        setUsuarios(response.data)
      })
      .catch((error) => console.error("Error al obtener usuarios:", error))
  }, [])

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Función para manejar la creación o edición de un usuario
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar que todos los campos estén completos
    if (!formData.nombre || !formData.email || !formData.password || !formData.fechaNacimiento) {
      setMensaje("Todos los campos son obligatorios.")
      return
    }

    // Si estamos editando un usuario
    if (editar) {
      api
        .put(`/usuarios/${editar}`, formData)
        .then((response) => {
          setUsuarios(usuarios.map((user) => (user.id === editar ? response.data : user)))
          setMensaje("Usuario actualizado con éxito.")
          setEditar(null) // Limpiar el estado de edición
        })
        .catch((error) => setMensaje("Error al actualizar el usuario"))
    } else {
      // Si estamos creando un nuevo usuario
      api
        .post("/usuarios", formData)
        .then((response) => {
          setUsuarios([...usuarios, response.data])
          setMensaje("Usuario creado con éxito.")
        })
        .catch((error) => setMensaje("Error al crear el usuario"))
    }

    setFormData({
      nombre: "",
      email: "",
      password: "",
      fechaNacimiento: "",
    })
  }

  // Función para manejar la eliminación de un usuario
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      api
        .delete(`/usuarios/${id}`)
        .then(() => {
          setUsuarios(usuarios.filter((user) => user.id !== id))
          setMensaje("Usuario eliminado con éxito.")
        })
        .catch((error) => setMensaje("Error al eliminar el usuario"))
    }
  }

  // Función para iniciar la edición de un usuario
  const handleEdit = (user) => {
    setFormData({
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      fechaNacimiento: user.fechaNacimiento,
    })
    setEditar(user.id) // Almacenar el ID del usuario que estamos editando
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
