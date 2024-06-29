import mongoose from "mongoose";

const { Schema } = mongoose;

const authorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  biography: String,
  birthDate: Date,
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
