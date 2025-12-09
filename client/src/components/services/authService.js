import api from "./api.js"

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password })
    const { token, user } = response.data
    localStorage.setItem("token", token)
    this.setAuthHeader(token)
    return { user, token }
  },

  async sendPhoneUpdateCode(phone) {
    return await api.post("/auth/update-phone/send-code", { phone });
  },

  async verifyAndUpdatePhone(phone, code) {
    return await api.post("/auth/update-phone/verify", { phone, code });
  },


  async updateProfile(formData) {
    const response = await api.put("/auth/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },
  async sendPhoneCode(phone) {
    return await api.post("/auth/send-code", { phone });
  },

  async verifyPhoneCode(phone, code) {
    return await api.post("/auth/verify-code", { phone, code });
  },

  async completeRegistration(formData) {
    const response = await api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    this.setAuthHeader(token);
    return { user, token };
  },


  async getCurrentUser() {
    const response = await api.get("/auth/me")
    return response.data
  },

  logout() {
    localStorage.removeItem("token")
    localStorage.clear()
    this.clearAuthHeader()
  },

  setAuthHeader(token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  },

  clearAuthHeader() {
    delete api.defaults.headers.common["Authorization"]
  },
  async deleteAccount(password) {
    return await api.delete("/auth/delete", {
      data: { password }
    })
  },

}
