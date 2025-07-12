import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  gmail: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^\+?[\d\s-]{10,}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  birthday: {
    type: String,
    required: [true, 'Birthday is required']
  },
  photo: {
    type: String
  },
  accessToken: {
    type: String
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
