import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { get } from "../services/ApiEndpoint"
import { useDispatch } from "react-redux"
import { SetUser } from "../redux/AuthSlice"
import Sidebar from "../components/common/Sidebar"

export default function ProtectedLayout() {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const request = await get('/api/auth/CheckUser');
                if (request.data) {
                    dispatch(SetUser(request.data));
                } else {
                    navigate('/login')
                }
            } catch (error) {
                navigate('/login')
            }
        })()
    }, []);

    return (
        <>
         <Sidebar />
         <Outlet />
        </>
       
    )
}
