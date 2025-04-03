import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import cors from "./config/corsOptions";
import { connectDB, gracefulShutdown } from "./config/db";

import authRoute from "./routes/authRoute";
import postRoute from "./routes/postRoute";
import userRoute from "./routes/userRoute";
import commentRoute from "./routes/commentRoute";
import voteRoute from "./routes/voteRoute";
import User from "./models/user";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean;
    username: string;
    userId: string;
  }
}

const app: Express = express();
const PORT = process.env.PORT!;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors);
app.use(session({
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 24 * 60 * 60, // 1 day = 60s * 60 * 24
    crypto: {
      secret: process.env.SESSION_SECRET!,
    }
  }),
  cookie: {
    maxAge: 1000 * 60 * 5, // 5 minutes = 1000ms * 60 (minute/ms) * 5 ,
    secure: false
  },
}))

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running!");
});

app.use(authRoute);
app.use(postRoute);
app.use(userRoute);
app.use(commentRoute);
app.use(voteRoute);

app.listen(PORT, async () => {
  console.log(`[SERVER]: Running at http://localhost:${PORT}`);

  async function createDefaultUser(username: string, email: string) {
    const hasBeenCreated = await User.findOne({ username });
    if (!hasBeenCreated) {

      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: "1",
          confirmPW: "1"
        }),
      })

      if (response.ok) console.log(`successfully created ${username}.`);
    }
  }

  createDefaultUser("ANTHIMON", "anthony@gmail.com")
  createDefaultUser("Protea", "bro@gmail.com")
});

// Shutdown DB
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGQUIT', gracefulShutdown);