import mongoose from "mongoose";

const { Schema } = mongoose;

const reservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  reservationDate: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
