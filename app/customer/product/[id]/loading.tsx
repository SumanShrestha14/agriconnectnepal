import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" theme="customer" />
          <Skeleton className="h-4 w-4" theme="customer" />
          <Skeleton className="h-4 w-20" theme="customer" />
          <Skeleton className="h-4 w-4" theme="customer" />
          <Skeleton className="h-4 w-32" theme="customer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Skeleton className="w-full h-96 rounded-lg" theme="customer" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-20 rounded-lg" theme="customer" />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" theme="customer" />
              <Skeleton className="h-6 w-1/2" theme="customer" />
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24" theme="customer" />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-4" theme="customer" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-full" theme="customer" />
              <Skeleton className="h-4 w-3/4" theme="customer" />
              <Skeleton className="h-4 w-5/6" theme="customer" />
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <Skeleton className="h-6 w-32" theme="customer" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" theme="customer" />
                  <Skeleton className="h-4 w-16" theme="customer" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" theme="customer" />
                  <Skeleton className="h-4 w-12" theme="customer" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" theme="customer" />
                  <Skeleton className="h-4 w-20" theme="customer" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" theme="customer" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8" theme="customer" />
                  <Skeleton className="h-8 w-12" theme="customer" />
                  <Skeleton className="h-8 w-8" theme="customer" />
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-12 w-32" theme="customer" />
                <Skeleton className="h-12 w-32" theme="customer" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <Card className="border-blue-100">
          <CardHeader>
            <Skeleton className="h-6 w-32" theme="customer" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border-b border-blue-100 pb-4 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" theme="customer" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24" theme="customer" />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Skeleton key={starIndex} className="h-3 w-3" theme="customer" />
                          ))}
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full" theme="customer" />
                      <Skeleton className="h-4 w-3/4" theme="customer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
} 