import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Logs endpoint working ✅" });
});

export default router;
