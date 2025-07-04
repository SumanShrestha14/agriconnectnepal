"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sprout, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FarmerSignup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    farmName: "",
    location: "",
    bio: "",
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password === formData.confirmPassword) {
      // Store basic signup data
      localStorage.setItem("farmer_signup_data", JSON.stringify(formData))
      // Redirect to profile completion
      router.push("/farmer/complete-profile")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="border-2 border-green-100 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-800">Join as a Farmer</CardTitle>
            <CardDescription className="text-green-600">
              Create your account and start selling your produce
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-green-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmName" className="text-green-700">
                    Farm Name *
                  </Label>
                  <Input
                    id="farmName"
                    name="farmName"
                    placeholder="Green Valley Farm"
                    value={formData.farmName}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-green-700">
                  Farm Location *
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State, Country"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-green-700">
                  Farm Description *
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell customers about your farm and farming practices..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[100px]"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-700">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-green-700">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
              >
                Continue to Profile Setup
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-green-600">
                Already have an account?{" "}
                <Link href="/farmer/login" className="font-semibold text-green-700 hover:text-green-800">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
