import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!(user || token);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="w-full bg-white border-b border-gray-300 flex justify-center">
                <div className="flex space-x-8 py-2">
                    <Link to="/" className="font-semibold">home</Link>
                    {isAuthenticated && <Link to="/add-recipe" className="font-semibold">add recipy</Link>}
                    {isAuthenticated && <Link to="/saved" className="font-semibold">saved recipy</Link>}
                    <Link to="/about" className="font-semibold">about</Link>
                    {isAuthenticated && <Link to="/profile" className="font-semibold">profile</Link>}
                    {!isAuthenticated && <Link to="/login" className="font-semibold">login</Link>}
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 mt-8">
                    <div className="bg-teal-700 text-white flex items-center justify-center text-2xl md:text-3xl font-semibold rounded-lg w-[300px] h-[250px] md:w-[430px] md:h-[352px] mb-4 md:mb-0">
                        recipy logo
                    </div>
                    <div className="bg-blue-700 text-white flex items-center justify-center text-2xl md:text-3xl font-semibold rounded-lg w-[300px] h-[250px] md:w-[430px] md:h-[352px]">
                        recipy img
                    </div>
                </div>
                <div className="mt-8 text-lg md:text-xl text-gray-800 font-medium">swipe to login</div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-gray-900 text-white text-center py-4 mt-8">
                make recipy copy write by sujal
            </footer>
        </div>
    );
};

export default Landing; 