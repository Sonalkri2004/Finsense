import React, { useEffect, useState } from 'react';
import { deleteUser, get } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false); // New state to track reloads

  // Fetch users when the component mounts and when 'reload' changes
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

  return (
    <>
      <div className='admin-container'>
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((elem, index) => (
              <tr key={index}>
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>
                  <button onClick={() => handleDelete(elem._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
