import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CartLoading() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="customer" />
          <Skeleton className="h-4 w-80" theme="customer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="border-blue-100">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Skeleton className="w-20 h-20 rounded-lg" theme="customer" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" theme="customer" />
                      <Skeleton className="h-4 w-24" theme="customer" />
                      <Skeleton className="h-4 w-16" theme="customer" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-8 w-8" theme="customer" />
                          <Skeleton className="h-4 w-8" theme="customer" />
                          <Skeleton className="h-8 w-8" theme="customer" />
                        </div>
                        <Skeleton className="h-6 w-16" theme="customer" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <Card className="border-blue-100 h-fit">
            <CardHeader>
              <Skeleton className="h-6 w-32" theme="customer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" theme="customer" />
                  <Skeleton className="h-4 w-16" theme="customer" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" theme="customer" />
                  <Skeleton className="h-4 w-12" theme="customer" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" theme="customer" />
                  <Skeleton className="h-4 w-20" theme="customer" />
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" theme="customer" />
                  <Skeleton className="h-5 w-20" theme="customer" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" theme="customer" />
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  )
} 