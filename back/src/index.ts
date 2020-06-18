import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import router from "./router";

const port = 5000;
const host = "0.0.0.0";
const logFormat = "[:date[web]] :remote-addr :method :url :status :response-time ms";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(logFormat, {
    skip: (req, res) => {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

app.use(morgan(logFormat, {
    skip: (req, res) => {
        return res.statusCode >= 400
    },
    stream: process.stdout
}));

app.use("/api", router);

app.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`);
});