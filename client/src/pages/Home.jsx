import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { Logout } from '../redux/AuthSlice'

export default function Home() {
  const user = useSelector((state) => state.AuthSlice.user)
  const navigate = useNavigate()
  const disptach = useDispatch()
  const gotoAdmin = () => {
    navigate('/admin')
  }
  const gotoPrincipal = () => {
    navigate('/principal')
  }
  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout')
      const response = request.data
      if (request.status == 200) {
        disptach(Logout())
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>

      <div className=" min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate__animated animate__fadeIn">
  <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md animate__animated animate__bounceIn">
    <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome, {user && user.name}</h2>
    <button className="w-full py-3 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 animate__animated animate__pulse" onClick={handleLogout}>Logout</button>
    {user && user.role === 'admin' && (
      <button className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 animate__animated animate__pulse" onClick={gotoAdmin}>Go To admin</button>
    )}
    {user && user.role === 'principal' && (
      <button className="w-full py-3 mt-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 animate__animated animate__pulse" onClick={gotoPrincipal}>Go To Principal</button>
    )}
  </div>
</div>


    </>
  )
}
