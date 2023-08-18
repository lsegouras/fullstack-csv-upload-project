import csvSchema from "../models/CsvModel.js";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

/** ------------------ EXPORTING FUNCTION To upload a file ------------------ **/
const upload = async function (req, res) {
  try {
    // file is not present
    if (!req.file) {
      return res.status(400).send("No files were uploaded.");
    }
    // file is not csv
    if (req.file.mimetype != "text/csv") {
      return res.status(400).send("Select CSV files only.");
    }
    // console.log(req.file);
    let file = await csvSchema.create({
      fileName: req.file.originalname,
      filePath: req.file.path,
      file: req.file.filename,
    });
    return res.redirect("/");
  } catch (error) {
    console.log("Error in fileController/upload", error);
    res.status(500).send("Internal server error");
  }
};

/** ------------------ EXPORTING FUNCTION To open file viewer page ------------------ **/
const view = async function (req, res) {
  try {
    console.log(req.params);
    let csvFile = await csvSchema.findById(req.params.id);
    console.log(csvFile);
    const results = [];
    fs.createReadStream(csvFile.filePath) //setting up the path for file upload
      .pipe(csvParser({ separator: ";" }))

      .on("data", (data) =>
        results.push({
          name: data["﻿name"],
          city: data.city,
          country: data.country,
          favorite_sport: data.favorite_sport,
        })
      )
      .on("end", () => {
        res.status(200).json(results);
      });
  } catch (error) {
    console.log("Error in fileController/view", error);
    res.status(500).send("Internal server error");
  }
};

/** ------------------ EXPORTING FUNCTION To delete the file ------------------ **/

const deleteFile = async (req, res) => {
  try {
    await csvSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      statusCode: 200,
      message: "File deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const resultGet = await csvSchema.find({});

    res.status(200).json(resultGet);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export default {
  upload,
  view,
  deleteFile,
  get,
};
