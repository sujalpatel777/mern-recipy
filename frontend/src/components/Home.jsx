import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function RecipeHomePage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  // Fetch all recipes on component mount without authentication
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        if(search!="") return
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
  }, [search]);

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

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(search);

    if (search.trim()) {
      // If search is empty, fetch all recipes
      setSearching(true);
      console.log("In serach");

      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/search?name=${search}`)
        setRecipes(response.data.recipes || []);
        console.log(response);
      } catch (error) {
        handleFetchError(error);
      }
      setSearching(false);
      return;
    }
    // try {
    //   const response = await axios.get(`http://localhost:5000/api/recipes/search?name=${encodeURIComponent(search)}`);
    //   setRecipes(response.data.recipes || []);
    // } catch (error) {
    //   handleFetchError(error);
    // }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Explore Recipes</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search recipes by name..."
          className="w-full max-w-md p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a145f7]"
        />
        <button
          type="submit"
          className="bg-[#a145f7] text-white px-6 py-3 rounded-r-lg hover:bg-[#8a2be2] transition-colors"
        >
          Search
        </button>
      </form>
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
                {localStorage.getItem("token") && (
                  <div className="flex justify-between mt-4 space-x-2">
                    <button
                      className={`bg-[#a145f7] text-white py-2 px-4 rounded-lg hover:bg-[#8a2be2] w-full mr-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleSaveRecipe(recipe._id)}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      className="bg-[#a145f7] text-white py-2 px-4 rounded-lg hover:bg-[#8a2be2] w-full mr-2 flex items-center justify-center"
                      onClick={() => navigate(`/edit/${recipe._id}`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0L7.586 14.414a2 2 0 000 2.828l.586.586a2 2 0 002.828 0L15 13" /></svg>
                      Edit
                    </button>
                    <button
                      className="bg-[#a145f7] text-white py-2 px-4 rounded-lg hover:bg-[#8a2be2] w-full"
                      onClick={() => navigateToRecipeDetails(recipe._id)}
                    >
                      View
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
     
    </div>
  );
}