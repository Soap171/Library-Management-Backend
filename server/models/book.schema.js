import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher" },
  yearPublished: Number,
  copiesAvailable: { type: Number, default: 1 },
  totalCopies: { type: Number, default: 1 },
  borrowedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
