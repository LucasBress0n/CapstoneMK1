import "./Navbar.css";
import { Link } from "react-router-dom";
import { NavbarProfile } from "./NavbarProfile/NavbarProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Navbar = ({ currentUser, updateCurrentUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    updateCurrentUser();
  }, []);
  return (
    <>
      <div className="directory-container">
        <ul className="navbar-list">
          <div className="navbar-signeduser-only">
            {currentUser?.id ? (
              <li className="navbar-item">
                <Link className="navbar-link" to="/home">
                  <img
                    src="./src/Components/images/houseimg.png"
                    className="navbar-img-forlist"
                  />
                  Home
                </Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link className="navbar-link" to="/login">
                  <img
                    src="./src/Components/images/houseimg.png"
                    className="navbar-img-forlist"
                  />
                  Home
                </Link>
              </li>
            )}
            {currentUser?.id ? (
              <li className="navbar-item">
                <Link className="navbar-link" to="/explore">
                  <img
                    src="./src/Components/images/magnifyingglass.png"
                    className="navbar-img-forlist"
                  />
                  Explore
                </Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link className="navbar-link" to="/login">
                  <img
                    src="./src/Components/images/magnifyingglass.png"
                    className="navbar-img-forlist"
                  />
                  Explore
                </Link>
              </li>
            )}
          </div>
          <div className="navbar-profileonly">
            {currentUser?.id && (
              <li className="navbar-item">
                <Link className="navbar-link" to="/create">
                  <img
                    src="./src/Components/images/pencil.png"
                    className="navbar-img-forlist"
                  />
                  Create
                </Link>
              </li>
            )}
            {currentUser?.id && (
              <li className="navbar-item">
                <Link className="navbar-link" to="/profile">
                  <img
                    src="./src/Components/images/useravatar.png"
                    className="navbar-img-forlist"
                  />
                  Profile
                </Link>
              </li>
            )}
            {currentUser?.id && (
              <li className="navbar-item">
                <Link className="navbar-link" to="/settings">
                  <img
                    src="./src/Components/images/gear.png"
                    className="navbar-img-forlist"
                  />
                  Settings
                </Link>
              </li>
            )}
          </div>
        </ul>
        {currentUser?.id ? (
          <NavbarProfile currentUser={currentUser} />
        ) : (
          <button
            className="navbar-login-button navbar-not-signed-in"
            onClick={() => {
              navigate(`/login`);
            }}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
};
