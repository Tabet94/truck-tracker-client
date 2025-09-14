import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TripById from "./Components/trip-by-id";
import "leaflet/dist/leaflet.css";
import "@fontsource/inter/400.css"


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/trip/:tripId" element={<TripById />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
