import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  FilePlus,
  Eye,
  CheckCircle,
  Repeat,
  Download,
} from "lucide-react";

const TRANSACTION_FLOW_DATA = [
  {
    icon: FilePlus,
    color: "text-green-500",
    insight:
      "Step 1: **Create Transaction** - The Accountant initiates a transaction by entering income or expense details. The transaction starts in the 'Pending' state.",
  },
  {
    icon: Eye,
    color: "text-blue-500",
    insight:
      "Step 2: **Verify Transaction** - The Bursar reviews the transaction in the 'Pending' state. Upon verification, it moves to the 'Verified' state. If rejected, it goes back to the 'Rejected' state.",
  },
  {
    icon: CheckCircle,
    color: "text-purple-500",
    insight:
      "Step 3: **Approve Transaction** - The Principal reviews transactions in the 'Verified' state. Once approved, the transaction enters the 'Approved' state. Rejected transactions move back to the 'Rejected' state.",
  },
  {
    icon: DollarSign,
    color: "text-yellow-500",
    insight:
      "Step 4: **Complete Transaction** - The Accountant finalizes transactions in the 'Approved' state, marking them as 'Completed'.",
  },
  {
    icon: Repeat,
    color: "text-red-500",
    insight:
      "Step 5: **Handle Rejected Transactions** - Rejected transactions are reassigned to the 'Pending' state by the Accountant after necessary corrections.",
  },
  {
    icon: Download,
    color: "text-orange-500",
    insight:
      "Step 6: **Generate Reports** - Any role can download transaction history and reports at any stage in PDF format for record-keeping.",
  },
];

const TRANSACTION_FLOW = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <h2 className="text-lg md:text-xl font-semibold text-gray-100 mb-3 md:mb-4">
        Transaction Flow
      </h2>
      <div className="space-y-3 md:space-y-4">
        {TRANSACTION_FLOW_DATA.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 md:space-x-3">
            <div
              className={`p-2 md:p-3 rounded-full ${item.color} bg-opacity-20`}
            >
              <item.icon className={`size-5 md:size-6 ${item.color}`} />
            </div>
            <p className="text-sm md:text-base text-gray-300">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default TRANSACTION_FLOW;
