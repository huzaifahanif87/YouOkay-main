import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authService } from "../services/authService";
import { motion } from "framer-motion";
import { useRef } from "react";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup
    .date()
    .max(new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), "Must be at least 5 years old")
    .required("Date of birth is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});


const steps = ["Phone", "Code", "Details"];

const Signup = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sendingCode, setSendingCode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSendCode = async () => {
    setError(null);
    setSendingCode(true);
    try {
      await authService.sendPhoneCode(phone);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send verification code.");
    } finally {
      setSendingCode(false);
    }
  };


  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    formData.append("phone", phone);
    setLoading(true);
    try {
      await authService.completeRegistration(formData);
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  // Inside your Signup component:

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
    setError(null);
    try {
      await authService.verifyPhoneCode(phone, fullCode);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    }
  };


  return (
    <div className="min-h-screen grid grid-rows-[25%_75%] lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left promo panel */}

      <div className="flex flex-row mt-10 md:mt-18 lg:mt-0 md:max-h-screen items-center justify-center  bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 md:p-10 space-y-2">
        <div>
          <img
          src="/logo.png"
          alt="Safety"
          className="md:w-40 lg:w-64 w-30 h-auto animate-float"
        />
        </div>
        <div>
        <motion.div
          className="text-l md:text-4xl font-bold leading-snug"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p>Stay Connected</p>
          <p>Stay Safe</p>
        </motion.div>
        <p className="md:text-lg text-start text-md max-w-sm">
          We text you twice a day to check on you. If you don’t respond, we notify your emergency contacts.
        </p>
        </div>
      </div>

      {/* Right signup form */}
      <div className="flex flex-col justify-start md:justify-center px-8 pb-12  py-12  max-w-xl w-full mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>

        {/* Progress Bar */}
        <div className="flex justify-between mb-6">
          {steps.map((label, idx) => (
            <div
              key={idx}
              className={`flex-1 text-center border-b-4 pb-2 font-medium text-sm transition-all duration-300 ${step === idx + 1
                ? "border-blue-600 text-blue-600"
                : "border-gray-300 text-gray-400"
                }`}
            >
              {label}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 flex flex-col items-center border p-10 rounded-lg shadow-sm border-gray-200">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={sendingCode}
              placeholder="Enter phone number"
              className="input p-2 border border-gray-300 rounded w-full mb-4"
            />
            <button onClick={handleSendCode} disabled={sendingCode} className="btn-blue mt-4 p-2 border border-blue-600 bg-blue-600 hover:bg-blue-700 rounded w-full max-w-2xs md:max-w-xs mx-auto">
              {sendingCode ? "Sending..." : "Send Verification Code"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 flex flex-col items-center border p-10 rounded-lg shadow-sm border-gray-200">
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


        {step === 3 && (
          <div className="p-4 border border-gray-200 rounded-lg  shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 w-full ">
                <input {...register("firstName")} placeholder="First Name" className="input p-2 border border-gray-300 rounded-lg  w-full " />
                {errors.firstName && <p className="text-red-500 text-sm ">{errors.firstName.message}</p>}
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <input {...register("lastName")} placeholder="Last Name" className="input p-2 border border-gray-300 rounded-lg  w-full  " />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <input {...register("email")} placeholder="Email" type="email" className="input p-2 border border-gray-300 rounded-lg  w-full  " />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <input
                  {...register("dob")}
                  placeholder="Date of Birth"
                  type="date"
                  max={new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  className="input p-2 border border-gray-300 rounded-lg w-full "
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
              </div>


              <div className="flex flex-col gap-2 w-full ">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="input p-2 border border-gray-300 w-full  rounded-lg "
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                  className="input p-2 border border-gray-300 w-full  rounded-lg"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-blue mt-2 p-2 w-full max-w-3xs bg-blue-600 hover:bg-blue-700 text-white rounded mx-auto"
              >
                {loading ? "Registering..." : "Complete Sign Up"}
              </button>
            </form>
          </div>
        )}

        {error && <p className="text-sm text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
