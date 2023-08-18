import mongoose from "mongoose";

const csvSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    filePath: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("csv", csvSchema);
