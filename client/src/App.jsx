import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import Bursar from "./pages/Bursar";
import Principal from "./pages/Principal";
import OverviewPage from "./pages/Reports";
import PendingPage from "./pages/PendingPage";
import RejectedPage from "./pages/RejectedPage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomesPage from "./pages/IncomesPage";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";
import Forgotpass from "./pages/Forgotpass";

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
          <Toaster />
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgotpass" element={<Forgotpass />} />
            </Route>

            <Route path="/" element={<ProtectedLayout />}>
              <Route path="/bursar" element={<Bursar />} />
              <Route path="/principal" element={<Principal />} />
              <Route path="/Report" element={<OverviewPage />} />
              <Route path="/pending" element={<PendingPage />} />
              <Route path="/rejected" element={<RejectedPage />} />
              <Route path="/expense" element={<ExpensesPage />} />
              <Route path="/income" element={<IncomesPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route index element={<MainLayout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
