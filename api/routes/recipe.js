import express from "express";
import {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
  saveRecipeById,
  getSavedRecipes,
} from "../controllers/recipe.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticate, addRecipe);
router.get("/", getAllRecipes);
router.get("/saved", authenticate, getSavedRecipes);
router.get("/:id", getRecipeById);
router.get("/user/:id", getRecipesByUserId);
router.post("/saved", authenticate, saveRecipeById);

export default router;
