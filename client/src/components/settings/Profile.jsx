import { User } from "lucide-react";
import user from '../../assets/userr.png';
import SettingSection from "./SettingSection";
import { useSelector } from "react-redux";

const Profile = () => {
	const userDetails = useSelector(state => state.AuthSlice?.user)
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className=' flex flex-col gap-14  h-40  sm:flex-row items-center mb-6'>
				<img
					src={user}
					alt='Profile'
					className='rounded-full w-40 h-40 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>{userDetails.name}</h3>
					<p className='text-gray-400 '>{userDetails.email}</p>
				</div>
			</div>

			{/* <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Edit Profile
			</button> */}
		</SettingSection>
	);
};
export default Profile;