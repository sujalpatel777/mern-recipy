import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState([]);
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Saved Recipes</h1>
      <Toaster />
      {savedRecipes.length === 0 ? (
        <div className="text-center text-white p-4">No saved recipes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedRecipes.map((savedRecipe) => (
            <div key={savedRecipe._id} className="border border-gray-700 rounded-xl shadow-md overflow-hidden">
              <img
                src={savedRecipe.recipe.imgurl}
                alt={savedRecipe.recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-bold text-white">{savedRecipe.recipe.title}</h5>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-300 w-full"
                    onClick={() => navigate(`/${savedRecipe.recipe._id}`)}
                  >
                    View Recipe
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