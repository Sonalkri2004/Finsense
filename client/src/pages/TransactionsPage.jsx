import Header from "../components/common/Header";
import OverviewCards from "../components/analytics/OverviewCards";
import TransactionTable from "../components/transactions/TransactionsTable";
import NoteSheet from "../components/analytics/NoteSheet";
import PayVoucher from "../components/analytics/PayVoucher";
const AnalyticsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title={"Transactions History"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <OverviewCards />
        <TransactionTable />
        {/* <PayVoucher/> */}
        {/* <NoteSheet /> */}
      </main>
    </div>
  );
};
export default AnalyticsPage;
