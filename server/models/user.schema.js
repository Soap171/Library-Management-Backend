import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: String,
    phoneNumber: String,
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
    dateJoined: { type: Date, default: Date.now },
    interestedBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    profilePic: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
