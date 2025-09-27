import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Save, CreditCard as Edit, Heart, Droplets, Calendar, Award, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NotificationSystem from '@/components/NotificationSystem';

const DonorProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Smith',
    email: user?.email || 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Anytown, NY 10001',
    bloodType: 'O+',
    dateOfBirth: '1990-05-15',
    weight: '75',
    height: '180',
    emergencyContact: 'Jane Smith',
    emergencyPhone: '+1 (555) 123-4568',
    medicalConditions: 'None',
    medications: 'None',
    lastDonation: '2024-01-15',
    donationPreference: 'Blood',
    availabilityStatus: 'Available'
  });

  const [donationHistory] = useState([
    { date: '2024-01-15', type: 'Blood', location: 'City General Hospital', status: 'Completed' },
    { date: '2023-11-20', type: 'Blood', location: 'Metro Blood Bank', status: 'Completed' },
    { date: '2023-09-10', type: 'Platelets', location: 'Regional Medical', status: 'Completed' },
    { date: '2023-07-05', type: 'Blood', location: 'City General Hospital', status: 'Completed' }
  ]);

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your donor profile has been updated successfully.",
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const totalDonations = donationHistory.length;
  const livesSaved = totalDonations * 3; // Estimate 3 lives per donation

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <User className="h-8 w-8 text-primary" />
            <span>Donor Profile</span>
          </h1>
          <p className="text-muted-foreground">Manage your donor information and donation preferences</p>
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

      {/* Donor Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalDonations}</div>
            <p className="text-sm text-muted-foreground">Total Donations</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{livesSaved}</div>
            <p className="text-sm text-muted-foreground">Lives Saved</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">Gold</div>
            <p className="text-sm text-muted-foreground">Donor Level</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">Available</div>
            <p className="text-sm text-muted-foreground">Status</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select 
                  value={profileData.bloodType} 
                  onValueChange={(value) => handleInputChange('bloodType', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Medical Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={profileData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={profileData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                value={profileData.medicalConditions}
                onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                disabled={!isEditing}
                rows={2}
                placeholder="List any medical conditions..."
              />
            </div>
            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={profileData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                disabled={!isEditing}
                rows={2}
                placeholder="List current medications..."
              />
            </div>
            <div>
              <Label htmlFor="donationPreference">Donation Preference</Label>
              <Select 
                value={profileData.donationPreference} 
                onValueChange={(value) => handleInputChange('donationPreference', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blood">Blood Only</SelectItem>
                  <SelectItem value="Platelets">Platelets Only</SelectItem>
                  <SelectItem value="Both">Both Blood & Platelets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="availabilityStatus">Availability Status</Label>
              <Select 
                value={profileData.availabilityStatus} 
                onValueChange={(value) => handleInputChange('availabilityStatus', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Temporarily Unavailable">Temporarily Unavailable</SelectItem>
                  <SelectItem value="Not Available">Not Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="emergencyContact">Contact Name</Label>
              <Input
                id="emergencyContact"
                value={profileData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Contact Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="emergencyPhone"
                  value={profileData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donation History */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Donation History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {donationHistory.map((donation, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {donation.type === 'Blood' ? (
                      <Droplets className="h-5 w-5 text-primary" />
                    ) : (
                      <Heart className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{donation.type} Donation</p>
                    <p className="text-sm text-muted-foreground">{donation.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{donation.date}</p>
                  <Badge variant="outline" className="text-xs">
                    {donation.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">Gold Donor</div>
              <p className="text-sm text-muted-foreground">10+ donations</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <Heart className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-success">Life Saver</div>
              <p className="text-sm text-muted-foreground">Saved 12+ lives</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">Regular Donor</div>
              <p className="text-sm text-muted-foreground">2+ years active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="card-medical">
        <CardContent className="p-6">
          <NotificationSystem />
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorProfile;