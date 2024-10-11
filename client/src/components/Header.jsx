import { Link, useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import brainwave from "../assets/brainwave-symbol.svg";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../redux/AuthSlice";
import axios from "axios";

const Header = () => {
  // const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const userDetails = useSelector(state => state.AuthSlice?.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(userDetails)

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });

      if (response.data) {
        dispatch(Logout())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
    >
      <div className="flex items-center px-5 py-4 lg:px-7.5 xl:px-10 max-lg:py-4 justify-between">
        <a className="w-[12rem] xl:mr-8 flex" href="#hero">
          <img src={brainwave} width={30} height={20} alt="FinSense" />   <h1 className="justify-center items-center text-xl">FinSense AI</h1>
        </a>

        <div className="block lg:hidden">
          <nav
            className={`${openNavigation ? "flex" : "hidden"
              } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={handleClick}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === location.pathname
                      ? "z-2 lg:text-n-1"
                      : "lg:text-n-1/50"
                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </a>
              ))}
            </div>

            <HamburgerMenu />
          </nav>
        </div>

        {
          !userDetails ? (
            <div className="flex items-center">
              <Link
                to={'/register'}
                className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
              >
                New account
              </Link>

              <Button onClick={() => navigate('/login')} className="hidden lg:flex">
                Sign in
              </Button>
            </div>
          ) : (
            <Button onClick={handleLogout} className="hidden lg:flex">
              Sign out
            </Button>
          )
        }

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
