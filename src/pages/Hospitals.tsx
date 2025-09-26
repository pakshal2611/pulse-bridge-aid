import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone,
  Mail,
  Clock,
  Users,
  Activity,
  Droplets
} from 'lucide-react';

const mockHospitals = [
  { 
    id: 1, 
    name: 'City General Hospital', 
    type: 'Hospital', 
    location: 'New York, NY', 
    phone: '+1 (555) 123-4567',
    email: 'admin@citygeneral.com',
    status: 'Active',
    capacity: 450,
    currentOccupancy: 380,
    bloodBank: true,
    emergencyServices: true,
    lastActivity: '5 min ago'
  },
  { 
    id: 2, 
    name: 'Metro Blood Bank', 
    type: 'Blood Bank', 
    location: 'Los Angeles, CA', 
    phone: '+1 (555) 234-5678',
    email: 'contact@metroblood.org',
    status: 'Active',
    capacity: 200,
    currentOccupancy: 150,
    bloodBank: true,
    emergencyServices: false,
    lastActivity: '12 min ago'
  },
  { 
    id: 3, 
    name: 'Regional Medical Center', 
    type: 'Hospital', 
    location: 'Chicago, IL', 
    phone: '+1 (555) 345-6789',
    email: 'info@regionalmed.com',
    status: 'Busy',
    capacity: 600,
    currentOccupancy: 580,
    bloodBank: true,
    emergencyServices: true,
    lastActivity: '1 min ago'
  },
];

export default function Hospitals() {
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'offline': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return 'text-emergency';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-primary" />
            <span>Hospitals & Blood Banks</span>
          </h1>
          <p className="text-muted-foreground">Manage healthcare facility partnerships</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">32</div>
            <p className="text-sm text-muted-foreground">Total Partners</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">28</div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">4</div>
            <p className="text-sm text-muted-foreground">High Capacity</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">18</div>
            <p className="text-sm text-muted-foreground">With Blood Banks</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="card-medical">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search hospitals by name, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hospitals List */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="card-medical hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{hospital.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{hospital.type}</Badge>
                    <Badge className={getStatusColor(hospital.status)}>
                      {hospital.status}
                    </Badge>
                  </div>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.email}</span>
                </div>
              </div>

              {/* Capacity Info */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Capacity</span>
                  <span className={`text-sm font-medium ${getOccupancyColor(hospital.currentOccupancy, hospital.capacity)}`}>
                    {hospital.currentOccupancy}/{hospital.capacity}
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${(hospital.currentOccupancy / hospital.capacity) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((hospital.currentOccupancy / hospital.capacity) * 100)}% occupied
                </p>
              </div>

              {/* Services */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Droplets className={`h-4 w-4 ${hospital.bloodBank ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={hospital.bloodBank ? 'text-foreground' : 'text-muted-foreground'}>
                    Blood Bank
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className={`h-4 w-4 ${hospital.emergencyServices ? 'text-emergency' : 'text-muted-foreground'}`} />
                  <span className={hospital.emergencyServices ? 'text-foreground' : 'text-muted-foreground'}>
                    Emergency
                  </span>
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last activity: {hospital.lastActivity}</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="btn-medical flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-4 w-4 mr-1" />
                  Staff
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hospitals found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}