import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const ProfilePage = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [email, setEmail] = useState("");

  // Redirect to /signin if not logged in
  useEffect(() => {
    if (!userAuth) navigate("/signin");
    else {
      setName(userAuth.name || "");
      setBio(userAuth.bio || "");
      setProfileImg(userAuth.profile_img || "");
      setEmail(userAuth.email || "");
    }
  }, [userAuth, navigate]);

  const handleSave = () => {
    const updatedUser = { ...userAuth, name, bio, profile_img: profileImg, email };
    setUserAuth(updatedUser);

    // Optional: send updated data to backend API
    // fetch("https://your-api.com/api/profile", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userAuth?.token}`,
    //   },
    //   body: JSON.stringify(updatedUser),
    // });

    setEditMode(false);
  };

  if (!userAuth) return null; // Prevent flash if redirecting

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-semibold mb-6">Your Profile</h1>

      <div className="flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={profileImg || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
          {editMode && (
            <input
              type="text"
              placeholder="Enter image URL"
              value={profileImg}
              onChange={(e) => setProfileImg(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded w-64 text-center"
            />
          )}
        </div>

        {/* Name */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">Name</label>
          {editMode ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          ) : (
            <p className="text-lg">{name || "No name set"}</p>
          )}
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">Email</label>
          <p className="text-lg text-gray-700">{email}</p>
        </div>

        {/* Bio */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">Bio</label>
          {editMode ? (
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Write something about yourself..."
            />
          ) : (
            <p className="text-gray-700">{bio || "No bio yet."}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="btn-dark py-2 px-6 rounded hover:bg-black/80"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="btn-light py-2 px-6 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="btn-dark py-2 px-6 rounded hover:bg-black/80"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
