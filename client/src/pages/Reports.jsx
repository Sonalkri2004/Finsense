import Header from "../components/common/Header";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import RevenueChart from "../components/analytics/RevenueChart";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import OverviewCards from "../components/analytics/OverviewCards";


const OverviewPage = () => {

	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Report Insights' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<OverviewCards />

				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />

				</div>
				<div className='grid grid-cols-1 mt-4'>
					<RevenueChart />
				</div>
				<AIPoweredInsights />
			</main>


		</div>
	);
};
export default OverviewPage;