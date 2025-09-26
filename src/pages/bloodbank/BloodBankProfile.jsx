import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Droplets, Mail, Phone, MapPin, Save, CreditCard as Edit, Package, Activity, Calendar, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const BloodBankProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    bloodBankName: user?.bloodBankName || 'Metro Blood Bank',
    email: user?.email || 'admin@metroblood.org',
    phone: '+1 (555) 234-5678',
    address: '456 Medical Plaza, Healthcare District, NY 10002',
    website: 'www.metroblood.org',
    establishedYear: '1992',
    storageCapacity: '5000',
    operatingHours: '24/7 Emergency Services',
    description: 'Leading blood bank facility providing safe and reliable blood products to healthcare institutions across the region.',
    licenseNumber: 'BB-2024-002',
    accreditation: 'AABB Accredited Blood Bank',
    servicesOffered: 'Blood Collection, Processing, Testing, Storage, Distribution',
    emergencyContact: '+1 (555) 234-5679'
  });

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your blood bank profile has been updated successfully.",
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Droplets className="h-8 w-8 text-primary" />
            <span>Blood Bank Profile & Settings</span>
          </h1>
          <p className="text-muted-foreground">Manage your blood bank information and operational settings</p>
        </div>
        <Button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={isEditing ? "btn-medical" : ""}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">2,840</div>
            <p className="text-sm text-muted-foreground">Units in Stock</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">156</div>
            <p className="text-sm text-muted-foreground">Requests Fulfilled</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">8</div>
            <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">98%</div>
            <p className="text-sm text-muted-foreground">Quality Score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bloodBankName">Blood Bank Name</Label>
              <Input
                id="bloodBankName"
                value={profileData.bloodBankName}
                onChange={(e) => handleInputChange('bloodBankName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                  rows={3}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={profileData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Operational Details */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Operational Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="establishedYear">Established Year</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="establishedYear"
                  value={profileData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="storageCapacity">Storage Capacity (Units)</Label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="storageCapacity"
                  value={profileData.storageCapacity}
                  onChange={(e) => handleInputChange('storageCapacity', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="operatingHours">Operating Hours</Label>
              <Input
                id="operatingHours"
                value={profileData.operatingHours}
                onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">License Number</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="licenseNumber"
                  value={profileData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="accreditation">Accreditation</Label>
              <Input
                id="accreditation"
                value={profileData.accreditation}
                onChange={(e) => handleInputChange('accreditation', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="servicesOffered">Services Offered</Label>
              <Textarea
                id="servicesOffered"
                value={profileData.servicesOffered}
                onChange={(e) => handleInputChange('servicesOffered', e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Blood Bank Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={profileData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={!isEditing}
            rows={4}
            placeholder="Describe your blood bank's mission, services, and capabilities..."
          />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Emergency request fulfilled', time: '1 hour ago', type: 'emergency' },
              { action: 'Stock replenishment completed', time: '3 hours ago', type: 'stock' },
              { action: 'Low stock alert triggered', time: '5 hours ago', type: 'alert' },
              { action: 'Hospital request approved', time: '8 hours ago', type: 'request' },
              { action: 'Profile information updated', time: '1 day ago', type: 'profile' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'emergency' ? 'bg-emergency' :
                    activity.type === 'stock' ? 'bg-success' :
                    activity.type === 'alert' ? 'bg-warning' :
                    activity.type === 'request' ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                  <span className="font-medium">{activity.action}</span>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodBankProfile;