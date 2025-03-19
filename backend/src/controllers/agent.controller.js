import Agent from "../models/agent.model.js";
import bcrypt from "bcryptjs";

export const addAgent=async(req,res)=>{
    try{
        const { name, email, mobile, password }=req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
              return res.status(400).json({ message: "Email already exists" });
        };

        const existingAgentNumber = await Agent.findOne({ mobile });
        if (existingAgentNumber) {
              return res.status(400).json({ message: "Number already exists" });
        };

         const hashedPassword = await bcrypt.hash(password, 10);

         const newAgent= await Agent.create({
            userId: req.user._id,
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword,
         });

       await newAgent.save();
       const { password: _, ...agentWithoutPassword } = newAgent.toObject();

        res.status(201).json({ message: "Agent Created Successfully", agent: agentWithoutPassword });
    }catch(error){
        console.error("Error in Add Agent:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

};


export const getAgents=async(req,res)=>{
    try{
        const userId=req.user._id;
        const agents=await Agent.find({ userId }).select("-password");;

        if (agents.length === 0) {
            return res.status(404).json({ message: "No agents found", tasks: [] });
        }
        
        res.status(200).json(agents);

    }catch(error){
        console.error("Error in Get Agents:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

};

export const getAgentTasks = async (req, res) => {
    try {
        const { agentId } = req.params; 

        const agent = await Agent.findById(agentId).populate("tasks", "FirstName Phone Notes");

        if (!agent) {
            return res.status(404).json({ error: "Agent not found" });
        }

        if (!agent.tasks.length) {
            return res.status(200).json({ message: "No tasks assigned to this agent", tasks: [] });
        }

        res.status(200).json({ tasks: agent.tasks });

    } catch (error) {
        console.error("Error in getAgentTasks:", error.message);
        res.status(500).json({ error: "Failed to retrieve tasks" });
    }
};

