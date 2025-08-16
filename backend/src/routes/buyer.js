import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Buyer endpoint working ✅" });
});

export default router;
