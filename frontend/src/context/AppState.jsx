/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { url } from "../base";

// Create a context for the application
export const AppContext = createContext();

const AppState = ({ children }) => {
  const [state, setState] = useState({ user: null, isAuthenticated: false });
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [userRecipe, setUserRecipe] = useState([]);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  // Function to handle API requests
  const fetchRequest = async (endpoint, method = "GET", data = null, auth = false) => {
    const options = {
      method,
      url: `${url}/api${endpoint}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data,
    };

    // Add authentication token if required
    if (auth) {
      const token = localStorage.getItem("token");
      if (token) options.headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await axios(options);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Request failed.");
    }
  };

  // Effect to fetch user data and recipes on component mount or reload
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchRequest("/users/me", "GET", null, true)
        .then((data) => {
          setState({ user: data.user, isAuthenticated: true });
          // Only fetch user-specific data if we have a valid user
          getSavedRecipes();
          fetchUserRecipes(data.user._id);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          setState({ user: null, isAuthenticated: false });
        });
    }

    // Always fetch all recipes
    fetchRecipes();
  }, [reload]);

  // Fetch all recipes
  const fetchRecipes = useCallback(async () => {
    try {
      const data = await fetchRequest("/recipes");
      setRecipe(data.recipe);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  // Fetch saved recipes for the authenticated user
  const getSavedRecipes = useCallback(async () => {
    try {
      const data = await fetchRequest("/recipes/saved", "GET", null, true);
      setSavedRecipe(data.savedRecipes);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  // Fetch recipes created by the authenticated user
  const fetchUserRecipes = useCallback(async (userId) => {
    try {
      const data = await fetchRequest(`/recipes/user/${userId}`, "GET", null, true);
      setUserRecipe(data.recipes);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      setError(error.message);
    }
  }, []);

  // Helper functions for fetching recipes by ID and saving recipes
  const getAllRecipes = async () => await fetchRequest("/recipes");

  const getRecipeById = async (id) => await fetchRequest(`/recipes/${id}`);

  const saveRecipeById = async (id) => {
    try {
      await fetchRequest("/recipes/saved", "POST", { id }, true);
      setReload(prevReload => !prevReload); // Toggle reload state
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        getAllRecipes,
        getRecipeById,
        saveRecipeById,
        getSavedRecipes,
        fetchUserRecipes,
        recipe,
        savedRecipe,
        userRecipe,
        state,
        setState,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
