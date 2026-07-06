import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../src/routes/auth.routes.js"
import errorHandler from "./middleware/error.middleware.js";
import documentRoutes from "./routes/document.routes.js";
import noteRoutes from "./routes/note.routes.js";
import flashcardRoutes from "./routes/flashcard.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import chatRoutes from "./routes/chat.routes.js";


const app = express();

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Api is Healthy",
    });
});

//routes
app.use("/auth", authRoutes);
app.use("/documents", documentRoutes);
app.use("/notes", noteRoutes);
app.use("/flashcards", flashcardRoutes
);
app.use("/quiz", quizRoutes);
app.use("/chat", chatRoutes)

//global error handler
app.use(errorHandler);

export default app;