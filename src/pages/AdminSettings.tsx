
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, Settings, Globe, Lock, Mail, BellRing, User, Key } from "lucide-react";

export default function AdminSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // General settings
  const [siteName, setSiteName] = useState("SoukSparkle");
  const [siteDescription, setSiteDescription] = useState("Discover authentic Moroccan craftsmanship");
  const [contactEmail, setContactEmail] = useState("contact@souksparkle.com");
  const [supportPhone, setSupportPhone] = useState("+212 555-123456");
  
  // Email notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    newOrders: true,
    newUsers: true,
    newTraderApplications: true,
    systemAlerts: false,
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    autoLogout: true,
  });

  // Administrator settings
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminEmail, setAdminEmail] = useState("admin@souksparkle.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveGeneral = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your general settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Notification settings saved",
        description: "Your notification preferences have been updated.",
      });
    }, 1000);
  };

  const handleSaveSecurity = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Security settings saved",
        description: "Your security settings have been updated.",
      });
    }, 1000);
  };

  const handleChangePassword = () => {
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Site Information
              </CardTitle>
              <CardDescription>
                Configure your marketplace's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input 
                    id="site-name" 
                    value={siteName} 
                    onChange={(e) => setSiteName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input 
                    id="support-phone" 
                    value={supportPhone} 
                    onChange={(e) => setSupportPhone(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea 
                  id="site-description" 
                  value={siteDescription} 
                  onChange={(e) => setSiteDescription(e.target.value)} 
                  rows={3} 
                />
              </div>
              
              <Button 
                onClick={handleSaveGeneral} 
                disabled={saving}
                className="bg-gold hover:bg-gold-light text-stone-dark"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="mr-2 h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Configure which email notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-orders" className="flex-1">
                    New Orders
                    <p className="text-sm text-muted-foreground">Receive notifications for new customer orders</p>
                  </Label>
                  <Switch 
                    id="new-orders" 
                    checked={emailNotifications.newOrders} 
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, newOrders: checked})} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-users" className="flex-1">
                    New User Registrations
                    <p className="text-sm text-muted-foreground">Receive notifications when new users register</p>
                  </Label>
                  <Switch 
                    id="new-users" 
                    checked={emailNotifications.newUsers} 
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, newUsers: checked})} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-applications" className="flex-1">
                    New Trader Applications
                    <p className="text-sm text-muted-foreground">Receive notifications for new trader applications</p>
                  </Label>
                  <Switch 
                    id="new-applications" 
                    checked={emailNotifications.newTraderApplications} 
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, newTraderApplications: checked})} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-alerts" className="flex-1">
                    System Alerts
                    <p className="text-sm text-muted-foreground">Receive notifications about system issues</p>
                  </Label>
                  <Switch 
                    id="system-alerts" 
                    checked={emailNotifications.systemAlerts} 
                    onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, systemAlerts: checked})} 
                  />
                </div>
                
                <Button 
                  onClick={handleSaveNotifications} 
                  disabled={saving}
                  className="mt-4 bg-gold hover:bg-gold-light text-stone-dark"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure your marketplace security options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor" className="flex-1">
                    Two-Factor Authentication
                    <p className="text-sm text-muted-foreground">Require 2FA for admin login</p>
                  </Label>
                  <Switch 
                    id="two-factor" 
                    checked={securitySettings.twoFactorAuth} 
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-notifications" className="flex-1">
                    Login Notifications
                    <p className="text-sm text-muted-foreground">Receive email alerts for admin login attempts</p>
                  </Label>
                  <Switch 
                    id="login-notifications" 
                    checked={securitySettings.loginNotifications} 
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, loginNotifications: checked})} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-logout" className="flex-1">
                    Auto Logout
                    <p className="text-sm text-muted-foreground">Automatically log out after 1 hour of inactivity</p>
                  </Label>
                  <Switch 
                    id="auto-logout" 
                    checked={securitySettings.autoLogout} 
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, autoLogout: checked})} 
                  />
                </div>
                
                <Button 
                  onClick={handleSaveSecurity} 
                  disabled={saving}
                  className="mt-4 bg-gold hover:bg-gold-light text-stone-dark"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Administrator Account
              </CardTitle>
              <CardDescription>
                Update your administrator profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input 
                    id="admin-username" 
                    value={adminUsername} 
                    onChange={(e) => setAdminUsername(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    value={adminEmail} 
                    onChange={(e) => setAdminEmail(e.target.value)} 
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveGeneral} 
                disabled={saving}
                className="bg-gold hover:bg-gold-light text-stone-dark"
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your administrator password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleChangePassword} 
                disabled={saving}
                className="bg-gold hover:bg-gold-light text-stone-dark"
              >
                {saving ? 'Updating...' : 'Change Password'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
