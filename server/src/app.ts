import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import copyProductContent from "./akeneoApi";

const app = express();
const port = 3010;

dotenv.config();

const host = process.env.BASE_URL ?? "";
const client_Id = process.env.CLIENT_ID ?? "";
const userName = process.env.USER_NAME ?? "";
const password = process.env.PASSWORD ?? "";

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
myHeaders.append("Authorization", `Basic ${client_Id}`);

app.post("/api/v1/token", async (_req, res) => {
  try {
    const raw = JSON.stringify({
      grant_type: "password",
      username: userName,
      password: password,
    });

    const response = await fetch(`${host}/api/oauth/v1/token`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Token fetch error:", error);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

app.post("/api/v1/copy", async (req, res) => {
  const source: string = req.body?.source ?? "";
  const dest: string = req.body?.dest ?? "";

  const authHeader = req.headers["authorization"];
  const token: string = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

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
