"use client"

import type React from "react"
import { useRef } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

import { Users, ArrowLeft, Eye, EyeOff, MapPin, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CustomerSignup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
      // Profile picture
    profilePicture: "",
  
  })
    const [up, setUp] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null)
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
      localStorage.setItem("customer_signup_data", JSON.stringify(formData))
      // Redirect to profile completion
      router.push("/customer/login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="border-2 border-blue-100 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-blue-800">Join as a Customer</CardTitle>
            <CardDescription className="text-blue-600">
              Create your account and start buying fresh produce
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Sarah Johnson"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="customer@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-blue-700">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>

              {/* <div className="space-y-4">
                <Label className="text-blue-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address *
                </Label>
                <div className="space-y-3">
                  <Input
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                  <div className="grid md:grid-cols-3 gap-3">
                    <Input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                    <Input
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                    <Input
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                  </div>
                </div>
              </div> */}




              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-700">
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
                      className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 pr-10"
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
                        <EyeOff className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-blue-600" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-blue-700">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
  <div className="space-y-2">
  <Label htmlFor="profilePicture" className="text-blue-700">
    Profile Picture
  </Label>
  <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
    <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
    <p className="text-blue-700 mb-1">Upload your profile picture</p>
    <p className="text-sm text-blue-500 mb-4">PNG, JPG up to 5MB</p>

    {up && (
      <div className="mb-4">
        <img
          src={up}
          alt="Preview"
          className="mx-auto rounded-full h-24 w-24 object-cover border border-blue-300"
        />
      </div>
    )}

    <input
      type="file"
      ref={fileInputRef}
      accept="image/*"
      id="profilePicture"
      onChange={(e) => {
        const file = e.target.files?.[0]
        if (file && file.size < 5 * 1024 * 1024) {
          const reader = new FileReader()
          reader.onloadend = () => {
            const imageDataUrl = reader.result as string
            setFormData((prev) => ({
              ...prev,
              profilePicture: imageDataUrl,
            }))
            setUp(imageDataUrl)
          }
          reader.readAsDataURL(file)
        } else {
          alert("Please upload a valid image under 5MB.")
        }
      }}
      className="hidden"
    />

    <Button
      type="button"
      variant="outline"
      className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
      onClick={() => fileInputRef.current?.click()} // ✅ trigger file picker
    >
      Choose File
    </Button>
  </div>
</div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3"
              >
                Continue to Profile Setup
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-blue-600">
                Already have an account?{" "}
                <Link href="/customer/login" className="font-semibold text-blue-700 hover:text-blue-800">
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
