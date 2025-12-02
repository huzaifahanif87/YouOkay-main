

import { useState, useMemo, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, User, Settings, CalendarCheck } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { assets } from "../../assets/assets"
import SettingsPanel from "../UI/SettingsPanel"

const UserMenu = ({ onLogout }) => {
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const menuRef = useRef(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Disable all scroll when settings open
  useMemo(() => {
    if (showSettings) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [showSettings])

  const avatar = user?.image || "/images/avatar.png"
  const name = user?.name || "User"
  const email = user?.email || "user@example.com"

  return (
    <>
      <div className="relative z-50 " ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10  rounded-full overflow-hidden border-2 border-gray-300 shadow hover:ring-2 hover:ring-gray-500 transition-all duration-200"
        >
          <img src={avatar} alt="User avatar" className="object-cover w-full h-full" />
        </button>

        {open && (
          <div className="absolute right-0 translate-x-10 sm:translate-x-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 text-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-gray-50">
              <div className="flex row items-center gap-4">
                <img src='/logo.png' alt="logo" className="h-10  w-auto" />
                <span className="font-semibold text-gray-700 text-sm">You Okay?</span>
              </div>
            </div>

            <div className="p-2">
              <div className="flex border-b border-gray-100 px-4 py-3 gap-3">
                <div className="mt-2">
                  <User className="" />
                </div>
                <div className="">
                  <div className="font-medium text-gray-800 truncate">{name}</div>
                  <div className="text-gray-500 truncate text-xs">{email}</div>
                </div>
              </div>


              <ul className="py-2 text-gray-700">
                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      if (user?.role === "admin") {
                        navigate("/admin");
                      } else {
                        navigate("/user/me");
                      }
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    {user?.role === "admin" ? "Admin Dashboard" : "Account"}
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/user/settings")
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-50 text-red-500 transition"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center px-4 py-3 border-t border-gray-300 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs text-center text-gray-400">Managed and Secured By </span>
                <img src={assets.HAlogo} alt="HA Software Logo" className="h-8 w-auto" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserMenu
