"use client"

import type React from "react"

import { useState } from "react"
import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, X, Package } from "lucide-react"

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
    organic: false,
    images: [] as string[],
  })

  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")

  const categories = ["Vegetables", "Fruits", "Grains", "Dairy & Eggs", "Herbs & Spices", "Pantry Items"]

  const units = ["kg", "lbs", "pieces", "bunches", "dozen", "liters"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags((prev) => [...prev, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission without localStorage
    console.log("Product data:", { ...formData, tags })
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
      organic: false,
      images: [],
    })
    setTags([])
  }

  return (
    <FarmerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-green-800">Add New Product</h1>
          <p className="text-green-600 mt-1">List your fresh produce for customers to discover</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
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
                    className="border-green-200 focus:border-green-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
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
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your product, growing methods, taste, etc."
                  className="border-green-200 focus:border-green-400 min-h-[100px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Quantity */}
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
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    className="border-green-200 focus:border-green-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
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
                </div>
                <div>
                  <Label htmlFor="quantity">Available Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="0"
                    className="border-green-200 focus:border-green-400"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates & Freshness */}
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
                </div>
                <div>
                  <Label htmlFor="expiryDate">Best Before Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Tags</CardTitle>
              <CardDescription>Add tags to help customers find your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag (e.g., organic, local, fresh)"
                  className="border-green-200 focus:border-green-400"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="border-green-200 text-green-600 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Product Images</CardTitle>
              <CardDescription>Upload high-quality images of your product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-green-200 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                <Button type="button" variant="outline" className="mt-4 border-green-200 text-green-600 bg-transparent">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" className="border-green-200 text-green-600 bg-transparent">
              Save as Draft
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Publish Product
            </Button>
          </div>
        </form>
      </div>
    </FarmerLayout>
  )
}
