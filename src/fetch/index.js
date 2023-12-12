import { baseUrl } from "@/lib/constant";

const fetchData = async (api, method, revalidate, body) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  // console.log(options);
  const data = await fetch(
    `${baseUrl}/${api}`,

    { ...revalidate, ...options }
  );
  const response = await data.json();
  return response;
};

export default fetchData;
