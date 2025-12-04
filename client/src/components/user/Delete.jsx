import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ConfirmDialog from "../UI/ConfirmDialog";

const DeleteAccount = () => {
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const handleFinalDelete = async () => {
    if (!password) return toast.error("Please enter your password to confirm.");

    setDeleting(true);
    try {
      const result = await deleteAccount(password);
      if (result.success) {
        toast.success("Account deleted successfully. We’ll miss you 💔");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Deletion failed");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
      setPassword("");
    }
  };

  return (
    <>
      <div className="max-w-2xl -white space-y-6 animate-fade-in p-6">
        <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
        <p className="text-gray-700">
          We're sad to see you go. Deleting your account will <strong>permanently remove all your data</strong> including
          events, messages, and preferences. If you have an active subscription, it <strong>will not be refunded</strong>.
        </p>
        <p className="text-gray-600 italic mt-2">
          We’d love to hear how we can improve. Please consider sharing feedback before leaving.
        </p>
        <div className="flex items-center gap-4 justify-end mt-4">
          <button
            onClick={() => setShowConfirm(true)}
            disabled={deleting}
            type="button"
            className={`px-5 py-2.5 rounded-md font-medium transition ${
              deleting
                ? "bg-red-300 cursor-not-allowed text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Are you sure you want to leave?"
        message={
          <>
            <p className="mb-2">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <p className="mb-4 text-red-500 font-medium">
              Note: Any active subscriptions will not be refunded.
            </p>
            <input
              type="password"
              placeholder="Confirm your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </>
        }
        onClose={() => setShowConfirm(false)}
        onConfirm={handleFinalDelete}
      />
    </>
  );
};

export default DeleteAccount;
