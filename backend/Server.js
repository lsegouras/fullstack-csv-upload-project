import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
import bodyParser from "body-parser";

app.use(express.json());

//middleware for body-parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//setting up routes
// import routes from "./routes/CsvRoutes.js";
// app.use("/", routes);

//setting database connection
import db from "./database/MongoConfig.js";
db.connect();

//directing the app in the given port

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

export default app;
