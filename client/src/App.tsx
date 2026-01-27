import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import CaseLawPage from "@/pages/CaseLawPage";
import ServicePage from "@/pages/ServicePage";
import CommunityPage from "@/pages/CommunityPage";
import ContactPage from "@/pages/ContactPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminCaseForm from "@/pages/AdminCaseForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Team from "@/pages/Team";
import TeamMemberPage from "@/pages/TeamMemberPage";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');
  
  // Track page views when routes change
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}
      <main className={`flex-grow ${isAdminRoute ? 'bg-gray-50' : ''}`}>
        <Switch>
          {/* Public routes */}
          <Route path="/" component={HomePage} />
          <Route path="/cases" component={CaseLawPage} />
          <Route path="/cases/:slug" component={CaseLawPage} />
          <Route path="/services" component={ServicePage} />
          <Route path="/services/:slug" component={ServicePage} />
          <Route path="/community" component={CommunityPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/team" component={Team} />
          <Route path="/team/:id" component={TeamMemberPage} />
          
          {/* Admin routes */}
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/cases/new" component={AdminCaseForm} />
          <Route path="/admin/cases/edit/:id" component={AdminCaseForm} />
          
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router />
        <Toaster />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
