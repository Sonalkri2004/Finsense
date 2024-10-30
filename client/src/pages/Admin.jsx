import { useEffect, useState } from 'react';
import { deleteUser, get, post, put } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/AuthSlice';
import { LucideLogOut, Trash2 } from 'lucide-react';

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
        console.log('Error fetching users:', error);
      }
    };
    GetUsers();
  }, [reload]);

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/delete/${id}`);
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message);
        setReload(!reload); // Trigger reload after deletion
      }
    } catch (error) {
      if (error.response) {
        console.log('Error deleting user:', error.response.data);
        toast.error(error.response.data.message);
      }
    }
  };

  // Handle user role update
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      console.log(`Updating role for userId: ${userId} to role: ${newRole}`);
      if (!newRole) {
        toast.error("Please select a role before updating.");
        return;
      }

      const request = await put(`/api/admin/updateUser/${userId}`, {
        userRole: newRole,
      });
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);
        setReload(!reload);
      }
    } catch (error) {
      if (error.response) {
        console.log('Error updating user role:', error.response.data);
        toast.error(error.response.data.message);
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout');
      if (request.status === 200) {
        dispatch(Logout());
        navigate('/login');
      }
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  // Function to handle role selection change
  const handleRoleChange = (userId, role) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: role } : user
      )
    );
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-br from-[#0E0C15] via-[#0E0C15] to-[#0E0C15] p-4 lg:p-8 animate__animated animate__fadeIn">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-white">Manage Users</h2>
          <button
            onClick={handleLogout}
            className="py-2 px-3 w-auto bg-red-600 text-white text-center font-semibold rounded-md flex items-center gap-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all animate__animated animate__pulse"
          >
            <LucideLogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md animate__animated animate__bounceIn max-h-[85vh] overflow-x-auto overflow-y-auto">
          <table className="min-w-full  table-auto bg-gray-900 text-white rounded-lg">
            <thead>
              <tr className="text-left border-b  border-gray-600 text-sm lg:text-base">
                <th className="py-3 px-4 whitespace-nowrap">Name</th>
                <th className="py-3 px-4 whitespace-nowrap">Email</th>
                <th className="py-3 px-4 whitespace-nowrap">Role</th>
                <th className="py-3 px-4 whitespace-nowrap">Edit Role</th>
                <th className="py-3 px-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((elem, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-600 animate__animated animate__fadeInUp text-sm lg:text-base"
                  >
                    <td className="py-4 px-4 whitespace-nowrap">{elem.name}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{elem.email}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{elem.role}</td>
                    <td className="py-4 px-4 whitespace-nowrap flex items-center gap-2">
                      <select
                        value={elem.role}
                        onChange={(e) => handleRoleChange(elem._id, e.target.value)}
                        className="py-2 px-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      >
                        <option value="" disabled>
                          Select Role
                        </option>
                        <option value="admin">Admin</option>
                        <option value="accountant">Accountant</option>
                        <option value="bursar">Bursar</option>
                        <option value="principal">Principal</option>
                        <option value="user">User</option>
                      </select>
                      <button
                        onClick={() => handleRoleUpdate(elem._id, elem.role)}
                        className="py-2 px-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                      >
                        Save
                      </button>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(elem._id)}
                        className="py-2 px-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
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
