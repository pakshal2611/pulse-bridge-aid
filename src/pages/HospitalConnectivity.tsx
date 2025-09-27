import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone,
  Mail,
  Activity,
  Droplets,
  Share2,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  ArrowRightLeft,
  Plus
} from 'lucide-react';

const mockConnections = [
  { 
    id: 1, 
    from: 'City General Hospital',
    to: 'Metro Blood Bank',
    type: 'Blood Supply Partnership',
    status: 'Active',
    established: '2023-06-15',
    lastActivity: '2 min ago',
    requestsShared: 45,
    responseTime: '12 min',
    location1: 'New York, NY',
    location2: 'Brooklyn, NY',
    distance: '15 km'
  },
  { 
    id: 2, 
    from: 'Regional Medical Center',
    to: 'City General Hospital',
    type: 'Emergency Support',
    status: 'Active',
    established: '2023-08-20',
    lastActivity: '5 min ago',
    requestsShared: 23,
    responseTime: '8 min',
    location1: 'Chicago, IL',
    location2: 'New York, NY',
    distance: '790 km'
  },
  { 
    id: 3, 
    from: 'St. Mary\'s Hospital',
    to: 'Regional Medical Center',
    type: 'Resource Sharing',
    status: 'Pending Setup',
    established: '2024-01-10',
    lastActivity: '1 hour ago',
    requestsShared: 0,
    responseTime: 'N/A',
    location1: 'Boston, MA',
    location2: 'Chicago, IL',
    distance: '1600 km'
  },
];

const mockAvailableHospitals = [
  { id: 4, name: 'University Medical Center', location: 'Los Angeles, CA', type: 'Hospital' },
  { id: 5, name: 'Central Blood Bank', location: 'Dallas, TX', type: 'Blood Bank' },
  { id: 6, name: 'Memorial Healthcare', location: 'Miami, FL', type: 'Hospital' },
];

export default function HospitalConnectivity() {
  const [connections, setConnections] = useState(mockConnections);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConnections = connections.filter(conn =>
    conn.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conn.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conn.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending setup': return 'bg-warning text-warning-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <ArrowRightLeft className="h-8 w-8 text-primary" />
            <span>Hospital Connectivity Network</span>
          </h1>
          <p className="text-muted-foreground">Manage inter-hospital partnerships and resource sharing</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Connection
        </Button>
      </div>

      {/* Network Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">24</div>
            <p className="text-sm text-blue-600 dark:text-blue-400">Active Connections</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">156</div>
            <p className="text-sm text-green-600 dark:text-green-400">Requests Shared Today</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">8.5 min</div>
            <p className="text-sm text-purple-600 dark:text-purple-400">Avg Response Time</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">95%</div>
            <p className="text-sm text-orange-600 dark:text-orange-400">Network Uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search connections by hospital name, partnership type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Connections */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {filteredConnections.map((connection) => (
          <Card key={connection.id} className="hover:shadow-lg transition-all border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{connection.from}</span>
                  </div>
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-secondary" />
                    <span className="font-semibold">{connection.to}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(connection.status)}>
                  {connection.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span>{connection.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{connection.distance}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Connection Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold text-primary">{connection.requestsShared}</div>
                  <p className="text-xs text-muted-foreground">Requests Shared</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold text-green-600">{connection.responseTime}</div>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold text-blue-600">{connection.established}</div>
                  <p className="text-xs text-muted-foreground">Established</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold text-purple-600">{connection.lastActivity}</div>
                  <p className="text-xs text-muted-foreground">Last Activity</p>
                </div>
              </div>

              {/* Locations */}
              <div className="bg-background/80 rounded-lg p-4 border">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{connection.location1}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span className="text-sm">{connection.location2}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Send Request
                </Button>
                <Button size="sm" variant="outline">
                  <Activity className="h-4 w-4 mr-1" />
                  View Activity
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-4 w-4 mr-1" />
                  Manage Access
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  Emergency Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Hospitals for New Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Available Hospitals for Partnership
          </CardTitle>
          <CardDescription>Discover new hospitals and blood banks to connect with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockAvailableHospitals.map((hospital) => (
              <Card key={hospital.id} className="border-dashed border-2 hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <Building2 className="h-8 w-8 text-primary mx-auto" />
                    <h3 className="font-semibold">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {hospital.location}
                    </p>
                    <Badge variant="outline">{hospital.type}</Badge>
                    <Button size="sm" className="w-full mt-2">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredConnections.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No connections found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}