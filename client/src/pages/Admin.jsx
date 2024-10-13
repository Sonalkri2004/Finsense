import { useEffect, useState } from 'react';
import { deleteUser, get, post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/AuthSlice';
import { DeleteIcon, Edit2, Edit3, LogOut, LucideLogOut, SwitchCamera, Trash2 } from 'lucide-react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const request = await get('/api/admin/getuser');
        const response = request.data;
        if (request.status === 200) {
          setUsers(response.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetUsers();
  }, [reload]); // Add 'reload' as a dependency

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/delet/${id}`);
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message);
        setReload(!reload); // Trigger reload after deletion
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout')
      if (request.status == 200) {
        dispatch(Logout())
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
     <div className="min-h-screen w-screen bg-gradient-to-br from-[#0E0C15] via-[#0E0C15] to-[#0E0C15] p-8 animate__animated animate__fadeIn">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold text-white">Manage Users</h2>
    <button
      onClick={handleLogout}
      className="py-2 px-1 bg-red-600 text-white text-center font-semibold rounded-full flex hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 animate__animated animate__pulse"
      style={{ width: '2rem' }}
    >
         <LucideLogOut/>
    </button>
  </div>
  <div className="bg-gray-800 p-6 rounded-lg shadow-md animate__animated animate__bounceIn">
    <table className="min-w-full table-auto bg-gray-900 text-white rounded-lg">
      <thead>
        <tr className="text-left border-b border-gray-600">
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Edit Role</th>
          <th className="py-2 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((elem, index) => (
          <tr key={index} className="border-b border-gray-600 animate__animated animate__fadeInUp">
            <td className="py-2 px-4">{elem.name}</td>
            <td className="py-2 px-4">{elem.email}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => handleDelete(elem._id)}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 animate__animated animate__pulse"
              >
              <Edit2/>
              </button>
            </td>
            <td className="py-2 px-4">
              <button
                onClick={() => handleDelete(elem._id)}
                className="py-2 px-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 animate__animated animate__pulse"
              >
              <Trash2/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </>
  );
}
