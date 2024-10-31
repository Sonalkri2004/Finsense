/* eslint-disable react/prop-types */
// ConfirmationPopup Component
import Modal from "react-modal";
import "animate.css";
import axios from "axios";
import toast from "react-hot-toast";

const confirmationModalStyles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: '20px',
    backgroundColor: '#333',
    borderRadius: '10px',
    textAlign: 'center',
    zIndex: 1000,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 999,
  },
};

const ConfirmationPopup = ({ isOpen, onRequestClose, onConfirm, transaction, confirmationAction, transactionId, commentForm }) => {

  const handleAction = async () => {
    try {
      const response1 = await axios.patch('http://localhost:4000/api/expense/updateStatus', {
        status: confirmationAction,
        expenseId: transaction?._id || ''
      }, { withCredentials: true });

      const response2 = await axios.post('http://localhost:4000/api/expense/createExpense', { TxnId: transactionId, expenseId: transaction?._id }, { withCredentials: true });

      if (!commentForm.commentText.trim()) return;
      const response3 = await axios.post('http://localhost:4000/api/expense/createComment', commentForm, { withCredentials: true });

      if (response1.data && response2.data && response3.data) {
        toast.success('Transaction status updated!!');
      } else {
        toast.error('Transaction status not updated!!');
      }
      // Call onConfirm to perform additional actions, if any
      onConfirm();
    } catch (error) {
      console.error('Error updating transaction status:', error);
      toast.error('An error occurred while updating the transaction status.');
    } finally {
      // Close the modal
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={confirmationModalStyles}
      contentLabel="Confirmation"
      className="animate__animated animate__zoomIn"
    >
      <h2 className="text-white text-xl font-semibold mb-4">Are you sure?</h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleAction}
          className="px-8 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full transition duration-200"
        >
          Yes
        </button>
        <button
          onClick={onRequestClose}
          className="px-8 py-2 bg-red-600 hover:bg-red-500 text-white rounded-full transition duration-200"
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationPopup;
