import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import SermonsPage from "../pages/SermonsPage";
import EventsPage from "../pages/EventsPage";
import OneonOnePage from "../pages/OneonOnePage";
import ShopPage from "../pages/ShopPage";
import CartPage from "../pages/CartPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import LoginPage from "../pages/admin/LoginPage";
import AdminLayout from "../pages/admin/AdminLayout";
import DashboardLayout from "../pages/admin/DashboardLayout";
import StatsOverview from "../components/admin/dashboard/StatsOverview";
import SermonManager from "../components/admin/dashboard/SermonManager";
import EventManager from "../components/admin/dashboard/EventManager";
import BookManager from "../components/admin/dashboard/BookManager";
import OrdersManager from "../components/admin/dashboard/OrdersManager";
import OneOnOneManager from "../components/admin/dashboard/OneOnOneManager";
import OrderCallbackPage from "../pages/OrderCallbackPage";
import OneOnOneRegistrationPage from "../pages/OneOnOneRegistrationPage";

function Routy() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sermons" element={<SermonsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/one-on-one" element={<OneonOnePage />} />
            <Route
              path="/one-on-one/register"
              element={<OneOnOneRegistrationPage />}
            />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-callback" element={<OrderCallbackPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />

            {/* ── Admin Routes ── */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<LoginPage />} />

              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<StatsOverview />} />
                <Route path="sermons" element={<SermonManager />} />
                <Route path="events" element={<EventManager />} />
                <Route path="books" element={<BookManager />} />
                <Route path="orders" element={<OrdersManager />} />
                <Route path="one-on-one" element={<OneOnOneManager />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Routy;
