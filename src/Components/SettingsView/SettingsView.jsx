import { useEffect, useState } from "react";
import "./SettingsView.css";
import {
  getAllUsersSettings,
  updateUserSettings,
} from "../../Services/settingsService";
import { useNavigate } from "react-router-dom";

export const SettingsView = ({ currentUser }) => {
  const [userSettings, setUserSettings] = useState({});

  useEffect(() => {
    if (currentUser?.id) {
      getAllUsersSettings(currentUser).then((obj) => {
        setUserSettings(obj[0]);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(userSettings);
  }, [userSettings]);
  const navigate = useNavigate();

  return (
    <main className="SettingsView-main-container">
      <div className="SettingsView-option-container">
        {/* {userSettings.isLightMode === true ? (
          <section>
            <input
              id="lightmode"
              type="checkbox"
              onClick={() => {
                const copy = { ...userSettings };
                copy.isLightMode = false;
                setUserSettings(copy);
              }}
              defaultChecked
            />
            <label htmlFor="lightmode">Lightmode</label>
          </section>
        ) : (
          <section>
            <input
              id="lightmode"
              type="checkbox"
              onClick={() => {
                const copy = { ...userSettings };
                copy.isLightMode = true;
                setUserSettings(copy);
              }}
            />
            <label htmlFor="lightmode">Lightmode</label>
          </section>
        )} */}
        {userSettings.displayAccountName === true ? (
          <section>
            <input
              id="name"
              type="checkbox"
              onClick={() => {
                const copy = { ...userSettings };
                copy.displayAccountName = false;
                setUserSettings(copy);
              }}
              defaultChecked
            />
            <label htmlFor="name">Hide Displayname</label>
          </section>
        ) : (
          <section>
            <input
              id="name"
              type="checkbox"
              onClick={() => {
                const copy = { ...userSettings };
                copy.displayAccountName = true;
                setUserSettings(copy);
              }}
            />
            <label htmlFor="name">Hide Displayname</label>
          </section>
        )}
        {userSettings.hideLikes === true ? (
          <section>
            <input
              id="likes"
              type="checkbox"
              onClick={() => {
                const copy = { ...userSettings };
                copy.hideLikes = false;
                setUserSettings(copy);
              }}
              defaultChecked
            />
            <label htmlFor="likes">Hidelikes</label>
          </section>
        ) : (
          <section>
            <input
              id="likes"
              type="checkbox"
              onClick={() => {
                const copy = { ...userSettings };
                copy.hideLikes = true;
                setUserSettings(copy);
              }}
            />
            <label htmlFor="likes">Hidelikes</label>
          </section>
        )}
        <footer>
          <button
            onClick={() => {
              updateUserSettings(userSettings);
              navigate(`/home`);
            }}
          >
            Save
          </button>
        </footer>
      </div>
    </main>
  );
};
