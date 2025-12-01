// PhoneVerify.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function PhoneVerify() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const sendCode = async () => {
    try {
      await authService.sendPhoneCode(phone);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send code");
    }
  };

  const verifyCode = async () => {
    try {
      await authService.verifyPhoneCode(phone, code);
      navigate("/auth/complete-registration", { state: { phone } });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid verification code");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Verify Your Phone</h2>
      {step === 1 ? (
        <>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <button
            onClick={sendCode}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send Code
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <button
            onClick={verifyCode}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify Code
          </button>
        </>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}

export default PhoneVerify;