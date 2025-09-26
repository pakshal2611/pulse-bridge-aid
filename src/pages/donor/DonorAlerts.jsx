import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Siren, MapPin, Clock, Droplets, Phone, CircleCheck as CheckCircle, Circle as XCircle, Navigation, TriangleAlert as AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DonorAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      hospital: 'City General Hospital',
      bloodType: 'O+',
      unitsNeeded: 3,
      urgency: 'Critical',
      distance: '2.5 km',
      timeRemaining: '45 min',
      status: 'Active',
      contactPerson: 'Dr. Emergency',
      phone: '+1234567890',
      message: 'Urgent need for O+ blood for emergency surgery. Patient in critical condition.',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 2,
      hospital: 'Metro Medical Center',
      bloodType: 'O+',
      unitsNeeded: 2,
      urgency: 'High',
      distance: '5.2 km',
      timeRemaining: '2 hours',
      status: 'Active',
      contactPerson: 'Dr. Johnson',
      phone: '+1234567891',
      message: 'Need O+ blood for scheduled surgery tomorrow morning.',
      timestamp: '2024-01-15 13:15'
    },
    {
      id: 3,
      hospital: 'Regional Hospital',
      bloodType: 'O+',
      unitsNeeded: 1,
      urgency: 'Medium',
      distance: '8.1 km',
      timeRemaining: '6 hours',
      status: 'Responded',
      contactPerson: 'Dr. Davis',
      phone: '+1234567892',
      message: 'Routine blood requirement for patient treatment.',
      timestamp: '2024-01-15 12:00'
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
      case 'declined': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleRespond = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'Responded' }
        : alert
    ));
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the hospital. They will contact you shortly.",
    });
  };

  const handleDecline = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'Declined' }
        : alert
    ));
    toast({
      title: "Alert Declined",
      description: "You have declined this donation request.",
    });
  };

  const handleGetDirections = (alert) => {
    toast({
      title: "Directions",
      description: `Opening directions to ${alert.hospital}`,
    });
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'Active').length;
  const respondedAlerts = alerts.filter(alert => alert.status === 'Responded').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Siren className="h-8 w-8 text-emergency animate-pulse" />
            <span>SOS Alerts</span>
          </h1>
          <p className="text-muted-foreground">Emergency blood donation requests in your area</p>
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
            <p className="text-sm text-muted-foreground">Total This Month</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">95%</div>
            <p className="text-sm text-muted-foreground">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
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
                    <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
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

              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm">{alert.message}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
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
              </div>

              {alert.urgency === 'Critical' && alert.status === 'Active' && (
                <div className="bg-emergency/10 border border-emergency/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-emergency animate-pulse" />
                    <span className="text-sm font-medium text-emergency">Critical Emergency</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This is a life-threatening emergency. Immediate response needed.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {alert.status === 'Active' && (
                  <>
                    <Button 
                      size="sm" 
                      className="btn-emergency"
                      onClick={() => handleRespond(alert.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      I Can Donate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDecline(alert.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Can't Donate
                    </Button>
                  </>
                )}
                {alert.status === 'Responded' && (
                  <Badge className="bg-success/10 text-success px-3 py-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Response Sent
                  </Badge>
                )}
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleGetDirections(alert)}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Hospital
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {alerts.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Siren className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No emergency alerts at the moment.</p>
            <p className="text-sm text-muted-foreground mt-2">
              You'll be notified when hospitals in your area need your blood type.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DonorAlerts;