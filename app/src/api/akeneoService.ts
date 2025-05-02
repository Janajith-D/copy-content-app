import { CopyRequestBody, TokenResponse } from "../common/lib/types";

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

export const copyContent = async (requestBody: CopyRequestBody) => {
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(
    "http://localhost:3010/api/v1/copy",
    requestOptions
  );
  const result: string = await response.json();
  return result;
};
