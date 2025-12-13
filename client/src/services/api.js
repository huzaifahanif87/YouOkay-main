import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle auth errors
const protectedRoutes = ["/admin", "/events/create","/admin/add-event"]

const isProtectedPath = (pathname) => {
  return protectedRoutes.some((route) => {
    // Match exact route or startsWith for wildcard-like logic
    return pathname === route || pathname.startsWith(route + "/")
  })
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const currentPath = window.location.pathname
    const isProtected = isProtectedPath(currentPath)

    if (
      error.response?.status === 401 &&
      isProtected &&
      currentPath !== "/auth/login"
    ) {
      localStorage.removeItem("token")
      window.location.href = "/auth/login"
    }

    return Promise.reject(error)
  }
)


// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       // No redirect here — leave it to context/component
//     }
//     return Promise.reject(error)
//   }
// )


export default api
