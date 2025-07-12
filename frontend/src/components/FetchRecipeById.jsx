import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function FetchRecipeById() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null); // Changed to null for better initial state
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view the recipe");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/recipes/get/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setRecipe(response.data.recipe || {});
        toast.success("Recipe fetched successfully!");
      } catch (error) {
        console.error("Error fetching recipe:", error);
        toast.error(error.response?.data?.message || "Failed to fetch recipe");
        setRecipe(null); // Reset recipe on error
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
        <div className="text-white">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
        <div className="text-white">Recipe not found</div>
        <Link
          to="/Home"
          className="mt-4 inline-block bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-300"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-700">
        {recipe.imgurl && (
          <img
            src={recipe.imgurl}
            className="w-full h-64 object-cover rounded-lg mb-4"
            alt={recipe.title || "Recipe Image"}
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg"; // Fallback image
            }}
          />
        )}
        <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          {recipe.title || "Untitled Recipe"}
        </h3>
        <div className="space-y-2 text-white">
          {recipe.ingredients?.length > 0 ? (
            recipe.ingredients.map((ing, index) => (
              <p key={index} className="text-lg">
                {ing.name || "Unknown ingredient"} -{" "}
                <span className="text-yellow-400">{ing.quantity || "N/A"}</span>
              </p>
            ))
          ) : (
            <p>No ingredients available</p>
          )}
        </div>
        <p className="text-white mt-4">
          {recipe.instructions || "No instructions provided"}
        </p>
        <Link
          to="/Home"
          className="mt-6 block text-center bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-300"
        >
          Back to Home
        </Link>
      </div>
     
    </div>
  );
}