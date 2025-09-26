import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Building2,
  Calendar,
  Droplets,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BloodBankRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      hospital: 'City General Hospital',
      bloodType: 'O-',
      unitsRequested: 5,
      urgency: 'Critical',
      requestDate: '2024-01-15',
      status: 'Pending',
      reason: 'Emergency surgery',
      contactPerson: 'Dr. Smith',
      phone: '+1234567890'
    },
    {
      id: 2,
      hospital: 'Metro Medical Center',
      bloodType: 'A+',
      unitsRequested: 3,
      urgency: 'High',
      requestDate: '2024-01-15',
      status: 'Pending',
      reason: 'Scheduled surgery',
      contactPerson: 'Dr. Johnson',
      phone: '+1234567891'
    },
    {
      id: 3,
      hospital: 'Regional Hospital',
      bloodType: 'B+',
      unitsRequested: 2,
      urgency: 'Medium',
      requestDate: '2024-01-14',
      status: 'Approved',
      reason: 'Patient treatment',
      contactPerson: 'Dr. Davis',
      phone: '+1234567892'
    },
    {
      id: 4,
      hospital: 'Central Medical',
      bloodType: 'AB-',
      unitsRequested: 8,
      urgency: 'Low',
      requestDate: '2024-01-14',
      status: 'Rejected',
      reason: 'Routine procedure',
      contactPerson: 'Dr. Wilson',
      phone: '+1234567893',
      rejectionReason: 'Insufficient stock'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const filteredRequests = requests.filter(request => 
    filterStatus === 'all' || request.status.toLowerCase() === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'critical': return 'bg-emergency text-emergency-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleApproveRequest = (requestId) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, status: 'Approved' }
        : request
    ));
    toast({
      title: "Request Approved",
      description: "Blood request has been approved and hospital has been notified",
    });
  };

  const handleRejectRequest = (requestId) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, status: 'Rejected', rejectionReason: 'Insufficient stock' }
        : request
    ));
    toast({
      title: "Request Rejected",
      description: "Blood request has been rejected and hospital has been notified",
    });
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const approvedRequests = requests.filter(r => r.status === 'Approved').length;
  const rejectedRequests = requests.filter(r => r.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary" />
            <span>Blood Requests</span>
          </h1>
          <p className="text-muted-foreground">Manage incoming blood requests from hospitals</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{pendingRequests}</div>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{approvedRequests}</div>
            <p className="text-sm text-muted-foreground">Approved Today</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{rejectedRequests}</div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{requests.length}</div>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="card-medical hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{request.hospital}</h3>
                    <p className="text-sm text-muted-foreground">{request.reason}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency}
                  </Badge>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{request.bloodType}</div>
                  <p className="text-xs text-muted-foreground">Blood Type</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{request.unitsRequested} units</p>
                    <p className="text-xs text-muted-foreground">Requested</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{request.requestDate}</p>
                    <p className="text-xs text-muted-foreground">Request Date</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{request.contactPerson}</p>
                    <p className="text-xs text-muted-foreground">{request.phone}</p>
                  </div>
                </div>
              </div>

              {request.status === 'Rejected' && request.rejectionReason && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-destructive">
                    <strong>Rejection Reason:</strong> {request.rejectionReason}
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                {request.status === 'Pending' && (
                  <>
                    <Button 
                      size="sm" 
                      className="btn-medical"
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Request
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Request
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  Contact Hospital
                </Button>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="card-medical">
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No requests found matching your filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BloodBankRequests;