import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, gmail, password, gender, phone, birthday, photo } = req.body;

  // ✅ Input Validation for Missing Fields
  if (!name || !gmail || !password || !gender || !birthday) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    let user = await User.findOne({ gmail });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = await User.create({
      name,
      gmail,
      password: hashedPassword,
      gender,
      phone,
      birthday,
      photo,
    });

    // Generate access token after user is created
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Add the token to the user object before sending it in the response
    // This is optional and depends on whether you need to store it or just send it.
    user.accessToken = accessToken;

    res.status(201).json({ message: "User registered successfully!", user, token: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message, msg: "Just fun" });
  }
};

export const login = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    // Input validation
    if (!gmail || !password) {
      return res.status(400).json({
        message: "Please provide both email and password"
      });
    }

    // Find user and explicitly select password field
    const user = await User.findOne({ gmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: "1d" }
    );

    // Remove password from user object
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      gmail: user.gmail,
      gender: user.gender,
      phone: user.phone,
      birthday: user.birthday,
      photo: user.photo
    };

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "An error occurred during login. Please try again.", msg: "Just fun"
    });
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

export const updateMe = async (req, res) => {
  try {
    console.log('Received updateMe request.');
    console.log('Request body:', req.body);

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log('User object fetched from DB (before updates):', user);

    // Only allow updating these fields
    const { name, gender, phone, birthday, photo } = req.body;
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (phone !== undefined) user.phone = phone;
    if (birthday) user.birthday = birthday;
    if (photo !== undefined) user.photo = photo;

    console.log('User object before save (after updates):', user);
    await user.save();
    res.json({ message: "Profile updated successfully!", user });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: error.message });
  }
};
