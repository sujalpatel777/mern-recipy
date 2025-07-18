import express from "express";
import {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
  saveRecipeById,
  getSavedRecipes,
  removeSavedRecipe,
  updateRecipe,
  searchRecipesByName,
} from "../controllers/recipe.js";
import { authenticate } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route supporting file upload
router.post("/add", authenticate, upload.single("image"), addRecipe);
router.get("/", getAllRecipes);
router.get("/saved", authenticate, getSavedRecipes);
router.get("/get/:id", getRecipeById);
router.get("/user/:id", getRecipesByUserId);
router.post("/saved", authenticate, saveRecipeById);
router.delete("/saved/:id", authenticate, removeSavedRecipe);
router.put("/:id", authenticate, updateRecipe);
router.get('/search', searchRecipesByName);


export default router;
