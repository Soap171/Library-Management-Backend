import User from "../models/user.schema.js";
import { errorHandle } from "../utils/error.js";
import mongoose from "mongoose";

export const updateProfile = async (req, res, next) => {
  const {
    username,
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
    profilePic,
  } = req.body;

  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return next(errorHandle(404, "User not found"));
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profilePic = profilePic || user.profilePic;

    await user.save();

    const { password, ...userInfo } = user._doc;

    res.status(200).json({ message: "Profile updated successfully", userInfo });
  } catch (error) {
    return next(error);
  }
};

export const viewProfile = async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(errorHandle(400, "Invalid user id"));
  }

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return next(errorHandle(404, "User not found"));
    }
    const { password, ...userInfo } = user._doc;
    res.status(200).json({ userInfo });
  } catch (error) {
    next(error);
  }
};
