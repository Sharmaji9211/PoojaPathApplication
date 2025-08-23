import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Booking from "@/pages/Booking";
import Cart from "@/pages/Cart";
import Poojas from "@/pages/Poojas";
import Kits from "@/pages/Kits";
import PanditRegister from "@/pages/PanditRegister";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/poojas" component={Poojas} />
        <Route path="/kits" component={Kits} />
        <Route path="/cart" component={Cart} />
        <Route path="/pandit-register" component={PanditRegister} />
        <Route path="/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/booking">
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        </Route>
        <Route component={NotFound} />
      </Switch>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-saffron-700 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.739 8.89 10L12 27l1.11-.259C18.16 26.73 22 22.55 22 17V7L12 2zm0 2.236L20 7.618v9.382c0 4.152-2.88 7.531-7 8.236V4.236z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">PoojaPath</span>
              </div>
              <p className="text-gray-400 text-sm">Connecting tradition with convenience through authentic spiritual services.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/poojas" className="hover:text-saffron-400 transition-colors">Puja Booking</a></li>
                <li><a href="/dashboard" className="hover:text-saffron-400 transition-colors">Pandit Services</a></li>
                <li><a href="/kits" className="hover:text-saffron-400 transition-colors">Puja Kits</a></li>
                <li><a href="#" className="hover:text-saffron-400 transition-colors">Home Delivery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-saffron-400 transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-saffron-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-saffron-400 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-saffron-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-saffron-600 transition-colors">
                  <span className="text-xs">f</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-saffron-600 transition-colors">
                  <span className="text-xs">t</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-saffron-600 transition-colors">
                  <span className="text-xs">i</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 PoojaPath. All rights reserved. Bringing spirituality to your doorstep.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Router />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
