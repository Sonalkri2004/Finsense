/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Modernized TransactionModal Component with Close Button
import Modal from "react-modal";
import { Check, MessageSquare, X } from "lucide-react";
import "animate.css";
import { toast } from "react-hot-toast";
import convertISOToDate from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const customModalStyles = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "85vh",
    overflow: "auto",
    backgroundColor: "#1a1b1f",
    borderRadius: "20px",
    border: "none",
    padding: "30px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 999,
  },
};

const TransactionModal = ({
  isOpen,
  onRequestClose,
  transaction,
  openConfirmationPopup,
  setCommentForm,
  commentForm,
  transactionId,
  setTransactionId,
}) => {
  const userDetails = useSelector((state) => state.AuthSlice?.user);
  const [comments, setComments] = useState([]);

  console.log("comment form = ", commentForm);
  useEffect(() => {
    setCommentForm({ ...commentForm, expenseId: transaction?._id });
  }, [transaction]);
  console.log("transaction2 = ", transaction);
  const handleAddComment = async () => {
    if (!commentForm.commentText.trim()) return;
    try {
      console.log("commentForm1 = ", commentForm);

      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/expense/createComment`,
        commentForm,
        { withCredentials: true }
      );
      console.log("response11 = ", resp);

      if (resp.data) {
        setComments([
          ...comments,
          {
            userRole: resp.data.comment.userRole,
            commentText: resp.data.comment.commentText,
          },
        ]);
      }
      commentForm.commentText = "";
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      contentLabel="Transaction Details"
      className="animate__animated animate__fadeIn animate__faster sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-2xl mx-auto p-4 sm:p-6"
    >
      {transaction && (
        <div className="text-white  relative">
          {/* Close Button */}
          <button
            onClick={onRequestClose}
            className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition duration-200"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
            Transaction Details
          </h2>
          <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-lg bg-gray-900 shadow-lg">
            <p className="text-sm sm:text-base mb-2 sm:mb-3">
              <strong>Transaction ID:</strong> {transaction._id}
            </p>
            <p className="text-sm sm:text-base mb-2 sm:mb-3">
              <strong>Date:</strong> {convertISOToDate(transaction.updatedAt)}
            </p>
            <p className="text-sm sm:text-base mb-2 sm:mb-3">
              <strong>SubHead:</strong> {transaction.subHead}
            </p>
            <p className="text-sm sm:text-base mb-2 sm:mb-3">
              <strong>Total:</strong> ₹ {parseInt(transaction.total).toFixed(2)}
            </p>
            <p className="text-sm sm:text-base mb-2 sm:mb-3">
              <strong>Status:</strong> {transaction.status}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">
              Comments
            </h3>
            <ul>
              {transaction?.comments.length > 0 ? (
                transaction?.comments.map((comment) => (
                  <li key={comment?._id} className="p-3 bg-gray-900 rounded-md">
                    <p className="text-base">
                      <strong>
                        {String(comment.userRole).charAt(0).toUpperCase() +
                          String(comment.userRole).slice(1)}
                        :
                      </strong>
                      {comment?.commentText || ""}
                    </p>
                  </li>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </ul>
            <div className="mb-8">
              <div className="mb-8">
                <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">
                  Comments
                </h3>
                <ul className="mb-4">
                  {comments?.length > 0 ? (
                    comments.map((comment, index) => (
                      <li
                        key={index}
                        className="p-3 bg-gray-900 rounded-md mb-2"
                      >
                        <p className="text-base">
                          <strong>{comment.userRole}:</strong>{" "}
                          {comment.commentText}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p>No comments yet</p>
                  )}
                </ul>

                <div className="flex flex-col items-center gap-2">
                  <textarea
                    type="text"
                    value={commentForm.commentText}
                    onChange={(e) =>
                      setCommentForm({
                        ...commentForm,
                        commentText: e.target.value,
                      })
                    }
                    className="flex-grow w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a comment..."
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2 w-full mt-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-200"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
              {userDetails.role == "accountant" &&
                transaction?.status == "approved" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cheque No.
                    </label>
                    <input
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Enter Cheque No..."
                    />
                  </div>
                )}
            </div>
            {userDetails?.role != "admin" && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                {userDetails?.role == "accountant" ? (
                  <button
                    onClick={() => openConfirmationPopup("completed")}
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
                  >
                    <Check size={20} /> Complete Transaction
                  </button>
                ) : userDetails?.role == "bursar" ? (
                  <button
                    onClick={() => openConfirmationPopup("verified")}
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
                  >
                    <Check size={20} /> Verify Transaction
                  </button>
                ) : (
                  <button
                    onClick={() => openConfirmationPopup("approved")}
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
                  >
                    <Check size={20} /> Approve Transaction
                  </button>
                )}
                <button
                  onClick={() => openConfirmationPopup("rejected")}
                  className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-500 text-white rounded-full gap-2 shadow-lg hover:shadow-xl transition duration-200"
                >
                  <X size={20} /> Reject Transaction
                </button>
              </div>
            )}{" "}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TransactionModal;
