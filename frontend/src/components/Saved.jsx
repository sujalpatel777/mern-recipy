import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view saved recipes");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/recipes/saved", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSavedRecipes(response.data.savedRecipes || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch saved recipes");
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
        }
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleRemoveSave = async (recipeId) => {
    if (isRemoving) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to remove saved recipes");
      return;
    }

    try {
      setIsRemoving(true);
      const response = await axios.delete(`http://localhost:5000/api/recipes/saved/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove the recipe from the local state
      setSavedRecipes(savedRecipes.filter(recipe => recipe.recipe._id !== recipeId));
      toast.success("Recipe removed from saved recipes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove recipe");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      }
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-[#a145f7] mb-8 text-center">Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <div className="text-center text-white p-4">No saved recipes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedRecipes.map((savedRecipe) => (
            <div key={savedRecipe._id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
              <img
                src={savedRecipe.recipe.imgurl}
                alt={savedRecipe.recipe.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h5 className="text-xl font-bold text-white">{savedRecipe.recipe.title}</h5>
                <div className="flex justify-between mt-4 space-x-2">
                  <button
                    className="bg-[#a145f7] text-white py-2 px-4 rounded-lg hover:bg-[#8a2be2] w-full"
                    onClick={() => navigate(`/recipe/${savedRecipe.recipe._id}`)}
                  >
                    View Recipe
                  </button>
                  <button
                    className={`bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 w-full ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleRemoveSave(savedRecipe.recipe._id)}
                    disabled={isRemoving}
                  >
                    {isRemoving ? 'Removing...' : 'Remove'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}