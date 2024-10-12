// ConfirmationPopup Component
import React from "react";
import Modal from "react-modal";
import "animate.css";

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

const ConfirmationPopup = ({ isOpen, onRequestClose, onConfirm }) => {
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
          onClick={onConfirm}
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