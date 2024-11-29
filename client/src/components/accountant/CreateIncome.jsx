import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateIncome() {
  const [formData, setFormData] = useState({
    bankName: "",
    subHead: "",
    amount: "",
    total: "",
    TxnId: "",
    head: "", // Added head field
  });
  const user = useSelector((state) => state.AuthSlice?.user);
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        formData.bankName.trim() &&
        formData.subHead.trim() &&
        formData.amount.trim() &&
        formData.total.trim() &&
        formData.TxnId.trim() &&
        formData.head.trim() // Include validation for head
      ) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/income/createIncome`,
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.data) {
          setResponseMessage(response.data.message);
          toast.success("Income created successfully");
          setFormData({
            ...formData,
            TxnId: "",
            bankName: "",
            amount: "",
            total: "",
            subHead: "",
            head: "", // Added head field
          });

          navigate("/report");
        }
      }
    } catch (error) {
      console.log(error);
      setResponseMessage(error.response?.data?.message || "Error occurred"); // Show error message
      toast.error("Income creation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 md:p-8 animate__animated animate__fadeIn">
      <div className="w-full max-w-4xl p-6 sm:p-8 bg-[#1A1B1F] rounded-lg shadow-lg transform transition duration-300 ease-in-out">
        <h1 className="text-xl sm:text-3xl font-extrabold text-white mb-4 sm:mb-6 text-center">
          Create Income Transaction
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2"
        >
          <div className="col-span-1">
            <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
              Name of Account:
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
              Sub Head:
            </label>
            <select
              name="subHead"
              value={formData.subHead}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="">Select Sub Head</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="OMSP">OMSP</option>
              <option value="Exam">Exam</option>
              <option value="SW">SW</option>
              <option value="GEN">GEN</option>
              <option value="NSS">NSS</option>
              <option value="NCC">NCC</option>
            </select>
          </div>
          {/* Head */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Head:
            </label>
            <input
              type="text"
              name="head"
              value={formData.head}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
              Total:
            </label>
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm sm:text-base font-semibold text-gray-300 mb-2">
              Transaction ID:
            </label>
            <input
              type="text"
              name="TxnId"
              value={formData.TxnId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="w-full py-4 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Create Income
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className="text-center text-base sm:text-lg text-white mt-6">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}
