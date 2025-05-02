import express from "express";
import cors from "cors";
import copyProductContent from "./akeneoApi";
const app = express();
const port = 3010;

const raw = JSON.stringify({
  grant_type: "password",
  username: "akenoeconnect_9466",
  password: "376e69ee0",
});

app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://witty-fresh-beetle.ngrok-free.app",
    ], // Replace with your React app's URL
    methods: ["POST", "GET", "PATCH"],
    // credentials: true, // Optional: if using cookies or Authorization headers
  })
);

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Authorization",
  "Basic MTVfM2lnMWZ3ajQwbjBnc3N3b2d3ODhnZ29jazR3MDQ4Z2tvNHdvMHNvY3NnY284a2swYzA6NjJmZzQzYWw1YnN3MDhnb2cwbzRzNDhzdzhjOG9ra29nY3Nnb2NjNG8wd2trc3d3c2c="
);

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/token", async (_req, res) => {
  try {
    const response = await fetch(
      "https://valoriz.demo.cloud.akeneo.com/api/oauth/v1/token",
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Token fetch error:", error);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

app.post("/api/v1/copy", async (req, res) => {
  const source = req.body?.source ?? "";
  const dest = req.body?.dest ?? "";

  const authHeader = req.headers["authorization"];
  const token: string = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "OGJhZDA4YTIxYTFkZDE0YTRiNzk5ZmExYmJkMjY2YWUzZGQyYmU1YjkwMmQ1MmRiNDFhZTZmYjhlMmY1YzFiYQ";

  try {
    const data = await copyProductContent(source, dest, token);
    res.json(data);
  } catch (error) {
    console.error("Content Copy Error:", error);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
