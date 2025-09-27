import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Droplets, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  Activity,
  Users,
  FileText,
  Bell
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { bloodBankAPI } from '@/services/api';

const BloodBankDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [stats, inventoryData] = await Promise.all([
        bloodBankAPI.getDashboardStats(),
        bloodBankAPI.getInventory()
      ]);
      
      setDashboardStats(stats);
      setInventory(inventoryData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'good': return 'bg-success text-success-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-emergency text-emergency-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'critical': return <AlertTriangle className="h-4 w-4 animate-pulse" />;
      case 'low': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const criticalItems = inventory.filter(item => item.status === 'Critical');
  const lowItems = inventory.filter(item => item.status === 'Low');

  if (loading) {
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
            <Droplets className="h-8 w-8 text-primary" />
            <span>Blood Bank Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Real-time overview of blood bank operations</p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Alert Summary */}
      {(criticalItems.length > 0 || lowItems.length > 0) && (
        <Card className="card-emergency">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Bell className="h-5 w-5 text-emergency animate-pulse" />
              <span className="font-semibold text-emergency">Inventory Alerts</span>
            </div>
            <div className="text-sm">
              {criticalItems.length > 0 && (
                <p className="text-emergency">
                  Critical: {criticalItems.map(item => item.bloodType).join(', ')}
                </p>
              )}
              {lowItems.length > 0 && (
                <p className="text-warning">
                  Low Stock: {lowItems.map(item => item.bloodType).join(', ')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats?.totalUnits || 0}
                </div>
                <p className="text-sm text-muted-foreground">Total Units</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% vs last week
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
                <div className="text-2xl font-bold text-success">
                  {dashboardStats?.fulfillmentRate || 0}%
                </div>
                <p className="text-sm text-muted-foreground">Fulfillment Rate</p>
                <div className="flex items-center text-xs text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2% improvement
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats?.requestsToday || 0}
                </div>
                <p className="text-sm text-muted-foreground">Requests Today</p>
                <div className="flex items-center text-xs text-primary mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Last 24 hours
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">
                  {dashboardStats?.criticalItems || 0}
                </div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <div className="flex items-center text-xs text-warning mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Requires attention
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Overview */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Current Inventory Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {inventory.map((item) => (
              <Card key={item.bloodType} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-primary">{item.bloodType}</div>
                  <Badge className={getStatusColor(item.status)}>
                    {getStatusIcon(item.status)}
                    <span className="ml-1">{item.status}</span>
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{item.units}</div>
                  <p className="text-sm text-muted-foreground">Units Available</p>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Stock Level</span>
                    <span>{Math.round((item.units / (item.minThreshold * 2)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        item.status === 'Critical' ? 'bg-emergency' :
                        item.status === 'Low' ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${Math.min(100, (item.units / (item.minThreshold * 2)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Min threshold: {item.minThreshold} units
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { 
                action: 'Emergency request fulfilled', 
                details: 'O- Blood (3 units) to City General Hospital',
                time: '15 minutes ago', 
                type: 'emergency' 
              },
              { 
                action: 'Stock replenishment', 
                details: 'A+ Blood (25 units) added to inventory',
                time: '2 hours ago', 
                type: 'stock' 
              },
              { 
                action: 'Low stock alert', 
                details: 'B- Blood below minimum threshold',
                time: '4 hours ago', 
                type: 'alert' 
              },
              { 
                action: 'Hospital request approved', 
                details: 'AB+ Blood (2 units) to Metro Medical',
                time: '6 hours ago', 
                type: 'request' 
              },
              { 
                action: 'Inventory audit completed', 
                details: 'Monthly quality check passed',
                time: '1 day ago', 
                type: 'audit' 
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'emergency' ? 'bg-emergency' :
                    activity.type === 'stock' ? 'bg-success' :
                    activity.type === 'alert' ? 'bg-warning' :
                    activity.type === 'request' ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
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

export default BloodBankDashboard;
