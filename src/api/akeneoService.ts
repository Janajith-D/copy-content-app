export const getAkeneoToken = async () => {
  try {
    const response = await fetch("/api/oauth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic MTVfM2lnMWZ3ajQwbjBnc3N3b2d3ODhnZ29jazR3MDQ4Z2tvNHdvMHNvY3NnY284a2swYzA6NjJmZzQzYWw1YnN3MDhnb2cwbzRzNDhzdzhjOG9ra29nY3Nnb2NjNG8wd2trc3d3c2c=",
      },
      body: JSON.stringify({
        grant_type: "password",
        username: "akenoeconnect_9466",
        password: "376e69ee0",
      }),
      redirect: "follow",
    }).catch();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result?.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
