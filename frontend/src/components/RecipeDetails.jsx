
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { url } from "../base";

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`${url}/api/recipes/get/${id}`);
                setRecipe(response.data.recipe);
                setLoading(false);
            } catch (err) {
                handleFetchError(err);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    const handleFetchError = (err) => {
        setError('Failed to fetch recipe details. Please try again later.');
        setLoading(false);
        console.error('Error fetching recipe:', err);
    };

    const handleSaveRecipe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to save recipes');
                navigate('/login');
                return;
            }

            await axios.post(
                `${url}/api/recipes/saved`,
                { id: recipe._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Recipe saved successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save recipe');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#a145f7] mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading recipe...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto text-center py-16 px-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                    <div className="text-red-500 dark:text-red-400 text-4xl mb-4">⚠️</div>
                    <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="max-w-md mx-auto text-center py-16 px-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
                    <div className="text-yellow-500 dark:text-yellow-400 text-4xl mb-4">🔍</div>
                    <p className="text-yellow-700 dark:text-yellow-300 text-lg">Recipe not found</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 px-6 py-2 bg-[#a145f7] text-white rounded-lg hover:bg-[#8a2be2] transition-colors duration-200 font-medium"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 mb-6 text-[#a145f7] hover:text-[#8a2be2] transition-colors duration-200 font-medium"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Recipes
            </button>

            {/* Recipe Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Recipe Image */}
                <div className="relative h-64 sm:h-80 lg:h-96">
                    <img
                        src={recipe.imgurl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                            {recipe.title}
                        </h1>
                    </div>
                </div>

                {/* Recipe Content */}
                <div className="p-6 sm:p-8 lg:p-10">
                    {/* Stats Grid */}
                    {recipe.cookingTime && recipe.difficulty && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-gradient-to-r from-[#a145f7] to-[#8a2be2] p-4 rounded-xl text-white">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm opacity-90">Cooking Time</p>
                                        <p className="text-xl font-semibold">{recipe.cookingTime} minutes</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-[#a145f7] to-[#8a2be2] p-4 rounded-xl text-white">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm opacity-90">Difficulty</p>
                                        <p className="text-xl font-semibold capitalize">{recipe.difficulty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {recipe.description && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#a145f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                About this Recipe
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                {recipe.description}
                            </p>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Ingredients */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#a145f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        <div className="w-2 h-2 bg-[#a145f7] rounded-full"></div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                                            {ingredient.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#a145f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Instructions
                            </h2>
                            <div className="prose dark:prose-invert max-w-none">
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                                        {recipe.instructions}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Recipe Button */}
                    <div className="flex justify-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={handleSaveRecipe}
                            className="px-8 py-3 bg-gradient-to-r from-[#a145f7] to-[#8a2be2] text-white rounded-lg hover:from-[#8a2be2] hover:to-[#7b1fa2] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Save Recipe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;