import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Its allow which client side access our server.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); //to take data as json formate
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //sometime url encode our search line like space=%20 for this
app.use(express.static("public")); //For access public assets.If we want to save some data like pdf,file etc in our public folder

app.use(cookieParser());

export { app };
