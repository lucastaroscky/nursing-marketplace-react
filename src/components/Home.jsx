import React, { useState, useEffect, useCallback } from "react";
import Cookies from "cookies-js";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../services/apiService";
import { banUser, revokeAccess } from "../services/apiService";
import { deleteCookie, getCookie } from "../utils.js/cookie";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const users = await fetchUsers();

    if (users) {
      setUsers(users);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleBanUser = async (userId) => {
    try {
      await banUser(userId);

      if (users.find((user) => user.id === userId)) {
        deleteCookie("token");
        deleteCookie("refreshToken");
        deleteCookie("userId");

        navigate("/login");
      }

      alert("user banned");
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      console.error("Error banning user:", error);
    }
  };

  const handleInvalidateToken = async (userId) => {
    try {
      await revokeAccess(userId);

      deleteCookie.expire("token");
      deleteCookie("refreshToken");
      deleteCookie("userId");

      navigate("/login");

      alert("Token invalidated and logged out successfully");
    } catch (error) {
      console.error("Error invalidating token:", error);
    }
  };

  const handleLogout = () => {
    Cookies.expire("token");
    Cookies.expire("refreshToken");
    Cookies.expire("userId");

    navigate("/login");
  };

  return (
    <div>
      <h1>Users List</h1>
      <button onClick={handleLogout}>Logout</button>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>User: {user.email}</p>
              <button onClick={() => handleBanUser(user.id)}>Ban User</button>
              <button onClick={() => handleInvalidateToken(user.id)}>
                Invalidate Token
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;
