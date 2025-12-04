import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { UserContext } from "../App";

const UserNavigationPanel = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUserAuth(null);

    // OPTIONAL: redirect user to signup or login page
    navigate("/signin");
  };

  // Avoid errors if userAuth is null (after logout or before signup)
  const fullname = userAuth?.fullname || "guest";

  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200">

        {/* Write Button */}
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit text-lg"></i>
          <p>Write</p>
        </Link>

        {/* Profile */}
        {userAuth && (
          <Link to={`/user/${fullname}`} className="link pl-8 py-4">
            Profile
          </Link>
        )}

        <span className="absolute border-t border-grey w-[100%]"></span>

        {/* Sign Out */}
        {userAuth && (
          <button
            className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
            onClick={handleSignOut}
          >
            <h1 className="font-bold text-xl mg-1">Sign Out</h1>
            <p className="text-dark-grey">@{fullname}</p>
          </button>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
