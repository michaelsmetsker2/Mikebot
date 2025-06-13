import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { WebSocketServer } from "ws";
import http from "http";

dotenv.config({ path: "../.env" });

const app = express();
const port = 3001;

//creat an HTTP server to use with both Express and Websocket
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Allow express to parse JSON bodies
app.use(express.json());

// Discord OAuth2 endpoint
app.post("/api/token", async (req, res) => {
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json();
  // Return the access_token to our client as { access_token: "..."}
  res.send({access_token});
});

wss.on("connection", (ws) => {
  console.log('someone connected');

  ws.on("message", (data) => {
    console.log("received message: ", data.toString());

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(data.tostring0());
      }
    })
  })

  ws.setMaxListeners('welcome to hell bitches')
});

server.listen(port, () => {
  console.log(`Server and websocket listening at http://localhost:${port}`);
});