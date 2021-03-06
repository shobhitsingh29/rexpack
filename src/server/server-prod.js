import path from 'path'
import express from 'express'

import mongoose from "mongoose";
import getSecret from "./secret";
import bodyParser from "body-parser";
import Data from "./data";
const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Methods',"GET, PUT, POST, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose.connect(getSecret("dbUri"),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
let db = mongoose.connection;


db.on('connected', function(){
    console.log("Mongoose default connection is open to ", getSecret("dbUri"));
});

db.on('error', function(err){
    console.log("Mongoose default connection has occured "+err+" error");
});

db.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
});
const router = express.Router();

app.use(express.static(DIST_DIR));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);


router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post("/putData", (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});



router.get("/", (req, res) => {
    res.json({ message: "HELLOW WORLDUUHHHH" });
});

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.')
});
