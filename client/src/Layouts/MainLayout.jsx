import Sidebar from "../components/common/Sidebar"
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <Sidebar />
            <Outlet />
        </div>
    )

}