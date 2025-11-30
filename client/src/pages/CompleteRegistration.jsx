// CompleteRegistration.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authService } from "../services/authService";
import { useState } from "react";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup.string().required(),
  password: yup.string().min(6).required(),
});

function CompleteRegistration() {
  const { state } = useLocation();
  const phone = state?.phone;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    formData.append("phone", phone);
    setLoading(true);
    try {
      await authService.completeRegistration(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Finish Registration</h2>

      <input {...register("firstName")} placeholder="First Name" className="input" />
      {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

      <input {...register("lastName")} placeholder="Last Name" className="input" />
      {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

      <input {...register("email")} placeholder="Email" className="input" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input {...register("dob")} placeholder="Date of Birth" type="date" className="input" />
      {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

      <input {...register("password")} type="password" placeholder="Password" className="input" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Registering..." : "Complete Sign Up"}
      </button>
    </form>
  );
}

export default CompleteRegistration;