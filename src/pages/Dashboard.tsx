import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardAPI } from '@/services/api';
import { 
  Users, 
  Heart, 
  Building2, 
  Siren, 
  Droplets, 
  TrendingUp,
  AlertTriangle,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const COLORS = ['#0066CC', '#DC2626', '#059669', '#EA580C'];

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [bloodInventory, setBloodInventory] = useState<any[]>([]);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, inventoryData, donationsData] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getBloodInventory(),
          dashboardAPI.getRecentDonations()
        ]);
        
        setStats(statsData);
        setBloodInventory(inventoryData);
        setRecentDonations(donationsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const urgencyData = [
    { name: 'Critical', value: 3, color: '#DC2626' },
    { name: 'High', value: 7, color: '#EA580C' },
    { name: 'Medium', value: 12, color: '#059669' },
    { name: 'Low', value: 8, color: '#0066CC' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of donation management system</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats?.totalDonors}</div>
            <p className="text-xs text-success flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Recipients</CardTitle>
            <Heart className="h-5 w-5 text-emergency" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emergency">{stats?.activeRecipients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting donations
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hospital Partners</CardTitle>
            <Building2 className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats?.hospitalPartners}</div>
            <p className="text-xs text-success flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 new this month
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card border-emergency/20 bg-gradient-to-br from-emergency/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Requests</CardTitle>
            <Siren className="h-5 w-5 text-emergency animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emergency">{stats?.emergencyRequests}</div>
            <p className="text-xs text-emergency flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Blood Inventory Chart */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-primary" />
              <span>Blood Inventory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bloodInventory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bloodType" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="units" 
                  fill="url(#gradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066CC" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0066CC" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Request Urgency Distribution */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Request Urgency</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={urgencyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {urgencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {urgencyData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Droplets className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{donation.donor}</p>
                    <p className="text-sm text-muted-foreground">{donation.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{donation.hospital}</p>
                  <p className="text-xs text-muted-foreground">{donation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}