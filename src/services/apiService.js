import axiosInstance from "../provider/axiosProvider";
import { deleteCookie, getCookie, setCookie } from "../utils.js/cookie";

export const fetchUsers = async () => {
  try {
    const token = getCookie("token");

    const response = await axiosInstance.get("user/list", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response?.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("auth/sign-in", {
      email,
      password,
    });

    return response?.data;
  } catch (error) {
    console.log("erroapi", error);
    throw error;
  }
};

export const signUp = async ({ name, email, password }) => {
  try {
    const response = await axiosInstance.post("auth/sign-up", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    const token = getCookie("token");

    const response = await axiosInstance.post(
      "auth/sign-out",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error trying to sign up:", error);
  }
};

export const banUser = async (userId) => {
  try {
    const token = getCookie("token");

    const response = await axiosInstance.post(
      `user/ban/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error trying to sign up:", error);
  }
};

export const revokeAccess = async (userId) => {
  try {
    const token = getCookie("token");

    const response = await axiosInstance.post(
      `auth/revoke-access/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error trying to sign up:", error);
  }
};

export const refreshToken = async () => {
  try {
    const token = getCookie("refreshToken");

    const response = await axiosInstance.post(
      `auth/refresh-token`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("response", response);

    deleteCookie("token");
    setCookie("token", response.data.accessToken);

    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};
