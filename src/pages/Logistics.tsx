import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Route, 
  MapPin, 
  Clock,
  Truck,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Timer,
  Thermometer
} from 'lucide-react';

const mockRoutes = [
  { 
    id: 1, 
    from: 'City Blood Bank', 
    to: 'Metro Hospital', 
    distance: '15.2 km',
    estimatedTime: '22 min',
    priority: 'Critical',
    cargo: 'O- Blood (4 units)',
    status: 'In Transit',
    driver: 'John Smith',
    temperature: '4°C',
    departure: '2:30 PM',
    arrival: '2:52 PM'
  },
  { 
    id: 2, 
    from: 'Regional Medical', 
    to: 'Central Hospital', 
    distance: '8.7 km',
    estimatedTime: '15 min',
    priority: 'High',
    cargo: 'Platelets (2 units)',
    status: 'Scheduled',
    driver: 'Sarah Johnson',
    temperature: '22°C',
    departure: '3:00 PM',
    arrival: '3:15 PM'
  },
  { 
    id: 3, 
    from: 'Downtown Clinic', 
    to: 'University Hospital', 
    distance: '12.1 km',
    estimatedTime: '18 min',
    priority: 'Medium',
    cargo: 'A+ Blood (3 units)',
    status: 'Completed',
    driver: 'Mike Davis',
    temperature: '3°C',
    departure: '1:45 PM',
    arrival: '2:03 PM'
  },
];

export default function Logistics() {
  const [routes, setRoutes] = useState(mockRoutes);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-emergency text-emergency-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit': return 'bg-primary text-primary-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'delayed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in transit': return <Truck className="h-4 w-4" />;
      case 'scheduled': return <Timer className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Route className="h-8 w-8 text-primary" />
            <span>Logistics & Routing</span>
          </h1>
          <p className="text-muted-foreground">Manage transportation and delivery routes</p>
        </div>
        <Button className="btn-medical">
          <Route className="h-4 w-4 mr-2" />
          Plan New Route
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">8</div>
            <p className="text-sm text-muted-foreground">Active Routes</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">23</div>
            <p className="text-sm text-muted-foreground">Completed Today</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">2</div>
            <p className="text-sm text-muted-foreground">Delayed</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">12.5</div>
            <p className="text-sm text-muted-foreground">Avg Time (min)</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Optimization */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-primary" />
            <span>AI Route Optimization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">23%</div>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">18%</div>
              <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">95%</div>
              <p className="text-sm text-muted-foreground">On-Time Delivery</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Routes */}
      <div className="space-y-4">
        {routes.map((route) => (
          <Card key={route.id} className="card-medical hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {getStatusIcon(route.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold">Route #{route.id}</h3>
                    <p className="text-sm text-muted-foreground">{route.cargo}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(route.priority)}>
                    {route.priority}
                  </Badge>
                  <Badge className={getStatusColor(route.status)}>
                    {route.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-success" />
                    <span className="text-sm">
                      <strong>From:</strong> {route.from}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-emergency" />
                    <span className="text-sm">
                      <strong>To:</strong> {route.to}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Route className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{route.distance} • {route.estimatedTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Driver:</strong> {route.driver}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Temperature:</strong> {route.temperature}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{route.departure} → {route.arrival}</span>
                  </div>
                </div>
              </div>

              {route.status === 'In Transit' && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-sm font-medium text-primary">En Route</span>
                    </div>
                    <div className="text-sm text-muted-foreground">ETA: {route.arrival}</div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all w-3/4" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">75% complete</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button size="sm" className="btn-medical flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  Track Route
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Contact Driver
                </Button>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                {route.status === 'Scheduled' && (
                  <Button size="sm" variant="outline">
                    Optimize Route
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Live Route Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/20 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-muted">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map with live tracking</p>
              <p className="text-sm text-muted-foreground">Shows real-time vehicle locations and routes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}