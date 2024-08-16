import { Outlet, useRoutes } from "react-router-dom";
import Home from "../pages/home";
import Footer from "../components/Footer";
// import Header from "./components/Header";
import ProductDetails from "../pages/ProductDetails";
import Header from "../components/Header";
import React from "react";

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <>
          <Header />
          <React.Suspense>
            <Outlet />
          </React.Suspense>
          <Footer />
        </>
      ),
      children: [
        { element: <Home />, index: true },
        { path: "product/:id", element: <ProductDetails /> },
        // { path: "products", element: <ProductsPage /> },
        // { path: "blog", element: <BlogPage /> },
      ],
    },
    // {
    //   path: "login",
    //   element: <LoginPage />,
    // },
    // {
    //   path: "404",
    //   element: <Page404 />,
    // },
    // {
    //   path: "*",
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
