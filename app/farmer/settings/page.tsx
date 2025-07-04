"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FarmerLayout } from "@/components/farmer-layout"
import { AlertTriangle, Shield, Bell, Palette, Globe, Trash2 } from "lucide-react"

export default function FarmerSettingsPage() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Settings</h1>
          <p className="text-green-600">Manage your account preferences and farm settings</p>
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
                <Label htmlFor="order-alerts">Order Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive new orders</p>
              </div>
              <Switch id="order-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
              </div>
              <Switch id="marketing-emails" />
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
                <p className="text-sm text-muted-foreground">Make your farm profile visible to customers</p>
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

        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Business Settings
            </CardTitle>
            <CardDescription>Configure your farm business preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-accept">Auto-accept Orders</Label>
                <p className="text-sm text-muted-foreground">Automatically accept orders within your capacity</p>
              </div>
              <Switch id="auto-accept" />
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
    </FarmerLayout>
  )
}
