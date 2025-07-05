"use client"

import { useState, useEffect } from "react"
import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  DollarSign,
  Loader2
} from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

interface OrderItem {
  productId: {
    _id: string;
    name: string;
    images: string[];
  };
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface Order {
  _id: string;
  customerId: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  deliveryInstructions?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  processing: { label: "Processing", color: "bg-orange-100 text-orange-800", icon: Package },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
}

const paymentStatusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Paid", color: "bg-green-100 text-green-800" },
  failed: { label: "Failed", color: "bg-red-100 text-red-800" },
}

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError("")

      const params = new URLSearchParams()
      if (selectedStatus !== "all") {
        params.append("status", selectedStatus)
      }

      const response = await fetch(`/api/orders?${params}`, {
      credentials: "include"
    })
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      setOrders(data.orders)
    } catch (err: any) {
      setError(err.message || "Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [selectedStatus])

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrder(orderId)
      
      const response = await fetch(`/api/orders/${orderId}`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      // Refresh orders
      await fetchOrders()
    } catch (err: any) {
      alert(err.message || "Failed to update order status")
    } finally {
      setUpdatingOrder(null)
    }
  }

  const getStatusCount = (status: string) => {
    return orders.filter(order => status === "all" || order.status === status).length
  }

  const filteredOrders = orders.filter(order => 
    selectedStatus === "all" || order.status === selectedStatus
  )

  if (loading && orders.length === 0) {
    return (
      <FarmerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading orders..." />
        </div>
      </FarmerLayout>
    )
  }

  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-green-800">Order Management</h1>
          <p className="text-green-600 mt-1">Manage and track your customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(statusConfig).map(([status, config]) => (
            <Card key={status} className="border-green-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-800">{getStatusCount(status)}</p>
                    <p className="text-sm text-green-600">{config.label}</p>
                  </div>
                  <div className={`p-2 rounded-full ${config.color}`}>
                    <config.icon className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Filter Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Order Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    {Object.entries(statusConfig).map(([status, config]) => (
                      <SelectItem key={status} value={status}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600 text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
            const paymentInfo = paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig]
            
            return (
              <Card key={order._id} className="border-green-100">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-green-800">Order #{order._id.slice(-8)}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Rs {order.totalAmount}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusInfo.color}>
                        <statusInfo.icon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <Badge className={paymentInfo.color}>
                        {paymentInfo.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Customer Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Customer Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {order.customerId.fullName}</p>
                        <p className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {order.customerId.email}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {order.customerId.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>{order.deliveryAddress}</p>
                        {order.deliveryInstructions && (
                          <p><strong>Instructions:</strong> {order.deliveryInstructions}</p>
                        )}
                        {order.estimatedDelivery && (
                          <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-green-800 mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.productId.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} {item.unit} × Rs {item.price}
                            </p>
                          </div>
                          <p className="font-bold text-green-600">
                            Rs {(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-green-600">
                        Rs {(order.totalAmount + order.deliveryFee)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <>
                          <Button
                            onClick={() => handleStatusUpdate(order._id, "confirmed")}
                            disabled={updatingOrder === order._id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {updatingOrder === order._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              "Confirm Order"
                            )}
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(order._id, "cancelled")}
                            disabled={updatingOrder === order._id}
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            Cancel Order
                          </Button>
                        </>
                      )}
                      {order.status === "confirmed" && (
                        <Button
                          onClick={() => handleStatusUpdate(order._id, "processing")}
                          disabled={updatingOrder === order._id}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {updatingOrder === order._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Start Processing"
                          )}
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button
                          onClick={() => handleStatusUpdate(order._id, "shipped")}
                          disabled={updatingOrder === order._id}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {updatingOrder === order._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Mark as Shipped"
                          )}
                        </Button>
                      )}
                      {order.status === "shipped" && (
                        <Button
                          onClick={() => handleStatusUpdate(order._id, "delivered")}
                          disabled={updatingOrder === order._id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {updatingOrder === order._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Mark as Delivered"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredOrders.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No orders found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Orders will appear here when customers place them.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </FarmerLayout>
  )
} 