import cookieParser from "cookie-parser";
import express from "express";
import ipMiddleware from "../middlewares/ip.js";
import { router } from "../routes/index.js";
import { cors_origin } from "./cors.js";
import { connection } from "./db-config.js";
import cors from "cors";

export const express_config = (app) => {
  let ip;
  const { PORT } = process.env;
  app.use(cookieParser());
  app.use(express.json({ limit: "5mb" }));
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
      secure: false,
      httpOnly: false,
      sameSite: "none",
    })
  );
  app.use(router);
  app.listen(PORT || 3000, () => {
    console.log(`App running 🚀 on port ${PORT || 3000}`);
    connection().then(() => {
      console.log("Database connected");
    });
  });
};
