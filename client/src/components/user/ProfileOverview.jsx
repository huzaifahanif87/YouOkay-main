import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Calendar, Phone, Mail, UserCircle, ShieldCheck, Pause } from "lucide-react";

export default function ProfileOverview() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-3xl font-bold font-playfair text-primary/70">Profile Overview</h2>
      <div className="bg-white rounded-2xl shadow-md  p-4 grid gap-5">
        <ProfileRow icon={<UserCircle className="text-blue-500 w-5 h-5" />} label="Name" value={`${user?.firstName} ${user?.lastName}`} />
        <ProfileRow icon={<Mail className="text-blue-500 w-5 h-5" />} label="Email" value={user?.email} />
        <ProfileRow icon={<Phone className="text-blue-500 w-5 h-5" />} label="Phone" value={user?.phone} />
        <ProfileRow icon={<Calendar className="text-blue-500 w-5 h-5" />} label="Date of Birth"
          value={
            user?.dob
              ? new Date(user.dob).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
              : "Not provided"
          } />
        <ProfileRow icon={<ShieldCheck className="text-blue-500 w-5 h-5" />} label="Phone Verified" value={user?.isPhoneVerified ? "Yes" : "No"} />
        <ProfileRow icon={<Pause className="text-blue-500 w-5 h-5" />} label="Paused Status" value={user?.isPaused ? `Paused` : "Active"} />
      </div>
    </div>
  );
}

function ProfileRow({ icon, label, value }) {
  return (
    <div className="flex items-center flex-col md:flex-row items-start justify-between border-b border-gray-300 p-2 ">
      <div className="flex items-center gap-2 text-gray-600 font-medium">
        {icon}
        <p>{label}</p>
      </div>
      <span className="pl-7 md:pl-0 text-gray-900">{value || "—"}</span>
    </div>
  );
}
