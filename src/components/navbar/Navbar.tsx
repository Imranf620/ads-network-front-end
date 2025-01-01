import { useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="hidden md:flex space-x-6">
          <Link to="/domains" className="text-white">
            Domains
          </Link>
          <Link to="/stats" className="text-white">
            Stats
          </Link>
          <Link to="/advertisers" className="text-white">
            Advertisers
          </Link>
          <Link to="/monitizers" className="text-white">
            Monitizers
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <Close className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link to="/domains" className="text-white">
            Domains
          </Link>
          <Link to="/stats" className="text-white">
            Stats
          </Link>
          <Link to="/advertisers" className="text-white">
            Advertisers
          </Link>
          <Link to="/monitizers" className="text-white">
            Monitizers
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
