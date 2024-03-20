import "./NavbarProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../Services/userService";

export const NavbarProfile = ({ currentUser }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    getUserById(currentUser?.id).then((userProfileArray) => {
      setUserProfile(userProfileArray);
    });
  }, [currentUser]);

  return (
    <>
      <div className="Profile-Container">
        <div className="Profile-Picture">
          <img src={userProfile?.profilepicture} />
        </div>
        <div>
          <p>{userProfile?.displayname}</p>
          <p>
            {userProfile?.name}
            <button
              onClick={() => {
                localStorage.removeItem("signed_user");
                navigate(`/login`);
              }}
            >
              Logout
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
