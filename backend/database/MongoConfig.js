import mongoose from "mongoose";
import "dotenv/config";

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB...");
  } catch (e) {
    console.log("Error: ", e.message);
  }
};
export default {
  connect,
};
