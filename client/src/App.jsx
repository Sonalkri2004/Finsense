import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
import ProtectedLayout from './Layouts/ProtectedLayout'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout';

export default function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/' element={<ProtectedLayout />}>
          <Route index element={<MainLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
