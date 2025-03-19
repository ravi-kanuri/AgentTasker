import multer from 'multer';
import XLSX from 'xlsx';
import CSV from "../models/csv.model.js";
import Agent from '../models/agent.model.js';

// Multer memory storage and file filter
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/vnd.ms-excel') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV, XLSX, and XLS files are allowed'), false);
    }
};

const upload = multer({storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 }}).single('file');

export const uploadCsv = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        try {
            const buffer = req.file.buffer;
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            // Validate file structure
            const requiredFields = ["FirstName", "Phone", "Notes"];
            if (!data.length || !requiredFields.every(field => Object.keys(data[0]).includes(field))) {
                return res.status(400).json({ error: "Invalid CSV format. Required columns: FirstName, Phone, Notes" });
            }

            // Process and save data
            const records = data.map(item => ({
                userId: req.user._id,
                FirstName: item.FirstName,
                Phone: item.Phone,
                Notes: item.Notes
            }));

            await CSV.insertMany(records);
            res.status(200).json({ message: "File uploaded and processed successfully"});
        }catch (error) {
            console.error("Error in processFile:", error.message, error.stack);
            res.status(500).json({ error: "Failed to process file",  details: error.message });
        }
        
    });
};


export const distributeTask = async (req, res) => {
    try {
        const userId = req.user._id;

        const agents = await Agent.find({ userId });
        const csvs = await CSV.find({ userId, assigned: false });

        if (agents.length === 0 || csvs.length === 0) {
            return res.status(400).json({ error: "No agents or CSV records available for distribution" });
        }

        let agentIndex = 0; 

        for (let csv of csvs) {
            const assignedAgent = agents[agentIndex];

            // Push CSV ID to the agent's tasks array
            assignedAgent.tasks.push(csv._id);
            await assignedAgent.save();

            // Mark CSV as assigned
            csv.assigned = true;
            await csv.save();

            agentIndex = (agentIndex + 1) % agents.length;
        }

        res.status(200).json({ message: "CSV records distributed successfully" });

    } catch (error) {
        console.error("Error in distributeTask:", error.message, error.stack);
        res.status(500).json({ error: "Failed to distribute CSV records", details: error.message });
    }
    
};


  
