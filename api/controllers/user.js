import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, gmail, password } = req.body;

  // ✅ Input Validation for Missing Fields
  if (!name || !gmail || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    let user = await User.findOne({ gmail });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate access token
    const accessToken = jwt.sign({ gmail }, "your_secret_key", { expiresIn: "1h" });

    // Create user
    user = await User.create({ name, gmail, password: hashedPassword, accessToken });

    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await User.findOne({ gmail });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1d" }
    );

    // Save token to user model
    user.accessToken = token;
    await user.save();

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        gmail: user.gmail
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const profile = async (req, res) => {
  res.json({ user: req.user });
};

export const me = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    const user = await User.findById(decoded.userId).select('-password -accessToken');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Me endpoint error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
