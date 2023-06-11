import app from './app';
import env from "./util/validateEnv";
import mongoose from "mongoose";


const port = env.PORT;
const mongoDBCredentials = env.MONGO_CONNECTION_STRING;

mongoose.connect(mongoDBCredentials)
  .then(() => {
    console.log('MongoDB Connected successfully!');
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    })
  })
  .catch(error => {
    console.log(`MongoDB connection failed!`);
    console.log(error);
  })

