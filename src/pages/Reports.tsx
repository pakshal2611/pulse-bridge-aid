import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Download,
  Calendar,
  Users,
  Droplets,
  Building2,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const monthlyDonations = [
  { month: 'Jan', donations: 120, recipients: 95 },
  { month: 'Feb', donations: 145, recipients: 110 },
  { month: 'Mar', donations: 165, recipients: 125 },
  { month: 'Apr', donations: 140, recipients: 105 },
  { month: 'May', donations: 180, recipients: 140 },
  { month: 'Jun', donations: 195, recipients: 155 },
];

const bloodTypeData = [
  { name: 'O+', value: 38, color: '#0066CC' },
  { name: 'A+', value: 24, color: '#059669' },
  { name: 'B+', value: 18, color: '#EA580C' },
  { name: 'AB+', value: 8, color: '#DC2626' },
  { name: 'O-', value: 7, color: '#7C3AED' },
  { name: 'A-', value: 3, color: '#DB2777' },
  { name: 'B-', value: 1.5, color: '#059669' },
  { name: 'AB-', value: 0.5, color: '#0891B2' },
];

const responseTimeData = [
  { time: '0-15 min', count: 45 },
  { time: '15-30 min', count: 65 },
  { time: '30-60 min', count: 85 },
  { time: '1-2 hours', count: 40 },
  { time: '2+ hours', count: 15 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span>Reports & Analytics</span>
          </h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="btn-medical">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-emergency" />
              <div>
                <div className="text-2xl font-bold text-emergency">2,840</div>
                <p className="text-sm text-muted-foreground">Blood Units</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% vs last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">32</div>
                <p className="text-sm text-muted-foreground">Partner Hospitals</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 new partners
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">23 min</div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  -15% improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Donations Trend */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Monthly Donations vs Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="donations" 
                  stackId="1"
                  stroke="#0066CC" 
                  fill="#0066CC" 
                  fillOpacity={0.6}
                  name="Donations"
                />
                <Area 
                  type="monotone" 
                  dataKey="recipients" 
                  stackId="2"
                  stroke="#059669" 
                  fill="#059669" 
                  fillOpacity={0.6}
                  name="Recipients"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Blood Type Distribution */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Blood Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bloodTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {bloodTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Analysis */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Emergency Response Time Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0066CC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
              <p className="text-sm font-medium">Success Rate</p>
              <p className="text-xs text-muted-foreground">Successful matches</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-3xl font-bold text-success mb-2">15 min</div>
              <p className="text-sm font-medium">Avg Match Time</p>
              <p className="text-xs text-muted-foreground">AI processing</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">94%</div>
              <p className="text-sm font-medium">Donor Satisfaction</p>
              <p className="text-xs text-muted-foreground">Based on feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Table */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2 min ago', action: 'Emergency request created', type: 'O- Blood', priority: 'Critical' },
              { time: '5 min ago', action: 'Donor match found', type: 'A+ Blood', priority: 'High' },
              { time: '12 min ago', action: 'Donation completed', type: 'B+ Blood', priority: 'Medium' },
              { time: '18 min ago', action: 'Hospital partner added', type: 'Regional Medical', priority: 'Low' },
              { time: '25 min ago', action: 'Route optimized', type: 'Logistics', priority: 'Medium' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.priority === 'Critical' ? 'bg-emergency/10 text-emergency' :
                    activity.priority === 'High' ? 'bg-warning/10 text-warning' :
                    activity.priority === 'Medium' ? 'bg-primary/10 text-primary' :
                    'bg-muted/50 text-muted-foreground'
                  }`}>
                    {activity.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}