/* eslint-disable react/prop-types */
import { Check, X } from "lucide-react";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "./ConfirmationPopup"; // Import the ConfirmationPopup component
import toast from "react-hot-toast";
// Set the app element for accessibility
Modal.setAppElement('#root'); // Replace '#root' with your main app element ID if different

const customModalStyles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '700px',
    maxHeight: '85vh',
    overflow: 'auto',
    backgroundColor: '#1a1b1f',
    borderRadius: '20px',
    border: 'none',
    padding: '30px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.6)',
    zIndex: 1000,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 999,
  },
};

const RejectedModal = ({ isOpen, onRequestClose, transaction, updateTransaction }) => {
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    expenseId: '',
    commentText: '',
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation popup
  const navigate = useNavigate();

  // New fields state
  const [bankName, setBankName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [subHead, setSubHead] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    if (transaction) {
      setBankName(transaction.bankName || '');
      setPurpose(transaction.purpose || '');
      setAmount(transaction.amount || '');
      setSubHead(transaction.subHead || '');
      setTotal(transaction.total || '');
      setComments(transaction.comments || []);
      setCommentForm({ ...commentForm, expenseId: transaction._id || '' });
    }
  }, [transaction]);

  const handleSaveChanges = async () => {
    try {
      const updatedTransaction = {
        ...transaction,
        bankName,
        purpose,
        amount,
        subHead,
        total,
        comments,
        status: "pending",
      };

      console.log("Updated Transaction Data:", updatedTransaction); // Debugging line

      // Update the transaction on the server
      const updateResp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/expense/updateExpense/${transaction._id}`,
        updatedTransaction,
        { withCredentials: true }
      );

      if (updateResp.data) {
        console.log("Transaction updated successfully:", updateResp);

        // If there is a comment, add it after the transaction update
        if (commentForm.commentText.trim()) {
          const commentResp = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/expense/createComment`,
            commentForm,
            { withCredentials: true }
          );

          if (commentResp.data) {
            console.log("Comment added successfully:", commentResp);

            const newComment = {
              userRole: commentResp.data.comment.userRole,
              commentText: commentResp.data.comment.commentText,
              updatedAt: commentResp.data.comment.updatedAt,
            };

            // Update comments in the state
            setComments((prevComments) => [...prevComments, newComment]);
            setCommentForm({ ...commentForm, commentText: "" }); // Clear input field
          }
        }

        // Show success toast message
        toast.success("Transation is in Pending now!");
        updateTransaction(updatedTransaction);
        onRequestClose();
      }
    } catch (error) {
      console.error("Error saving changes", error);
      // Show failure toast message
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleConfirmSaveChanges = () => {
    setIsConfirmationOpen(true); // Open confirmation popup
  };

  return (
    <>
   
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customModalStyles}
        contentLabel="Transaction Details"
        className="animate__animated animate__fadeIn animate__faster"
      >
        <div className="text-white relative">
          {/* Close Button */}
          <button
            onClick={onRequestClose}
            className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition duration-200"
          >
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">Transaction Details</h2>

          {/* Bank Name */}
          <div className="mb-6 p-6 rounded-lg bg-gray-900 shadow-lg">
            <label htmlFor="bankName" className="block mb-2 text-gray-300">Name of Account:</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={handleInputChange(setBankName)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bank Name"
            />
          </div>

          {/* Purpose */}
          <div className="mb-6 p-6 rounded-lg bg-gray-900 shadow-lg">
            <label htmlFor="purpose" className="block mb-2 text-gray-300">Purpose</label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={handleInputChange(setPurpose)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Purpose"
            />
          </div>

          {/* Amount */}
          <div className="mb-6 p-6 rounded-lg bg-gray-900 shadow-lg">
            <label htmlFor="amount" className="block mb-2 text-gray-300">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleInputChange(setAmount)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amount"
            />
          </div>

          {/* SubHead */}
          <div className="mb-6 p-6 rounded-lg bg-gray-900 shadow-lg">
            <label htmlFor="subHead" className="block mb-2 text-gray-300">SubHead</label>
            <input
              type="text"
              id="subHead"
              value={subHead}
              onChange={handleInputChange(setSubHead)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="SubHead"
            />
          </div>

          {/* Total */}
          <div className="mb-6 p-6 rounded-lg bg-gray-900 shadow-lg">
            <label htmlFor="total" className="block mb-2 text-gray-300">Total</label>
            <input
              type="number"
              id="total"
              value={total}
              onChange={handleInputChange(setTotal)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Total"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            <ul className="mb-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <li key={index} className="p-3 bg-gray-900 rounded-md mb-2">
                    <p className="text-base">
                      <strong>{comment.userRole}:</strong> {comment.commentText}
                    </p>
                  </li>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </ul>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={commentForm.commentText}
                onChange={(e) => setCommentForm({ ...commentForm, commentText: e.target.value })}
                className="flex-grow px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a comment..."
              />
              {/* <button
                onClick={handleConfirmSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-200"
              >
                Add Comment & Save Changes
              </button> */}
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={handleConfirmSaveChanges}
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
            >
              <Check size={20} />
              Save Changes
            </button>
            <button
              onClick={onRequestClose}
              className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
            >
              <X size={20} />
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onRequestClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleSaveChanges}
      />
    </>
  );
};

export default RejectedModal;
