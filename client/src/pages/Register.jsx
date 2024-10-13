import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { toast } from 'react-hot-toast';
export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/register', { name, email, password })
      const reposne = request.data
      if (request.status == 200) {
        toast.success(reposne.message)
      }
      console.log(reposne)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
     <div className=" min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#0E0C15] via-[#0E0C15] to-[#0E0C15] animate__animated animate__fadeIn">
  <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-md animate__animated animate__bounceIn">
    <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>
    <form action="" onSubmit={handleSubmit} className="space-y-6">
      <div className=" animate__animated animate__fadeInUp">
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
        <input type="text" id="username" className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setName(e.target.value)} name="" />
      </div>
      <div className=" animate__animated animate__fadeInUp">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input type="email" id="email" className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setEmail(e.target.value)} name="" />
      </div>
      <div className=" animate__animated animate__fadeInUp">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input type="password" id="password" className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setPassword(e.target.value)} name="" />
      </div>
      <button type="submit" className="w-full py-3 mt-4 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 animate__animated animate__pulse">Register</button>
      <p className=" text-center text-sm text-gray-400 mt-6 animate__animated animate__fadeInUp">
        Already have an account? <Link to={'/login'} className="text-blue-400 hover:underline">Login here</Link>
      </p>
      <p className="text-center text-sm text-gray-400 mt-6 animate__animated animate__fadeInUp">
        Not remembered <Link to={"/forgotpass"} className="text-blue-400 hover:underline">Forgot Password?</Link>
      </p>
    </form>
  </div>
</div>




    </>
  )
}
