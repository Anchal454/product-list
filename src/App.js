import "./App.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useRoutes,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Footer from "./components/Footer";
import { Button } from "@mui/material";
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
