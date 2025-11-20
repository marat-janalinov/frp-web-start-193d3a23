import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VariantSelector from "./pages/VariantSelector";
import IndexVariant1 from "./pages/IndexVariant1";
import IndexVariant2 from "./pages/IndexVariant2";
import IndexVariant3 from "./pages/IndexVariant3";
import LoginVariant1 from "./pages/LoginVariant1";
import LoginVariant2 from "./pages/LoginVariant2";
import LoginVariant3 from "./pages/LoginVariant3";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VariantSelector />} />
          <Route path="/original" element={<Index />} />
          <Route path="/login1" element={<LoginVariant1 />} />
          <Route path="/login2" element={<LoginVariant2 />} />
          <Route path="/login3" element={<LoginVariant3 />} />
          <Route path="/variant1" element={<IndexVariant1 />} />
          <Route path="/variant2" element={<IndexVariant2 />} />
          <Route path="/variant3" element={<IndexVariant3 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
