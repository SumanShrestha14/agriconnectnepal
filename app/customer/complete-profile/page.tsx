"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, MapPin, Heart, Users, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CustomerCompleteProfile() {
  const [step, setStep] = useState(1)
  const [profileData, setProfileData] = useState({
    // Basic info from signup
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    preferences: "",

    // Additional profile info
    dietaryRestrictions: [] as string[],
    allergies: "",
    favoriteProducts: [] as string[],
    shoppingFrequency: "",
    budgetRange: "",

    // Delivery preferences
    deliveryInstructions: "",
    preferredDeliveryTime: "",
    alternateAddress: "",

    // Payment info
    paymentMethod: "",

    // Communication preferences
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,

    // Profile picture
    profilePicture: "",
  })
  const router = useRouter()

  useEffect(() => {
    // Load signup data
    const signupData = localStorage.getItem("customer_signup_data")
    if (signupData) {
      const data = JSON.parse(signupData)
      setProfileData((prev) => ({ ...prev, ...data }))
    } else {
      router.push("/customer/signup")
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleArrayChange = (name: string, value: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name as keyof typeof prev] as string[]), value]
        : (prev[name as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleBooleanChange = (name: string, checked: boolean) => {
    setProfileData({
      ...profileData,
      [name]: checked,
    })
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    // Save complete profile
    localStorage.setItem("customer_profile", JSON.stringify(profileData))
    localStorage.setItem("customer_auth", "true")
    localStorage.removeItem("customer_signup_data")
    router.push("/customer/products")
  }

  const progress = (step / 3) * 100

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Keto",
    "Paleo",
    "Low-Sodium",
    "Diabetic-Friendly",
    "Organic Only",
  ]

  const productOptions = [
    "Tomatoes",
    "Leafy Greens",
    "Root Vegetables",
    "Herbs",
    "Berries",
    "Citrus Fruits",
    "Seasonal Vegetables",
    "Organic Produce",
    "Heirloom Varieties",
    "Local Specialties",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <Card className="border-blue-100 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-blue-800">Complete Your Customer Profile</h1>
              <Badge className="bg-blue-100 text-blue-800">Step {step} of 3</Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-blue-600">
              <span>Preferences</span>
              <span>Delivery & Payment</span>
              <span>Notifications</span>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Food Preferences */}
        {step === 1 && (
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Food Preferences
              </CardTitle>
              <CardDescription>Help us recommend the best products for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-blue-700">Dietary Restrictions</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dietaryOptions.map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox
                        id={diet}
                        checked={profileData.dietaryRestrictions.includes(diet)}
                        onCheckedChange={(checked) =>
                          handleArrayChange("dietaryRestrictions", diet, checked as boolean)
                        }
                      />
                      <Label htmlFor={diet} className="text-sm text-blue-700">
                        {diet}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies" className="text-blue-700">
                  Allergies & Special Considerations
                </Label>
                <Textarea
                  id="allergies"
                  name="allergies"
                  placeholder="Please list any food allergies or special dietary needs..."
                  value={profileData.allergies}
                  onChange={handleInputChange}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 min-h-[80px]"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-blue-700">Favorite Products *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {productOptions.map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <Checkbox
                        id={product}
                        checked={profileData.favoriteProducts.includes(product)}
                        onCheckedChange={(checked) =>
                          handleArrayChange("favoriteProducts", product, checked as boolean)
                        }
                      />
                      <Label htmlFor={product} className="text-sm text-blue-700">
                        {product}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shoppingFrequency" className="text-blue-700">
                    Shopping Frequency *
                  </Label>
                  <Select
                    value={profileData.shoppingFrequency}
                    onValueChange={(value) => handleSelectChange("shoppingFrequency", value)}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="How often do you shop?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="seasonal">Seasonally</SelectItem>
                      <SelectItem value="as-needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetRange" className="text-blue-700">
                    Monthly Budget Range *
                  </Label>
                  <Select
                    value={profileData.budgetRange}
                    onValueChange={(value) => handleSelectChange("budgetRange", value)}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50">Under $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-200">$100 - $200</SelectItem>
                      <SelectItem value="200-300">$200 - $300</SelectItem>
                      <SelectItem value="over-300">Over $300</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Delivery & Payment */}
        {step === 2 && (
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Delivery & Payment
              </CardTitle>
              <CardDescription>Set up your delivery preferences and payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="deliveryInstructions" className="text-blue-700">
                  Delivery Instructions
                </Label>
                <Textarea
                  id="deliveryInstructions"
                  name="deliveryInstructions"
                  placeholder="Special delivery instructions (e.g., gate code, preferred location, etc.)"
                  value={profileData.deliveryInstructions}
                  onChange={handleInputChange}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400 min-h-[80px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDeliveryTime" className="text-blue-700">
                    Preferred Delivery Time
                  </Label>
                  <Select
                    value={profileData.preferredDeliveryTime}
                    onValueChange={(value) => handleSelectChange("preferredDeliveryTime", value)}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                      <SelectItem value="weekend">Weekends only</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="text-blue-700">
                    Preferred Payment Method *
                  </Label>
                  <Select
                    value={profileData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="debit-card">Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple-pay">Apple Pay</SelectItem>
                      <SelectItem value="google-pay">Google Pay</SelectItem>
                      <SelectItem value="cash">Cash on Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alternateAddress" className="text-blue-700">
                  Alternate Delivery Address (Optional)
                </Label>
                <Input
                  id="alternateAddress"
                  name="alternateAddress"
                  placeholder="Work address, family member's address, etc."
                  value={profileData.alternateAddress}
                  onChange={handleInputChange}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-blue-700">Profile Picture</Label>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center hover:border-blue-300 transition-colors">
                  <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-blue-600 mb-2">Upload your profile picture</p>
                  <p className="text-sm text-blue-500">PNG, JPG up to 5MB</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Notifications & Final Setup */}
        {step === 3 && (
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Notifications & Preferences
              </CardTitle>
              <CardDescription>Choose how you'd like to stay updated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-800">Communication Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">Email Notifications</p>
                      <p className="text-sm text-blue-600">Order updates, delivery notifications</p>
                    </div>
                    <Checkbox
                      checked={profileData.emailNotifications}
                      onCheckedChange={(checked) => handleBooleanChange("emailNotifications", checked as boolean)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">SMS Notifications</p>
                      <p className="text-sm text-blue-600">Delivery alerts, urgent updates</p>
                    </div>
                    <Checkbox
                      checked={profileData.smsNotifications}
                      onCheckedChange={(checked) => handleBooleanChange("smsNotifications", checked as boolean)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">Marketing Emails</p>
                      <p className="text-sm text-blue-600">Weekly deals, new farmer spotlights</p>
                    </div>
                    <Checkbox
                      checked={profileData.marketingEmails}
                      onCheckedChange={(checked) => handleBooleanChange("marketingEmails", checked as boolean)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Profile Summary</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Name:</strong> {profileData.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {profileData.city}, {profileData.state}
                    </p>
                    <p>
                      <strong>Shopping:</strong> {profileData.shoppingFrequency}
                    </p>
                    <p>
                      <strong>Budget:</strong> {profileData.budgetRange}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Favorites:</strong> {profileData.favoriteProducts.slice(0, 3).join(", ")}
                    </p>
                    <p>
                      <strong>Dietary:</strong> {profileData.dietaryRestrictions.slice(0, 2).join(", ")}
                    </p>
                    <p>
                      <strong>Payment:</strong> {profileData.paymentMethod}
                    </p>
                    <p>
                      <strong>Delivery:</strong> {profileData.preferredDeliveryTime}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
          >
            Previous
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              Complete Profile & Start Shopping
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
