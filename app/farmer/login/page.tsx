"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function FarmerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("signIn response:", res);

      if (!res) {
        setError("⚠️ No response from server. Please try again.");
      } else if (res.error) {
        if (res.status === 401 || res.error === "CredentialsSignin") {
          setError("❌ Invalid email or password");
        } else {
          setError(`⚠️ ${res.error}`);
        }
      } else {
        // Verify user role and redirect accordingly
        const session = await fetch('/api/auth/session');
        const sessionData = await session.json();
        
        if (sessionData?.user?.role === 'farmer') {
          router.push("/farmer/dashboard");
        } else if (sessionData?.user?.role === 'customer') {
          setError("❌ This is a farmer login. Please use customer login.");
        } else {
          router.push("/farmer/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="border-2 border-green-100 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 text-sm px-4 py-2 rounded text-center shadow-sm">
                {error}
              </div>
            )}

            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Farmer Login
            </CardTitle>
            <CardDescription className="text-green-600">
              Welcome back! Sign in to manage your farm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-green-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-green-600" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
              >
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-green-600">
                Don't have an account?{" "}
                <Link
                  href="/farmer/signup"
                  className="font-semibold text-green-700 hover:text-green-800"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
