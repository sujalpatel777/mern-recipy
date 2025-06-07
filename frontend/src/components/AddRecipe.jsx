import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function CreateRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    ingredients: [{ name: "", quantity: "" }],
    imgurl: "",
    user: "",
  });

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      const recipePayload = {
        ...formData,
        ingredients: filteredIngredients,
      };

      const response = await axios.post(
        "http://localhost:5000/api/recipes/add",
        recipePayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Recipe added successfully!");
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
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
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
          <input
            type="url"
            name="imgurl"
            placeholder="Image URL (e.g., https://example.com/image.jpg)"
            value={formData.imgurl}
            onChange={handleFormInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#a145f7] focus:outline-none"
          />
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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </div>
  );
}