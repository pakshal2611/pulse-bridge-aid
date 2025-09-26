import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Calendar, 
  Droplets,
  Heart,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const DonorActivity = () => {
  const [recentActivity] = useState([
    {
      id: 1,
      type: 'donation',
      action: 'Blood donation completed',
      location: 'City General Hospital',
      date: '2024-01-15',
      time: '10:30 AM',
      bloodType: 'O+',
      units: 1,
      status: 'Completed'
    },
    {
      id: 2,
      type: 'response',
      action: 'Responded to emergency alert',
      location: 'Metro Medical Center',
      date: '2024-01-12',
      time: '2:15 PM',
      bloodType: 'O+',
      status: 'Responded'
    },
    {
      id: 3,
      type: 'appointment',
      action: 'Donation appointment scheduled',
      location: 'Regional Blood Bank',
      date: '2024-01-10',
      time: '9:00 AM',
      bloodType: 'O+',
      status: 'Scheduled'
    },
    {
      id: 4,
      type: 'donation',
      action: 'Platelet donation completed',
      location: 'City General Hospital',
      date: '2024-01-08',
      time: '11:45 AM',
      bloodType: 'O+',
      units: 1,
      status: 'Completed'
    },
    {
      id: 5,
      type: 'alert',
      action: 'Emergency alert received',
      location: 'Downtown Medical',
      date: '2024-01-05',
      time: '3:20 PM',
      bloodType: 'O+',
      status: 'Declined'
    }
  ]);

  const [donationHistory] = useState([
    { month: 'Jul', donations: 1 },
    { month: 'Aug', donations: 0 },
    { month: 'Sep', donations: 1 },
    { month: 'Oct', donations: 2 },
    { month: 'Nov', donations: 1 },
    { month: 'Dec', donations: 1 },
    { month: 'Jan', donations: 2 }
  ]);

  const [upcomingAppointments] = useState([
    {
      id: 1,
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Blood Donation',
      location: 'City General Hospital',
      status: 'Confirmed'
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '2:00 PM',
      type: 'Health Checkup',
      location: 'Metro Medical Center',
      status: 'Pending'
    }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'donation': return <Droplets className="h-5 w-5 text-primary" />;
      case 'response': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'appointment': return <Calendar className="h-5 w-5 text-primary" />;
      case 'alert': return <Heart className="h-5 w-5 text-warning" />;
      default: return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'responded': return 'bg-primary text-primary-foreground';
      case 'scheduled': return 'bg-warning text-warning-foreground';
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'declined': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalDonations = recentActivity.filter(a => a.type === 'donation' && a.status === 'Completed').length;
  const responsesThisMonth = recentActivity.filter(a => a.type === 'response').length;
  const upcomingCount = upcomingAppointments.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Activity className="h-8 w-8 text-primary" />
            <span>Recent Activity</span>
          </h1>
          <p className="text-muted-foreground">Track your donation history and engagement</p>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalDonations}</div>
            <p className="text-sm text-muted-foreground">Recent Donations</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{responsesThisMonth}</div>
            <p className="text-sm text-muted-foreground">Alert Responses</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{upcomingCount}</div>
            <p className="text-sm text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">98%</div>
            <p className="text-sm text-muted-foreground">Reliability Score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Donation Trend */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Donation Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={donationHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">{appointment.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    <Badge className={getStatusColor(appointment.status)} size="sm">
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No upcoming appointments</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Timeline */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{activity.action}</p>
                    <Badge className={getStatusColor(activity.status)} size="sm">
                      {activity.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                    {activity.bloodType && (
                      <div className="flex items-center space-x-1">
                        <Droplets className="h-3 w-3" />
                        <span>{activity.bloodType}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Progress */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Achievement Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">Gold Donor</div>
              <p className="text-sm text-muted-foreground">10+ donations completed</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div className="bg-primary h-2 rounded-full w-full" />
              </div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <Heart className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-success">Life Saver</div>
              <p className="text-sm text-muted-foreground">Save 15 lives (12/15)</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div className="bg-success h-2 rounded-full w-4/5" />
              </div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <Activity className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-lg font-bold text-warning">Quick Responder</div>
              <p className="text-sm text-muted-foreground">Respond to 20 alerts (15/20)</p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div className="bg-warning h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonorActivity;