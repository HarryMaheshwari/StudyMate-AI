import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, Navigate } from "react-router-dom";
import { Mail, Lock, Brain } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";
import useGoogleLogin from "../hooks/useGoogleLogin";

export default function Login() {
  const { data: user, isLoading } = useAuth();
  const loginMutation = useLogin();
  const googleMutation = useGoogleLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      return toast.error("Please fill all fields.");
    }

    loginMutation.mutate(formData);
  };

  return (
    <AuthLayout>
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
            <Brain size={32} />
          </div>

          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-zinc-400">
            Login to continue your learning.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-4 focus-within:border-blue-500">
              <Mail size={18} className="text-zinc-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-950 px-4 focus-within:border-blue-500">
              <Lock size={18} className="text-zinc-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-sm text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="flex justify-center">
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
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}