import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  User, 
  Bell,
  Shield,
  Database,
  Mail,
  Phone,
  MapPin,
  Save,
  Trash2,
  Key,
  Users,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      smsAlerts: true,
      emergencyNotifications: true,
      donorReminders: false,
      systemUpdates: true,
    },
    system: {
      autoMatching: true,
      aiOptimization: true,
      realTimeTracking: true,
      dataBackup: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      dataEncryption: true,
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Settings className="h-8 w-8 text-primary" />
            <span>Settings & Admin Panel</span>
          </h1>
          <p className="text-muted-foreground">Manage system configuration and preferences</p>
        </div>
        <Button onClick={handleSave} className="btn-medical">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Organization Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" defaultValue="LifeLink Donation Network" />
                </div>
                <div>
                  <Label htmlFor="orgType">Organization Type</Label>
                  <Input id="orgType" defaultValue="Non-Profit Healthcare" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="admin@lifelink.org" />
                </div>
                <div>
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Healthcare Blvd, Medical District, NY 10001" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-medical">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <p className="text-sm text-muted-foreground">Active Donors</p>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">32</div>
                  <p className="text-sm text-muted-foreground">Partner Hospitals</p>
                </div>
                <div className="text-center p-4 bg-emergency/10 rounded-lg">
                  <div className="text-2xl font-bold text-emergency">7</div>
                  <p className="text-sm text-muted-foreground">Emergency Cases</p>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">95%</div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                </div>
                <Switch 
                  checked={settings.notifications.emailAlerts}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, notifications: {...settings.notifications, emailAlerts: checked}})
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive text messages for critical updates</p>
                </div>
                <Switch 
                  checked={settings.notifications.smsAlerts}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, notifications: {...settings.notifications, smsAlerts: checked}})
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Emergency Notifications</Label>
                  <p className="text-sm text-muted-foreground">Immediate alerts for emergency requests</p>
                </div>
                <Switch 
                  checked={settings.notifications.emergencyNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, notifications: {...settings.notifications, emergencyNotifications: checked}})
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Donor Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders to eligible donors</p>
                </div>
                <Switch 
                  checked={settings.notifications.donorReminders}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, notifications: {...settings.notifications, donorReminders: checked}})
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, security: {...settings.security, twoFactorAuth: checked}})
                  }
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input 
                  id="sessionTimeout" 
                  type="number" 
                  value={settings.security.sessionTimeout}
                  onChange={(e) => 
                    setSettings({...settings, security: {...settings.security, sessionTimeout: e.target.value}})
                  }
                  className="w-32"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest and in transit</p>
                </div>
                <Switch 
                  checked={settings.security.dataEncryption}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, security: {...settings.security, dataEncryption: checked}})
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-medical">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">FastAPI Backend Key</p>
                    <p className="text-sm text-muted-foreground">••••••••••••••••••••••••••••••••</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Regenerate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="space-y-6">
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Matching</Label>
                  <p className="text-sm text-muted-foreground">Automatically match donors with recipients</p>
                </div>
                <Switch 
                  checked={settings.system.autoMatching}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, system: {...settings.system, autoMatching: checked}})
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI Optimization</Label>
                  <p className="text-sm text-muted-foreground">Use AI for route and resource optimization</p>
                </div>
                <Switch 
                  checked={settings.system.aiOptimization}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, system: {...settings.system, aiOptimization: checked}})
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Real-time Tracking</Label>
                  <p className="text-sm text-muted-foreground">Enable live tracking of donations and logistics</p>
                </div>
                <Switch 
                  checked={settings.system.realTimeTracking}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, system: {...settings.system, realTimeTracking: checked}})
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automated Data Backup</Label>
                  <p className="text-sm text-muted-foreground">Daily backup of all system data</p>
                </div>
                <Switch 
                  checked={settings.system.dataBackup}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, system: {...settings.system, dataBackup: checked}})
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="space-y-6">
          <Card className="card-medical">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
                <Button className="btn-medical">
                  <Users className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Dr. Sarah Johnson', role: 'Admin', email: 'sarah.j@lifelink.org', status: 'Active', lastLogin: '2 hours ago' },
                  { name: 'Michael Chen', role: 'Hospital Staff', email: 'michael.c@citygeneral.com', status: 'Active', lastLogin: '1 day ago' },
                  { name: 'Emma Davis', role: 'Blood Bank Manager', email: 'emma.d@metroblood.org', status: 'Inactive', lastLogin: '1 week ago' },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{user.role}</p>
                        <p className="text-xs text-muted-foreground">Last: {user.lastLogin}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {user.status}
                      </span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}