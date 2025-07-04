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
import { Upload, Leaf, DollarSign, Package, Users, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompleteProfile() {
  const [step, setStep] = useState(1)
  const [profileData, setProfileData] = useState({
    // Basic info from signup
    name: "",
    email: "",
    phone: "",
    farmName: "",
    location: "",
    bio: "",

    // Additional profile info
    farmSize: "",
    established: "",
    farmingType: "",
    certifications: [] as string[],
    specialties: [] as string[],

    // Business info
    businessLicense: "",
    taxId: "",
    bankAccount: "",

    // Farming details
    soilType: "",
    irrigationMethod: "",
    harvestSeason: "",
    deliveryRadius: "",

    // Marketing
    website: "",
    socialMedia: "",
    marketingGoals: "",

    // Profile picture
    profilePicture: "",
  })
  const router = useRouter()

  useEffect(() => {
    // Load signup data
    const signupData = localStorage.getItem("farmer_signup_data")
    if (signupData) {
      const data = JSON.parse(signupData)
      setProfileData((prev) => ({ ...prev, ...data }))
    } else {
      router.push("/farmer/signup")
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

  const handleNext = () => {
    if (step < 4) {
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
    localStorage.setItem("farmer_profile", JSON.stringify(profileData))
    localStorage.setItem("farmer_auth", "true")
    localStorage.removeItem("farmer_signup_data")
    router.push("/farmer/dashboard")
  }

  const progress = (step / 4) * 100

  const certificationOptions = [
    "USDA Organic",
    "Non-GMO Project",
    "Fair Trade",
    "Rainforest Alliance",
    "Biodynamic",
    "GAP (Good Agricultural Practices)",
    "Local Organic",
  ]

  const specialtyOptions = [
    "Heirloom Tomatoes",
    "Organic Vegetables",
    "Herbs & Spices",
    "Seasonal Fruits",
    "Root Vegetables",
    "Leafy Greens",
    "Berries",
    "Citrus Fruits",
    "Grains & Cereals",
    "Dairy Products",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <Card className="border-green-100 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-green-800">Complete Your Farmer Profile</h1>
              <Badge className="bg-green-100 text-green-800">Step {step} of 4</Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-green-600">
              <span>Farm Details</span>
              <span>Business Info</span>
              <span>Farming Methods</span>
              <span>Marketing</span>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Farm Details */}
        {step === 1 && (
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Farm Details
              </CardTitle>
              <CardDescription>Tell us more about your farm and farming practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize" className="text-green-700">
                    Farm Size *
                  </Label>
                  <Input
                    id="farmSize"
                    name="farmSize"
                    placeholder="e.g., 25 acres"
                    value={profileData.farmSize}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="established" className="text-green-700">
                    Farm Established *
                  </Label>
                  <Input
                    id="established"
                    name="established"
                    placeholder="e.g., 2008"
                    value={profileData.established}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingType" className="text-green-700">
                  Farming Type *
                </Label>
                <Select
                  value={profileData.farmingType}
                  onValueChange={(value) => handleSelectChange("farmingType", value)}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                    <SelectValue placeholder="Select farming type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic Farming</SelectItem>
                    <SelectItem value="conventional">Conventional Farming</SelectItem>
                    <SelectItem value="biodynamic">Biodynamic Farming</SelectItem>
                    <SelectItem value="permaculture">Permaculture</SelectItem>
                    <SelectItem value="hydroponic">Hydroponic</SelectItem>
                    <SelectItem value="mixed">Mixed Methods</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-green-700">Certifications</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {certificationOptions.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={profileData.certifications.includes(cert)}
                        onCheckedChange={(checked) => handleArrayChange("certifications", cert, checked as boolean)}
                      />
                      <Label htmlFor={cert} className="text-sm text-green-700">
                        {cert}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-green-700">Specialties *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={profileData.specialties.includes(specialty)}
                        onCheckedChange={(checked) => handleArrayChange("specialties", specialty, checked as boolean)}
                      />
                      <Label htmlFor={specialty} className="text-sm text-green-700">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Business Information */}
        {step === 2 && (
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Business Information
              </CardTitle>
              <CardDescription>Legal and financial details for your farm business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessLicense" className="text-green-700">
                    Business License Number
                  </Label>
                  <Input
                    id="businessLicense"
                    name="businessLicense"
                    placeholder="BL-123456789"
                    value={profileData.businessLicense}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-green-700">
                    Tax ID / EIN
                  </Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    placeholder="12-3456789"
                    value={profileData.taxId}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccount" className="text-green-700">
                  Bank Account (for payments) *
                </Label>
                <Input
                  id="bankAccount"
                  name="bankAccount"
                  placeholder="Account ending in 1234"
                  value={profileData.bankAccount}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-green-700">Profile Picture</Label>
                <div className="border-2 border-dashed border-green-200 rounded-lg p-8 text-center hover:border-green-300 transition-colors">
                  <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-green-600 mb-2">Upload your profile picture</p>
                  <p className="text-sm text-green-500">PNG, JPG up to 5MB</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Farming Methods */}
        {step === 3 && (
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Farming Methods
              </CardTitle>
              <CardDescription>Details about your farming techniques and practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilType" className="text-green-700">
                    Soil Type
                  </Label>
                  <Select value={profileData.soilType} onValueChange={(value) => handleSelectChange("soilType", value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="loam">Loam</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigationMethod" className="text-green-700">
                    Irrigation Method
                  </Label>
                  <Select
                    value={profileData.irrigationMethod}
                    onValueChange={(value) => handleSelectChange("irrigationMethod", value)}
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select irrigation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                      <SelectItem value="flood">Flood Irrigation</SelectItem>
                      <SelectItem value="rain">Rain-fed</SelectItem>
                      <SelectItem value="mixed">Mixed Methods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="harvestSeason" className="text-green-700">
                    Main Harvest Season
                  </Label>
                  <Select
                    value={profileData.harvestSeason}
                    onValueChange={(value) => handleSelectChange("harvestSeason", value)}
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select harvest season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                      <SelectItem value="year-round">Year-round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryRadius" className="text-green-700">
                    Delivery Radius *
                  </Label>
                  <Input
                    id="deliveryRadius"
                    name="deliveryRadius"
                    placeholder="e.g., 50 miles"
                    value={profileData.deliveryRadius}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Marketing & Goals */}
        {step === 4 && (
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Marketing & Goals
              </CardTitle>
              <CardDescription>Help customers find you and set your business goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-green-700">
                    Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://yourfarm.com"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia" className="text-green-700">
                    Social Media (Optional)
                  </Label>
                  <Input
                    id="socialMedia"
                    name="socialMedia"
                    placeholder="@yourfarm"
                    value={profileData.socialMedia}
                    onChange={handleInputChange}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketingGoals" className="text-green-700">
                  Marketing Goals & Target Customers
                </Label>
                <Textarea
                  id="marketingGoals"
                  name="marketingGoals"
                  placeholder="Describe your target customers and marketing goals..."
                  value={profileData.marketingGoals}
                  onChange={handleInputChange}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[120px]"
                />
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">Profile Summary</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Farm:</strong> {profileData.farmName}
                    </p>
                    <p>
                      <strong>Location:</strong> {profileData.location}
                    </p>
                    <p>
                      <strong>Size:</strong> {profileData.farmSize}
                    </p>
                    <p>
                      <strong>Type:</strong> {profileData.farmingType}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Specialties:</strong> {profileData.specialties.slice(0, 3).join(", ")}
                    </p>
                    <p>
                      <strong>Certifications:</strong> {profileData.certifications.slice(0, 2).join(", ")}
                    </p>
                    <p>
                      <strong>Delivery:</strong> {profileData.deliveryRadius}
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
            className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          >
            Previous
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Complete Profile & Start Selling
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
