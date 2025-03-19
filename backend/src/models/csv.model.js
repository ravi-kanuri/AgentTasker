import mongoose from "mongoose";

const csvSchema = new mongoose.Schema({
    userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", 
          required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
        match: [/^\d+$/, "Phone number must contain only numbers"],
    },
    Notes: {
        type: String,
        required: false,
    },
    assigned: {
        type: Boolean,
        default: false, 
    },
});

const CSV = mongoose.model("CSV", csvSchema);
export default CSV;
