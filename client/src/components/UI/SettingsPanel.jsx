

import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { authService } from "../../services/authService"
import { assets } from "../../assets/assets"
import toast from "react-hot-toast"

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Your current password is required"),
  newPassword: yup.string(),
})

const SettingsPanel = ({ setShowSettings }) => {
  const { user, logout, updateProfile, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  })


  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    if (data.newPassword) formData.append("newPassword", data.newPassword)

    try {
      setUpdating(true)
      const result = await updateProfile(formData)
      if (result.success) {
        setShowSettings(false)
        toast.success("updated successfully")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed")
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure? This will permanently delete your account and all events.")
    if (!confirmed) return
    setDeleting(true)
    try {
      const password = prompt("Confirm your password to delete your account:")
      const result = await deleteAccount(password)
      if (result.success) {
        setShowSettings(false)
        toast.success("deleted successfully")
        navigate("/")
      }

    } catch (err) {
      toast.error(err?.response?.data?.message || "Deletion failed")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-gray-100 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex p-4 items-center justify-between rounded-t-xl border-b border-gray-50 bg-gray-50 pb-4">
        <div className="flex items-center gap-4">
          <img src='/logo.png' className="h-10" alt="logo" />
          <h2 className="font-bold text-gray-800 text-lg tracking-wide">SETTINGS</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 space-y-3">

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register("name")}
            className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            {...register("password")}
            type="password"
            className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your current password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password <span className="text-gray-400">(optional)</span>
          </label>
          <input
            {...register("newPassword")}
            type="password"
            className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a new password"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 justify-between">
          <button
            type="submit"
            disabled={updating}
            className={`px-5 py-2.5   rounded-md font-medium transition ${updating
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            type="button"
            className={`px-5 py-2.5 rounded-md font-medium transition ${deleting
              ? "bg-red-300 cursor-not-allowed text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
              }`}
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="flex border-t items-center justify-between px-6 py-4 border-gray-100 bg-gray-100 rounded-b-2xl">
        <div className="flex items-center gap-2">
          <img src={assets.HAlogo} alt="HA Software Logo" className="h-8 w-auto" />
          <div className="text-xs text-center text-gray-400">
            © 2025 HA SOFTWARES. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
