import { postFetch } from "../api/postFetch";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchUserData = async (token) => {
  const url = `${apiUrl}/user/profile`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const user = await postFetch(url, options);
  return user;
};

export const updateUser = async (token, data) => {
  const url = `${apiUrl}/user/profile`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const user = await postFetch(url, options);
  return user;
};
