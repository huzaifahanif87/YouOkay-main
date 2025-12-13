import api from "./api";

// Start Stripe Checkout
export const startSubscription = async () => {
  try {
    const res = await api.post("/payments", {}); // userId is auto-extracted from token backend
    if (res.data?.url) {
      window.location.href = res.data.url;
    }
  } catch (error) {
    console.error("Subscription error", error);
    alert("Failed to start subscription");
  }
};

// Cancel subscription at period end
export const cancelSubscription = async (subscriptionId) => {
  try {
    const res = await api.post("/payments/cancel-subscription", {
      subscriptionId,
    });
    return res.data;
  } catch (error) {
    console.error("Cancel error", error);
    throw error;
  }
};
