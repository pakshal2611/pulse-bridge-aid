import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartBar as BarChart3, TrendingUp, Download, Calendar, Droplets, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { bloodBankAPI } from '@/services/api';
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

const BloodBankReports = () => {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportType, setExportType] = useState('inventory');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportReport = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      await bloodBankAPI.exportReport(exportType, dateRange);
      toast({
        title: "Report Exported",
        description: `${exportType} report has been exported successfully`,
      });
      setShowExportDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export report",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };
  const stockUsageData = [
    { month: 'Jan', used: 120, received: 145 },
    { month: 'Feb', used: 145, received: 130 },
    { month: 'Mar', used: 165, received: 180 },
    { month: 'Apr', used: 140, received: 155 },
    { month: 'May', used: 180, received: 170 },
    { month: 'Jun', used: 195, received: 200 },
  ];

  const bloodTypeDistribution = [
    { name: 'O+', value: 38, color: '#0066CC' },
    { name: 'A+', value: 24, color: '#059669' },
    { name: 'B+', value: 18, color: '#EA580C' },
    { name: 'AB+', value: 8, color: '#DC2626' },
    { name: 'O-', value: 7, color: '#7C3AED' },
    { name: 'A-', value: 3, color: '#DB2777' },
    { name: 'B-', value: 1.5, color: '#059669' },
    { name: 'AB-', value: 0.5, color: '#0891B2' },
  ];

  const requestFulfillmentData = [
    { name: 'Fulfilled', value: 85, color: '#059669' },
    { name: 'Rejected', value: 10, color: '#DC2626' },
    { name: 'Pending', value: 5, color: '#EA580C' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span>Reports & Analytics</span>
          </h1>
          <p className="text-muted-foreground">Blood bank performance insights and trends</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button className="btn-medical">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Export Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exportType">Report Type</Label>
                  <Select value={exportType} onValueChange={setExportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inventory">Inventory Report</SelectItem>
                      <SelectItem value="requests">Requests Report</SelectItem>
                      <SelectItem value="donations">Donations Report</SelectItem>
                      <SelectItem value="performance">Performance Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleExportReport} 
                    className="flex-1 btn-medical"
                    disabled={isExporting}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Export Report'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">2,840</div>
                <p className="text-sm text-muted-foreground">Total Units Managed</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% vs last month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">156</div>
                <p className="text-sm text-muted-foreground">Requests Fulfilled</p>
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
              <XCircle className="h-8 w-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-destructive">18</div>
                <p className="text-sm text-muted-foreground">Requests Rejected</p>
                <div className="flex items-center text-xs text-destructive mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  -5% vs last month
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
                <div className="text-2xl font-bold text-primary">89%</div>
                <p className="text-sm text-muted-foreground">Fulfillment Rate</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3% improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Stock Usage Trends */}
        <Card className="card-medical">
          <CardHeader>
            <CardTitle>Stock Usage vs Received</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stockUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="received" 
                  stackId="1"
                  stroke="#059669" 
                  fill="#059669" 
                  fillOpacity={0.6}
                  name="Received"
                />
                <Area 
                  type="monotone" 
                  dataKey="used" 
                  stackId="2"
                  stroke="#0066CC" 
                  fill="#0066CC" 
                  fillOpacity={0.6}
                  name="Used"
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
                  data={bloodTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {bloodTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Request Fulfillment Analysis */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Request Fulfillment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={requestFulfillmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {requestFulfillmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Fulfillment Breakdown</h3>
              {requestFulfillmentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              <p className="text-sm font-medium">Stock Accuracy</p>
              <p className="text-xs text-muted-foreground">Inventory management</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-3xl font-bold text-success mb-2">2.5 hrs</div>
              <p className="text-sm font-medium">Avg Response Time</p>
              <p className="text-xs text-muted-foreground">Emergency requests</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-sm font-medium">Hospital Satisfaction</p>
              <p className="text-xs text-muted-foreground">Based on feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle>Recent Activity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2 hours ago', action: 'Fulfilled emergency request', type: 'O- Blood (5 units)', status: 'success' },
              { time: '4 hours ago', action: 'Stock replenishment', type: 'A+ Blood (20 units)', status: 'info' },
              { time: '6 hours ago', action: 'Request rejected', type: 'AB- Blood (insufficient stock)', status: 'warning' },
              { time: '8 hours ago', action: 'Inventory alert triggered', type: 'B- Blood below threshold', status: 'alert' },
              { time: '1 day ago', action: 'Monthly report generated', type: 'Performance analytics', status: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'warning' ? 'bg-warning' :
                    activity.status === 'alert' ? 'bg-emergency' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodBankReports;