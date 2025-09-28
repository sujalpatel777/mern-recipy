

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../base";
import { MdDelete, MdRemoveRedEye, MdBookmarkBorder } from "react-icons/md";

export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view saved recipes");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${url}/api/recipes/saved`, {
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
      } finally {
        setLoading(false);
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
      const response = await axios.delete(`${url}/api/recipes/saved/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg">
              <MdBookmarkBorder className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Saved Recipes
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your personal collection of favorite recipes
          </p>
        </div>

        {/* Recipes Grid */}
        {savedRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-white/20 dark:border-gray-700/20">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No saved recipes yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start building your recipe collection by saving your favorites!
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Recipes
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {savedRecipes.map((savedRecipe) => (
              <div
                key={savedRecipe._id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/20 transform hover:scale-105"
              >
                {/* Recipe Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={savedRecipe.recipe.imgurl}
                    alt={savedRecipe.recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Saved
                    </div>
                  </div>
                </div>

                {/* Recipe Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {savedRecipe.recipe.title}
                  </h3>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => navigate(`/recipe/${savedRecipe.recipe._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <MdRemoveRedEye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleRemoveSave(savedRecipe.recipe._id)}
                      disabled={isRemoving}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {isRemoving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <MdDelete className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Card */}
        {savedRecipes.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-center text-white shadow-2xl">
            <div className="text-3xl font-bold mb-2">{savedRecipes.length}</div>
            <div className="text-purple-100">Recipes Saved</div>
          </div>
        )}
      </div>
    </div>
  );
}