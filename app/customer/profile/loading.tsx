import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerProfileLoading() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="customer" />
          <Skeleton className="h-4 w-80" theme="customer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="border-blue-100">
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                <Skeleton className="w-12 h-12 rounded-full" theme="customer" />
              </div>
              <Skeleton className="h-6 w-32 mx-auto mb-2" theme="customer" />
              <Skeleton className="h-4 w-40 mx-auto" theme="customer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <Skeleton className="h-10 w-full" theme="customer" />
            </CardContent>
          </Card>

          {/* Order History */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-blue-100">
              <CardHeader>
                <Skeleton className="h-6 w-32" theme="customer" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-lg" theme="customer" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" theme="customer" />
                          <Skeleton className="h-3 w-24" theme="customer" />
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Skeleton className="h-4 w-16" theme="customer" />
                        <Skeleton className="h-3 w-20" theme="customer" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
} 