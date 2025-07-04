"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, MapPin, Edit, Package, Truck } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"

interface OrderItem {
  id: number
  name: string
  farmer: string
  price: number
  quantity: number
  unit: string
}

interface OrderConfirmationPopupProps {
  isOpen: boolean
  onClose: () => void
  items: OrderItem[]
  total: number
  onConfirm: (address: string) => void
}

export function OrderConfirmationPopup({ isOpen, onClose, items, total, onConfirm }: OrderConfirmationPopupProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  // Load address from localStorage on component mount
  useState(() => {
    const customerProfile = localStorage.getItem("customer_profile")
    if (customerProfile) {
      const profile = JSON.parse(customerProfile)
      const fullAddress = `${profile.address}, ${profile.city}, ${profile.state} ${profile.zipCode}`
      setDeliveryAddress(fullAddress)
    }
  })

  const handleConfirmOrder = async () => {
    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const newOrderId = `ORD-${Date.now()}`
    setOrderId(newOrderId)

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("customer_orders") || "[]")
    const newOrder = {
      id: newOrderId,
      items: items,
      total: total,
      date: new Date().toISOString(),
      status: "confirmed",
      deliveryAddress: deliveryAddress,
    }
    existingOrders.push(newOrder)
    localStorage.setItem("customer_orders", JSON.stringify(existingOrders))

    setIsProcessing(false)
    setIsConfirmed(true)
    onConfirm(deliveryAddress)
  }

  const handleClose = () => {
    setIsProcessing(false)
    setIsConfirmed(false)
    setOrderId("")
    onClose()
  }

  if (isProcessing) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <LoadingSpinner size="lg" text="Processing your order..." />
            <p className="text-blue-600 mt-4">Please wait while we confirm your order</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (isConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">Your fresh produce is on its way!</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-green-800 mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-700">
                  <strong>Order ID:</strong> {orderId}
                </p>
                <p className="text-green-700">
                  <strong>Total:</strong> ${total.toFixed(2)}
                </p>
                <p className="text-green-700">
                  <strong>Items:</strong> {items.length} product{items.length > 1 ? "s" : ""}
                </p>
                <p className="text-green-700">
                  <strong>Estimated Delivery:</strong> 2-3 business days
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleClose} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Continue Shopping
              </Button>
              <Button onClick={() => (window.location.href = "/customer/profile")} variant="outline" className="flex-1">
                View Orders
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-800 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Confirm Your Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.farmer}</p>
                    <p className="text-sm text-blue-600">
                      {item.quantity} {item.unit} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Delivery Address
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
            </div>

            {isEditingAddress ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Full Address
                  </Label>
                  <Input
                    id="address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your complete delivery address"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setIsEditingAddress(false)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Address
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditingAddress(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-gray-700">{deliveryAddress || "No address provided"}</p>
              </div>
            )}
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-800">Delivery Information</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Estimated delivery: 2-3 business days</p>
              <p>• Free delivery on orders over $50</p>
              <p>• Fresh guarantee or money back</p>
              <p>• Contact support for any delivery issues</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmOrder}
              disabled={!deliveryAddress.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Confirm Order - ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
