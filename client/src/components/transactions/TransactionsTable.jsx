/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Eye, DownloadCloud, FileDown, BookDown } from "lucide-react";
import axios from "axios";
import convertISOToDate from "../../utils/formatDate";
import PayVoucher from "../analytics/PayVoucher";
import NoteSheet from "../analytics/NoteSheet";

import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx"; // Import XLSX for Excel creation

const TransactionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Set the number of items per page
  const [toggleValue, setToggleValue] = useState("expense");
  const [filterDate, setFilterDate] = useState({
    startDate: "",
    endDate: "",
    subHead: "",
    billType: toggleValue,
  });
  const [selectedSubHead, setSelectedSubHead] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showIncome, setShowIncome] = useState(false); // Toggle between Expense and Income
  const [selectAll, setSelectAll] = useState(false); // State for Select All checkbox

  const payVoucherRef = useRef();
  const noteSheetRef = useRef();

  const handlePrint = () => {
    if (payVoucherRef.current) {
      const options = {
        margin: 10,
        filename: "pay_voucher.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().from(payVoucherRef.current).set(options).save();
    }
  };

  const handlePrintt = () => {
    if (noteSheetRef.current) {
      const options = {
        margin: [10, 10, 10, 10], // Add custom margins if needed
        filename: "NoteSheet.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] }, // Enable CSS-based page breaks
      };

      html2pdf().from(noteSheetRef.current).set(options).save();
    }
  };

  const handleFilter = async () => {
    try {
      const filters = { ...filterDate };

      if (selectedSubHead) {
        filters.subHead = String(selectedSubHead);
      }
      if (selectedStatus) {
        filters.status = selectedStatus;
      }

      console.log("filters", filters);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/expense/filterDate`,
        filters,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        setFilteredTransactions(response.data);
      }
    } catch (error) {
      console.error("Error filtering transactions", error);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/expense/getAllBill`,
          { billType: toggleValue },
          {
            withCredentials: true,
          }
        );
        console.log("Response = ", response.data);
        console.log("comments = ", response.data.bill[0].comments);

        // Ensure that the API response structure is correctly accessed
        if (response.data && response.data.bill) {
          setFilteredTransactions(response.data.bill); // Adjust if your API uses a different field name
        } else {
          console.error("No bills found in response");
        }
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    if (!showIncome) {
      fetchExpenses();
    }
  }, [showIncome, toggleValue]); // Ensure setFilteredTransactions is included if it's a prop

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDownloadVoucher = (transaction) => {
    setSelectedTransaction(transaction);
    setTimeout(() => handlePrint(), 0);
  };

  const handleDownloadNotesheet = (transaction) => {
    setSelectedTransaction(transaction);
    setTimeout(() => handlePrintt(), 0);
  };

  // Handle checkbox change for selecting transactions
  const handleCheckboxChange = (transaction) => {
    if (selectedTransactions.includes(transaction)) {
      setSelectedTransactions(
        selectedTransactions.filter((item) => item !== transaction)
      );
    } else {
      setSelectedTransactions([...selectedTransactions, transaction]);
    }
  };

  // Handle Select All checkbox change
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(currentTransactions);
    }
    setSelectAll(!selectAll);
  };

  // Export selected transactions to Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "selected_transactions.xlsx");
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6 gap-4 w-full">
        <h2 className="text-2xl font-bold text-gray-200">
          {toggleValue.charAt(0).toUpperCase() + toggleValue.slice(1)} History
        </h2>
        <div className="flex items-center">
          <label className="relative inline-block w-16 h-8">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={toggleValue === "income"}
              onChange={() =>
                setToggleValue((prev) =>
                  prev === "expense" ? "income" : "expense"
                )
              }
            />
            <div className="w-full h-full bg-gray-400 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600 transition-all duration-300"></div>
            <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform duration-300"></div>
          </label>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-between items-center bg-gray-900 p-5 rounded-lg shadow-lg mb-6">
        {/* Date Filter */}
        <div className="flex flex-col gap-2 items-start w-full md:w-1/5">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-300"
          >
            From
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFilterDate({ ...filterDate, startDate: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 items-start w-full md:w-1/5">
          <label
            htmlFor="endDate"
            className="text-sm font-medium text-gray-300"
          >
            To
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFilterDate({ ...filterDate, endDate: e.target.value })
            }
          />
        </div>

        {/* SubHead Dropdown */}
        <div className="flex flex-col gap-2 items-start w-full md:w-1/5">
          <label
            htmlFor="subHead"
            className="text-sm font-medium text-gray-300"
          >
            SubHead
          </label>
          <select
            name="subHead"
            id="subHead"
            className="w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSubHead}
            onChange={(e) => setSelectedSubHead(e.target.value)}
          >
            <option value="">All</option>
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

        {/* Status Dropdown */}
        <div className="flex flex-col gap-2 items-start w-full md:w-1/5">
          <label htmlFor="status" className="text-sm font-medium text-gray-300">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="mt-8 md:mt-6 px-5 py-2  bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-900 p-4 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <p>Select All</p>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="mt-1"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Voucher No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                SubHead
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              {toggleValue === "expense" && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Download Voucher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Download Notesheet
                  </th>
                </>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {currentTransactions.map((transaction) => (
              <motion.tr
                key={transaction?._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-800"
              >
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedTransactions.includes(transaction)}
                    onChange={() => handleCheckboxChange(transaction)}
                    className="form-checkbox rounded focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                  {toggleValue === "expense"
                    ? transaction?.voucherNo
                    : transaction?._id.slice(0, 10)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {convertISOToDate(transaction?.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                  {transaction?.subHead}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                  ₹ {parseInt(transaction?.total).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === "verified"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : transaction.status === "approved"
                        ? "bg-blue-100 text-blue-800"
                        : transaction.status === "completed"
                        ? "bg-purple-100 text-purple-800"
                        : transaction.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {transaction?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300 ">
                  <button
                    onClick={() => handleDownloadVoucher(transaction)}
                    className={`text-indigo-400 hover:text-indigo-300 ${
                      transaction.status === "completed" &&
                      toggleValue === "expense"
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    <DownloadCloud size={18} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">
                  <button
                    onClick={() => handleDownloadNotesheet(transaction)}
                    className={`text-indigo-400 hover:text-indigo-300 ${
                      transaction.status === "completed" &&
                      toggleValue === "expense"
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    <FileDown size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 md:gap-0">
        <button
          className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-white bg-blue-600 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="text-gray-400 text-xs md:text-sm">
          Page {currentPage} of {totalPages}
        </div>
        <button
          className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-white bg-blue-600 rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Download Excel Button */}
      <div className="flex justify-center md:justify-end mt-6">
        <button
          onClick={handleDownloadExcel}
          className="px-6 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          disabled={selectedTransactions.length === 0}
        >
          <BookDown />
        </button>
      </div>

      {/* Hidden Elements for PDF Generation */}
      <div className="hidden">
        {selectedTransaction && (
          <PayVoucher ref={payVoucherRef} transaction={selectedTransaction} />
        )}
        {selectedTransaction && (
          <NoteSheet ref={noteSheetRef} transaction={selectedTransaction} />
        )}
      </div>
    </motion.div>
  );
};

export default TransactionsTable;
