import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AddProductsLoading() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="farmer" />
          <Skeleton className="h-4 w-80" theme="farmer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Form */}
          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-32" theme="farmer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="farmer" />
                <Skeleton className="h-20 w-full" theme="farmer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" theme="farmer" />
                  <Skeleton className="h-10 w-full" theme="farmer" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" theme="farmer" />
                  <Skeleton className="h-10 w-full" theme="farmer" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="farmer" />
                <Skeleton className="h-32 w-full" theme="farmer" />
              </div>
              <Skeleton className="h-10 w-full" theme="farmer" />
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-28" theme="farmer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-green-200 rounded-lg p-8 text-center">
                <Skeleton className="w-16 h-16 mx-auto mb-4" theme="farmer" />
                <Skeleton className="h-4 w-32 mx-auto mb-2" theme="farmer" />
                <Skeleton className="h-3 w-48 mx-auto" theme="farmer" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-20 rounded-lg" theme="farmer" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="border-green-100">
          <CardHeader>
            <Skeleton className="h-6 w-32" theme="farmer" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border border-green-100 rounded-lg p-4">
                  <Skeleton className="w-full h-32 rounded-lg mb-3" theme="farmer" />
                  <Skeleton className="h-5 w-3/4 mb-2" theme="farmer" />
                  <Skeleton className="h-4 w-1/2 mb-2" theme="farmer" />
                  <Skeleton className="h-4 w-full" theme="farmer" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  )
} 