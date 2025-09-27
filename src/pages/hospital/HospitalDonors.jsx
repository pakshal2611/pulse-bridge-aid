import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Users, Search, Phone, Mail, MapPin, Calendar, CircleCheck as CheckCircle, Circle as XCircle, Plus, Filter, Heart, Droplets, MessageSquare, Eye, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hospitalAPI, whatsappAPI } from '@/services/api';

const HospitalDonors = () => {
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: 'John Smith',
      bloodGroup: 'O+',
      organType: 'Kidney',
      phone: '+1234567890',
      email: 'john@email.com',
      location: 'New York',
      lastDonation: '2024-01-15',
      eligible: true,
      donationType: 'both'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      bloodGroup: 'A+',
      organType: null,
      phone: '+1234567891',
      email: 'sarah@email.com',
      location: 'Los Angeles',
      lastDonation: '2024-01-10',
      eligible: true,
      donationType: 'blood'
    },
    {
      id: 3,
      name: 'Mike Davis',
      bloodGroup: 'B-',
      organType: 'Liver',
      phone: '+1234567892',
      email: 'mike@email.com',
      location: 'Chicago',
      lastDonation: '2024-01-08',
      eligible: false,
      donationType: 'organ'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddDonor, setShowAddDonor] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donorDetails, setDonorDetails] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodGroup: '',
    organType: '',
    phone: '',
    email: '',
    location: '',
    donationType: 'blood'
  });

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'blood' && (donor.donationType === 'blood' || donor.donationType === 'both')) ||
                         (filterType === 'organ' && (donor.donationType === 'organ' || donor.donationType === 'both'));
    
    return matchesSearch && matchesFilter;
  });

  const handleAddDonor = (e) => {
    e.preventDefault();
    const donor = {
      id: Date.now(),
      ...newDonor,
      eligible: true,
      lastDonation: 'Never'
    };
    setDonors([...donors, donor]);
    setNewDonor({
      name: '',
      bloodGroup: '',
      organType: '',
      phone: '',
      email: '',
      location: '',
      donationType: 'blood'
    });
    setShowAddDonor(false);
    toast({
      title: "Success",
      description: "Donor added successfully",
    });
  };

  const handleContactDonor = async (donor) => {
    setSelectedDonor(donor);
    setShowContactDialog(true);
  };

  const handleViewDetails = async (donor) => {
    setIsLoading(true);
    try {
      const details = await hospitalAPI.getDonorDetails(donor.id);
      setDonorDetails(details);
      setSelectedDonor(donor);
      setShowDetailsDialog(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch donor details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!contactMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await hospitalAPI.contactDonor(selectedDonor.id, contactMessage);
      await whatsappAPI.sendMessage(selectedDonor.phone, contactMessage);
      
      toast({
        title: "Message Sent",
        description: `Message sent to ${selectedDonor.name} via WhatsApp`,
      });
      
      setContactMessage('');
      setShowContactDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Users className="h-8 w-8 text-primary" />
            <span>Donor Management</span>
          </h1>
          <p className="text-muted-foreground">Manage blood and organ donors</p>
        </div>
        <Dialog open={showAddDonor} onOpenChange={setShowAddDonor}>
          <DialogTrigger asChild>
            <Button className="btn-medical flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Donor</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Donor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDonor} className="space-y-4">
              <div>
                <Label htmlFor="name">Donor Name</Label>
                <Input
                  id="name"
                  value={newDonor.name}
                  onChange={(e) => setNewDonor({...newDonor, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="donationType">Donation Type</Label>
                <Select value={newDonor.donationType} onValueChange={(value) => setNewDonor({...newDonor, donationType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood">Blood Only</SelectItem>
                    <SelectItem value="organ">Organ Only</SelectItem>
                    <SelectItem value="both">Both Blood & Organ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={newDonor.bloodGroup} onValueChange={(value) => setNewDonor({...newDonor, bloodGroup: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {(newDonor.donationType === 'organ' || newDonor.donationType === 'both') && (
                <div>
                  <Label htmlFor="organType">Organ Type</Label>
                  <Select value={newDonor.organType} onValueChange={(value) => setNewDonor({...newDonor, organType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kidney">Kidney</SelectItem>
                      <SelectItem value="Liver">Liver</SelectItem>
                      <SelectItem value="Heart">Heart</SelectItem>
                      <SelectItem value="Lung">Lung</SelectItem>
                      <SelectItem value="Cornea">Cornea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
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

      {/* Search and Filter */}
      <Card className="card-medical">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, blood group, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Donors</SelectItem>
                  <SelectItem value="blood">Blood Donors</SelectItem>
                  <SelectItem value="organ">Organ Donors</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-primary">{donor.bloodGroup}</div>
                {donor.organType && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{donor.organType}</span>
                  </Badge>
                )}
              </div>
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
              
              <div className="flex items-center space-x-2 text-sm">
                {donor.donationType === 'blood' && (
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    <Droplets className="h-3 w-3 mr-1" />
                    Blood Donor
                  </Badge>
                )}
                {donor.donationType === 'organ' && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Heart className="h-3 w-3 mr-1" />
                    Organ Donor
                  </Badge>
                )}
                {donor.donationType === 'both' && (
                  <>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <Droplets className="h-3 w-3 mr-1" />
                      Blood
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Heart className="h-3 w-3 mr-1" />
                      Organ
                    </Badge>
                  </>
                )}
              </div>

              <div className="pt-3 space-y-2">
                <Button 
                  size="sm" 
                  className="w-full btn-medical"
                  onClick={() => handleContactDonor(donor)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Donor
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewDetails(donor)}
                  disabled={isLoading}
                >
                  <Eye className="h-4 w-4 mr-2" />
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
            <p className="text-muted-foreground">No donors found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Contact Donor Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Contact {selectedDonor?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Message to send via WhatsApp</Label>
              <Textarea
                id="message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleSendMessage} 
                className="flex-1 btn-medical"
                disabled={isLoading}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {isLoading ? 'Sending...' : 'Send via WhatsApp'}
              </Button>
              <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <span>Donor Details - {selectedDonor?.name}</span>
            </DialogTitle>
          </DialogHeader>
          {donorDetails && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="text-sm">{donorDetails.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Blood Type</Label>
                  <p className="text-sm font-bold text-primary">{donorDetails.bloodType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p className="text-sm">{donorDetails.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-sm">{donorDetails.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                  <p className="text-sm">{donorDetails.age} years</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Weight</Label>
                  <p className="text-sm">{donorDetails.weight} kg</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Height</Label>
                  <p className="text-sm">{donorDetails.height} cm</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Last Donation</Label>
                  <p className="text-sm">{donorDetails.lastDonation}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                <p className="text-sm">{donorDetails.address}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Medical History</Label>
                <p className="text-sm">{donorDetails.medicalHistory}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                <p className="text-sm">{donorDetails.emergencyContact}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                  donorDetails.eligible 
                    ? 'bg-success/10 text-success' 
                    : 'bg-emergency/10 text-emergency'
                }`}>
                  {donorDetails.eligible ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>{donorDetails.eligible ? 'Eligible' : 'Not Eligible'}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  onClick={() => handleContactDonor(selectedDonor)}
                  className="flex-1 btn-medical"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Donor
                </Button>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalDonors;