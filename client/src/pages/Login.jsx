import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/AuthSlice";
export default function Login() {
  const user = useSelector((state) => state.AuthSlice?.user);
  console.log(user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const request = await post("/api/auth/login", { email, password });
      const reponse = request.data;

      if (request.status == 200) {
        navigate('/')
        toast.success(reponse.message);
        dispatch(SetUser(reponse.user));
      }
      console.log(reponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate__animated animate__fadeIn">
  <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md animate__animated animate__bounceIn">
    <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="animate__animated animate__fadeInUp">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="animate__animated animate__fadeInUp">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 animate__animated animate__pulse">
        Login
      </button>
      <p className="text-center text-sm text-gray-400 mt-6 animate__animated animate__fadeInUp">
        Not registered? <Link to={"/register"} className="text-blue-400 hover:underline">Register here</Link>
      </p>
    </form>
  </div>
</div>
    </>
  );
}
