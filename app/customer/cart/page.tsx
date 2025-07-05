"use client"

import { useState, useEffect } from "react"
import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Minus, Plus, Trash2, MapPin, CreditCard, Truck, ArrowLeft } from "lucide-react"
import { OrderConfirmationPopup } from "@/components/order-confirmation-popup"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  farmer: string
  farmerId: string
  price: number
  unit: string
  quantity: number
  image: string
  inStock: boolean
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const cartData = localStorage.getItem("customer_cart")
        if (cartData) {
          const cartItems = JSON.parse(cartData)
          // Add inStock property to each item (you can enhance this with API call)
          const itemsWithStock = cartItems.map((item: any) => ({
            ...item,
            inStock: true // You can make an API call to check actual stock
          }))
          setItems(itemsWithStock)
        }
      } catch (error) {
        console.error("Error loading cart items:", error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    loadCartItems()

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartItems()
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('storage', handleCartUpdate)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('storage', handleCartUpdate)
    }
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const updatedItems = items.map((item) => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setItems(updatedItems)
    
    // Update localStorage
    localStorage.setItem("customer_cart", JSON.stringify(updatedItems))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)
    
    // Update localStorage
    localStorage.setItem("customer_cart", JSON.stringify(updatedItems))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!")
      return
    }
    setShowConfirmationPopup(true)
  }

  const handleOrderConfirm = async (address: string) => {
    setShowConfirmationPopup(false)
    setIsNavigating(true)

    try {
      // Prepare order data for API
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          farmerId: item.farmerId,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit,
        })),
        totalAmount: subtotal + deliveryFee - discount,
        deliveryAddress: address,
        deliveryInstructions: "",
        paymentMethod: "credit_card",
      }

      // Send order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include session cookies
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create order")
      }

      // Clear cart after successful order
      localStorage.removeItem("customer_cart")
      setItems([])
      window.dispatchEvent(new Event('cartUpdated'))

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

  const handleContinueShopping = async () => {
    setIsNavigating(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    window.location.href = "/customer/products"
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
          const deliveryFee = subtotal > 50 ? 0 : 5.99 // Free delivery over Rs 50
  const discount = 0
  const total = subtotal + deliveryFee - discount

  const inStockItems = items.filter((item) => item.inStock)
  const orderItems = inStockItems.map((item) => ({
    id: item.id,
    name: item.name,
    farmer: item.farmer,
    price: item.price,
    quantity: item.quantity,
    unit: item.unit,
  }))

  if (loading) {
    return (
      <CustomerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading cart..." />
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
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Shopping Cart</h1>
          <p className="text-blue-600 mt-1">Review your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <ShoppingCart className="w-5 h-5" />
                  Cart Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-blue-800">{item.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.farmer}
                          </p>
                          <p className="text-lg font-bold text-blue-600 mt-1">
                            Rs {item.price}/{item.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          {!item.inStock && (
                            <Badge variant="destructive" className="mb-2">
                              Out of Stock
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={!item.inStock}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                            className="w-16 text-center border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                            disabled={!item.inStock}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={!item.inStock}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">Rs {(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 mt-2">Add some fresh products to get started</p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={handleContinueShopping}>
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Order Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${deliveryFee}`
                      )}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">Rs {total}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={inStockItems.length === 0}
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
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
