import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Siren, 
  MapPin, 
  Clock, 
  Droplets,
  Truck,
  Phone,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BloodBankEmergency = () => {
  const [emergencyAlerts, setEmergencyAlerts] = useState([
    {
      id: 1,
      hospital: 'City General Hospital',
      bloodType: 'O-',
      unitsNeeded: 8,
      urgency: 'Critical',
      distance: '2.5 km',
      timeRemaining: '30 min',
      availableStock: 18,
      status: 'Active',
      contactPerson: 'Dr. Emergency',
      phone: '+1234567890'
    },
    {
      id: 2,
      hospital: 'Metro Medical Center',
      bloodType: 'A+',
      unitsNeeded: 5,
      urgency: 'High',
      distance: '5.2 km',
      timeRemaining: '1 hour',
      availableStock: 45,
      status: 'Active',
      contactPerson: 'Dr. Johnson',
      phone: '+1234567891'
    },
    {
      id: 3,
      hospital: 'Regional Hospital',
      bloodType: 'B-',
      unitsNeeded: 3,
      urgency: 'Medium',
      distance: '8.1 km',
      timeRemaining: '2 hours',
      availableStock: 8,
      status: 'Responded',
      contactPerson: 'Dr. Davis',
      phone: '+1234567892'
    }
  ]);

  const { toast } = useToast();

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
      case 'active': return 'bg-warning text-warning-foreground';
      case 'responded': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleRespond = (alertId) => {
    setEmergencyAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'Responded' }
        : alert
    ));
    toast({
      title: "Response Sent",
      description: "Emergency response has been initiated and logistics coordinated",
    });
  };

  const handleCoordinateDelivery = (alert) => {
    toast({
      title: "Delivery Coordinated",
      description: `Delivery to ${alert.hospital} has been scheduled`,
    });
  };

  const activeAlerts = emergencyAlerts.filter(alert => alert.status === 'Active').length;
  const respondedAlerts = emergencyAlerts.filter(alert => alert.status === 'Responded').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Siren className="h-8 w-8 text-emergency animate-pulse" />
            <span>Emergency SOS</span>
          </h1>
          <p className="text-muted-foreground">Respond to emergency blood requests in your area</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-emergency">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emergency">{activeAlerts}</div>
            <p className="text-sm text-muted-foreground">Active Alerts</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{respondedAlerts}</div>
            <p className="text-sm text-muted-foreground">Responded</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground">Deliveries Today</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">95%</div>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Alerts */}
      <div className="space-y-4">
        {emergencyAlerts.map((alert) => (
          <Card key={alert.id} className={`hover:shadow-lg transition-shadow ${
            alert.urgency === 'Critical' ? 'card-emergency' : 'card-medical'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Siren className={`h-6 w-6 ${
                    alert.urgency === 'Critical' ? 'text-emergency animate-pulse' : 'text-primary'
                  }`} />
                  <div>
                    <h3 className="text-lg font-semibold">{alert.hospital}</h3>
                    <p className="text-sm text-muted-foreground">Emergency Blood Request</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getUrgencyColor(alert.urgency)}>
                    {alert.urgency}
                  </Badge>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{alert.bloodType}</div>
                  <p className="text-xs text-muted-foreground">Blood Type</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{alert.unitsNeeded} units</p>
                    <p className="text-xs text-muted-foreground">Needed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{alert.distance}</p>
                    <p className="text-xs text-muted-foreground">Distance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{alert.timeRemaining}</p>
                    <p className="text-xs text-muted-foreground">Time Left</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{alert.availableStock} units</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
              </div>

              {/* Stock Availability Check */}
              <div className={`p-3 rounded-lg mb-4 ${
                alert.availableStock >= alert.unitsNeeded 
                  ? 'bg-success/10 border border-success/20' 
                  : 'bg-warning/10 border border-warning/20'
              }`}>
                <div className="flex items-center space-x-2">
                  {alert.availableStock >= alert.unitsNeeded ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  <span className="text-sm font-medium">
                    {alert.availableStock >= alert.unitsNeeded 
                      ? 'Sufficient stock available' 
                      : 'Insufficient stock - partial fulfillment possible'
                    }
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {alert.status === 'Active' && (
                  <Button 
                    size="sm" 
                    className="btn-emergency"
                    onClick={() => handleRespond(alert.id)}
                    disabled={alert.availableStock === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Respond with Available Stock
                  </Button>
                )}
                {alert.status === 'Responded' && (
                  <Button 
                    size="sm" 
                    className="btn-medical"
                    onClick={() => handleCoordinateDelivery(alert)}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Coordinate Delivery
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Hospital
                </Button>
                <Button size="sm" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Location
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {emergencyAlerts.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Siren className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No emergency alerts in your area at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BloodBankEmergency;