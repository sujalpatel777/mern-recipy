import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function RecipeHomePage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch all recipes on component mount without authentication
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data && Array.isArray(response.data.recipes)) {
          setRecipes(response.data.recipes);
        } else {
          setRecipes([]); // Fallback to empty array if data is unexpected
          console.warn("Unexpected response format for recipes:", response.data);
        }
      } catch (error) {
        handleFetchError(error);
      }
    };
    fetchAllRecipes();
  }, []);

  // Handle fetch errors with appropriate messages
  const handleFetchError = (error) => {
    console.error("Error fetching recipes:", error);
    if (error.code === 'ERR_NETWORK') {
      toast.error("Network error. Please check your internet connection.");
    } else {
      toast.error(error.response?.data?.message || "Failed to fetch recipes");
    }
  };

  // Handle saving a recipe by ID
  const handleSaveRecipe = async (recipeId) => {
    if (isSaving) return; // Prevent multiple saves

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to save recipes");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/recipes/saved",
        { id: recipeId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          timeout: 5000 // Add timeout
        }
      );

      toast.success(response.data.message || "Recipe saved successfully!");
    } catch (error) {
      handleSaveError(error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle save errors with appropriate messages
  const handleSaveError = (error) => {
    console.error("Error saving recipe:", error);
    if (error.code === 'ERR_NETWORK') {
      toast.error("Network error. Please check your internet connection.");
    } else if (error.response?.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please login again.");
    } else if (error.code === 'ECONNABORTED') {
      toast.error("Request timed out. Please try again.");
    } else {
      toast.error(error.response?.data?.message || "Failed to save recipe");
    }
  };

  // Navigate to recipe details
  const navigateToRecipeDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Explore Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length === 0 ? (
          <div className="text-center text-white p-4">No recipes found.</div>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={recipe.imgurl}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h5 className="text-xl font-bold text-white">{recipe.title}</h5>
                <div className="flex justify-between mt-4">
                  <button
                    className={`bg-[#a145f7] text-white py-2 px-4 rounded-lg hover:bg-[#8a2be2] w-full mr-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleSaveRecipe(recipe._id)}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    className="bg-[#a145f7] text-white py-2 px-4 rounded-lg hover:bg-[#8a2be2] w-full"
                    onClick={() => navigateToRecipeDetails(recipe._id)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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
  );
}