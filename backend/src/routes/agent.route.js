import express from "express";
import { protectedRoute } from "../middleware/authenticate.middleware.js";
import { addAgent, getAgents, getAgentTasks } from "../controllers/agent.controller.js";

const router=express.Router();

router.post("/addAgent",protectedRoute,addAgent);
router.get("/getAgents",protectedRoute,getAgents);
router.get("/getAgentTask/:agentId",protectedRoute,getAgentTasks);


export default router;