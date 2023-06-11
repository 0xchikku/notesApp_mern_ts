import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from 'cors';

const app = express();

app.use(cors());

app.use(morgan("dev"));
// app.use(morgan("common"))

app.use(express.json())  // this enables to receive json to the server

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.use("/notes", notesRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Page no Found!"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'an unknown error!';
  let statusCode = 500;
  if(isHttpError(error)){
    errorMessage = error.message;
    statusCode = error.status
  }
  res.status(statusCode).json({error: errorMessage});
});

export default app;