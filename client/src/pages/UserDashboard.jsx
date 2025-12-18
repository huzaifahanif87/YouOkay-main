import React from "react";
import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircle, PhoneCall, CreditCard, Settings, Contact ,Delete} from "lucide-react";
import { assets } from "../assets/assets";

const navItems = [
  { to: "/user/me", label: "Profile Overview", icon: <UserCircle className="w-5 h-5" /> },
  { to: "/user/emergencyContacts", label: "Emergency Contacts", icon: <Contact className="w-5 h-5" /> },
  { to: "/user/subscription", label: "Subscription", icon: <CreditCard className="w-5 h-5" /> },
  { to: "/user/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  { to: "/user/update-phone", label: "Update Phone", icon: <PhoneCall className="w-5 h-5" /> },
  { to: "/user/delete", label: "Delete Account", icon: <Delete className="w-5 h-5" /> },

];

const SidebarLink = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 border-b border-gray-100 rounded transition font-medium text-md ${
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
      }`
    }
  >
    {icon}
    <span className="hidden p-2 lg:inline">{label}</span>
  </NavLink>
);

const UserDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16 md:pt-25">
      {/* Content Section */}
      <div className="flex flex-1">
        <aside className="w-20 lg:w-64 bg-white shadow-md p-4 space-y-2 transition-all duration-300 border-r border-gray-300">
          <h1 className="text-xl pl-4 font-bold text-blue-600 mb-6 hidden lg:block">
            User Panel
          </h1>
          <div className="space-y-2">
            {navItems.map(({ to, label, icon }) => (
              <SidebarLink key={to} to={to} label={label} icon={icon} />
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-white p-6">
          <Outlet />
        </main>
      </div>
            

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-secondary/10 px-6 py-4">
        <div className="flex items-end justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="HA Software Logo" className="h-8 w-auto" />
            <div className="text-xs text-gray-400">
              YouOkay is a product of HASOFTWARES.
            </div>
          </div>
          
            <Link to='https://hasoftwares.com.pk' target="_blank" rel="noopener noreferrer">
          <div className="flex items-center gap-2">
            <img src={assets.HAlogo} alt="HA Software Logo" className="h-8 w-auto" />
            <div className="text-xs text-gray-400">
              © 2025 HA SOFTWARES. All rights reserved.
            </div>
          </div>
            </Link>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
