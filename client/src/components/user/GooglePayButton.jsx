import GooglePayButton from "@google-pay/button-react"
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const GPayButton = () => {
  const { refreshUser } = useAuth();

  return (
    <GooglePayButton
      environment="TEST" // Change to 'PRODUCTION' when ready
      buttonColor="black"
      buttonType="buy"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["VISA", "MASTERCARD"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example", // Replace with actual gateway like 'stripe' or 'braintree'
                gatewayMerchantId: "exampleMerchantId",
              },
            },
          },
        ],
        merchantInfo: {
          merchantName: "YouOkay?",
          merchantId: "12345678901234567890", // Optional in TEST mode
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: "5.00",
          currencyCode: "USD",
          countryCode: "US",
        },
      }}
      onLoadPaymentData={async (paymentData) => {
        try {
          console.log("Payment Success", paymentData);

          // Send token to backend to mark user as premium
          await api.post("/payments/upgrade", {
            token: paymentData.paymentMethodData.tokenizationData.token,
          });

          await refreshUser();
          alert("Payment successful! You are now premium.");
        } catch (err) {
          console.error("Payment processing failed:", err);
          alert("Payment succeeded, but server upgrade failed.");
        }
      }}
      onCancel={() => console.log("Payment cancelled")}
      onError={(err) => console.error("GPay Error", err)}
    />
  );
};

export default GPayButton;
