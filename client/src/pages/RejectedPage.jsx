import Header from "../components/common/Header";
import RejectedTable from "../components/users/RejectedTable";
import OverviewCards from "../components/analytics/OverviewCards";

const UsersPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Rejected' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<OverviewCards />
				<RejectedTable />
			</main>
		</div>
	);
};
export default UsersPage;