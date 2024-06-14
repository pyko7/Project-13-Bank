import { postFetch } from "../api/postFetch";

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (data) => {
  const url = `${apiUrl}/user/login`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const user = postFetch(url, options);
  return user;
};
