import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../base";

export default function CreateRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    ingredients: [{ name: "", quantity: "" }],
    imgurl: "",
    user: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "imgurl") {
      setImagePreview(value);
      setImageFile(null); // Clear file if URL is entered
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imgurl: "" }); // Clear URL if file is selected
    }
  };

  const handleIngredientInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][name] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addNewIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "" }],
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      instructions: "",
      ingredients: [{ name: "", quantity: "" }],
      imgurl: "",
      user: "",
    });
    setImageFile(null);
    setImagePreview("");
  };

  const validateAndSubmitRecipe = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to add a recipe");
        return;
      }

      const filteredIngredients = formData.ingredients.filter(
        (ingredient) => ingredient.name.trim() && ingredient.quantity.trim()
      );

      let response;
      if (imageFile) {
        // Use FormData for file upload
        const data = new FormData();
        data.append("title", formData.title);
        data.append("instructions", formData.instructions);
        data.append("ingredients", JSON.stringify(filteredIngredients));
        data.append("image", imageFile);
        if (formData.user) data.append("user", formData.user);
        response = await axios.post(`${url}/api/recipes/add`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Use JSON for URL upload
        const recipePayload = {
          ...formData,
          ingredients: filteredIngredients,
        };
        response = await axios.post(
          `${url}/api/recipes/add`,
          recipePayload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success(response.data.message || "Recipe added successfully!");
      // Show the uploaded/linked image after success
      setImagePreview(response.data.recipe.imgurl || "");
      resetForm();
    } catch (error) {
      handleRecipeSubmissionError(error);
    }
  };

  const handleRecipeSubmissionError = (error) => {
    console.error("Error adding recipe:", error);
    toast.error(
      error.response?.data?.message || "Failed to add recipe. Please try again."
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          Add a New Recipe
        </h1>
        <form onSubmit={validateAndSubmitRecipe} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleFormInputChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none"
          />
          <textarea
            name="instructions"
            placeholder="Instructions (e.g., 1. Preheat oven...)"
            value={formData.instructions}
            onChange={handleFormInputChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none h-32"
          />
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-3">
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientInputChange(index, e)}
                required
                className="w-1/2 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none"
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity (e.g., 2 cups)"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientInputChange(index, e)}
                required
                className="w-1/2 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addNewIngredientField}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Add Another Ingredient
          </button>
          <div className="flex flex-col gap-2">
            <label className="text-white">Image URL (optional):</label>
            <input
              type="url"
              name="imgurl"
              placeholder="Image URL (e.g., https://example.com/image.jpg)"
              value={formData.imgurl}
              onChange={handleFormInputChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none"
              disabled={!!imageFile}
            />
            <label className="text-white">Or Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none"
              disabled={!!formData.imgurl}
            />
          </div>
          <input
            type="text"
            name="user"
            placeholder="User ID (optional)"
            value={formData.user}
            onChange={handleFormInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#a145f7] text-white p-3 rounded-lg hover:bg-[#8a2be2] transition-colors"
          >
            Submit Recipe
          </button>
        </form>
        {imagePreview && (
          <div className="mt-6 text-center">
            <p className="text-white mb-2">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Recipe Preview"
              className="mx-auto max-h-60 rounded-lg border border-gray-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}