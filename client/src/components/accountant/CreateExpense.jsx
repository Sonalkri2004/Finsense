import { useState } from "react";
import axios from "axios";
export default function CreateExpense() {
  const [formData, setFormData] = useState({
    bankName: "",
    subHead: "",
    purpose: "",
    amount: "",
    total: "",
    status: "",
    TxnId: "",
  });

  const [responseMessage, setResponseMessage] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRhNTQ4YmNjZjUzMTJiMWE2ZjNiMjkiLCJpYXQiOjE3Mjc3Nzc3NTAsImV4cCI6MTcyOTA3Mzc1MH0.B4bAW1nS1Ltca7YlU6442BwZ6K_nA36Ts7CTyXDfUWw"; // Your JWT token

      const response = await axios.post(
        "http://localhost:4000/api/expense/createExpense/67022bacabed7e8254f1f1e0", // Updated URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Setting the JWT token in the Authorization header
          },
        }
      );

      setResponseMessage(response.data.message); // Show success message
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Error occurred"); // Show error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 animate__animated animate__fadeIn">
    <div className="w-full max-w-4xl p-10 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate__animated animate__bounceIn">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Create Expense Transaction</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Sub Head:</label>
          <input
            type="text"
            name="subHead"
            value={formData.subHead}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Total:</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Transaction ID:</label>
          <input
            type="text"
            name="TxnId"
            value={formData.TxnId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-4 mt-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out animate__animated animate__pulse"
          >
            Create Expense
          </button>
        </div>
      </form>
      {responseMessage && <p className="text-center text-lg text-white mt-6 animate__animated animate__fadeInUp">{responseMessage}</p>}
    </div>
  </div>
  );
}
