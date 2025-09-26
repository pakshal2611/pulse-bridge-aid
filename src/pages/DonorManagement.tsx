import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { donorAPI } from '@/services/api';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Donor {
  id: number;
  name: string;
  bloodType: string;
  phone: string;
  email: string;
  location: string;
  lastDonation: string;
  eligible: boolean;
}

interface EligibilityForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  hasTattoo: boolean;
  hasPiercing: boolean;
}

export default function DonorManagement() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddDonor, setShowAddDonor] = useState(false);
  const [showEligibilityCheck, setShowEligibilityCheck] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);
  const { toast } = useToast();

  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodType: '',
    phone: '',
    email: '',
    location: '',
  });

  const [eligibilityForm, setEligibilityForm] = useState<EligibilityForm>({
    name: '',
    email: '',
    phone: '',
    location: '',
    hasTattoo: false,
    hasPiercing: false,
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const data = await donorAPI.getAllDonors();
      setDonors(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch donors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDonor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const donor = await donorAPI.createDonor(newDonor);
      setDonors([...donors, donor]);
      setNewDonor({ name: '', bloodType: '', phone: '', email: '', location: '' });
      setShowAddDonor(false);
      toast({
        title: "Success",
        description: "Donor added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add donor",
        variant: "destructive",
      });
    }
  };

  const handleEligibilityCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await donorAPI.checkEligibility(eligibilityForm);
      setEligibilityResult(result);
      toast({
        title: result.eligible ? "Eligible!" : "Not Eligible",
        description: result.message,
        variant: result.eligible ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check eligibility",
        variant: "destructive",
      });
    }
  };

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Donor Management</h1>
          <p className="text-muted-foreground">Manage registered donors and eligibility checks</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showEligibilityCheck} onOpenChange={setShowEligibilityCheck}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span>Check Eligibility</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Donor Eligibility Check</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEligibilityCheck} className="space-y-4">
                <div>
                  <Label htmlFor="eligibility-name">Full Name</Label>
                  <Input
                    id="eligibility-name"
                    value={eligibilityForm.name}
                    onChange={(e) => setEligibilityForm({...eligibilityForm, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="eligibility-email">Email</Label>
                  <Input
                    id="eligibility-email"
                    type="email"
                    value={eligibilityForm.email}
                    onChange={(e) => setEligibilityForm({...eligibilityForm, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="eligibility-phone">Phone Number</Label>
                  <Input
                    id="eligibility-phone"
                    value={eligibilityForm.phone}
                    onChange={(e) => setEligibilityForm({...eligibilityForm, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="eligibility-location">Current Location</Label>
                  <Input
                    id="eligibility-location"
                    value={eligibilityForm.location}
                    onChange={(e) => setEligibilityForm({...eligibilityForm, location: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tattoo"
                      checked={eligibilityForm.hasTattoo}
                      onCheckedChange={(checked) => setEligibilityForm({...eligibilityForm, hasTattoo: checked as boolean})}
                    />
                    <Label htmlFor="tattoo">Do you have any tattoos in the last 6 months?</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="piercing"
                      checked={eligibilityForm.hasPiercing}
                      onCheckedChange={(checked) => setEligibilityForm({...eligibilityForm, hasPiercing: checked as boolean})}
                    />
                    <Label htmlFor="piercing">Do you have any piercings in the last 6 months?</Label>
                  </div>
                </div>
                <Button type="submit" className="w-full btn-medical">
                  Check Eligibility
                </Button>
              </form>
              
              {eligibilityResult && (
                <div className={`mt-4 p-4 rounded-lg border ${
                  eligibilityResult.eligible 
                    ? 'bg-success/10 border-success/20' 
                    : 'bg-emergency/10 border-emergency/20'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {eligibilityResult.eligible ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-emergency" />
                    )}
                    <h3 className="font-semibold">
                      {eligibilityResult.eligible ? 'Eligible to Donate!' : 'Not Eligible'}
                    </h3>
                  </div>
                  <p className="text-sm mb-3">{eligibilityResult.message}</p>
                  
                  {eligibilityResult.eligible && eligibilityResult.doctorNotification && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">Doctor Notification</span>
                      </div>
                      <p className="text-sm">
                        Please visit our hospital during working hours: <strong>{eligibilityResult.workingHours}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={showAddDonor} onOpenChange={setShowAddDonor}>
            <DialogTrigger asChild>
              <Button className="btn-medical flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Donor</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Donor</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddDonor} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newDonor.name}
                    onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select value={newDonor.bloodType} onValueChange={(value) => setNewDonor({...newDonor, bloodType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newDonor.phone}
                    onChange={(e) => setNewDonor({...newDonor, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newDonor.email}
                    onChange={(e) => setNewDonor({...newDonor, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newDonor.location}
                    onChange={(e) => setNewDonor({...newDonor, location: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full btn-medical">Add Donor</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card className="card-medical">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search donors by name, blood type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Donors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDonors.map((donor) => (
          <Card key={donor.id} className="card-medical hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{donor.name}</CardTitle>
                <div className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                  donor.eligible 
                    ? 'bg-success/10 text-success' 
                    : 'bg-emergency/10 text-emergency'
                }`}>
                  {donor.eligible ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>{donor.eligible ? 'Eligible' : 'Not Eligible'}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">{donor.bloodType}</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{donor.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{donor.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{donor.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Last: {donor.lastDonation}</span>
              </div>
              <div className="pt-3 space-y-2">
                <Button size="sm" className="w-full btn-medical">
                  Contact Donor
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No donors found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}