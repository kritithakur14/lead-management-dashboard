import express from "express";
import { getLeads, getLeadById } from "../controllers/leadController.js";

const router = express.Router();

router.get("/", getLeads);
router.get("/:id", getLeadById);

export default router;
