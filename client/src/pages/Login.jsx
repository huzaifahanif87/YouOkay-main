import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../utils/validation.js";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);

    if (result.success) {
      toast.success("Login successfull");
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-rows-[25%_75%] lg:grid-rows-1 grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left panel */}
      <div className="flex mt-10 md:mt-18 lg:mt-0 flex-row md:max-h-screen items-center justify-center lg:justify-around bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 md:p-10 space-y-2">
        <div>
          <img src="/logo.png" alt="Logo" className=" md:w-40 lg:w-64 w-30 h-auto animate-float" />
        </div>
        <div>
          <motion.div
            className="text-l md:text-2xl lg:text-4xl font-bold leading-snug"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>Welcome Back</p>
            <p>We're glad to see you</p>
          </motion.div>
          <p className="md:text-lg text-start text-md max-w-sm">
            Log in to continue accessing your dashboard, settings, and more.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-start lg:justify-center px-8 pb-12 py-12 max-w-xl w-full mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-gray-200 p-6 rounded-lg shadow-sm">
          {/* Email Field */}
          <div className="flex flex-col gap-2 w-full">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input p-2 border border-gray-300 rounded-lg w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 w-full">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input p-2 border border-gray-300 rounded-lg w-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-blue p-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded mx-auto"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-sm text-black mt-6">
          Don’t have an account?{' '}
          <Link to="/auth/register" className="text-blue-600  hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
