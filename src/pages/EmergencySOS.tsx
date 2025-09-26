import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emergencyAPI } from '@/services/api';
import { 
  Siren, 
  Plus, 
  Clock, 
  MapPin, 
  Phone, 
  AlertTriangle,
  Users,
  Send,
  Navigation
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface EmergencyRequest {
  id: number;
  patient: string;
  bloodType: string;
  urgency: string;
  hospital: string;
  timeLeft: string;
}

export default function EmergencySOS() {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const { toast } = useToast();

  const [newRequest, setNewRequest] = useState({
    patient: '',
    bloodType: '',
    urgency: '',
    hospital: '',
    contactPhone: '',
    notes: '',
    unitsNeeded: '',
  });

  useEffect(() => {
    fetchEmergencyRequests();
  }, []);

  const fetchEmergencyRequests = async () => {
    try {
      const data = await emergencyAPI.getEmergencyRequests();
      setRequests(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch emergency requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const request = await emergencyAPI.createEmergencyRequest(newRequest);
      setRequests([request, ...requests]);
      setNewRequest({
        patient: '',
        bloodType: '',
        urgency: '',
        hospital: '',
        contactPhone: '',
        notes: '',
        unitsNeeded: '',
      });
      setShowCreateRequest(false);
      toast({
        title: "Emergency Request Created",
        description: "Emergency request has been created and donors are being notified",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create emergency request",
        variant: "destructive",
      });
    }
  };

  const handleNotifyDonors = async (requestId: number) => {
    try {
      const result = await emergencyAPI.notifyDonors(requestId);
      toast({
        title: "Donors Notified",
        description: `${result.notified} donors have been notified about this emergency`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to notify donors",
        variant: "destructive",
      });
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'text-emergency bg-emergency/10 border-emergency/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emergency"></div>
      </div>
    );
  }

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
                <Label htmlFor="patient">Patient Name/ID</Label>
                <Input
                  id="patient"
                  value={newRequest.patient}
                  onChange={(e) => setNewRequest({...newRequest, patient: e.target.value})}
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
                <Label htmlFor="hospital">Hospital/Medical Center</Label>
                <Input
                  id="hospital"
                  value={newRequest.hospital}
                  onChange={(e) => setNewRequest({...newRequest, hospital: e.target.value})}
                  placeholder="Central Hospital"
                  required
                />
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
        {requests.map((request) => (
          <Card key={request.id} className="card-emergency">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Siren className="h-6 w-6 text-emergency animate-pulse" />
                  <div>
                    <CardTitle className="text-lg">{request.patient}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-2xl font-bold text-primary">{request.bloodType}</span>
                      <div className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-emergency font-medium">
                    <Clock className="h-4 w-4" />
                    <span>{request.timeLeft}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Time remaining</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{request.hospital}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="btn-emergency flex-1"
                  onClick={() => handleNotifyDonors(request.id)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Notify Donors
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  View Matches
                </Button>
                <Button size="sm" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Route
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {requests.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Siren className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No active emergency requests at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}