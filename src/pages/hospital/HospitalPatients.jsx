import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Search, 
  Calendar, 
  MapPin, 
  Phone,
  AlertTriangle,
  Clock,
  User,
  Bot,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const HospitalPatients = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Sarah Miller',
      disease: 'Leukemia',
      bloodType: 'O-',
      urgency: 'Critical',
      waitTime: '45 days',
      dateAdded: '2024-01-15',
      status: 'Unfulfilled',
      familyContact: '+1234567890',
      familyEmail: 'family@email.com'
    },
    {
      id: 2,
      name: 'Michael Chen',
      disease: 'Kidney Failure',
      bloodType: 'A+',
      urgency: 'High',
      waitTime: '120 days',
      dateAdded: '2024-01-10',
      status: 'Unfulfilled',
      familyContact: '+1234567891',
      familyEmail: 'chen.family@email.com'
    },
    {
      id: 3,
      name: 'Emma Johnson',
      disease: 'Heart Surgery',
      bloodType: 'B-',
      urgency: 'Medium',
      waitTime: '15 days',
      dateAdded: '2024-01-08',
      status: 'Fulfilled',
      familyContact: '+1234567892',
      familyEmail: 'johnson.family@email.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const { toast } = useToast();

  const [newPatient, setNewPatient] = useState({
    name: '',
    disease: '',
    bloodType: '',
    urgency: '',
    familyContact: '',
    familyEmail: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'bg-emergency text-emergency-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'fulfilled': return 'bg-success text-success-foreground';
      case 'unfulfilled': return 'bg-emergency text-emergency-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const patient = {
      id: Date.now(),
      ...newPatient,
      waitTime: '0 days',
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'Unfulfilled'
    };
    setPatients([...patients, patient]);
    setNewPatient({
      name: '',
      disease: '',
      bloodType: '',
      urgency: '',
      familyContact: '',
      familyEmail: ''
    });
    setShowAddPatient(false);
    toast({
      title: "Success",
      description: "Patient added successfully",
    });
  };

  const handleUpdateStatus = (patientId, newStatus) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, status: newStatus } : patient
    ));
    toast({
      title: "Status Updated",
      description: `Patient status updated to ${newStatus}`,
    });
  };

  const handleDeletePatient = (patientId) => {
    setPatients(patients.filter(patient => patient.id !== patientId));
    toast({
      title: "Patient Deleted",
      description: "Patient record has been removed",
    });
  };

  const handleFindMatches = (patient) => {
    toast({
      title: "AI Matching Started",
      description: `Finding best matches for ${patient.name}...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Heart className="h-8 w-8 text-emergency" />
            <span>Patient/Recipients</span>
          </h1>
          <p className="text-muted-foreground">Manage patients awaiting donations</p>
        </div>
        <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
          <DialogTrigger asChild>
            <Button className="btn-medical flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Patient</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <Label htmlFor="name">Patient Name</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="disease">Disease/Condition</Label>
                <Input
                  id="disease"
                  value={newPatient.disease}
                  onChange={(e) => setNewPatient({...newPatient, disease: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={newPatient.bloodType} onValueChange={(value) => setNewPatient({...newPatient, bloodType: value})}>
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
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={newPatient.urgency} onValueChange={(value) => setNewPatient({...newPatient, urgency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="familyContact">Family Contact</Label>
                <Input
                  id="familyContact"
                  value={newPatient.familyContact}
                  onChange={(e) => setNewPatient({...newPatient, familyContact: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="familyEmail">Family Email</Label>
                <Input
                  id="familyEmail"
                  type="email"
                  value={newPatient.familyEmail}
                  onChange={(e) => setNewPatient({...newPatient, familyEmail: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full btn-medical">Add Patient</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="card-medical">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patients by name, disease, or blood type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="card-medical hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.disease}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getUrgencyColor(patient.urgency)}>
                    {patient.urgency}
                  </Badge>
                  <Badge className={getStatusColor(patient.status)}>
                    {patient.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{patient.bloodType}</div>
                  <p className="text-xs text-muted-foreground">Blood Type</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{patient.waitTime}</p>
                    <p className="text-xs text-muted-foreground">Wait Time</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{patient.dateAdded}</p>
                    <p className="text-xs text-muted-foreground">Date Added</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{patient.familyContact}</p>
                    <p className="text-xs text-muted-foreground">Family Contact</p>
                  </div>
                </div>
              </div>

              {patient.urgency === 'Critical' && (
                <div className="bg-emergency/10 border border-emergency/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-emergency" />
                    <span className="text-sm font-medium text-emergency">Critical Priority</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Requires immediate attention and donor matching</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  className="btn-medical"
                  onClick={() => handleFindMatches(patient)}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Find AI Best Match
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Family
                </Button>
                <Select onValueChange={(value) => handleUpdateStatus(patient.id, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fulfilled">Mark Fulfilled</SelectItem>
                    <SelectItem value="Unfulfilled">Mark Unfulfilled</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingPatient(patient)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HospitalPatients;