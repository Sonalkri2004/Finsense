/* eslint-disable react/prop-types */
// Modernized and Editable TransactionModal Component with Close Button
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Check, X, MessageSquare } from "lucide-react";
import "animate.css";

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

const TransactionModal = ({ isOpen, onRequestClose, transaction, isEditable, handleSaveTransaction }) => {
  const [formData, setFormData] = useState({
    txnId: "",
    subHead: "",
    purpose: "",
    amount: "",
    total: "",
    status: "pending",
  });
  const [comments, setComments] = useState(transaction?.comments || []);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (transaction) {
      setFormData({
        txnId: transaction?._id || "",
        subHead: transaction?.subHead || "",
        purpose: transaction?.purpose || "",
        amount: transaction?.amount || "",
        total: transaction?.total || "",
        status: transaction?.status || "pending",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { role: "User", text: newComment }]);
      setNewComment("");
    }
  };

  const handleDone = () => {
    handleSaveTransaction({ ...formData, comments });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      contentLabel="Transaction Details"
      className="animate__animated animate__fadeIn animate__faster"
    >
      {transaction && (
        <div className="text-white relative">
          {/* Close Button */}
          <button
            onClick={onRequestClose}
            className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition duration-200"
          >
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">{isEditable ? 'Edit Transaction' : 'Transaction Details'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Transaction ID</label>
              <input
                type="text"
                name="txnId"
                value={formData.txnId}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium mt-4 mb-2">SubHead</label>
              <input
                type="text"
                name="subHead"
                value={formData.subHead}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium mt-4 mb-2">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium mt-4 mb-2">Amount</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium mt-4 mb-2">Total</label>
              <input
                type="text"
                name="total"
                value={formData.total}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-medium mt-4 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Comments</h3>
              <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4 max-h-64 overflow-y-auto">
                {comments.map((comment, index) => (
                  <p key={index} className="text-sm"><strong>{comment.role}:</strong> {comment.text}</p>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Add Comment</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a comment..."
                  />
                  <button
                    onClick={handleAddComment}
                    className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-200"
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isEditable && (
            <div className="flex justify-center gap-6">
              <button
                onClick={handleDone}
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
              >
                <Check size={20} /> Done
              </button>
              <button
                onClick={onRequestClose}
                className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
              >
                <X size={20} /> Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default TransactionModal;