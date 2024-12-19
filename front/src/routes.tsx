import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Event from "./pages/event"; // Import the Event component

import { MainFrame } from "./layout/main-frame";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

export default function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainFrame />}>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<Event />} /> {/* New route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
