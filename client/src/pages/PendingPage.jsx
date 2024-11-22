import Header from "../components/common/Header";

import PendingTable from "../components/pending/PendingTable";
import OverviewCards from "../components/analytics/OverviewCards";

const ProductsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Pending' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<OverviewCards />

				<PendingTable />

				{/* CHARTS */}
				{/* <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div> */}
			</main>
		</div>
	);
};
export default ProductsPage;