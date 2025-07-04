"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Minus, Plus, Trash2, MapPin, CreditCard, Truck } from "lucide-react"
import { OrderConfirmationPopup } from "@/components/order-confirmation-popup"
import { LoadingSpinner } from "@/components/loading-spinner"

const cartItems = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Green Valley Farm",
    location: "California",
    price: 4.5,
    unit: "kg",
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
    inStock: true,
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    farmer: "Berry Fields Farm",
    location: "Oregon",
    price: 8.99,
    unit: "kg",
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    inStock: true,
  },
  {
    id: 3,
    name: "Organic Carrots",
    farmer: "Sunshine Acres",
    location: "Texas",
    price: 2.3,
    unit: "kg",
    quantity: 3,
    image: "/placeholder.svg?height=80&width=80",
    inStock: false,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [promoCode, setPromoCode] = useState("")
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    setShowConfirmationPopup(true)
  }

  const handleOrderConfirm = async (address: string) => {
    setShowConfirmationPopup(false)
    setIsNavigating(true)

    // Simulate navigation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Clear cart after successful order
    setItems([])
    setIsNavigating(false)
  }

  const handleContinueShopping = async () => {
    setIsNavigating(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    window.location.href = "/customer/products"
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5.99
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
                            {item.farmer}, {item.location}
                          </p>
                          <p className="text-lg font-bold text-blue-600 mt-1">
                            ${item.price.toFixed(2)}/{item.unit}
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
                          <p className="font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    {/* <p className="text-gray-400 mt-2">Add some fresh products to get started</p> */}
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700" onClick={handleContinueShopping}>
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                  />
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                    Apply
                  </Button>
                </div>
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
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
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

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Truck className="w-5 h-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-800">Estimated Delivery</p>
                  <p className="text-gray-600">2-3 business days</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-800">Delivery Address</p>
                  <p className="text-gray-600">Will be confirmed at checkout</p>
                </div>
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
