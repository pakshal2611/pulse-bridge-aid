import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Siren, Plus, Clock, MapPin, Phone, TriangleAlert as AlertTriangle, Users, Send, Navigation, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const HospitalEmergency = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([
    {
      id: 1,
      patientName: 'Emergency Patient #1',
      bloodType: 'O-',
      organType: null,
      timeRemaining: '45 min',
      urgency: 'Critical',
      status: 'Active'
    },
    {
      id: 2,
      patientName: 'Jane Doe',
      bloodType: 'AB+',
      organType: 'Kidney',
      timeRemaining: '2 hours',
      urgency: 'High',
      status: 'Active'
    },
    {
      id: 3,
      patientName: 'Robert Wilson',
      bloodType: 'B-',
      organType: null,
      timeRemaining: '6 hours',
      urgency: 'Medium',
      status: 'Active'
    }
  ]);

  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const { toast } = useToast();

  const [newRequest, setNewRequest] = useState({
    patientName: '',
    bloodType: '',
    organType: '',
    urgency: '',
    contactPhone: '',
    notes: '',
    unitsNeeded: ''
  });

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const request = {
      id: Date.now(),
      ...newRequest,
      timeRemaining: '24 hours',
      status: 'Active'
    };
    setEmergencyRequests([request, ...emergencyRequests]);
    setNewRequest({
      patientName: '',
      bloodType: '',
      organType: '',
      urgency: '',
      contactPhone: '',
      notes: '',
      unitsNeeded: ''
    });
    setShowCreateRequest(false);
    toast({
      title: "Emergency Request Created",
      description: "Emergency request has been created and donors are being notified",
    });
  };

  const handleNotifyDonors = (requestId) => {
    toast({
      title: "Donors Notified",
      description: "25 donors have been notified about this emergency",
    });
  };

  const handleViewMatches = (request) => {
    toast({
      title: "Finding Matches",
      description: `Searching for ${request.bloodType} donors in your area...`,
    });
  };

  const handleFastestRoute = (request) => {
    toast({
      title: "Route Calculated",
      description: "Fastest route to hospital has been calculated",
    });
  };

  const handleDeleteRequest = (requestId) => {
    setEmergencyRequests(emergencyRequests.filter(req => req.id !== requestId));
    toast({
      title: "Request Deleted",
      description: "Emergency request has been removed",
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'text-emergency bg-emergency/10 border-emergency/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Siren className="h-8 w-8 text-emergency animate-pulse" />
            <span>Emergency SOS</span>
          </h1>
          <p className="text-muted-foreground">Manage critical blood and organ requests</p>
        </div>
        <Dialog open={showCreateRequest} onOpenChange={setShowCreateRequest}>
          <DialogTrigger asChild>
            <Button className="btn-emergency flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Emergency Request</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Siren className="h-5 w-5 text-emergency" />
                <span>New Emergency Request</span>
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <Label htmlFor="patientName">Patient Name/ID</Label>
                <Input
                  id="patientName"
                  value={newRequest.patientName}
                  onChange={(e) => setNewRequest({...newRequest, patientName: e.target.value})}
                  placeholder="Emergency Patient #1 or patient name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodType">Blood Type Needed</Label>
                  <Select value={newRequest.bloodType} onValueChange={(value) => setNewRequest({...newRequest, bloodType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="units">Units Needed</Label>
                  <Input
                    id="units"
                    type="number"
                    value={newRequest.unitsNeeded}
                    onChange={(e) => setNewRequest({...newRequest, unitsNeeded: e.target.value})}
                    placeholder="2"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="organType">Organ Type (Optional)</Label>
                <Select value={newRequest.organType} onValueChange={(value) => setNewRequest({...newRequest, organType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organ (if needed)" />
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
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={newRequest.urgency} onValueChange={(value) => setNewRequest({...newRequest, urgency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical (Life-threatening)</SelectItem>
                    <SelectItem value="High">High (Urgent care needed)</SelectItem>
                    <SelectItem value="Medium">Medium (Important but stable)</SelectItem>
                    <SelectItem value="Low">Low (Planned procedure)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contactPhone">Emergency Contact</Label>
                <Input
                  id="contactPhone"
                  value={newRequest.contactPhone}
                  onChange={(e) => setNewRequest({...newRequest, contactPhone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={newRequest.notes}
                  onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
                  placeholder="Any additional information..."
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full btn-emergency">
                Create Emergency Request
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Emergency Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-emergency">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emergency">3</div>
            <p className="text-sm text-muted-foreground">Critical Requests</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">7</div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">150</div>
            <p className="text-sm text-muted-foreground">Donors Notified</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">23</div>
            <p className="text-sm text-muted-foreground">Responses Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Emergency Requests */}
      <div className="space-y-4">
        {emergencyRequests.map((request) => (
          <Card key={request.id} className="card-emergency">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Siren className="h-6 w-6 text-emergency animate-pulse" />
                  <div>
                    <CardTitle className="text-lg">{request.patientName}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-2xl font-bold text-primary">{request.bloodType}</span>
                      {request.organType && (
                        <span className="text-lg font-semibold text-success">{request.organType}</span>
                      )}
                      <div className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-emergency font-medium">
                    <Clock className="h-4 w-4" />
                    <span>{request.timeRemaining}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Time remaining</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  className="btn-emergency"
                  onClick={() => handleNotifyDonors(request.id)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Notify Donors
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewMatches(request)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Matches
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleFastestRoute(request)}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Fastest Route
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDeleteRequest(request.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {emergencyRequests.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Siren className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No active emergency requests at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HospitalEmergency;