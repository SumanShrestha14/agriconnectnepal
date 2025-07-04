"use client"

import type React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Package, ShoppingCart, User, Settings, LogOut, Users, Bell, Search, Heart, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

const menuItems = [
  {
    title: "Available Products",
    url: "/customer/products",
    icon: Package,
  },
  {
    title: "My Cart",
    url: "/customer/cart",
    icon: ShoppingCart,
    badge: "3",
  },
  {
    title: "Favorites",
    url: "/customer/favorites",
    icon: Heart,
  },
]

function SidebarCloseButton() {
  const { setOpen } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(false)}
      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
    >
      <X className="w-4 h-4" />
    </Button>
  )
}

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem("customer_auth")
    router.push("/")
  }

  const handleProfileClick = () => {
    router.push("/customer/profile")
  }

  const handleSettingsClick = () => {
    router.push("/customer/settings")
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-blue-100">
        <SidebarHeader className="border-b border-blue-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h2 className="font-bold text-blue-800">AgriConnect</h2>
                <p className="text-sm text-blue-600">Customer Portal</p>
              </div>
            </div>
            <SidebarCloseButton />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="text-blue-700 font-semibold">Shopping</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-800"
                      tooltip={item.title}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-blue-100 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full hover:bg-blue-50">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-blue-100 text-blue-700">SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                      <p className="text-sm font-medium text-blue-800">Sarah Johnson</p>
                      <p className="text-xs text-blue-600">Premium Customer</p>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettingsClick}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-blue-100 bg-white/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" />

          {/* Company Logo/Name */}
          <div className="flex items-center gap-3 mx-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-bold text-blue-800 text-lg">AgriConnect</h2>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
              <Input
                placeholder="Search products, farmers..."
                className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              2
            </Badge>
          </Button>
        </header>
        <main className="flex-1 p-6 bg-gradient-to-br from-blue-50/30 via-cyan-50/30 to-teal-50/30">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
