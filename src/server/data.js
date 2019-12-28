import mongoose from "mongoose";
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
const Data = mongoose.model("Data", DataSchema);
export default Data;
