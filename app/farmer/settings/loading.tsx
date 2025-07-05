import { FarmerLayout } from "@/components/farmer-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FarmerSettingsLoading() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" theme="farmer" />
          <Skeleton className="h-4 w-80" theme="farmer" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-32" theme="farmer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <Skeleton className="h-10 w-full" theme="farmer" />
            </CardContent>
          </Card>

          {/* Farm Settings */}
          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-28" theme="farmer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" theme="farmer" />
                <Skeleton className="h-20 w-full" theme="farmer" />
              </div>
              <Skeleton className="h-10 w-full" theme="farmer" />
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-40" theme="farmer" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" theme="farmer" />
                    <Skeleton className="h-3 w-48" theme="farmer" />
                  </div>
                  <Skeleton className="h-6 w-12" theme="farmer" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-green-100">
            <CardHeader>
              <Skeleton className="h-6 w-30" theme="farmer" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" theme="farmer" />
                <Skeleton className="h-10 w-full" theme="farmer" />
              </div>
              <Skeleton className="h-10 w-full" theme="farmer" />
            </CardContent>
          </Card>
        </div>
      </div>
    </FarmerLayout>
  )
} 