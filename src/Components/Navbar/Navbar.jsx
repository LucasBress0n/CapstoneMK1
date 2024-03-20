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
                  Home
                </Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link className="navbar-link" to="/login">
                  Home
                </Link>
              </li>
            )}
            {currentUser?.id ? (
              <li className="navbar-item">
                <Link className="navbar-link" to="/explore">
                  Explore
                </Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link className="navbar-link" to="/login">
                  Explore
                </Link>
              </li>
            )}
          </div>
          <div className="navbar-profileonly">
            {currentUser?.id && (
              <li className="navbar-item">
                <Link className="navbar-link" to="/create">
                  Create
                </Link>
              </li>
            )}
            {currentUser?.id && (
              <li className="navbar-item">
                <Link className="navbar-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}
            {currentUser?.id && (
              <li className="navbar-item">
                <Link className="navbar-link" to="/settings">
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
            className="navbar-login-button"
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
