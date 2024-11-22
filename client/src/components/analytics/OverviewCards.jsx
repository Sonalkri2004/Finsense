import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls
import { motion } from "framer-motion"; // Import motion for animation effects
import { IndianRupee, ArrowLeftRight, Clock } from "lucide-react"; // Import icons
import { deleteUser, get, post, put } from "../../services/ApiEndpoint.js"; // Import custom API methods

const OverviewCards = () => {
  // Initial state for overview data with placeholder values
  const [overviewData, setOverviewData] = useState([
    {
      name: "Total Income",
      value: "Loading...",
      change: 0,
      icon: (
        <div className={`p-3 rounded-full bg-opacity-20 bg-green-500`}>
          <IndianRupee className="text-green-500" />
        </div>
      ),
    },
    {
      name: "Total Expense",
      value: "Loading...",
      change: 0,
      icon: (
        <div className={`p-3 rounded-full bg-opacity-20 bg-red-500`}>
          <IndianRupee className="text-red-500" />
        </div>
      ),
    },
    {
      name: "Total Transactions",
      value: "Loading...",
      change: 0,
      icon: (
        <div className={`p-3 rounded-full bg-opacity-20 bg-green-500`}>
          <ArrowLeftRight className="text-green-500" />
        </div>
      ),
    },
    {
      name: "Pending Transaction",
      value: "Loading...",
      change: 0,
      icon: (
        <div className={`p-3 rounded-full bg-opacity-20 bg-yellow-500`}>
          <Clock className="text-yellow-500" />
        </div>
      ),
    },
  ]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data from the APIs
    const fetchData = async () => {
      try {
        // Fetching the total expenses, income, and pending transactions data
        const totalExpenseResponse = await get("/api/expense/getTotal");
        const totalStatusResponse = await get("/api/expense/getTotalExpense");
        console.log(
          "totalExpenseResponse = ",
          totalExpenseResponse.data.totalIncome
        );

        // Check if both API responses are successful (status 200)
        if (
          totalExpenseResponse.status === 200 &&
          totalStatusResponse.status === 200
        ) {
          // Extracting the data from the responses
          const totalData = totalExpenseResponse.data;
          const statusData = totalStatusResponse.data;

          // Check if totalAmount array exists and is not empty, then access its value safely
          const totalAmountValue =
            totalData.totalAmount && totalData.totalAmount.length > 0
              ? totalData.totalAmount[0].totalAmount
              : 0;

          // for income
          const totalIncomeValue =
            totalData.totalIncome && totalData.totalIncome.length > 0
              ? totalData.totalIncome[0].totalIncome
              : 0;

          // Updating the overview data state with actual values from the API response
          setOverviewData([
            {
              ...overviewData[0],
              value: `₹${totalIncomeValue}`, // Set Monthly Income
            },
            {
              ...overviewData[1],
              value: `₹${totalAmountValue}`, // Set Monthly Expense
            },
            {
              ...overviewData[2],
              value: `${totalData.totalExpence || 0}`, // Set Total Transactions
            },
            {
              ...overviewData[3],
              value: `${totalData.totalPendingExpenses || 0}`, // Set Pending Transactions
            },
          ]);
        }
      } catch (error) {
        // Log any error that occurs during the data fetch process
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function to get the data when the component is mounted
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {overviewData.map((item, index) => (
        <motion.div
          key={item.name}
          className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex sm:items-center justify-between">
            <div>
              <h3 className="text-xs md:text-sm font-medium text-gray-400">
                {item.name}
              </h3>
              <p className="mt-1 text-xs md:text-xl font-semibold text-gray-100">
                {item.value}
              </p>
            </div>

            {/* Display the icon */}
            <div className="mt-3 w-12 h-10 ">{item.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;
