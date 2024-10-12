import { motion } from "framer-motion";
import Header from "../components/common/Header";
import CreateExpense from "../components/accountant/CreateExpense";

const SalesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Expenses" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <CreateExpense />
        </motion.div>
      </main>
    </div>
  );
};
export default SalesPage;
