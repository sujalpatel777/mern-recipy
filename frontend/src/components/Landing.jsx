

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUtensils, FaHeart, FaEye, FaBookOpen, FaUserFriends, FaMobileAlt, FaStar, FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const Landing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [savedRecipes, setSavedRecipes] = useState(new Set());
    const navigate = useNavigate();

    const featuredRecipes = [
        {
            id: 1,
            title: "Chicken Biryani",
            description: "A fragrant Indian rice dish with tender chicken and aromatic spices.",
            image: "https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani-5.jpg"
        },
        {
            id: 2,
            title: "Paneer Recipe",
            description: "Create delicious meals using fresh paneer and authentic spices.",
            image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/02/paneer-curry-recipe.jpg"
        },
        {
            id: 3,
            title: "Maggie",
            description: "Quick and easy instant noodles with a delicious twist of flavors.",
            image: "https://myfoodstory.com/wp-content/uploads/2022/12/masala-maggi-3.jpg"
        },
        {
            id: 4,
            title: "Cake Recipe",
            description: "Delicious and moist cake that's perfect for any celebration.",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
    ];

    const features = [
        {
            icon: <FaBookOpen />,
            title: "Thousands of Recipes",
            description: "Access a vast collection of recipes from around the world for every occasion."
        },
        {
            icon: <FaUserFriends />,
            title: "Community Driven",
            description: "Share your own recipes and get inspired by other home cooks."
        },
        {
            icon: <FaMobileAlt />,
            title: "Mobile Friendly",
            description: "Access recipes on any device, anywhere, anytime."
        },
        {
            icon: <FaStar />,
            title: "Curated Collections",
            description: "Discover hand-picked recipe collections for every diet and preference."
        }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/recipes?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const toggleSaveRecipe = (recipeId) => {
        setSavedRecipes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(recipeId)) {
                newSet.delete(recipeId);
            } else {
                newSet.add(recipeId);
            }
            return newSet;
        });
    };

    const handleViewRecipe = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
                            <FaUtensils className="text-purple-600" />
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                mern-recipy
                            </span>
                        </Link>

                        <div className="flex space-x-6">
                            <Link to="/Home" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
                            <Link to="/login" className="text-gray-700 hover:text-purple-600 transition-colors">Recipes</Link>
                            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">About</Link>
                            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</Link>
                        </div>

                        <div className="flex space-x-3">
                            <Link to="/login" className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all">
                                Sign Up
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Discover Delicious Recipes
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Explore thousands of amazing recipes from around the world. From traditional dishes to modern creations, find your next culinary inspiration with mern-recipy.
                    </p>

                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex bg-white rounded-full shadow-lg overflow-hidden">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search recipes by name, ingredients, or category..."
                            className="flex-1 px-6 py-4 text-lg border-0 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Featured Recipes */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Recipes</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredRecipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div
                                    className="h-48 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${recipe.image})` }}
                                />

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h3>
                                    <p className="text-gray-600 mb-4">{recipe.description}</p>

                                    <div className="flex justify-between space-x-2">
                                        <button
                                            onClick={() => toggleSaveRecipe(recipe.id)}
                                            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-colors ${savedRecipes.has(recipe.id)
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                                                }`}
                                        >
                                            <FaHeart className={savedRecipes.has(recipe.id) ? 'fill-current' : ''} />
                                            <span>{savedRecipes.has(recipe.id) ? 'Saved' : 'Save'}</span>
                                        </button>

                                        <button
                                            onClick={() => handleViewRecipe(recipe.id)}
                                            className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                        >
                                            <FaEye />
                                            <span>View</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose mern-recipy?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center p-6">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-purple-600">
                                mern-recipy
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Your ultimate destination for discovering, sharing, and creating amazing recipes from around the world.
                            </p>
                            <div className="flex space-x-3">
                                {[FaFacebookF, FaTwitter, FaInstagram, FaPinterest].map((Icon, index) => (
                                    <a key={index} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-purple-600">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                {['Home', 'Recipes', 'About', 'Contact'].map((link) => (
                                    <li key={link}>
                                        <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-purple-600">
                                Categories
                            </h3>
                            <ul className="space-y-2">
                                {['Vegetarian', 'Desserts', 'Main Courses', 'Appetizers', 'Quick & Easy'].map((category) => (
                                    <li key={category}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors">{category}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>


                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 mern-recipy. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;