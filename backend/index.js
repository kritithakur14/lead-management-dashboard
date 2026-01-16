import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import leadRoutes from "./routes/leadRoute.js";
import connectDB from "./config/db.js";

dotenv.config();


const PORT = process.env.PORT || 3000;

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(cors());

app.use(express.json());

app.use("/api/leads", leadRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

app.get("/", (req, res) => {
  res.send("Hello, lead-management-dashboard is running!");
});
