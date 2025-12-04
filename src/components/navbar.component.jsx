import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const { userAuth } = useContext(UserContext);
  const [userNavPanel, setUserNavPanel] = useState(false); 

  const handleUserNavPanel = () => {
    setUserNavPanel(currentVal => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  return (
    <>
      <nav className="navbar flex items-center justify-between px-6 py-4 border-b border-gray-200 relative">
        {/* Logo */}
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" alt="logo" />
        </Link>

        {/* Search Box - only show when NOT logged in */}
        {!userAuth && (
          <div
            className={
              "absolute bg-white w-full left-0 top-full mt-0 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " +
              (searchBoxVisibility ? "show" : "hide")
            }
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            />
            <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/4 translate-y-1 text-xl text-dark-grey"></i>
          </div>
        )}

        {/* Right-side section */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          {/* Mobile search toggle - only for non-authenticated users */}
          {!userAuth && (
            <button
              className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
              onClick={() =>
                setSearchBoxVisibility((currentVal) => !currentVal)
              }
            >
              <i className="fi fi-rr-search text-xl"></i>
            </button>
          )}

          {/* "Write" link - always visible on md+ screens */}
          <Link
            to="/editor"
            className="hidden md:flex gap-2 link items-center py-2 px-3 hover:bg-black/10 rounded-md transition"
          >
            <p>Write</p>
            <i className="fi fi-rr-file-edit text-lg"></i>
          </Link>

          {userAuth ? (
            <>
              {/* Authenticated users */}
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-gray-200 relative hover:bg-black/10 flex items-center justify-center">
                  <i className="fi fi-rr-bell text-2xl"></i>
                </button>
              </Link>

              <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                <button className="w-12 h-12">
                  <img
                    src={userAuth?.profile_img}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
                {userNavPanel && <UserNavigationPanel />}
              </div>
            </>
          ) : (
            <>
              {/* Non-authenticated users */}
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>
              <Link className="btn-light py-2 hidden md:block" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
