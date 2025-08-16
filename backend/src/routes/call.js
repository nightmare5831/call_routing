import { Router } from "express";
import { logIncomingCall, getCalls } from "../controllers/callController";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Calls endpoint working ✅" });
});

router.post("/login", logIncomingCall); 
router.get("/getcalls", getCalls);  

export default router;
