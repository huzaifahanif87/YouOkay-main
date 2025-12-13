import api from "./api.js"

export const userService = {
  async getContacts() {
    return await api.get("/user/contacts")
  },
  async addContact(data) {
    return await api.post("/user/contacts", data)
  },
  async updateContact(id, data) {
    return await api.put(`/user/contacts/${id}`, data)
  },
  async deleteContact(id) {
    return await api.delete(`/user/contacts/${id}`)
  },
}
