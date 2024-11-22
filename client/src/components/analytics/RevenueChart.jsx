import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { get } from "../../services/ApiEndpoint.js"; // Import your custom GET method

const RevenueDualAxisChart = () => {
  // State to store total income and total expense data for multiple months
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch total income and total expense data from the backend
    const fetchData = async () => {
      try {
        const response = await get("/api/expense/getTotal");

        if (response.status === 200) {
          const totalData = response.data;
          // console.log(totalData)
          // Prepare multiple data points for the chart to render a continuous line
          const preparedData = [
            {
              month: "January",
              totalIncome: totalData.totalIncome[0]?.totalIncome * 0.9 || 0,
              totalExpense: totalData.totalAmount[0]?.totalAmount * 0.8 || 0,
            },
            {
              month: "February",
              totalIncome: totalData.totalIncome[0]?.totalIncome * 1.1 || 0,
              totalExpense: totalData.totalAmount[0]?.totalAmount * 0.95 || 0,
            },
            {
              month: "March",
              totalIncome: totalData.totalIncome[0]?.totalIncome * 1.2 || 0,
              totalExpense: totalData.totalAmount[0]?.totalAmount * 1.1 || 0,
            },
            {
              month: "April",
              totalIncome: totalData.totalIncome[0]?.totalIncome * 1.05 || 0,
              totalExpense: totalData.totalAmount[0]?.totalAmount * 1.2 || 0,
            },
            {
              month: "May",
              totalIncome: totalData.totalIncome[0]?.totalIncome * 1.3 || 0,
              totalExpense: totalData.totalAmount[0]?.totalAmount * 1.25 || 0,
            },
          ];

          setChartData(preparedData);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-gray-700 mb-6 md:mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-sm md:text-xl font-semibold text-gray-100 mb-4 md:mb-6 text-center">
        Income vs Expense Overview
      </h2>

      <div className="w-full text-xs md:text-xs h-64 sm:h-80 md:h-[400px]">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            {/* Y Axis for Total Income */}
            <YAxis
              yAxisId="left"
              stroke="#9CA3AF"
              label={{
                value: "Total Income",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: "10px" },
              }}
            />
            {/* Y Axis for Total Expense */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9CA3AF"
              label={{
                value: "Total Expense",
                angle: 90,
                position: "insideRight",
                style: { fontSize: "10px" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            {/* Line for Total Income */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalIncome"
              name="Total Income"
              stroke="#8B5CF6"
              strokeWidth={3}
            />
            {/* Line for Total Expense */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalExpense"
              name="Total Expense"
              stroke="#F87171"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueDualAxisChart;
