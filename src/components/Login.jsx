import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/apiService";
import { getCookie, setCookie } from "../utils.js/cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn({ email, password });

      if (response?.accessToken) {
        setCookie("token", response?.accessToken);
        setCookie("refreshToken", response?.refreshToken);

        navigate("/");
      }

      return;
    } catch (error) {
      console.log("catch", error);
      alert(error.response?.data?.message);

      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
