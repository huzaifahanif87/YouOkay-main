import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BadgeCheck, Star, Pause, Play } from "lucide-react";
import { startSubscription, cancelSubscription } from "../../services/payment";
import { authService } from "../../services/authService";
import toast from "react-hot-toast";
import ConfirmDialog from "../UI/ConfirmDialog";

export default function Subscription() {
  const { user, refreshUser } = useAuth();
  const plan = user?.plan || "free";

  const isFree = plan === "free";
  const isPremium = plan === "premium";
  const hasCancelled = user?.subscriptionStatus === "canceled";
  const isPaused = user?.isPaused; // true if alerts are paused

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pauseConfirm, setPauseConfirm] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    const toastId = toast.loading("Canceling subscription...");
    try {
      const res = await cancelSubscription(user.subscriptionId);
      await refreshUser();
      toast.success(res.message, { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel subscription", { id: toastId });
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleToggleAlerts = async () => {
    setLoading(true);
    const toastId = toast.loading(isPaused ? "Resuming alerts..." : "Pausing alerts...");
    try {
      await authService.toggleAlerts();
      await refreshUser();
      toast.success(isPaused ? "Alerts resumed" : "Alerts paused", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update alerts", { id: toastId });
    } finally {
      setLoading(false);
      setPauseConfirm(false);
    }
  };

  return (
    <div className="max-w-xl w-full space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Your Subscription</h2>

      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              {plan}
              {isPremium && <BadgeCheck className="text-green-500 w-5 h-5" />}
            </h3>
          </div>
          {isPremium && (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isPremium && !hasCancelled && (
            <button
              disabled={loading}
              onClick={() => setShowConfirm(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100 transition disabled:opacity-50"
            >
              Cancel Subscription
            </button>
          )}

          {/* Pause / Resume Alerts */}
          {isPremium && (
            <button
              disabled={loading}
              onClick={() => setPauseConfirm(true)}
              className="mt-4 ml-2 inline-flex items-center gap-2 px-4 py-2 text-yellow-700 border border-yellow-700 rounded hover:bg-yellow-100 transition disabled:opacity-50"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" /> Resume Alerts
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" /> Pause Alerts
                </>
              )}
            </button>
          )}
        </div>

        <div className="text-sm text-gray-600 mt-4">
          {isFree
            ? "You're on the free plan. Upgrade to unlock 24/7 support."
            : `You have access to all premium features until ${new Date(
              user.currentPeriodEnd
            ).toLocaleDateString()}.`}
        </div>

        {isFree && (
          <button
            onClick={() => {
              toast.loading("Redirecting to checkout...");
              startSubscription();
              refreshUser();
            }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Star className="w-4 h-4" />
            Upgrade to Premium
          </button>
        )}
      </div>

      {/* Confirmation Modals */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleCancel}
        title="Cancel Subscription"
        message="Are you sure you want to cancel your subscription? You will continue to have access until the end of your billing period."
      />

      <ConfirmDialog
        isOpen={pauseConfirm}
        onClose={() => setPauseConfirm(false)}
        onConfirm={handleToggleAlerts}
        title={isPaused ? "Resume Alerts" : "Pause Alerts"}
        message={`Are you sure you want to ${isPaused ? "resume" : "pause"} your alerts?`}
      />
    </div>
  );
}
