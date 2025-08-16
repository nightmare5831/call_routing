// src/routes/index.js
import { Router } from "express";

import callsRoutes from "./calls.js";
import buyersRoutes from "./buyers.js";
import logsRoutes from "./logs.js";

const routes = Router();

routes.use("/calls", callsRoutes);
routes.use("/buyers", buyersRoutes);
routes.use("/logs", logsRoutes);

routes.get("/", (req, res) => {
  res.json({ message: "Backend API is running 🚀" });
});

export default routes;
