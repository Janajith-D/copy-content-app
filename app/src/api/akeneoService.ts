import { CopyRequestBody, TokenResponse } from "../common/lib/types";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const host: string = import.meta.env.API_HOST ?? "localhost:3010";

export const getToken = async () => {
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };
  const response = await fetch(`http://${host}/api/v1/token`, requestOptions);
  const result: TokenResponse = await response.json();
  return result;
};

export const copyContent = async (
  requestBody: CopyRequestBody,
  token: string
) => {
  myHeaders.append("Authorization", token);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(`http://${host}/api/v1/copy`, requestOptions);
  const result: string = await response.json();
  return result;
};
