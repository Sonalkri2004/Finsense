import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { get } from "../../services/ApiEndpoint.js"; // Import your custom GET method

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
  // State to store the fetched expense status data
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Function to fetch expense status count data from API
    const fetchCategoryData = async () => {
      try {
        const response = await get("/api/expense/getTotalExpense");

        if (response.status === 200) {
          const data = response.data;

          // Prepare data for the chart
          const preparedData = [
            { name: "Pending Expenses", value: data.totalPendingExpenses || 0 },
            {
              name: "Completed Expenses",
              value: data.totalCompletedExpenses || 0,
            },
            {
              name: "Approved Expenses",
              value: data.totalApprovedExpenses || 0,
            },
            {
              name: "Rejected Expenses",
              value: data.totalRejectedExpenses || 0,
            },
            {
              name: "Verified Expenses",
              value: data.totalVerifiedExpenses || 0,
            },
          ];

          setCategoryData(preparedData);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 md:p-8 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg md:text-xl font-medium mb-4 text-gray-100 text-center">
        Expense Status Distribution
      </h2>
      <div className="h-64 text-xs md:text-sm sm:h-72 md:h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={categoryData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
