import { useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/userSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Navbar = ({ user }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    const res = await dispatch(logoutUser());
    if (res.payload.success) {
      toast.success(res.payload.message);
      navigate("/");
    }
  };
  

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-2xl cursor-pointer">
          <Link to="/">BrandLogo</Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="text-white hover:text-blue-300 transition-all duration-200"
            >
              Domains
            </Link>
          )}
          {!user && (
            <Link
              to="/auth"
              className="text-white hover:text-blue-300 transition-all duration-200"
            >
              Sign In
            </Link>
           )}
          {/* <Link
            to="/stats"
            className="text-white hover:text-blue-300 transition-all duration-200"
          >
            Stats
          </Link> */}
          {user?.role==="advertiser" && <Link
            to="/advertisers"
            className="text-white hover:text-blue-300 text-lg transition-all duration-200"
          >
            Advertisement
          </Link>}
         {user?.role==="monetizer" && <Link
            to="/monitizers"
            className="text-white hover:text-blue-300 text-lg transition-all duration-200"
          >
            Monetization
          </Link>}
          {user && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              size="small"
              className="ml-4"
            >
              Logout
            </Button>
          )}
        </div>
        <button
          onClick={toggleMobileMenu}
          className="md:hidden focus:outline-none text-white"
        >
          {isMobileMenuOpen ? (
            <Close className="text-3xl" />
          ) : (
            <Menu className="text-3xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-screen w-full bg-blue-700 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="text-white font-bold text-2xl">
            <Link to="/">BrandLogo</Link>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-white"
          >
            <Close className="text-3xl" />
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-8">
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="text-white hover:text-blue-300 text-lg transition-all duration-200"
            >
              Domains
            </Link>
          )}
          {/* <Link
            to="/stats"
            className="text-white hover:text-blue-300 text-lg transition-all duration-200"
          >
            Stats
          </Link> */}
          {user?.role==="advertiser" && <Link
            to="/advertisers"
            className="text-white hover:text-blue-300 text-lg transition-all duration-200"
          >
            Advertisement
          </Link>}
         {user?.role==="monetizer" && <Link
            to="/monitizers"
            className="text-white hover:text-blue-300 text-lg transition-all duration-200"
          >
            Monetization
          </Link>}
          {user && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              size="small"
              className="mt-4"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
