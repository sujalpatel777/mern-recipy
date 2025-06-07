import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
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
                `http://localhost:5000/api/recipes/saved`,
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">Recipe not found</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-[#a145f7] dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64 sm:h-96">
                    <img
                        src={recipe.imgurl}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold text-white dark:text-white">
                            {recipe.title}
                        </h1>
                        {/* <button
                            onClick={handleSaveRecipe}
                            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Save Recipe
                        </button> */}
                    </div>

                    {/* <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Cooking Time</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {recipe.cookingTime} minutes
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {recipe.difficulty}
                            </p>
                        </div>
                    </div> */}

                    {/* <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Description
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">{recipe.description}</p>
                    </div> */}

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Ingredients
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                <li
                                    key={index}
                                    className="text-gray-600 dark:text-gray-300"
                                >
                                    {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Instructions
                        </h2>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                {recipe.instructions}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-[#a145f7] text-white rounded-lg hover:bg-[#8a2be2] transition-colors duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default RecipeDetails; 