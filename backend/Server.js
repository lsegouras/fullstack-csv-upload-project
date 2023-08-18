import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
import bodyParser from "body-parser";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

//setting Paths
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(express.json());

//setting layouts
// app.use(expressLayouts);

//middleware for body-parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//acessing static files from assets folder
// const assetsPath = path.join(__dirname, "assets");
// app.use(express.static(assetsPath));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//setting up routes
import routes from "./routes/CsvRoutes.js";
app.use("/", routes);

//setting database connection
import db from "./database/mongoConfig.js";
db.connect();

//directing the app in the given port

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

export default app;
