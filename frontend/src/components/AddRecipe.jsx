
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { url } from "../base";
import { MdAdd, MdDelete, MdCloudUpload, MdLink, MdPerson } from "react-icons/md";

export default function CreateRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    ingredients: [{ name: "", quantity: "" }],
    imgurl: "",
    user: "",
    category: "veg", // Default to veg
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "imgurl") {
      setImagePreview(value);
      setImageFile(null);
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imgurl: "" });
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

  const removeIngredientField = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: updatedIngredients });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      instructions: "",
      ingredients: [{ name: "", quantity: "" }],
      imgurl: "",
      user: "",
      category: "veg", // Reset to default
    });
    setImageFile(null);
    setImagePreview("");
  };

  const validateAndSubmitRecipe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
        const data = new FormData();
        data.append("title", formData.title);
        data.append("instructions", formData.instructions);
        data.append("ingredients", JSON.stringify(filteredIngredients));
        data.append("category", formData.category);
        data.append("image", imageFile);
        if (formData.user) data.append("user", formData.user);
        
        response = await axios.post(`${url}/api/recipes/add`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        const recipePayload = {
          ...formData,
          ingredients: filteredIngredients,
        };
        response = await axios.post(`${url}/api/recipes/add`, recipePayload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success(response.data.message || "Recipe added successfully!");
      setImagePreview(response.data.recipe.imgurl || "");
      resetForm();
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error(
        error.response?.data?.message || "Failed to add recipe. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Create New Recipe
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Share your culinary masterpiece with the world
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
          <form onSubmit={validateAndSubmitRecipe} className="space-y-6">
            {/* Recipe Title */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter recipe title..."
                value={formData.title}
                onChange={handleFormInputChange}
                required
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Category Radio Buttons */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Category
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="veg"
                    checked={formData.category === "veg"}
                    onChange={handleFormInputChange}
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                    Vegetarian
                  </span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="nonveg"
                    checked={formData.category === "nonveg"}
                    onChange={handleFormInputChange}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                    Non-Vegetarian
                  </span>
                </label>
              </div>
            </div>

            {/* Instructions */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instructions
              </label>
              <textarea
                name="instructions"
                placeholder="Step-by-step instructions..."
                value={formData.instructions}
                onChange={handleFormInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
              />
            </div>

            {/* Ingredients Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ingredients
              </label>
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientInputChange(index, e)}
                      required
                      className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <input
                      type="text"
                      name="quantity"
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientInputChange(index, e)}
                      required
                      className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addNewIngredientField}
                className="flex items-center gap-2 px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300 border border-dashed border-purple-300 dark:border-purple-600"
              >
                <MdAdd className="w-5 h-5" />
                Add Ingredient
              </button>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Recipe Image
              </label>
              
              {/* Image URL Input */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <MdLink className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Image URL</span>
                </div>
                <input
                  type="url"
                  name="imgurl"
                  placeholder="https://example.com/recipe-image.jpg"
                  value={formData.imgurl}
                  onChange={handleFormInputChange}
                  disabled={!!imageFile}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
                />
              </div>

              {/* File Upload */}
              <div className="group">
                <div className="flex items-center gap-2 mb-2">
                  <MdCloudUpload className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Or upload image</span>
                </div>
                <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-white/30 dark:bg-gray-700/30 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300">
                  <div className="text-center">
                    <MdCloudUpload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={!!formData.imgurl}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* User ID */}
            <div className="group">
              <div className="flex items-center gap-2 mb-2">
                <MdPerson className="w-4 h-4 text-green-500" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">User ID (Optional)</label>
              </div>
              <input
                type="text"
                name="user"
                placeholder="Your user ID"
                value={formData.user}
                onChange={handleFormInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Recipe...
                  </div>
                ) : (
                  "Create Recipe"
                )}
              </button>
            </div>
          </form>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-8 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Image Preview:</p>
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Recipe Preview"
                  className="w-full max-w-xs mx-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}