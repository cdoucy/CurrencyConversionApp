import express from "express";
import router from "./router";
import bodyParser from "body-parser";

const port = 8080;
const host = "0.0.0.0";

const app = express();

app.use(bodyParser.json());
app.use("/api", router);

app.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`);
});