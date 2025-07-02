"use client"

import { useState } from "react"
import "../styles/Register.css"
import api from "../services/api"

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
    provincia: "",
    observacion: "",
  })

  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validarCampos = () => {
    const erroresTemp = {}
    if (!formData.nombre.trim()) erroresTemp.nombre = "El nombre es obligatorio"
    if (!formData.email.trim()) erroresTemp.email = "El correo es obligatorio"
    if (!formData.password.trim()) erroresTemp.password = "La contraseña es obligatoria"
    if (formData.password !== formData.confirmPassword) erroresTemp.confirmPassword = "Las contraseñas no coinciden"
    if (!formData.fechaNacimiento.trim()) erroresTemp.fechaNacimiento = "La fecha de nacimiento es obligatoria"
    if (!formData.provincia.trim()) erroresTemp.provincia = "La provincia o país es obligatorio"
    return erroresTemp
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroresValidacion = validarCampos()

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion)
    } else {
      try {
        await api.post("/usuarios", formData)
        alert("¡Registro enviado con éxito!")
        setFormData({
          nombre: "",
          email: "",
          password: "",
          confirmPassword: "",
          fechaNacimiento: "",
          provincia: "",
          observacion: "",
        })
        setErrores({})
      } catch (error) {
        console.error("Error al registrar:", error)
      }
    }
  }

  return (
    <>
      <header>
        <div className="header-content">
          <h1>Registro de Usuario</h1>
        </div>
      </header>

      <div className="main-content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-register" noValidate>
            <div className="input-group">
              <label htmlFor="nombre">Nombre Completo*</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
              {errores.nombre && <small className="error-text">{errores.nombre}</small>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Correo Electrónico*</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              {errores.email && <small className="error-text">{errores.email}</small>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña*</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
              {errores.password && <small className="error-text">{errores.password}</small>}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Repetir Contraseña*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errores.confirmPassword && <small className="error-text">{errores.confirmPassword}</small>}
            </div>

            <div className="input-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento*</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
              {errores.fechaNacimiento && <small className="error-text">{errores.fechaNacimiento}</small>}
            </div>

            <div className="input-group">
              <label htmlFor="provincia">Provincia o País*</label>
              <input type="text" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} />
              {errores.provincia && <small className="error-text">{errores.provincia}</small>}
            </div>

            <div className="input-group">
              <label htmlFor="observacion">Observación</label>
              <textarea
                id="observacion"
                name="observacion"
                rows={3}
                value={formData.observacion}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Registro
