/** ------------------ IMPORTING PACKAGE/MODELS ------------------ **/
import File from "../models/CsvModel.js";

/** ---------------- EXPORTING FUNCTION To open home page ------------------ **/
const home = async function (req, res) {
  try {
    let file = await File.find({});
    return res.render("home", {
      files: file,
      title: "Home",
    });
  } catch (error) {
    console.log("Error in homeController/home", error);
    return;
  }
};

export default home;
