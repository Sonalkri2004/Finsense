import { useState } from "react";
import axios from "axios";


const CreateExpense = () => {
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
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRhNTQ4YmNjZjUzMTJiMWE2ZjNiMjkiLCJpYXQiOjE3Mjc3Nzc3NTAsImV4cCI6MTcyOTA3Mzc1MH0.B4bAW1nS1Ltca7YlU6442BwZ6K_nA36Ts7CTyXDfUWw"; // Your JWT token
  
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
    <div>
      <h1>Create Expense</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Sub Head:</label>
          <input
            type="text"
            name="subHead"
            value={formData.subHead}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Total:</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Transaction ID:</label>
          <input
            type="text"
            name="TxnId"
            value={formData.TxnId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create Expense</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};




export default CreateExpense;
