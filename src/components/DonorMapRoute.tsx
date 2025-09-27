import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Car, 
  Building2, 
  Droplets,
  Phone,
  CheckCircle
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { indiaDonationCenters } from '@/services/api';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mockLocations = {
  donor: { lat: 28.6139, lng: 77.2090, name: 'Your Location', address: 'New Delhi, India' },
  hospitals: indiaDonationCenters
};

interface DonorMapRouteProps {
  donorBloodType?: string;
}

export default function DonorMapRoute({ donorBloodType = 'O+' }: DonorMapRouteProps) {
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);

  useEffect(() => {
    // Auto-select the closest hospital with matching blood type need
    const matchingHospital = mockLocations.hospitals.find(h => h.needsBloodType === donorBloodType) || mockLocations.hospitals[0];
    setSelectedHospital(matchingHospital);
  }, [donorBloodType]);

  useEffect(() => {
    if (selectedHospital) {
      // Simple route simulation (in real app, use routing API)
      const route: [number, number][] = [
        [mockLocations.donor.lat, mockLocations.donor.lng],
        [selectedHospital.lat, selectedHospital.lng]
      ];
      setRouteCoordinates(route);
    }
  }, [selectedHospital]);

  const getUrgencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleAcceptDonation = (hospital: any) => {
    const message = `Hello! I'm interested in donating blood at ${hospital.name}. My blood type is ${donorBloodType}. Please provide directions and available time slots.`;
    const whatsappUrl = `https://wa.me/${hospital.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactHospital = (hospital: any) => {
    const message = `Hello! I would like to know more about blood donation at ${hospital.name}. My blood type is ${donorBloodType}.`;
    const whatsappUrl = `https://wa.me/${hospital.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Find Nearest Donation Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2 h-96 rounded-lg overflow-hidden border">
              <MapContainer
                center={[mockLocations.donor.lat, mockLocations.donor.lng]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Donor Location */}
                <Marker position={[mockLocations.donor.lat, mockLocations.donor.lng]}>
                  <Popup>
                    <div className="text-center">
                      <strong>{mockLocations.donor.name}</strong>
                      <p className="text-sm">{mockLocations.donor.address}</p>
                      <Badge className="mt-1">Blood Type: {donorBloodType}</Badge>
                    </div>
                  </Popup>
                </Marker>

                {/* Hospital Locations */}
                {mockLocations.hospitals.map((hospital) => (
                  <Marker 
                    key={hospital.id} 
                    position={[hospital.lat, hospital.lng]}
                  >
                    <Popup>
                      <div className="space-y-2 min-w-48">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <strong className="text-sm">{hospital.name}</strong>
                        </div>
                        <p className="text-xs text-gray-600">{hospital.address}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {hospital.distance}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {hospital.duration}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="h-3 w-3" />
                          <span className="text-xs">Needs: {hospital.needsBloodType}</span>
                        </div>
                        <Badge className={`text-xs ${getUrgencyColor(hospital.urgencyLevel)}`}>
                          {hospital.urgencyLevel} Priority
                        </Badge>
                        <Button 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => setSelectedHospital(hospital)}
                        >
                          Select Route
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Route Line */}
                {routeCoordinates.length > 0 && (
                  <Polyline 
                    positions={routeCoordinates} 
                    color="hsl(var(--primary))" 
                    weight={4}
                    opacity={0.7}
                  />
                )}
              </MapContainer>
            </div>

            {/* Hospital Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Donation Centers Near You</h3>
              <div className="space-y-3">
                {mockLocations.hospitals.map((hospital) => (
                  <Card 
                    key={hospital.id}
                    className={`cursor-pointer transition-all ${
                      selectedHospital?.id === hospital.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm">{hospital.name}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {hospital.address}
                          </p>
                        </div>
                        {hospital.bloodBank && (
                          <Droplets className="h-4 w-4 text-red-500" />
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Car className="h-3 w-3 mr-1" />
                          {hospital.distance}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {hospital.duration}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Needs Blood Type:</span>
                          <Badge 
                            className={`text-xs ${
                              hospital.needsBloodType === donorBloodType 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-500 text-white'
                            }`}
                          >
                            {hospital.needsBloodType}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Priority:</span>
                          <Badge className={`text-xs ${getUrgencyColor(hospital.urgencyLevel)}`}>
                            {hospital.urgencyLevel}
                          </Badge>
                        </div>
                      </div>

                      {hospital.needsBloodType === donorBloodType && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-700">
                          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Perfect Match!</span>
                          </div>
                        </div>
                      )}

                      {selectedHospital?.id === hospital.id && (
                        <div className="space-y-2 pt-2 border-t">
                          <Button 
                            size="sm" 
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
                            onClick={() => handleAcceptDonation(hospital)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept Donation Request
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleContactHospital(hospital)}
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Contact Hospital
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}