import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Minus, TriangleAlert as AlertTriangle, Droplets, CreditCard as Edit, Save, Bell, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BloodBankInventory = () => {
  const [inventory, setInventory] = useState([
    { bloodType: 'A+', units: 45, minThreshold: 20, status: 'Good' },
    { bloodType: 'A-', units: 12, minThreshold: 15, status: 'Low' },
    { bloodType: 'B+', units: 38, minThreshold: 20, status: 'Good' },
    { bloodType: 'B-', units: 8, minThreshold: 10, status: 'Critical' },
    { bloodType: 'AB+', units: 25, minThreshold: 15, status: 'Good' },
    { bloodType: 'AB-', units: 5, minThreshold: 8, status: 'Critical' },
    { bloodType: 'O+', units: 69, minThreshold: 30, status: 'Good' },
    { bloodType: 'O-', units: 18, minThreshold: 25, status: 'Low' }
  ]);

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [updateAmount, setUpdateAmount] = useState('');
  const [updateType, setUpdateType] = useState('add');
  const [alertThreshold, setAlertThreshold] = useState('');
  const { toast } = useToast();

  const [inventoryLog, setInventoryLog] = useState([
    { id: 1, bloodType: 'O+', action: 'Added', amount: 10, date: '2024-01-15 10:30', reason: 'New donation' },
    { id: 2, bloodType: 'A-', action: 'Removed', amount: 5, date: '2024-01-15 09:15', reason: 'Hospital request' },
    { id: 3, bloodType: 'B+', action: 'Added', amount: 8, date: '2024-01-14 16:45', reason: 'Blood drive' }
  ]);

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
      default: return <Droplets className="h-4 w-4" />;
    }
  };

  const handleUpdateInventory = () => {
    if (!selectedBloodType || !updateAmount) return;

    const amount = parseInt(updateAmount);
    setInventory(prev => prev.map(item => {
      if (item.bloodType === selectedBloodType.bloodType) {
        const newUnits = updateType === 'add' 
          ? item.units + amount 
          : Math.max(0, item.units - amount);
        
        const newStatus = newUnits <= item.minThreshold * 0.5 ? 'Critical' :
                         newUnits <= item.minThreshold ? 'Low' : 'Good';

        // Add to log
        const logEntry = {
          id: Date.now(),
          bloodType: item.bloodType,
          action: updateType === 'add' ? 'Added' : 'Removed',
          amount: amount,
          date: new Date().toLocaleString(),
          reason: updateType === 'add' ? 'Manual addition' : 'Manual removal'
        };
        setInventoryLog(prev => [logEntry, ...prev]);

        return { ...item, units: newUnits, status: newStatus };
      }
      return item;
    }));

    setShowUpdateDialog(false);
    setUpdateAmount('');
    setSelectedBloodType(null);
    
    toast({
      title: "Inventory Updated",
      description: `${updateType === 'add' ? 'Added' : 'Removed'} ${amount} units of ${selectedBloodType.bloodType}`,
    });
  };

  const handleSetAlert = () => {
    if (!selectedBloodType || !alertThreshold) return;

    const threshold = parseInt(alertThreshold);
    setInventory(prev => prev.map(item => {
      if (item.bloodType === selectedBloodType.bloodType) {
        return { ...item, minThreshold: threshold };
      }
      return item;
    }));

    setShowAlertDialog(false);
    setAlertThreshold('');
    setSelectedBloodType(null);
    
    toast({
      title: "Alert Threshold Set",
      description: `Alert will trigger when ${selectedBloodType.bloodType} drops below ${threshold} units`,
    });
  };

  const criticalItems = inventory.filter(item => item.status === 'Critical');
  const lowItems = inventory.filter(item => item.status === 'Low');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Package className="h-8 w-8 text-primary" />
            <span>Inventory Management</span>
          </h1>
          <p className="text-muted-foreground">Manage blood bank inventory and stock levels</p>
        </div>
      </div>

      {/* Alert Summary */}
      {(criticalItems.length > 0 || lowItems.length > 0) && (
        <Card className="card-emergency">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-emergency animate-pulse" />
              <span className="font-semibold text-emergency">Stock Alerts</span>
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

      {/* Inventory Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {inventory.map((item) => (
          <Card key={item.bloodType} className="card-medical hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-primary">{item.bloodType}</CardTitle>
                <Badge className={getStatusColor(item.status)}>
                  {getStatusIcon(item.status)}
                  <span className="ml-1">{item.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{item.units}</div>
                <p className="text-sm text-muted-foreground">Units Available</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
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
                <p className="text-xs text-muted-foreground">
                  Min threshold: {item.minThreshold} units
                </p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedBloodType(item);
                    setUpdateType('add');
                    setShowUpdateDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedBloodType(item);
                    setUpdateType('remove');
                    setShowUpdateDialog(true);
                  }}
                >
                  <Minus className="h-4 w-4 mr-1" />
                  Remove
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedBloodType(item);
                    setAlertThreshold(item.minThreshold.toString());
                    setShowAlertDialog(true);
                  }}
                >
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inventory Log */}
      <Card className="card-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Inventory Log</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventoryLog.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    log.action === 'Added' ? 'bg-success' : 'bg-warning'
                  }`} />
                  <div>
                    <p className="font-medium">
                      {log.action} {log.amount} units of {log.bloodType}
                    </p>
                    <p className="text-sm text-muted-foreground">{log.reason}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{log.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Update Inventory Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {updateType === 'add' ? 'Add Stock' : 'Remove Stock'} - {selectedBloodType?.bloodType}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Number of Units</Label>
              <Input
                id="amount"
                type="number"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(e.target.value)}
                placeholder="Enter number of units"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleUpdateInventory} className="flex-1 btn-medical">
                <Save className="h-4 w-4 mr-2" />
                {updateType === 'add' ? 'Add Stock' : 'Remove Stock'}
              </Button>
              <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set Alert Dialog */}
      <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Alert Threshold - {selectedBloodType?.bloodType}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="threshold">Minimum Units Threshold</Label>
              <Input
                id="threshold"
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                placeholder="Enter minimum units"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Alert will trigger when stock drops below this level
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSetAlert} className="flex-1 btn-medical">
                <Bell className="h-4 w-4 mr-2" />
                Set Alert
              </Button>
              <Button variant="outline" onClick={() => setShowAlertDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BloodBankInventory;