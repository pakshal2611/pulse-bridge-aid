import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDonorDashboard from "./pages/PatientDonorDashboard";
import DonorManagement from "./pages/DonorManagement";
import Recipients from "./pages/Recipients";
import AIMatching from "./pages/AIMatching";
import EmergencySOS from "./pages/EmergencySOS";
import Hospitals from "./pages/Hospitals";
import Logistics from "./pages/Logistics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Hospital Pages
import HospitalDonors from "./pages/hospital/HospitalDonors";
import HospitalPatients from "./pages/hospital/HospitalPatients";
import HospitalEmergency from "./pages/hospital/HospitalEmergency";
import HospitalProfile from "./pages/hospital/HospitalProfile";

// Blood Bank Pages
import BloodBankDashboard from "./pages/bloodbank/BloodBankDashboard";
import BloodBankInventory from "./pages/bloodbank/BloodBankInventory";
import BloodBankRequests from "./pages/bloodbank/BloodBankRequests";
import BloodBankEmergency from "./pages/bloodbank/BloodBankEmergency";
import BloodBankReports from "./pages/bloodbank/BloodBankReports";
import BloodBankProfile from "./pages/bloodbank/BloodBankProfile";

// Donor Pages
import DonorProfile from "./pages/donor/DonorProfile";
import DonorAlerts from "./pages/donor/DonorAlerts";
import DonorActivity from "./pages/donor/DonorActivity";

const queryClient = new QueryClient();

// Component to handle role-based dashboard routing
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Dashboard />;
  } else if (user?.role === 'hospital') {
    return <Dashboard />;
  } else if (user?.role === 'bloodbank') {
    return <BloodBankDashboard />;
  } else if (user?.role === 'donor') {
    return <PatientDonorDashboard />;
  } else {
    return <Dashboard />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardRouter />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardRouter />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/donors" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <DonorManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/recipients" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <Recipients />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/ai-matching" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <AIMatching />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/emergency" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <EmergencySOS />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/hospitals" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <Hospitals />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/logistics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <Logistics />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Hospital Routes */}
              <Route path="/hospital/donors" element={
                <ProtectedRoute allowedRoles={['hospital']}>
                  <Layout>
                    <HospitalDonors />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/hospital/patients" element={
                <ProtectedRoute allowedRoles={['hospital']}>
                  <Layout>
                    <HospitalPatients />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/hospital/emergency" element={
                <ProtectedRoute allowedRoles={['hospital']}>
                  <Layout>
                    <HospitalEmergency />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/hospital/profile" element={
                <ProtectedRoute allowedRoles={['hospital']}>
                  <Layout>
                    <HospitalProfile />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Blood Bank Routes */}
              <Route path="/bloodbank/dashboard" element={
                <ProtectedRoute allowedRoles={['bloodbank']}>
                  <Layout>
                    <BloodBankDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/bloodbank/inventory" element={
                <ProtectedRoute allowedRoles={['bloodbank']}>
                  <Layout>
                    <BloodBankInventory />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/bloodbank/requests" element={
                <ProtectedRoute allowedRoles={['bloodbank']}>
                  <Layout>
                    <BloodBankRequests />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/bloodbank/emergency" element={
                <ProtectedRoute allowedRoles={['bloodbank']}>
                  <Layout>
                    <BloodBankEmergency />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/bloodbank/reports" element={
                <ProtectedRoute allowedRoles={['bloodbank']}>
                  <Layout>
                    <BloodBankReports />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/bloodbank/profile" element={
                <ProtectedRoute allowedRoles={['bloodbank']}>
                  <Layout>
                    <BloodBankProfile />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Donor Routes */}
              <Route path="/donor/profile" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <Layout>
                    <DonorProfile />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/donor/alerts" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <Layout>
                    <DonorAlerts />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/donor/activity" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <Layout>
                    <DonorActivity />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;