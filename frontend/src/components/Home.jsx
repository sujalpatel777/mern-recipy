
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { url } from "../base";
import { MdDeleteForever, MdEdit, MdSearch, MdSave, MdVisibility } from "react-icons/md";

export default function RecipeHomePage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vegetarian: false,
    nonVegetarian: false
  });

  // Fetch all recipes on component mount
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        setLoading(true);
        if (search !== "") return;
        
        const response = await axios.get(`${url}/api/recipes`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data && Array.isArray(response.data.recipes)) {
          setRecipes(response.data.recipes);
          setFilteredRecipes(response.data.recipes);
        } else {
          setRecipes([]);
          setFilteredRecipes([]);
        }
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRecipes();
  }, [search]);

  // Apply filters whenever recipes or filters change
  useEffect(() => {
    applyFilters();
  }, [recipes, filters]);

  const applyFilters = () => {
    let filtered = recipes;

    // Apply vegetarian filter
    if (filters.vegetarian && !filters.nonVegetarian) {
      filtered = filtered.filter(recipe => recipe.isVegetarian === true);
    }
    
    // Apply non-vegetarian filter
    if (filters.nonVegetarian && !filters.vegetarian) {
      filtered = filtered.filter(recipe => recipe.isVegetarian === false);
    }

    // If both filters are selected, show all recipes
    if (filters.vegetarian && filters.nonVegetarian) {
      filtered = recipes;
    }

    // If no filters are selected, show all recipes
    if (!filters.vegetarian && !filters.nonVegetarian) {
      filtered = recipes;
    }

    setFilteredRecipes(filtered);
  };

  const handleFilterChange = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      vegetarian: false,
      nonVegetarian: false
    });
  };

  const handleFetchError = (error) => {
    console.error("Error fetching recipes:", error);
    if (error.code === 'ERR_NETWORK') {
      toast.error("Network error. Please check your internet connection.");
    } else {
      toast.error(error.response?.data?.message || "Failed to fetch recipes");
    }
  };

  const handleSaveRecipe = async (recipeId) => {
    if (isSaving) return;

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to save recipes");
        return;
      }

      const response = await axios.post(
        `${url}/api/recipes/saved`,
        { id: recipeId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          timeout: 5000
        }
      );

      toast.success(response.data.message || "Recipe saved successfully!");
    } catch (error) {
      handleSaveError(error);
    } finally {
      setIsSaving(false);
    }
  };

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

  const navigateToRecipeDetails = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSearching(true);
      try {
        const response = await axios.get(`${url}/api/recipes/search?name=${search}`);
        const searchedRecipes = response.data.recipes || [];
        setRecipes(searchedRecipes);
        setFilteredRecipes(searchedRecipes);
      } catch (error) {
        handleFetchError(error);
      }
      setSearching(false);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to delete recipes");
        return;
      }
      await axios.delete(`${url}/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
      setFilteredRecipes((prev) => prev.filter((r) => r._id !== recipeId));
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete recipe");
    }
  };

  const clearSearch = () => {
    setSearch("");
    // Refetch all recipes when search is cleared
    const fetchAllRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/api/recipes`);
        if (response.data && Array.isArray(response.data.recipes)) {
          setRecipes(response.data.recipes);
          setFilteredRecipes(response.data.recipes);
        }
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRecipes();
  };

  const hasActiveFilters = filters.vegetarian || filters.nonVegetarian;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Explore Recipes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover amazing recipes from around the world
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-lg border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Dietary Preferences */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Dietary Preference</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.vegetarian}
                      onChange={() => handleFilterChange('vegetarian')}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 border-2 rounded-md mr-3 flex items-center justify-center transition-all duration-200 ${
                      filters.vegetarian 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-green-400'
                    }`}>
                      {filters.vegetarian && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      Vegetarian 🌱
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.nonVegetarian}
                      onChange={() => handleFilterChange('nonVegetarian')}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 border-2 rounded-md mr-3 flex items-center justify-center transition-all duration-200 ${
                      filters.nonVegetarian 
                        ? 'bg-red-500 border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-red-400'
                    }`}>
                      {filters.nonVegetarian && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      Non-Vegetarian 🍗
                    </span>
                  </label>
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredRecipes.length} of {recipes.length} recipes
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex justify-center mb-8">
              <div className="relative w-full max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search recipes by name..."
                  className="w-full pl-10 pr-12 py-4 rounded-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 shadow-lg transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {search && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={searching}
                    className="ml-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {searching ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>
            </form>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
              </div>
            )}

            {/* Recipes Grid */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRecipes.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 backdrop-blur-sm shadow-lg">
                      <div className="text-6xl mb-4">🍳</div>
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No recipes found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {search || hasActiveFilters 
                          ? "Try adjusting your search or filters" 
                          : "Be the first to add a recipe!"}
                      </p>
                      {(search || hasActiveFilters) && (
                        <button
                          onClick={() => {
                            setSearch("");
                            clearAllFilters();
                          }}
                          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  filteredRecipes.map((recipe) => (
                    <div
                      key={recipe._id}
                      className="group bg-white/80 dark:bg-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
                    >
                      {/* Recipe Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={recipe.imgurl || '/api/placeholder/300/200'}
                          alt={recipe.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                        {/* Vegetarian Badge */}
                        {recipe.isVegetarian && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            🌱 Vegetarian
                          </div>
                        )}
                      </div>

                      {/* Recipe Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {recipe.title}
                        </h3>
                        
                        {/* Action Buttons */}
                        {localStorage.getItem("token") && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            <button
                              onClick={() => handleSaveRecipe(recipe._id)}
                              disabled={isSaving}
                              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                            >
                              <MdSave className="w-4 h-4" />
                              {isSaving ? 'Saving...' : 'Save'}
                            </button>
                            
                            <button
                              onClick={() => navigate(`/edit/${recipe._id}`)}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              <MdEdit className="w-4 h-4" />
                              Edit
                            </button>
                            
                            <button
                              onClick={() => handleDeleteRecipe(recipe._id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              <MdDeleteForever className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={() => navigateToRecipeDetails(recipe._id)}
                              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              <MdVisibility className="w-4 h-4" />
                              View
                            </button>
                          </div>
                        )}

                        {/* View Only Button for non-logged in users */}
                        {!localStorage.getItem("token") && (
                          <button
                            onClick={() => navigateToRecipeDetails(recipe._id)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
                          >
                            <MdVisibility className="w-4 h-4" />
                            View Recipe
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button for Add Recipe */}
      {localStorage.getItem("token") && (
        <button
          onClick={() => navigate('/add-recipe')}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl"
        >
          +
        </button>
      )}
    </div>
  );
}