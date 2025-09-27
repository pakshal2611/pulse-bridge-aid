import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Clock, CircleCheck as CheckCircle, Circle as XCircle, Building2, Calendar, Droplets, Filter, MessageSquare, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { bloodBankAPI, whatsappAPI } from '@/services/api';

const BloodBankRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await bloodBankAPI.getRequests();
      setRequests(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleContactHospital = async (request) => {
    setSelectedRequest(request);
    setShowContactDialog(true);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
  };

  const handleSendMessage = async () => {
    if (!contactMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    try {
      await bloodBankAPI.contactHospital(selectedRequest.id, contactMessage);
      await whatsappAPI.sendMessage(selectedRequest.phone, contactMessage);
      
      toast({
        title: "Message Sent",
        description: `Message sent to ${selectedRequest.hospital} via WhatsApp`,
      });
      
      setContactMessage('');
      setShowContactDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const approvedRequests = requests.filter(r => r.status === 'Approved').length;
  const rejectedRequests = requests.filter(r => r.status === 'Rejected').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContactHospital(request)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Hospital
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewDetails(request)}
                >
                  <Eye className="h-4 w-4 mr-2" />
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

      {/* Contact Hospital Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Contact {selectedRequest?.hospital}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hospitalMessage">Message to send via WhatsApp</Label>
              <Textarea
                id="hospitalMessage"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleSendMessage} 
                className="flex-1 btn-medical"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Send via WhatsApp
              </Button>
              <Button variant="outline" onClick={() => setShowContactDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <span>Request Details - {selectedRequest?.hospital}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Hospital</Label>
                  <p className="text-sm">{selectedRequest.hospital}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Blood Type</Label>
                  <p className="text-sm font-bold text-primary">{selectedRequest.bloodType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Units Requested</Label>
                  <p className="text-sm">{selectedRequest.unitsRequested}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Urgency</Label>
                  <Badge className={getUrgencyColor(selectedRequest.urgency)}>
                    {selectedRequest.urgency}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Request Date</Label>
                  <p className="text-sm">{selectedRequest.requestDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Reason</Label>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Contact Person</Label>
                <p className="text-sm">{selectedRequest.contactPerson}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                <p className="text-sm">{selectedRequest.phone}</p>
              </div>
              
              {selectedRequest.rejectionReason && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">
                    <strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}
                  </p>
                </div>
              )}
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  onClick={() => handleContactHospital(selectedRequest)}
                  className="flex-1 btn-medical"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Hospital
                </Button>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BloodBankRequests;