import axios from "axios"

// ⚠️  Reemplaza la URL base por la de tu recurso en MockAPI
export const api = axios.create({
  baseURL: "https://685bb0dd89952852c2da8de3.mockapi.io",
  headers: { "Content-Type": "application/json" },
})

export default api
