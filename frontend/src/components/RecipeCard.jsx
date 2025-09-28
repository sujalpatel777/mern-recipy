

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Clock, Users, Star, Share2, Bookmark, ChefHat } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleSave = (e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleShare = (e) => {
        e.stopPropagation();
        // Share functionality would go here
        console.log('Sharing recipe:', recipe.title);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer relative"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                {recipe.isFeatured && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg"
                    >
                        Featured
                    </motion.span>
                )}
                {recipe.difficulty && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg"
                    >
                        {recipe.difficulty}
                    </motion.span>
                )}
            </div>

            {/* Like Button */}
            <motion.button
                onClick={handleLike}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Heart
                    className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
                        }`}
                />
            </motion.button>

            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <AnimatePresence>
                    {!imageLoaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"
                        >
                            <ChefHat className="w-12 h-12 text-gray-400 animate-pulse" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.img
                    src={recipe.imgurl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Recipe Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-4 text-sm">
                        <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                            <Clock className="w-4 h-4" />
                            <span>{recipe.time}</span>
                        </motion.div>
                        <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                            <Users className="w-4 h-4" />
                            <span>{recipe.servings}</span>
                        </motion.div>
                        <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{recipe.rating}</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <motion.h3
                    className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 leading-tight"
                    whileHover={{ color: '#9333ea' }}
                    transition={{ duration: 0.2 }}
                >
                    {recipe.title}
                </motion.h3>

                {/* Description */}
                {recipe.description && (
                    <motion.p
                        className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {recipe.description}
                    </motion.p>
                )}

                {/* Ingredients */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-200 rounded-full text-xs font-medium border border-purple-200 dark:border-purple-800"
                            whileHover={{
                                scale: 1.1,
                                background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
                                color: "white"
                            }}
                        >
                            {ingredient.name}
                        </motion.span>
                    ))}
                    {recipe.ingredients.length > 4 && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
                        >
                            +{recipe.ingredients.length - 4} more
                        </motion.span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <motion.button
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                        whileHover={{
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View Recipe
                    </motion.button>

                    <motion.button
                        onClick={handleSave}
                        className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-purple-600 text-purple-600' : ''}`} />
                    </motion.button>

                    <motion.button
                        onClick={handleShare}
                        className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Share2 className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-all duration-300 pointer-events-none" />
        </motion.div>
    );
};

export default RecipeCard;
