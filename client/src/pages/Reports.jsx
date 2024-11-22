import Header from "../components/common/Header";
import CategoryDistributionChart from "../components/analytics/CategoryDistributionChart";
import RevenueChart from "../components/analytics/RevenueChart";
import OverviewCards from "../components/analytics/OverviewCards";
import TRANSACTION_FLOW from "../components/analytics/TransactionFlow";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Report Insights" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <OverviewCards />

        {/* CHARTS */}
        <div className="grid grid-cols-1 mt-4 mb-4">
          <CategoryDistributionChart />
        </div>
        <div className="grid grid-cols-1  gap-8">
          <RevenueChart />
        </div>

        <TRANSACTION_FLOW />
      </main>
    </div>
  );
};
export default OverviewPage;
