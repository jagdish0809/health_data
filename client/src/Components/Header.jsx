import React, { useState } from "react";
import "./Header.css";

const Header = ({ isLoggedIn, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setShowEditForm(false);
    setEmail("");
    setPassword("");
  };

  const handleEditClick = () => {
    setShowEditForm(true);
  }

    const logouthandle = () => {
    localStorage.setItem("loggedIn", false);
    window.location.reload();
    }
  return (
    <div className="app__login">
      {isLoggedIn ? (
        <div className="app__login_div">
          <h2 onClick={logouthandle}>Logout</h2>
        </div>
      ) : (
        <div className="app__login_div">
          <h2 onClick={handleEditClick}>Login</h2>
        </div>
      )}
      {showEditForm && (
        <div className="edit-form overlay">
          <div className="edit-form-div">
            <form className="app__login_div" onSubmit={handleLoginFormSubmit}>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="form-btn" type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
