import { motion } from "framer-motion";
import Header from "../components/common/Header";
import CreateIncome from "../components/accountant/CreateIncome";

const OrdersPage = () => {
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Incomes"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <CreateIncome />
        </motion.div>
      </main>
    </div>
  );
};
export default OrdersPage;
