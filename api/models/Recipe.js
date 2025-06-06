import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: String, required: true },
  ingredients: [{ name: String, quantity: String }],
  imgurl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);