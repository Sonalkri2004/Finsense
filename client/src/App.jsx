import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";

import OverviewPage from "./pages/Reports";
import PendingPage from "./pages/PendingPage";
import RejectedPage from "./pages/RejectedPage";
import ExpensesPage from "./pages/ExpensesPage";
import IncomesPage from "./pages/IncomesPage";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";
import Forgotpass from "./pages/Forgotpass";
import {
  ResetPassword,
  UpdatePassword,
  VerifyEmail,
} from "./components/auth/frontend_verification_reset";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpass" element={<Forgotpass />} />
          <Route path="verifyEmail" element={<VerifyEmail />} />
          <Route path="updatePassword" element={<UpdatePassword />} />
          <Route path="resetPassword/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/Report" element={<OverviewPage />} />
            <Route path="/pending" element={<PendingPage />} />
            <Route path="/rejected" element={<RejectedPage />} />
            <Route path="/expense" element={<ExpensesPage />} />
            <Route path="/income" element={<IncomesPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
