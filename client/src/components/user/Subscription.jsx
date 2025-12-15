import React from "react";
import { useAuth } from "../../context/AuthContext";
import { BadgeCheck, Star } from "lucide-react";
import { startSubscription, cancelSubscription } from "../../services/payment";

export default function Subscription() {
  const { user } = useAuth();
  const plan = user?.plan || "free";

  const isFree = plan === "free";
  const isPremium = plan === "premium";

  return (
    <div className="max-w-xl w-full space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Your Subscription</h2>

      <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              {plan}
              {isPremium && (
                <BadgeCheck className="text-green-500 w-5 h-5" />
              )}
            </h3>
          </div>
          {isPremium && (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        {isPremium && (
          <button
            onClick={async () => {
              try {
                const confirm = window.confirm("Cancel at end of billing period?");
                if (!confirm) return;
                const res = await cancelSubscription(user.subscriptionId);
                alert(res.message);
              } catch (err) {
                alert("Failed to cancel subscription");
              }
            }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100 transition"
          >
            Cancel Subscription
          </button>
        )}


        <div className="text-sm text-gray-600">
          {isFree
            ? "You're on the free plan. Upgrade to unlock premium features like priority support, more storage, and advanced tools."
            : "You have access to all premium features including 24/7 support, cloud backups, and more."}
        </div>

        {isFree && (
          <button
            onClick={startSubscription}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Star className="w-4 h-4" />
            Upgrade to Premium
          </button>
        )}

      </div>
    </div>
  );
}
