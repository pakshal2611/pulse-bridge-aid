import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Award,
  Clock,
  Activity,
  Droplet,
  User
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from "@/contexts/AuthContext";

const PatientDonorDashboard = () => {
  const { user } = useAuth();
  const [donationHistory, setDonationHistory] = useState([
    { date: "Jan", donations: 2 },
    { date: "Feb", donations: 1 },
    { date: "Mar", donations: 3 },
    { date: "Apr", donations: 2 },
    { date: "May", donations: 1 },
    { date: "Jun", donations: 2 },
  ]);

  const upcomingAppointments = [
    { date: "2024-01-25", time: "10:00 AM", type: "Blood Donation", location: "City General Hospital" },
    { date: "2024-02-15", time: "2:00 PM", type: "Health Checkup", location: "Metro Medical Center" },
  ];

  const recentActivity = [
    { action: "Blood donation completed", date: "2024-01-15", status: "success" },
    { action: "Eligibility assessment passed", date: "2024-01-10", status: "success" },
    { action: "Health screening scheduled", date: "2024-01-05", status: "pending" },
  ];

  const healthMetrics = [
    { name: 'Hemoglobin', value: 85, max: 100, color: '#22c55e' },
    { name: 'Blood Pressure', value: 75, max: 100, color: '#3b82f6' },
    { name: 'Overall Health', value: 90, max: 100, color: '#8b5cf6' },
  ];

  const isDonor = user?.role === 'donor';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <User className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">
            {isDonor ? 'Donor Dashboard' : 'Patient Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! {isDonor ? 'Track your donation journey' : 'Monitor your health status'}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isDonor ? (
          <>
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">Total Donations</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">12</p>
                  </div>
                  <Droplet className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">Lives Saved</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">36</p>
                  </div>
                  <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Donor Level</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">Gold</p>
                  </div>
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Next Donation</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">15d</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Appointments</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">3</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">Health Score</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">85%</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">Priority Level</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">Medium</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Treatment Days</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">45</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation/Health History */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isDonor ? 'Donation History' : 'Health Metrics'}
            </CardTitle>
            <CardDescription>
              {isDonor ? 'Your donation activity over time' : 'Track your health progress'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isDonor ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={donationHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="donations" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="space-y-6">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{appointment.type}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {appointment.location}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <Badge variant={activity.status === 'success' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDonorDashboard;