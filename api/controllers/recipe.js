import { Recipe } from "../models/Recipe.js";
import { SavedRecipe } from "../models/SavedRecipe.js";
import mongoose from "mongoose";
// Add a new recipe
export const addRecipe = async (req, res) => {
  const { title, instructions, ingredients, category, user } = req.body;
  let imgurl = req.body.imgurl; // for URL upload

  // If an image file is uploaded, use its path instead
  if (req.file) {
    imgurl = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;
  }

  // Validate required fields
  if (!title || !instructions || !ingredients || !imgurl) {
    return res.status(400).json({ message: "Title, instructions, ingredients, and image are required" });
  }

  // Validate category if provided
  if (category && !['veg', 'nonveg'].includes(category)) {
    return res.status(400).json({ message: "Category must be either 'veg' or 'nonveg'" });
  }

  try {
    const parsedIngredients = typeof ingredients === "string" ? JSON.parse(ingredients) : ingredients;

    // Validate ingredients format
    if (!Array.isArray(parsedIngredients) || parsedIngredients.length === 0) {
      return res.status(400).json({ message: "At least one ingredient is required" });
    }

    // Validate each ingredient has name and quantity
    for (const ingredient of parsedIngredients) {
      if (!ingredient.name || !ingredient.quantity) {
        return res.status(400).json({ message: "Each ingredient must have both name and quantity" });
      }
    }

    const recipe = await Recipe.create({
      title: title.trim(),
      instructions: instructions.trim(),
      ingredients: parsedIngredients,
      imgurl,
      category: category || 'veg', // Default to veg if not provided
      user: req.user._id, // Use authenticated user's ID
    });

    res.status(201).json({ message: "Recipe created successfully!", recipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
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
  console.log("Hello");


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

// Remove a saved recipe
export const removeSavedRecipe = async (req, res) => {
  const { id } = req.params;

  console.log('Attempting to remove saved recipe...');
  console.log('User ID:', req.user?._id);
  console.log('Recipe ID from params:', id);

  if (!id) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid recipe ID format" });
  }

  try {
    // Check if the user is authenticated
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    // Find and delete the saved recipe by its recipe ID and user ID
    const result = await SavedRecipe.deleteOne({ recipe: id, user: req.user._id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Saved recipe not found or not authorized to delete" });
    }

    return res.status(200).json({ message: "Recipe removed from saved recipes successfully!" });
  } catch (error) {
    console.error("Error removing saved recipe:", error);
    return res.status(500).json({ message: "Failed to remove recipe", error: error.message });
  }
};

// Update a recipe by ID
export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, instructions, ingredients, imgurl } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid recipe ID format" });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    // Only allow the owner to update
    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this recipe" });
    }
    recipe.title = title || recipe.title;
    recipe.instructions = instructions || recipe.instructions;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.imgurl = imgurl || recipe.imgurl;
    await recipe.save();
    res.status(200).json({ message: "Recipe updated successfully!", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update recipe" });
  }
};

// Search recipes by name
export const searchRecipesByName = async (req, res) => {
  const { name } = req.query;
  console.log(name);

  if (!name) {
    return res.status(400).json({ message: "Name query parameter is required" });
  }
  try {
    const recipes = await Recipe.find({
      title: { $regex: name, $options: "i" }
    })
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to search recipes" });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid recipe ID format" });
  }
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    // Only allow the owner to delete
    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }
    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete recipe" });
  }
};

// Filter recipes by dietary preferences
export const filterRecipesByCategory = async (req, res) => {
  const { categories } = req.query;

  try {
    let query = {};

    // Handle multiple categories or single category
    if (categories) {
      const categoryArray = Array.isArray(categories) ? categories : categories.split(',');

      // Map frontend filter names to database values
      const mappedCategories = categoryArray.map(cat => {
        switch (cat.toLowerCase()) {
          case 'vegetarian':
          case 'veg':
            return 'veg';
          case 'nonvegetarian':
          case 'non-vegetarian':
          case 'nonveg':
            return 'nonveg';
          default:
            return cat;
        }
      });

      query.category = { $in: mappedCategories };
    }

    const recipes = await Recipe.find(query)
      .populate("user", "name gmail")
      .sort({ createdAt: -1 });

    res.json({
      recipes,
      count: recipes.length,
      filters: {
        categories: categories ? (Array.isArray(categories) ? categories : categories.split(',')) : []
      }
    });
  } catch (error) {
    console.error("Error filtering recipes:", error);
    res.status(500).json({ message: error.message || "Failed to filter recipes" });
  }
};
