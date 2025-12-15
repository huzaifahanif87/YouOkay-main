import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().required("Date of birth is required"),
  password: yup.string().required("Your current password is required"),
  newPassword: yup.string(),
})

const SettingsPanel = ({ setShowSettings }) => {
  const { user, updateProfile } = useAuth()
  const [updating, setUpdating] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      dob: user?.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
    },
  })

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("email", data.email)
    formData.append("dob", data.dob)
    formData.append("password", data.password)
    if (data.newPassword) formData.append("newPassword", data.newPassword)

    try {
      setUpdating(true)
      const result = await updateProfile(formData)
      if (result.success) {
        setShowSettings(false)
        toast.success("Updated successfully")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed")
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="max-w-2xl ">
      <div className="p-2 pl-0">

        <h2 className="font-bold text-primary/70 text-lg md:text-3xl font-playfair tracking-wide">SETTINGS</h2>

      </div>

      <div className="p-4 border border-gray-200 rounded-lg  shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              {...register("firstName")}
              className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="First name"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              {...register("lastName")}
              className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Last name"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              {...register("dob")}
              type="date"
              max={new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
              className="mt-1 w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>

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

          <div className="flex items-center gap-4 justify-between pt-4">
            <button
              type="submit"
              disabled={updating}
              className={`px-5 py-2.5 rounded-md font-medium transition ${updating
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsPanel
