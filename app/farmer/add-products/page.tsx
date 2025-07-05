"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Package, Leaf, AlertCircle, CheckCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AddProductsPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    quantity: "",
    description: "",
    harvestDate: "",
    expiryDate: "",
    organic: true,
    images: [] as string[],
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = ["Vegetables", "Fruits", "Grains", "Dairy & Eggs", "Herbs & Spices", "Pantry Items"]
  const units = ["kg", "lb", "piece", "bunch", "dozen", "pack", "bag"]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    } else if (formData.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }

    if (!formData.unit) {
      newErrors.unit = "Please select a unit"
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid quantity"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required"
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters"
    }

    // Validate dates
    if (formData.harvestDate && formData.expiryDate) {
      const harvestDate = new Date(formData.harvestDate)
      const expiryDate = new Date(formData.expiryDate)
      if (harvestDate > expiryDate) {
        newErrors.expiryDate = "Expiry date must be after harvest date"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleImageChange = (files: FileList | null) => {
    if (!files) return
    const fileArr = Array.from(files)
    const validFiles = fileArr.filter(
      (file) =>
        (file.type === "image/png" || file.type === "image/jpeg") &&
        file.size <= 5 * 1024 * 1024
    )
    
    if (validFiles.length !== fileArr.length) {
      alert("Some files were skipped. Only PNG/JPG files under 5MB are allowed.")
    }
    
    setImageFiles(validFiles)
    const previews = validFiles.map((file) => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const uploadImages = async (files: File[]) => {
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
      })
    return Promise.all(files.map(toBase64))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setUploading(true)
    setSuccess(false)
    
    try {
      let imageUrls: string[] = []
      if (imageFiles.length > 0) {
        imageUrls = await uploadImages(imageFiles)
      }
      
      const productData = {
        ...formData,
        images: imageUrls,
      }

      const res = await fetch("/api/auth/Farmer/AddProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to save product")
      } else {
        const data = await res.json()
        setSuccess(true)
        
        // Reset form
        setFormData({
          name: "",
          category: "",
          price: "",
          unit: "",
          quantity: "",
          description: "",
          harvestDate: "",
          expiryDate: "",
          organic: true,
          images: [],
        })
        setImageFiles([])
        setImagePreviews([])
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } catch (error: any) {
      console.error("Error submitting product:", error)
      setErrors({ submit: error.message || "Something went wrong." })
    } finally {
      setUploading(false)
    }
  }

  const descriptionLength = formData.description.length
  const isDescriptionValid = descriptionLength >= 20 && descriptionLength <= 1000

  return (
    <FarmerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Success Message */}
        {success && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Product Published Successfully!</h3>
                  <p className="text-green-700">Your product is now live and visible to customers.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {errors.submit && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Error</h3>
                  <p className="text-red-700">{errors.submit}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h1 className="text-3xl font-bold text-green-800">Add New Product</h1>
          <p className="text-green-600 mt-1">List your fresh produce for customers to discover</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Package className="w-5 h-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Essential details about your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Organic Tomatoes"
                    className={`border-green-200 focus:border-green-400 ${
                      errors.name ? "border-red-300 focus:border-red-400" : ""
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={`border-green-200 focus:border-green-400 ${
                      errors.category ? "border-red-300 focus:border-red-400" : ""
                    }`}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Product Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your product, its benefits, growing methods, taste, nutritional value, storage tips, etc..."
                  className={`border-green-200 focus:border-green-400 min-h-[120px] resize-none ${
                    errors.description ? "border-red-300 focus:border-red-400" : ""
                  }`}
                  required
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Help customers understand what makes your product special
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${
                      isDescriptionValid ? "text-green-600" : "text-red-600"
                    }`}>
                      {descriptionLength}/1000
                    </span>
                    {isDescriptionValid && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Pricing & Quantity</CardTitle>
              <CardDescription>Set your pricing and available quantity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    className={`border-green-200 focus:border-green-400 ${
                      errors.price ? "border-red-300 focus:border-red-400" : ""
                    }`}
                    required
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.price}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                    <SelectTrigger className={`border-green-200 focus:border-green-400 ${
                      errors.unit ? "border-red-300 focus:border-red-400" : ""
                    }`}>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.unit && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.unit}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="quantity">Available Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="0"
                    className={`border-green-200 focus:border-green-400 ${
                      errors.quantity ? "border-red-300 focus:border-red-400" : ""
                    }`}
                    required
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.quantity}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Dates & Freshness</CardTitle>
              <CardDescription>Help customers understand freshness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => handleInputChange("harvestDate", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    When was this product harvested?
                  </p>
                </div>
                <div>
                  <Label htmlFor="expiryDate">Best Before Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className={`border-green-200 focus:border-green-400 ${
                      errors.expiryDate ? "border-red-300 focus:border-red-400" : ""
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.expiryDate}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    When should this product be consumed by?
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Product Quality</CardTitle>
              <CardDescription>Set quality standards for your product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="organic"
                  checked={formData.organic}
                  onChange={(e) => handleInputChange("organic", e.target.checked)}
                  className="rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="organic" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Leaf className="w-4 h-4 text-green-600" />
                  Organic Product
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Check this if your product is certified organic or grown without synthetic pesticides
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Product Images</CardTitle>
              <CardDescription>Upload high-quality images of your product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-green-200 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 5MB each</p>
                <input
                  id="product-images"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={(e) => handleImageChange(e.target.files)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 border-green-200 text-green-600 bg-transparent"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  Choose Files
                </Button>
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4 justify-center">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="w-24 h-24 rounded overflow-hidden border border-green-200 bg-white flex items-center justify-center relative">
                        <img src={src} alt={`Preview ${idx + 1}`} className="object-cover w-full h-full" />
                        <Badge className="absolute top-1 right-1 bg-green-600 text-white text-xs">
                          {idx + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-end">
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={uploading}>
              {uploading ? "Publishing..." : "Publish Product"}
            </Button>
          </div>
        </form>
      </div>
    </FarmerLayout>
  )
}
 