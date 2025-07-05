import { CustomerLayout } from "@/components/customer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerSettingsLoading() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="customer" />
          <Skeleton className="h-4 w-80" theme="customer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <Card className="border-blue-100">
            <CardHeader>
              <Skeleton className="h-6 w-32" theme="customer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <Skeleton className="h-10 w-full" theme="customer" />
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-blue-100">
            <CardHeader>
              <Skeleton className="h-6 w-40" theme="customer" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" theme="customer" />
                    <Skeleton className="h-3 w-48" theme="customer" />
                  </div>
                  <Skeleton className="h-6 w-12" theme="customer" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="border-blue-100">
            <CardHeader>
              <Skeleton className="h-6 w-28" theme="customer" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-36" theme="customer" />
                    <Skeleton className="h-3 w-52" theme="customer" />
                  </div>
                  <Skeleton className="h-6 w-12" theme="customer" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-blue-100">
            <CardHeader>
              <Skeleton className="h-6 w-30" theme="customer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" theme="customer" />
                <Skeleton className="h-10 w-full" theme="customer" />
              </div>
              <Skeleton className="h-10 w-full" theme="customer" />
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  )
} 