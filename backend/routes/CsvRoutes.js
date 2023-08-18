/** ------------------ IMPORTING PACKAGE ------------------ **/
import express from "express";
const router = express.Router();
import multer from "multer";

/** ------------------ IMPORTING CONTROLLERS ------------------ **/
import home from "../controllers/home_controller.js";
import CsvController from "../controllers/CsvController.js";
const uploadMiddleware = multer({ dest: "uploads/files" });

/** ------------------ MAKING ROUTES ------------------ **/
router.get("/", home);
router.post("/upload", uploadMiddleware.single("file"), CsvController.upload);
router.get("/view/:id", CsvController.view);
router.delete("/delete/:id", CsvController.deleteFile);
router.get("/csvs", CsvController.get);

/** ------------------ EXPORTING ROUTER ------------------ **/
export default router;
