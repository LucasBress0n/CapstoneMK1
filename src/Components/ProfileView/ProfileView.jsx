import { useEffect, useState } from "react";
import "./ProfileView.css";
import { getUserProfileAndQuizzesById } from "../../Services/profileService";
import { CreateProfilePosts } from "./CreateProfilePosts/CreateProfilePosts";

export const ProfileView = ({ currentUser }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      getUserProfileAndQuizzesById(currentUser).then((currentObj) => {
        setCurrentUserInfo(currentObj);
      });
    }
  }, [currentUser, refresh]);

  return (
    <div className="ProfileView-main-container">
      <div className="ProfileView-profileinfo-container">
        <div className="ProfileView-profile-picture-container">
          <img className="imgthing" src={currentUserInfo.profilepicture} />
        </div>
        <div className="ProfileView-profile-names-container">
          <p>{currentUserInfo.displayname}</p>
          <p>{currentUserInfo.name}</p>
        </div>
      </div>
      <div className="ProfileView-profile-posts-container">
        {currentUserInfo?.quiz?.length != 0 ? (
          <>
            {currentUserInfo?.quiz?.map((quizObj) => {
              return (
                <CreateProfilePosts
                  key={quizObj.id}
                  quizObj={quizObj}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
              );
            })}
          </>
        ) : (
          "No Posts"
        )}
      </div>
    </div>
  );
};
