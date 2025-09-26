import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/donors" element={<DonorManagement />} />
            <Route path="/recipients" element={<Recipients />} />
            <Route path="/ai-matching" element={<AIMatching />} />
            <Route path="/emergency" element={<EmergencySOS />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
