import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  AlertTriangle, 
  Calendar, 
  Activity,
  Clock,
  UserCheck,
  Stethoscope
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dashboardAPI, emergencyAPI } from "@/services/api";

const DoctorDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [emergencyRequests, setEmergencyRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, emergencyData] = await Promise.all([
          dashboardAPI.getStats(),
          emergencyAPI.getEmergencyRequests()
        ]);
        setStats(statsData);
        setEmergencyRequests(emergencyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const patientData = [
    { name: 'Critical', value: 12, color: '#ef4444' },
    { name: 'Stable', value: 45, color: '#22c55e' },
    { name: 'Monitoring', value: 23, color: '#f59e0b' },
  ];

  const todayAppointments = [
    { time: "09:00", patient: "John Smith", type: "Blood Test Review", status: "upcoming" },
    { time: "10:30", patient: "Sarah Johnson", type: "Donation Consultation", status: "completed" },
    { time: "14:00", patient: "Mike Davis", type: "Emergency Assessment", status: "upcoming" },
    { time: "15:30", patient: "Emily Brown", type: "Follow-up", status: "upcoming" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Stethoscope className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Medical overview and patient management</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Today's Patients</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">24</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Approved Donors</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">15</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">Emergency Cases</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{emergencyRequests.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Active Surgeries</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">3</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Status Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Patient Status</CardTitle>
            <CardDescription>Current patient distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={patientData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {patientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {patientData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <Badge variant={appointment.status === 'completed' ? 'default' : 'secondary'}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Emergency Requests
          </CardTitle>
          <CardDescription>Urgent cases requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10">
                <div className="flex items-center gap-4">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">{request.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.bloodType} • {request.hospital}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">{request.urgency}</Badge>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {request.timeLeft}
                  </span>
                  <Button size="sm" variant="destructive">
                    Review Case
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;