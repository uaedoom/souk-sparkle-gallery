
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Traders from "./pages/Traders";
import Auth from "./pages/Auth";
import ProductDetail from "./pages/ProductDetail";
import TraderApplication from "./pages/TraderApplication";
import AdminTraderApplications from "./pages/AdminTraderApplications";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/AdminHome";
import AdminProducts from "./pages/AdminProducts";
import AdminMedia from "./pages/AdminMedia";
import AdminSettings from "./pages/AdminSettings";
import AdminTables from "./pages/AdminTables";
import NotFound from "./pages/NotFound";
import PrivateAdminRoute from "./components/admin/PrivateAdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/traders" element={<Traders />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/apply-as-trader" element={<TraderApplication />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={
              <PrivateAdminRoute>
                <AdminDashboard />
              </PrivateAdminRoute>
            }>
              <Route index element={<AdminHome />} />
              <Route path="trader-applications" element={<AdminTraderApplications />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="tables" element={<AdminTables />} />
            </Route>
            
            {/* Additional direct route for trader applications */}
            <Route path="/admin/trader-applications" element={
              <PrivateAdminRoute>
                <AdminTraderApplications />
              </PrivateAdminRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
