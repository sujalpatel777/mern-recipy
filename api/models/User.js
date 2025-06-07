import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  phone: { type: String },
  birthday: { type: String, required: true },
  photo: { type: String }, // base64 or URL
  accessToken: {
    type: String,
  }
});

const User = mongoose.model("User", userSchema);
export default User;
