// Modernized TransactionModal Component with Close Button
import React from "react";
import Modal from "react-modal";
import { Check, X } from "lucide-react";
import "animate.css";
import convertISOToDate from "../../utils/formatDate";

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

const TransactionModal = ({ isOpen, onRequestClose, transaction, openConfirmationPopup }) => {
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
          
          <h2 className="text-3xl font-bold mb-6 text-center">Transaction Details</h2>
          <div className="mb-6 p-6 rounded-lg bg-gray-900 shadow-lg">
            <p className="text-base mb-3"><strong>Transaction ID:</strong> {transaction._id}</p>
            <p className="text-base mb-3"><strong>Date:</strong> {convertISOToDate(transaction.updatedAt)}</p>
            <p className="text-base mb-3"><strong>SubHead:</strong> {transaction.subHead}</p>
            <p className="text-base mb-3"><strong>Total:</strong> ₹ {parseInt(transaction.total).toFixed(2)}</p>
            <p className="text-base mb-3"><strong>Status:</strong> {transaction.status}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
              <div className="p-3 bg-gray-900 rounded-md">
                <p className="text-base"><strong>Accountant:</strong> Please verify the details of this transaction.</p>
              </div>
              <div className="p-3 bg-gray-900 rounded-md">
                <p className="text-base"><strong>Bursar:</strong> Needs further clarification on the subhead.</p>
              </div>
              <div className="p-3 bg-gray-900 rounded-md">
                <p className="text-base"><strong>Principal:</strong> Approved with remarks.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Write Comment</label>
            <textarea
              rows="4"
              className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Add your comment here..."
            />
            <label className="block text-sm font-medium mb-2">Add Txn ID</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Transaction ID..."
            />
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => openConfirmationPopup('verify')}
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
            >
              <Check size={20} /> Verify
            </button>
            <button
              onClick={() => openConfirmationPopup('reject')}
              className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
            >
              <X size={20} /> Reject
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TransactionModal;