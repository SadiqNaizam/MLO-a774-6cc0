import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import HomepageSearchHub from "./pages/HomepageSearchHub";
import SearchResultsPage from "./pages/SearchResultsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import BookingProcessPage from "./pages/BookingProcessPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* Default shadcn toaster */}
      <SonnerToaster richColors position="top-right" /> {/* Sonner toaster */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomepageSearchHub />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/item-detail/:itemId" element={<ItemDetailPage />} /> {/* Dynamic route for item ID */}
          <Route path="/booking" element={<BookingProcessPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          
          {/* Other pre-existing routes if any should be above NotFound */}
          
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;