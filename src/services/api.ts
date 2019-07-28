import Axios from "axios"

const api = Axios.create({
  baseURL: "http://localhost:3333",
  timeout: 30000,
})

const updateApiHeaders = (token: string) => {
  api.defaults.headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  })
}

export {
  api,
  updateApiHeaders,
}
