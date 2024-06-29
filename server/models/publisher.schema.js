import mongoose from "mongoose";

const { Schema } = mongoose;

const publisherSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: String,
  contactNumber: String,
});

const Publisher = mongoose.model("Publisher", publisherSchema);

export default Publisher;
