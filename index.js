import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { express_config } from "./server/config/express.js";
const app = express();
express_config(app);
app.get("/", (req, res) => {
  res.send(
    "route / at " +
      new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })
  );
});
