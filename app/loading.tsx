import { Skeleton } from "@/components/ui/skeleton"

export default function LandingLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-2xl" theme="landing" />
            <div>
              <Skeleton className="h-8 w-32 mb-1" theme="landing" />
              <Skeleton className="h-3 w-20" theme="landing" />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-16" theme="landing" />
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-24" theme="landing" />
            <Skeleton className="h-10 w-28" theme="landing" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-4">
        <div className="relative z-10 container mx-auto text-center">
          <div className="mx-auto max-w-5xl">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" theme="landing" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-8" theme="landing" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40" theme="landing" />
              <Skeleton className="h-12 w-40" theme="landing" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-4" theme="landing" />
            <Skeleton className="h-5 w-96 mx-auto" theme="landing" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" theme="landing" />
                <Skeleton className="h-6 w-32 mx-auto mb-3" theme="landing" />
                <Skeleton className="h-4 w-full" theme="landing" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="h-12 w-24 mx-auto mb-2" theme="landing" />
                <Skeleton className="h-4 w-32 mx-auto" theme="landing" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-4" theme="landing" />
            <Skeleton className="h-5 w-96 mx-auto" theme="landing" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" theme="landing" />
                <Skeleton className="h-4 w-full mb-3" theme="landing" />
                <Skeleton className="h-5 w-24 mx-auto mb-2" theme="landing" />
                <Skeleton className="h-4 w-20 mx-auto" theme="landing" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 