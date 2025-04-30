import { TokenResponse } from "../common/lib/types";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const getToken = async () => {
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };
  const response = await fetch(
    "http://localhost:3010/api/v1/token",
    requestOptions
  );
  const result: TokenResponse = await response.json();
  return result;
};
