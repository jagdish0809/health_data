const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const healthdata = new mongoose.Schema({
    Firstname: String,
    Lastname: String,
    Age: Number,
    Gender: String,
    Height: Number,
    Weight: Number,
    BMI: Number,
    Oxygen: Number,
    Heartrate: Number,
    Temperature: Number,
    ECG: Number,
});

const Healthdata = mongoose.model("Healthdata", healthdata);

app.post("/api/patient", async(req, res) =>{
    try{
        const data = req.body;
        console.log(data)
        const newHealthdata = new Healthdata(data);
        await newHealthdata.save();
        res.json(newHealthdata);
    }catch(err){
        console.log(err);
    }
})


app.get("/api/patient", async (req, res) => {
    try{
        const data = await Healthdata.find({}).exec();
        res.json(data);
    }catch(err){
        console.log(err);
    }
})

app.put("/api/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await Healthdata.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
