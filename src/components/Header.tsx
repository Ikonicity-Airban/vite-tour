import { Link } from "react-router-dom";
import NavbarComponent from "./Navbar";

function Header() {
  return (
    <header className="flex flex-col w-full text-base">
      <div className="hidden md:flex w-full bg-gray-50 p-4">
        <div className="flex w-full md:container mx-auto justify-between p-4 pb-10">
          <div className="text-center text-lg-left mb-2 mb-lg-0">
            <div className="inline-flex items-center">
              <p>
                <i className="fa fa-envelope mr-2"></i>info@estb.com
              </p>
              <p className="text-body px-3">|</p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+012 345 6789
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex align-items-center">
              <Link to="" className="p-2 icon-button">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="" className="p-2 icon-button">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="" className="p-2 icon-button">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="" className="p-2 icon-button">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="" className="p-2 icon-button">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <NavbarComponent />
    </header>
  );
}

export default Header;
