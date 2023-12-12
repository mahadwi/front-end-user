import { cookies } from "next/headers";
import { baseUrl } from "./constant";

const fetchWithTokenServer = async (endpoint, method, options) => {
  const token = cookies().get(`accessToken`).value;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options?.headers, // Merge additional headers if provided in options
  };

  const requestOptions = {
    method,
    headers,
    ...options,
  };

  const url = `${baseUrl}/${endpoint}`;
  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    if (response.statusText === `Unauthorized`) {
      return `Unauthorized`;
    }
    console.log(url, requestOptions);
    return data.message || "Error fetching data";
  }

  return data;
};
export default fetchWithTokenServer;
