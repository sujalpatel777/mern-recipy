import { Recipe } from "../models/Recipe.js";
import { SavedRecipe } from "../models/SavedRecipe.js";
import mongoose from "mongoose";
// Add a new recipe
export const addRecipe = async (req, res) => {
  const { title, instructions, ingredients, imgurl } = req.body;

  if (!title || !instructions || !ingredients || !imgurl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const recipe = await Recipe.create({
      title,
      instructions,
      ingredients,
      imgurl,
      user: req.user._id,
    });

    res.status(201).json({ message: "Recipe created successfully!", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create recipe" });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("user", "name gmail")
      .sort({ createdAt: -1 });

    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch recipes" });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid recipe ID format" });
  }

  try {
    const recipe = await Recipe.findById(id).populate("user", "name gmail");
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch recipe" });
  }
};

// Get recipes by user ID
export const getRecipesByUserId = async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const recipes = await Recipe.find({ user: id })
      .populate("user", "name gmail")
      .sort({ createdAt: -1 });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found for this user" });
    }

    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch user recipes" });
  }
};

// Save a recipe by ID
export const saveRecipeById = async (req, res) => {
  const { id } = req.body;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid recipe ID format" });
  }

  try {
    // Check if recipe exists
    const recipeExists = await Recipe.findById(id);
    if (!recipeExists) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is authenticated
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    // Check if the recipe is already saved
    const existingSaved = await SavedRecipe.findOne({ recipe: id, user: req.user._id });
    if (existingSaved) {
      return res.status(400).json({ message: "Recipe already saved" });
    }

    // Save the recipe
    const savedRecipe = new SavedRecipe({ recipe: id, user: req.user._id });
    await savedRecipe.save();
    await savedRecipe.populate("recipe");

    return res.status(201).json({ message: "Recipe saved successfully!", savedRecipe });
  } catch (error) {
    console.error("Error saving recipe:", error);
    return res.status(500).json({ message: "Failed to save recipe", error: error.message });
  }
};

// Get saved recipes for the authenticated user
export const getSavedRecipes = async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find({ user: req.user._id })
      .populate({
        path: "recipe",
        populate: { path: "user", select: "name gmail" },
      })
      .sort({ createdAt: -1 });

    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch saved recipes" });
  }
};
