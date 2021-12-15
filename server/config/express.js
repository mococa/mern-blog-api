import cookieParser from "cookie-parser";
import express from "express";
import ipMiddleware from "../middlewares/ip.js";
import { router } from "../routes/index.js";
import { cors_origin } from "./cors.js";
import { connection } from "./db-config.js";
import cors from "cors";

export const express_config = (app) => {
  let ip;
  const { PORT } = process.env || 3000;
  app.use(express.json());
  app.use(ipMiddleware);
  app.use(function (req, res, next) {
    ip = req.clientIp;
    next();
  });
  app.use(
    cors({
      origin: cors_origin(ip),
      optionsSuccessStatus: 200,
      credentials: true,
      sameSite: "none",
    })
  );
  app.use(cookieParser());
  app.use(router);
  app.listen(PORT, () => {
    console.log(`App running 🚀 on port ${PORT}`);
    connection().then(() => {
      console.log("Database connected");
    });
  });
};
