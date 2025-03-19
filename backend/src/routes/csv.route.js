import express from "express";
import { protectedRoute } from "../middleware/authenticate.middleware.js";
import { distributeTask, uploadCsv } from "../controllers/csv.controller.js";

const router=express.Router();

router.post("/upload",protectedRoute,uploadCsv);
router.post("/distributeTask",protectedRoute,distributeTask);


export default router;