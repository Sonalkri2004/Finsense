import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Accountant from '../pages/Accountant';
import Bursar from '../pages/Bursar';
import Principal from '../pages/Principal';

export default function MainLayout() {

    const user = useSelector((state) => state.AuthSlice.user);

    console.log(user?.role)

    switch (user?.role) {
        case "admin":
            return <Admin />

        case "accountant":
            return <Accountant />

        case "bursar":
            return <Bursar />

        case "principal":
            return <Principal />

        default:
            return <Home />
    }
}
