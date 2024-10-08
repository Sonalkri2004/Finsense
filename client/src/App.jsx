import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/common/Sidebar";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import Accountant from "./pages/Accountant";
import Bursar from "./pages/Bursar";
import Principal from "./pages/Principal";
import OverviewPage from "./pages/Reports";
import ProductsPage from "./pages/PendingPage";
import UsersPage from "./pages/RejectedPage";
import SalesPage from "./pages/ExpensesPage";
import OrdersPage from "./pages/IncomesPage";
import AnalyticsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* BG */}
        {/* <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div> */}

        <BrowserRouter>
          <Sidebar />
          <Toaster />
          <Routes>
            <Route path="/acc" element={<Accountant />} />
            <Route path="/bursar" element={<Bursar />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/Report" element={<OverviewPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="/" element={<ProtectedLayout />}>
              <Route index element={<MainLayout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
