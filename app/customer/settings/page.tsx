"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CustomerLayout } from "@/components/customer-layout"
import { AlertTriangle, Shield, Bell, Palette, ShoppingBag, Trash2 } from "lucide-react"

export default function CustomerSettingsPage() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Settings</h1>
          <p className="text-blue-600">Manage your account preferences and shopping settings</p>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="order-updates">Order Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
              </div>
              <Switch id="order-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotional-offers">Promotional Offers</Label>
                <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
              </div>
              <Switch id="promotional-offers" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Manage your privacy and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visibility">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Make your profile visible to farmers</p>
              </div>
              <Switch id="profile-visibility" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>

        {/* Shopping Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Preferences
            </CardTitle>
            <CardDescription>Configure your shopping and delivery preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-reorder">Auto-reorder Favorites</Label>
                <p className="text-sm text-muted-foreground">Automatically reorder your favorite items</p>
              </div>
              <Switch id="auto-reorder" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delivery-reminders">Delivery Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming deliveries</p>
              </div>
              <Switch id="delivery-reminders" defaultChecked />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how the app looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch id="dark-mode" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compact-view">Compact View</Label>
                <p className="text-sm text-muted-foreground">Use a more compact layout</p>
              </div>
              <Switch id="compact-view" />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-600">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
