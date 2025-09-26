import { useState, useEffect } from 'react';
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
  User
} from 'lucide-react';

const mockRecipients = [
  { id: 1, name: 'Sarah Miller', bloodType: 'O-', condition: 'Leukemia', urgency: 'Critical', hospital: 'City General', waitTime: '45 days', status: 'Active' },
  { id: 2, name: 'Michael Chen', bloodType: 'A+', condition: 'Kidney Failure', urgency: 'High', hospital: 'Metro Medical', waitTime: '120 days', status: 'Active' },
  { id: 3, name: 'Emma Johnson', bloodType: 'B-', condition: 'Heart Surgery', urgency: 'Medium', hospital: 'Central Hospital', waitTime: '15 days', status: 'Scheduled' },
];

export default function Recipients() {
  const [recipients, setRecipients] = useState(mockRecipients);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipients = recipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'bg-emergency text-emergency-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-success text-success-foreground';
      case 'scheduled': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Heart className="h-8 w-8 text-emergency" />
            <span>Recipients & Patients</span>
          </h1>
          <p className="text-muted-foreground">Manage patients awaiting donations</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emergency">12</div>
            <p className="text-sm text-muted-foreground">Critical Cases</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">85</div>
            <p className="text-sm text-muted-foreground">Active Patients</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">23</div>
            <p className="text-sm text-muted-foreground">Matched Today</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">156</div>
            <p className="text-sm text-muted-foreground">Avg Wait (days)</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="card-medical">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patients by name, blood type, or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recipients List */}
      <div className="space-y-4">
        {filteredRecipients.map((recipient) => (
          <Card key={recipient.id} className="card-medical hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{recipient.name}</h3>
                    <p className="text-sm text-muted-foreground">{recipient.condition}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getUrgencyColor(recipient.urgency)}>
                    {recipient.urgency}
                  </Badge>
                  <Badge className={getStatusColor(recipient.status)}>
                    {recipient.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{recipient.bloodType}</div>
                  <p className="text-xs text-muted-foreground">Blood Type</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{recipient.hospital}</p>
                    <p className="text-xs text-muted-foreground">Hospital</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{recipient.waitTime}</p>
                    <p className="text-xs text-muted-foreground">Wait Time</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Jan 15, 2024</p>
                    <p className="text-xs text-muted-foreground">Added</p>
                  </div>
                </div>
              </div>

              {recipient.urgency === 'Critical' && (
                <div className="bg-emergency/10 border border-emergency/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-emergency" />
                    <span className="text-sm font-medium text-emergency">Critical Priority</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Requires immediate attention and donor matching</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Button size="sm" className="btn-medical flex-1">
                  Find Matches
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button size="sm" variant="outline">
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecipients.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}