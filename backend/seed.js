import mongoose from "mongoose";
import dotenv from "dotenv";
import Lead from "./models/Lead.js";

dotenv.config();

const names = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Sai",
  "Krishna",
  "Ishaan",
  "Shaurya",
  "Atharv",
  "Rudra",
  "Meera",
  "Ananya",
  "Aadhya",
  "Diya",
  "Pooja",
  "Saanvi",
  "Kavya",
  "Ira",
  "Myra",
  "Riya",
  "Priya",
  "Muskan",
  "yashu",
];

const surnames = [
  "Sharma",
  "Verma",
  "Gupta",
  "Kumar",
  "Singh",
  "Patel",
  "Jain",
  "Mehta",
  "Chopra",
  "Malhotra",
  "Thakur",
];

const statuses = ["new", "contacted", "qualified", "converted"];
const sources = ["website", "referral", "ad"];

const generateLeads = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected for seeding");

    //clear old data
    await Lead.deleteMany();
    const leads = [];

    for (let i = 0; i < 600; i++) {
      const firstName = names[Math.floor(Math.random() * names.length)];
      const lastName = surnames[Math.floor(Math.random() * surnames.length)];

      const lead = {
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@yahoo.com`,
        phone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ),
      };
      leads.push(lead);
    }
    await Lead.insertMany(leads);
    console.log("Database seeded with 600 leads");

    process.exit();
  } catch (error) {
    console.log("Error seeding database", error);
    process.exit(1);
  }
};

generateLeads();