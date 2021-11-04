import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

app.get("/api/test", (req, res) => {
  res.send({ test: "OK" });
});

server.listen(3030, () => {
  console.log("listening on *:3030");
});
