import mongoose from "mongoose";

export const dbConnection = () => {
    console.log("🔌 Attempting to connect to MongoDB...");
    console.log("📡 Connection string:", process.env.MONGODB_URI ? "Set" : "Not set");
    
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "SCHOOL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
        console.log("✅ Connected to database successfully");
        console.log("🗄️ Database name: SCHOOL_MANAGEMENT_SYSTEM");
    })
    .catch((error) => {
        console.error("❌ Error occurred while connecting to database:", error.message);
        console.error("🔍 Full error:", error);
        process.exit(1);
    });
};

