import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Filters Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <Skeleton className="w-full h-48 rounded-t-lg" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}
