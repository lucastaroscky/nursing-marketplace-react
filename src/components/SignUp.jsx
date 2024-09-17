import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/apiService";
import { setCookie } from "../utils.js/cookie";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUp({ name, email, password });
      const { id, token, refreshToken } = response;

      if (response) {
        setCookie("token", token);
        setCookie("refreshToken", refreshToken);
        setCookie("userId", id, { expires: 7 });

        navigate("/home");
      }
    } catch (error) {
      alert(`Ocorreu um erro: ${error.name} - ${error.message}`);

      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
