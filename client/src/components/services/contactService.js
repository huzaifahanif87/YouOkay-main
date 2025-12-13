import api from "./api"

export const contactService = {
  async sendMessage({ name, email, message }) {
    const response = await api.post("/contact", { name, email, message })
    return response.data
  },
}
