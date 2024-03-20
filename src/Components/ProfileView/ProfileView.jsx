import { useEffect, useState } from "react";
import "./ProfileView.css";
import { getUserProfileAndQuizzesById } from "../../Services/profileService";
import { CreateProfilePosts } from "./CreateProfilePosts/CreateProfilePosts";

export const ProfileView = ({ currentUser }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState([]);

  useEffect(() => {
    getUserProfileAndQuizzesById(currentUser).then((currentObj) => {
      setCurrentUserInfo(currentObj);
    });
  }, [currentUser]);

  return (
    <div className="ProfileView-main-container">
      <div className="ProfileView-profileinfo-container">
        <p>{currentUserInfo.displayname}</p>
        <p>{currentUserInfo.name}</p>
        <p>
          <img className="imgthing" src={currentUserInfo.profilepicture} />
        </p>
      </div>
      <div className="ProfileView-profile-posts">
        {currentUserInfo?.quiz?.length != 0 ? (
          <div>
            {currentUserInfo?.quiz?.map((quizObj) => {
              return <CreateProfilePosts key={quizObj.id} quizObj={quizObj} />;
            })}
          </div>
        ) : (
          "No Posts"
        )}
      </div>
    </div>
  );
};
