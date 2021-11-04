import http from "http";
import express from "express";
import cors from "cors";

import { checkFavorite, saveFavorite } from "./book";

const app = express();
const server = http.createServer(app);

app.use(cors());

app.post("/api/saveFavorite/:id", saveFavorite);
app.get("/api/checkFavorite/:id", checkFavorite);

app.get("/api/test", async (req, res) => {
  res.send({ test: "OK" });
});

server.listen(3030, () => {
  console.log("listening on *:3030");
});
