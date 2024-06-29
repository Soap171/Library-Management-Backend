import User from "../models/user.schema.js";
import { errorHandle } from "../utils/error.js";

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

  console.log("inside");

  try {
    const user = await User.findById(req.userId);
    console.log(req.userId);

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

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    return next(error);
  }
};
