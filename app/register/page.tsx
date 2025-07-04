"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match.");
      return;
    }

    
    try {
      setLoading(true);
      setError("");
      
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(res)

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Confirm password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors duration-200 shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
