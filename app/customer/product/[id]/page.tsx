"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, MapPin, Truck, Shield, Leaf, Calendar, Plus, Minus, ArrowLeft, Clock, Package, AlertCircle, CheckCircle } from "lucide-react"
import { OrderConfirmationPopup } from "@/components/order-confirmation-popup"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ReviewsSection } from "@/components/reviews-section"
import { ReviewModal } from "@/components/review-modal"
import Link from "next/link"

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  description: string;
  images: string[];
  organic: boolean;
  harvestDate?: string;
  expiryDate?: string;
  farmerId: {
    _id: string;
    fullname: string;
    FarmName: string;
    FarmLocation: string;
    phoneNumber?: string;
  };
  averageRating: number;
  reviewCount: number;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customerId: {
    fullName: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams()

  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [addToCartSuccess, setAddToCartSuccess] = useState(false)
  const [customerCanReview, setCustomerCanReview] = useState(false)
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    productId: string;
    orderId: string;
    productName: string;
  }>({
    isOpen: false,
    productId: "",
    orderId: "",
    productName: "",
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError("")
        
        const response = await fetch(`/api/products/${params.id}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        
        const data = await response.json()
        setProduct(data.product)
        setReviews(data.reviews)
      } catch (err: any) {
        setError(err.message || "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    const checkCanReview = async () => {
      try {
        const response = await fetch(`/api/reviews/check?productId=${params.id}`, {
          credentials: "include"
        })
        
        if (response.ok) {
          const data = await response.json()
          setCustomerCanReview(!data.hasReviewed)
        }
      } catch (error) {
        console.error("Error checking review status:", error)
      }
    }

    if (params.id) {
      fetchProduct()
      checkCanReview()
    }
  }, [params.id])

  const updateQuantity = (newQuantity: number) => {
    if (product && newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAddingToCart(true)
    setAddToCartSuccess(false)

    try {
      const cartItems = JSON.parse(localStorage.getItem("customer_cart") || "[]")
      const existingItem = cartItems.find((item: any) => item.id === product._id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cartItems.push({
          id: product._id,
          name: product.name,
          farmer: product.farmerId.fullname,
          farmerId: product.farmerId._id,
          price: product.price,
          quantity: quantity,
          unit: product.unit,
          image: product.images[0] || "/placeholder.svg",
        })
      }

      localStorage.setItem("customer_cart", JSON.stringify(cartItems))
      window.dispatchEvent(new Event('cartUpdated'))
      
      setAddToCartSuccess(true)
      setTimeout(() => setAddToCartSuccess(false), 3000)
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add product to cart")
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    if (!product) return
    
    const orderItem = {
      id: product._id,
      name: product.name,
      farmer: product.farmerId.fullname,
      price: product.price,
      quantity: quantity,
      unit: product.unit,
    }
    setShowConfirmationPopup(true)
  }

  const handleReviewClick = async () => {
    try {
      // Get the most recent delivered order for this product
      const response = await fetch(`/api/orders/delivered?productId=${product!._id}`, {
        credentials: "include"
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.orders && data.orders.length > 0) {
          // Use the most recent order
          const mostRecentOrder = data.orders[0]
          setReviewModal({
            isOpen: true,
            productId: product!._id,
            orderId: mostRecentOrder.id,
            productName: product!.name,
          })
        } else {
          alert("No delivered orders found for this product")
        }
      } else {
        alert("Failed to fetch order information")
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      alert("Failed to fetch order information")
    }
  }

  const handleReviewSubmitted = () => {
    setCustomerCanReview(false)
    // Refresh reviews
    window.location.reload()
  }

  const handleOrderConfirm = async (address: string) => {
    setShowConfirmationPopup(false)
    setIsNavigating(true)

    try {
      // Prepare order data for API
      const orderData = {
        items: [{
          productId: product!._id,
          name: product!.name,
          farmerId: product!.farmerId._id,
          price: product!.price,
          quantity: quantity,
          unit: product!.unit,
        }],
        totalAmount: (product!.price * quantity) + 5.99,
        deliveryAddress: address,
        deliveryInstructions: "",
        paymentMethod: "credit_card",
      }

      // Send order to API
      const response = await fetch("/api/orders", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create order")
      }

      // Show success message
      alert("Order placed successfully! You will receive a confirmation email shortly.")
      
      // Navigate to orders page
      window.location.href = "/customer/profile"
    } catch (error: any) {
      console.error("Error creating order:", error)
      alert("Failed to place order: " + error.message)
    } finally {
      setIsNavigating(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const orderItems = product ? [
    {
      id: product._id,
      name: product.name,
      farmer: product.farmerId.fullname,
      price: product.price,
      quantity: quantity,
      unit: product.unit,
    },
  ] : []

  const total = product ? product.price * quantity + 5.99 : 0 // Including delivery fee

  if (loading) {
    return (
      <CustomerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading product..." />
        </div>
      </CustomerLayout>
    )
  }

  if (error || !product) {
    return (
      <CustomerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 text-lg mb-4">{error || "Product not found"}</p>
            <Link href="/customer/products">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </CustomerLayout>
    )
  }

  if (isNavigating) {
    return (
      <CustomerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Processing..." />
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600">
          <Link href="/customer/products" className="hover:text-blue-600">Products</Link> /{" "}
          <Link href={`/customer/products?category=${product.category}`} className="hover:text-blue-600">{product.category}</Link> /{" "}
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
            {product.images.length > 1 && (
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
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "text-red-500" : "text-gray-400"}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.averageRating)}
                  <span className="font-medium ml-1">{product.averageRating}</span>
                  <span className="text-gray-500">({product.reviewCount} reviews)</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {product.category}
                </Badge>
                {product.organic && (
                  <Badge className="bg-green-600 text-white">
                    <Leaf className="w-3 h-3 mr-1" />
                    Organic
                  </Badge>
                )}
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-2">
                Rs {product.price}/{product.unit}
              </div>

              {product.quantity <= 0 ? (
                <Badge variant="destructive">Out of Stock</Badge>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">In Stock ({product.quantity} {product.unit} available)</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Product Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.harvestDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Harvested</p>
                    <p className="text-sm text-gray-600">{formatDate(product.harvestDate)}</p>
                  </div>
                </div>
              )}
              
              {product.expiryDate && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Best Before</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(product.expiryDate)}
                      {(() => {
                        const daysUntil = getDaysUntilExpiry(product.expiryDate)
                        if (daysUntil < 0) {
                          return <span className="text-red-600 ml-1">(Expired)</span>
                        } else if (daysUntil <= 3) {
                          return <span className="text-orange-600 ml-1">({daysUntil} days left)</span>
                        } else {
                          return <span className="text-green-600 ml-1">({daysUntil} days left)</span>
                        }
                      })()}
                    </p>
                  </div>
                </div>
              )}
            </div>

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
                    disabled={quantity >= product.quantity}
                    className="w-10 h-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={product.quantity <= 0 || isAddingToCart}
                  onClick={handleAddToCart}
                >
                  {isAddingToCart ? (
                    <LoadingSpinner size="sm" />
                  ) : addToCartSuccess ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Added to Cart
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart - Rs {(product.price * quantity)}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                  onClick={handleBuyNow}
                  disabled={product.quantity <= 0}
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
                {product.organic && (
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">100% Organic Certified</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Fresh from local farm</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Quality guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">About the Farmer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{product.farmerId.fullname.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-800">{product.farmerId.fullname}</h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {product.farmerId.FarmName}, {product.farmerId.FarmLocation}
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-700">{product.farmerId.phoneNumber}</span>
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Local farmer committed to providing fresh, quality produce
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
     <div className="bg-white">
        {/* Reviews */}
        <ReviewsSection 
          productId={product._id} 
          customerCanReview={customerCanReview}
          onReviewClick={handleReviewClick}
        />
</div>
        {/* Order Confirmation Popup */}
        <OrderConfirmationPopup
          isOpen={showConfirmationPopup}
          onClose={() => setShowConfirmationPopup(false)}
          items={orderItems as any}
          total={total}
          onConfirm={handleOrderConfirm}
        />

        {/* Review Modal */}
        <ReviewModal
          isOpen={reviewModal.isOpen}
          onClose={() => setReviewModal({ isOpen: false, productId: "", orderId: "", productName: "" })}
          productId={reviewModal.productId}
          orderId={reviewModal.orderId}
          productName={reviewModal.productName}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>
    </CustomerLayout>
  )
}
