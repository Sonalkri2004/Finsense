import { motion } from "framer-motion";
import { IndianRupee, ArrowLeftRight, Clock } from "lucide-react";

const overviewData = [
	{
		name: "Monthly Income",
		value: "$1,234,567",
		change: 12.5,
		icon: (
			<div
				className={`p-3 rounded-full bg-opacity-20 bg-green-500`}>
				<IndianRupee className="text-green-500" />
			</div>
		)
	},
	{
		name: "Monthly Expense",
		value: "45,678",
		change: 8.3,
		icon: (
			<div
				className={`p-3 rounded-full bg-opacity-20 bg-red-500`}>
				<IndianRupee className="text-red-500" />
			</div>
		)
	},
	{
		name: "Total Transactions",
		value: "9,876",
		change: -3.2,
		icon: (
			<div
				className={`p-3 rounded-full bg-opacity-20 bg-green-500`}>
				<ArrowLeftRight className="text-green-500" />
			</div>
		)
	},
	{
		name: "Pending Transaction",
		value: "1,234,567",
		change: 15.7,
		icon: (
			<div
				className={`p-3 rounded-full bg-opacity-20 bg-yellow-500`}>
				<Clock className="text-yellow-500" />
			</div>
		)
	},
];

const OverviewCards = () => {
	return (
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
			{overviewData.map((item, index) => (
				<motion.div
					key={item.name}
					className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<div className='flex items-center justify-between'>
						<div>
							<h3 className='text-sm font-medium text-gray-400'>{item.name}</h3>
							<p className='mt-1 text-xl font-semibold text-gray-100'>{item.value}</p>
						</div>

						{item.icon}
					</div>
				</motion.div>
			))}
		</div>
	);
};
export default OverviewCards;