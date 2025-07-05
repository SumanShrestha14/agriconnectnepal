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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart3, Plus, Lightbulb, User, Settings, LogOut, Sprout, Bell, Search, X, Package } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/farmer/dashboard",
    icon: BarChart3,
  },
  {
    title: "Orders",
    url: "/farmer/orders",
    icon: Package,
  },
  {
    title: "Add Products",
    url: "/farmer/add-products",
    icon: Plus,
  },
  {
    title: "Get Suggestions",
    url: "/farmer/suggestions",
    icon: Lightbulb,
  },
]

function SidebarCloseButton() {
  const { setOpen } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(false)}
      className="text-green-600 hover:text-green-700 hover:bg-green-50"
    >
      <X className="w-4 h-4" />
    </Button>
  )
}

export function FarmerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "loading") return
    
    if (!session || session.user.role !== "farmer") {
      router.push("/farmer/login")
    }
  }, [session, status, router])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const handleProfileClick = () => {
    router.push("/farmer/profile")
  }

  const handleSettingsClick = () => {
    router.push("/farmer/settings")
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-green-100">
        <SidebarHeader className="border-b border-green-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h2 className="font-bold text-green-800">AgriConnect</h2>
                <p className="text-sm text-green-600">Farmer Portal</p>
              </div>
            </div>
            <SidebarCloseButton />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="text-green-700 font-semibold">Farm Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="hover:bg-green-50 data-[active=true]:bg-green-100 data-[active=true]:text-green-800"
                      tooltip={item.title}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-green-100 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full hover:bg-green-50">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-green-100 text-green-700">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                      <p className="text-sm font-medium text-green-800">John Doe</p>
                      <p className="text-xs text-green-600">Green Valley Farm</p>
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-green-100 bg-white/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="text-green-600 hover:text-green-700 hover:bg-green-50" />

          {/* Company Logo/Name */}
          <div className="flex items-center gap-3 mx-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-bold text-green-800 text-lg">AgriConnect</h2>
            </div>
          </div>

          {/* <div className="flex-1 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
              <Input
                placeholder="Search products, orders..."
                className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>
          </div> */}
          {/* <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50">
            <Bell className="w-5 h-5" />
          </Button> */}
        </header>
        <main className="flex-1 p-6 bg-gradient-to-br from-green-50/30 via-emerald-50/30 to-teal-50/30">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
