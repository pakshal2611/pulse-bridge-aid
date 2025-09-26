import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

// Component to handle role-based dashboard routing
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Dashboard />;
  } else if (user?.role === 'doctor') {
    return <DoctorDashboard />;
  } else {
    return <PatientDonorDashboard />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/donors" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                <Layout>
                  <DonorManagement />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/recipients" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                <Layout>
                  <Recipients />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/ai-matching" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                <Layout>
                  <AIMatching />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/emergency" element={
              <ProtectedRoute>
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
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
