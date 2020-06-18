import express from "express";
import bodyParser from "body-parser";

import router from "./router";

const port = 8080;
const host = "0.0.0.0";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`);
});