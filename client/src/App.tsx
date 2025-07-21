import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CategoryPage from "@/pages/categories";
import DeveloperPage from "@/pages/developer";
import DiscoverPage from "@/pages/discover";
import PremiumPage from "@/pages/premium";
import CommunityPage from "@/pages/community";
import { NexusBot } from "@/components/NexusBot";
import { ModernNavigation } from "@/components/ModernNavigation";

function Router() {
  return (
    <>
      <ModernNavigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/premium" component={PremiumPage} />
        <Route path="/community" component={CommunityPage} />
        <Route path="/category/:category" component={CategoryPage} />
        <Route path="/developer/:developer" component={DeveloperPage} />
        <Route component={NotFound} />
      </Switch>
      <NexusBot />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
