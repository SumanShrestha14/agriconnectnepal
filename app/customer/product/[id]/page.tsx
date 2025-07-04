"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, MapPin, Truck, Shield, Leaf, Calendar, Plus, Minus } from "lucide-react"
import { OrderConfirmationPopup } from "@/components/order-confirmation-popup"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock product data - in real app this would come from API based on params.id
const product = {
  id: 1,
  name: "Organic Tomatoes",
  farmer: "Green Valley Farm",
  farmerImage: "/placeholder.svg?height=40&width=40",
  location: "California",
  price: 4.5,
  unit: "kg",
  rating: 4.8,
  reviews: 124,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  category: "Vegetables",
  inStock: true,
  stockQuantity: 45,
  description:
    "Fresh, juicy organic tomatoes grown without pesticides in the heart of California's Central Valley. These vine-ripened tomatoes are perfect for salads, cooking, or eating fresh. Grown using sustainable farming practices with rich, organic soil.",
  features: [
    "100% Organic Certified",
    "Vine-ripened for maximum flavor",
    "No pesticides or chemicals",
    "Harvested within 24 hours",
    "Rich in vitamins and antioxidants",
  ],
  harvestDate: "2024-01-20",
  bestBefore: "2024-01-27",
  tags: ["organic", "local", "fresh", "vine-ripened"],
}

const reviews = [
  {
    id: 1,
    user: "Sarah M.",
    rating: 5,
    date: "2024-01-18",
    comment:
      "Amazing tomatoes! So fresh and flavorful. You can really taste the difference compared to store-bought ones.",
  },
  {
    id: 2,
    user: "Mike R.",
    rating: 5,
    date: "2024-01-15",
    comment: "Best tomatoes I've had in years. Perfect for my homemade pasta sauce. Will definitely order again!",
  },
  {
    id: 3,
    user: "Emma L.",
    rating: 4,
    date: "2024-01-12",
    comment: "Great quality and fast delivery. The tomatoes were perfectly ripe and lasted well in the fridge.",
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    // Simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add to cart logic here
    const cartItems = JSON.parse(localStorage.getItem("customer_cart") || "[]")
    const existingItem = cartItems.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        farmer: product.farmer,
        price: product.price,
        quantity: quantity,
        unit: product.unit,
      })
    }

    localStorage.setItem("customer_cart", JSON.stringify(cartItems))
    setIsAddingToCart(false)
  }

  const handleBuyNow = () => {
    const orderItem = {
      id: product.id,
      name: product.name,
      farmer: product.farmer,
      price: product.price,
      quantity: quantity,
      unit: product.unit,
    }
    setShowConfirmationPopup(true)
  }

  const handleOrderConfirm = async (address: string) => {
    setShowConfirmationPopup(false)
    setIsNavigating(true)

    // Simulate navigation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsNavigating(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const orderItems = [
    {
      id: product.id,
      name: product.name,
      farmer: product.farmer,
      price: product.price,
      quantity: quantity,
      unit: product.unit,
    },
  ]

  const total = product.price * quantity + 5.99 // Including delivery fee

  if (isNavigating) {
    return (
      <CustomerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading..." />
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600">
          <span>Products</span> / <span>{product.category}</span> /{" "}
          <span className="text-blue-600">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-blue-800">{product.name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
                <Badge variant="outline">{product.category}</Badge>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={product.farmerImage || "/placeholder.svg"} />
                  <AvatarFallback>GV</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">{product.farmer}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {product.location}
                  </p>
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
                <span className="text-lg text-gray-500 font-normal">/{product.unit}</span>
              </div>

              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800">In Stock ({product.stockQuantity} available)</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-16 text-center font-medium">
                    {quantity} {product.unit}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                    className="w-10 h-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={!product.inStock || isAddingToCart}
                  onClick={handleAddToCart}
                >
                  {isAddingToCart ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Features */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Product Features</h3>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Delivery Information</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Free delivery on orders over $50</p>
                <p>• Estimated delivery: 2-3 business days</p>
                <p>• Fresh guarantee or money back</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-800">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Harvested:</span>
                  <span className="font-medium">{new Date(product.harvestDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Best Before:</span>
                  <span className="font-medium">{new Date(product.bestBefore).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-800">Customer Reviews</CardTitle>
              <CardDescription>
                {product.rating} out of 5 stars ({product.reviews} reviews)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{review.user}</span>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                View All Reviews
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order Confirmation Popup */}
        <OrderConfirmationPopup
          isOpen={showConfirmationPopup}
          onClose={() => setShowConfirmationPopup(false)}
          items={orderItems}
          total={total}
          onConfirm={handleOrderConfirm}
        />
      </div>
    </CustomerLayout>
  )
}
