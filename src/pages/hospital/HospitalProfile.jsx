import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Mail, Phone, MapPin, Save, CreditCard as Edit, Users, Activity, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const HospitalProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    hospitalName: user?.hospitalName || 'City General Hospital',
    email: user?.email || 'admin@citygeneral.com',
    phone: '+1 (555) 123-4567',
    address: '123 Healthcare Blvd, Medical District, NY 10001',
    website: 'www.citygeneral.com',
    establishedYear: '1985',
    bedCapacity: '450',
    specialties: 'Cardiology, Neurology, Oncology, Emergency Medicine',
    description: 'Leading healthcare provider committed to delivering exceptional patient care and medical excellence.',
    licenseNumber: 'HL-2024-001',
    accreditation: 'Joint Commission Accredited'
  });

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your hospital profile has been updated successfully.",
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
            <Building2 className="h-8 w-8 text-primary" />
            <span>Hospital Profile</span>
          </h1>
          <p className="text-muted-foreground">Manage your hospital information and settings</p>
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
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-sm text-muted-foreground">Active Patients</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">15</div>
            <p className="text-sm text-muted-foreground">Donors Registered</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emergency">3</div>
            <p className="text-sm text-muted-foreground">Emergency Cases</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">85%</div>
            <p className="text-sm text-muted-foreground">Bed Occupancy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hospitalName">Hospital Name</Label>
              <Input
                id="hospitalName"
                value={profileData.hospitalName}
                onChange={(e) => handleInputChange('hospitalName', e.target.value)}
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

        {/* Hospital Details */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Hospital Details</span>
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
              <Label htmlFor="bedCapacity">Bed Capacity</Label>
              <Input
                id="bedCapacity"
                value={profileData.bedCapacity}
                onChange={(e) => handleInputChange('bedCapacity', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={profileData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                disabled={!isEditing}
              />
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
              <Label htmlFor="specialties">Medical Specialties</Label>
              <Textarea
                id="specialties"
                value={profileData.specialties}
                onChange={(e) => handleInputChange('specialties', e.target.value)}
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
          <CardTitle>Hospital Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={profileData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={!isEditing}
            rows={4}
            placeholder="Describe your hospital's mission, values, and services..."
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
              { action: 'New patient registered', time: '2 hours ago', type: 'patient' },
              { action: 'Emergency request created', time: '4 hours ago', type: 'emergency' },
              { action: 'Donor contacted successfully', time: '6 hours ago', type: 'donor' },
              { action: 'Profile information updated', time: '1 day ago', type: 'profile' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'emergency' ? 'bg-emergency' :
                    activity.type === 'patient' ? 'bg-primary' :
                    activity.type === 'donor' ? 'bg-success' : 'bg-muted-foreground'
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

export default HospitalProfile;