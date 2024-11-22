import { User } from "lucide-react";
import user from "../../assets/userr.png";
import SettingSection from "./SettingSection";
import { useSelector } from "react-redux";

const Profile = () => {
  const userDetails = useSelector((state) => state.AuthSlice?.user);
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col gap-6 sm:gap-14 h-auto sm:flex-row items-center mb-6">
        <img
          src={user}
          alt="Profile"
          className="rounded-full w-24 h-24 sm:w-40 sm:h-40 object-cover mr-0 sm:mr-4"
        />

        <div className="text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-gray-100">
            Name: {userDetails?.name}
          </h3>
          <p className="text-sm sm:text-base text-gray-400">
            Email: {userDetails?.email}
          </p>

          <p className="text-sm sm:text-base  ">
            Role:{" "}
            <span className="bg-blue-100 rounded-xl text-center px-2 text-black">
              {userDetails?.role}
            </span>
          </p>
        </div>
      </div>

      {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
		  Edit Profile
		</button> */}
    </SettingSection>
  );
};
export default Profile;
