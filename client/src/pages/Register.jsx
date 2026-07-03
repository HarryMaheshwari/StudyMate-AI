import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import useGoogleLogin from "../hooks/useGoogleLogin";
import { Link, Navigate } from "react-router-dom";
import { User, Mail, Lock, Brain } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";
import useAuth from "../hooks/useAuth";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const { data: user, isLoading } = useAuth();
  const googleMutation = useGoogleLogin();

  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const {
    fullName,
    email,
    password,
    confirmPassword,
    terms,
  } = formData;

  if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    return toast.error("Please fill all fields.");
  }

  if (password !== confirmPassword) {
    return toast.error("Passwords do not match.");
  }

  if (!terms) {
    return toast.error("Please accept Terms & Conditions.");
  }

  registerMutation.mutate({
    fullName,
    email,
    password,
  });
};

  return (
    <AuthLayout>
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-xl">

        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
            <Brain size={32} />
          </div>

          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-center text-zinc-400">
            Start your AI learning journey today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-4">
              <User size={18} className="text-zinc-500" />

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-4">
              <Mail size={18} className="text-zinc-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-4">
              <Lock size={18} className="text-zinc-500" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-4">
              <Lock size={18} className="text-zinc-500" />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />

            <p className="text-sm text-zinc-400">
              I agree to the{" "}
              <span className="text-blue-400">Terms of Service</span> and{" "}
              <span className="text-blue-400">Privacy Policy</span>.
            </p>
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
          >
            {registerMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-sm text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="mt-6 flex justify-center">
  <GoogleLogin
    theme="filled_black"
    shape="pill"
    text="continue_with"
    onSuccess={(credentialResponse) => {
      googleMutation.mutate(credentialResponse.credential);
    }}
    onError={() => {
      toast.error("Google Sign-In failed.");
    }}
  />
</div>

        <p className="mt-8 text-center text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-400">
            Login
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}