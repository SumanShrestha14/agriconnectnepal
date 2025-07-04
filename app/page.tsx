"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Sprout,
  Users,
  ArrowRight,
  Leaf,
  Shield,
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Heart,
  Award,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  /* ------------------------------------------------------------------ */
  /* Splash-screen logic                                                */
  /* ------------------------------------------------------------------ */
  const [showSplash, setShowSplash] = useState(true)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      setHeroVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  /* ------------------------------------------------------------------ */
  /* Static page data                                                   */
  /* ------------------------------------------------------------------ */
  const features = [
    {
      icon: Leaf,
      title: "100% Organic",
      description: "Certified organic produce directly from verified farms",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Same-day delivery for maximum freshness",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every product is quality-checked before delivery",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Supporting local farmers and sustainable practices",
      color: "from-red-500 to-rose-600",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Chef",
      content: "The freshest vegetables I've ever bought online. My family loves the quality!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mike Chen",
      role: "Local Farmer",
      content: "AgriConnect helped me reach customers I never could before. My income doubled!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Davis",
      role: "Nutrition Coach",
      content: "I recommend AgriConnect to all my clients. The quality is consistently excellent.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { number: "2,500+", label: "Active Farmers", icon: Users },
    { number: "50K+", label: "Happy Customers", icon: Heart },
    { number: "1M+", label: "Orders Delivered", icon: CheckCircle },
    { number: "99.8%", label: "Satisfaction Rate", icon: Award },
  ]

  /* ------------------------------------------------------------------ */
  /* Splash screen                                                      */
  /* ------------------------------------------------------------------ */
  if (showSplash) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="space-y-6 text-center animate-fade-in">
          <div className="relative">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse">
              <Sprout className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
              <Leaf className="h-4 w-4 text-green-800" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-green-800">AgriConnect</h1>
            <p className="text-lg text-green-600">Connecting Farmers &amp; Customers</p>
          </div>

          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-600" />
          </div>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------------------------ */
  /* Main home page                                                     */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                           */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                <Sprout className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full bg-blue-500" />
            </div>

            <div>
              <h1 className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
                AgriConnect
              </h1>
              <p className="text-xs font-medium text-gray-500">Farm to Table</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="font-medium text-gray-600 transition-colors hover:text-green-600">
              Features
            </Link>
            <Link href="#testimonials" className="font-medium text-gray-600 transition-colors hover:text-green-600">
              Reviews
            </Link>
            <Link href="#about" className="font-medium text-gray-600 transition-colors hover:text-green-600">
              About
            </Link>
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <Link href="/farmer/login">
              <Button variant="ghost" className="font-medium text-green-700 hover:bg-green-50">
                Farmer&nbsp;Login
              </Button>
            </Link>
            {/* <Link href="/customer/login">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg hover:from-green-700 hover:to-emerald-700">
                Get&nbsp;Started
              </Button>
            </Link> */}
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-32 px-4">
        {/* Blurred blobs */}
        <div className="absolute inset-0">
          <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-green-200/30 blur-3xl" />
          <div className="absolute right-10 bottom-20 h-96 w-96 animate-pulse delay-1000 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-100/20 to-blue-100/20 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto text-center">
          <div
            className={`mx-auto max-w-5xl transition-all duration-1000 ${
              heroVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <Badge className="mb-6 flex items-center justify-center gap-2 border-green-200 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 text-green-800">
              <MapPin className="h-4 w-4" />
              Connecting 50+ Cities Nationwide
            </Badge>

            <h1 className="mb-8 text-6xl font-bold leading-tight md:text-8xl">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Fresh Produce
              </span>
              <br />
              <span className="text-gray-800">Delivered Daily</span>
            </h1>

            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
              Experience the future of farm-to-table shopping. Connect directly with local farmers and get the freshest,
              highest-quality produce delivered to your doorstep.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href="/customer/signup">
                <Button
                  size="lg"
                  className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 px-10 py-6 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:scale-105 hover:shadow-green-500/25"
                >
                  <Users className="h-6 w-6" />
                  Start&nbsp;Shopping
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </Link>

              <Link href="/farmer/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-3 border-2 border-gray-300 bg-white/50 px-10 py-6 text-lg font-semibold text-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-green-300 hover:bg-gray-50 hover:text-green-700"
                >
                  <Sprout className="h-6 w-6" />
                  Join&nbsp;as&nbsp;Farmer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Stats                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white/60 py-20 backdrop-blur-sm">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {stats.map(({ icon: Icon, label, number }) => (
            <div key={label} className="group text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                {number}
              </div>
              <div className="font-medium text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Features                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="mb-20 text-center">
            <Badge className="mb-4 border-green-200 bg-green-100 text-green-800">Why Choose Us</Badge>
            <h2 className="mb-6 text-5xl font-bold text-gray-800">
              Built for the{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Future</span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              We’re revolutionising how fresh produce reaches your table with cutting-edge technology and sustainable
              practices.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description, color }) => (
              <Card
                key={title}
                className="group border-0 bg-white/80 backdrop-blur-sm transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <CardHeader className="pb-4 text-center">
                  <div
                    className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${color} shadow-xl transition-transform duration-300 group-hover:rotate-6`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 transition-colors group-hover:text-green-700">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed text-gray-600">{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-24 px-4">
        <div className="container mx-auto">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-5xl font-bold text-gray-800">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to fresh produce</p>
          </div>

          <div className="relative grid gap-12 md:grid-cols-3">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-24 hidden h-1 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-green-300 via-blue-300 to-green-300 md:block" />

            {[
              {
                step: "01",
                title: "Browse & Select",
                desc: "Explore fresh produce from verified local farmers",
                icon: MapPin,
              },
              {
                step: "02",
                title: "Order & Pay",
                desc: "Secure checkout with multiple payment options",
                icon: CheckCircle,
              },
              { step: "03", title: "Receive Fresh", desc: "Get your order delivered within hours", icon: Clock },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="relative text-center">
                <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-500 shadow-2xl">
                  <Icon className="h-12 w-12 text-white" />
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg">
                    <span className="text-sm font-bold text-green-600">{step}</span>
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-800">{title}</h3>
                <p className="leading-relaxed text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="testimonials" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-5xl font-bold text-gray-800">
              Loved by{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from our community</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map(({ name, role, content, avatar, rating }) => (
              <Card
                key={name}
                className="group border-0 bg-white/90 backdrop-blur-sm transition-shadow duration-500 hover:shadow-2xl"
              >
                <CardContent className="p-8">
                  {/* Rating */}
                  <div className="mb-6 flex items-center">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>

                  <p className="mb-8 text-lg italic leading-relaxed text-gray-700">"{content}"</p>

                  <div className="flex items-center">
                    <Avatar className="mr-4 h-14 w-14 ring-4 ring-green-100">
                      <AvatarImage src={avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 font-bold text-white">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{name}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm text-gray-500">{role}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Call to Action                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 py-24 px-4">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-black/10" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto text-center">
          <h2 className="mb-8 text-5xl font-bold text-white md:text-6xl">
            Ready to Transform
            <br />
            Your Shopping?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-green-100">
            Join thousands of satisfied customers and farmers who are already part of the AgriConnect revolution.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/customer/signup">
              <Button
                size="lg"
                className="flex items-center gap-3 bg-white px-10 py-6 text-lg font-semibold text-green-600 shadow-2xl transition-transform duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-white/25"
              >
                <Users className="h-6 w-6" />
                Shop&nbsp;Now
                <ArrowRight className="h-6 w-6" />
              </Button>
            </Link>

            <Link href="/farmer/signup">
              <Button
                size="lg"
                variant="outline"
                className="flex items-center gap-3 border-2 border-white bg-transparent px-10 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-green-600"
              >
                <Sprout className="h-6 w-6" />
                Start&nbsp;Selling
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
