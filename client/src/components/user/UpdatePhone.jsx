// src/components/user/UpdatePhone.jsx
import React, { useState, useRef } from "react";
import { authService } from "../../services/authService";
import toast from "react-hot-toast";

const UpdatePhone = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);

    const sendCode = async () => {
        try {
            setLoading(true);
            await authService.sendPhoneUpdateCode(phone);
            toast.success("Verification code sent!");
            setStep(2);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send code");
        } finally {
            setLoading(false);
        }
    };
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only digits
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only 1 digit
        setOtp(newOtp);

        // Focus next input
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, "");
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
            newOtp[i] = paste[i] || "";
        }
        setOtp(newOtp);
        if (paste.length === 6) handleVerifyCode(paste);
    };

    const handleVerifyCode = async (manualCode) => {
        const fullCode = manualCode || otp.join("");
        try {
            await authService.verifyAndUpdatePhone(phone, fullCode);
            setStep(1);
            setPhone("");
            setOtp(["", "", "", "", "", ""]);
            toast.success("Phone number updated successfully");

        } catch (err) {
            toast.error(err.response?.data?.message || "Verification failed.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold font-playfair text-primary/70 mb-4 ">Update Phone Number</h2>

            {step === 1 && (
                <div className="space-y-4 max-w-xs">
                    <input
                        type="tel"
                        placeholder="Enter new phone number"
                        value={phone}
                        onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^\d+]/g, "");
                            if (value.includes("+")) {
                                value =
                                    "+" + value.replace(/\+/g, "").replace(/^/, "");
                            }
                            setPhone(value);
                        }}
                        className="input p-2 border-b border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-0 focus:border-gray-500"
                    />


                    <button onClick={sendCode} disabled={loading || !phone} className="btn-blue w-full max-w-40 text-white mt-4 p-2 border border-blue-600 bg-blue-600 hover:bg-blue-700 rounded-xl">
                        {loading ? "Sending..." : "Send Code"}
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 pt-5 max-w-sm flex flex-col items-center ">
                    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={(el) => (inputsRef.current[idx] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => handleVerifyCode()}
                        className="btn-blue p-2 w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        Verify Code
                    </button>
                </div>

            )}
        </div>
    );
};

export default UpdatePhone;
