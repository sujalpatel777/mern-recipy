// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import Saved from './components/Saved';
// import AddRecipe from './components/AddRecipe';
// import RecipeDetails from './components/RecipeDetails';
// import Profile from './components/Profile';
// import About from './components/About';
// import EditRecipe from './components/EditRecipe';
// import ProtectedRoute from './components/ProtectedRoute';

// const AppContent = () => {
//   const location = useLocation();
//   const hideNavbar = ["/login", "/register"].includes(location.pathname);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#333',
//             color: '#fff',
//             borderRadius: '12px',
//             padding: '16px 24px',
//             fontSize: '14px',
//             boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//           },
//           success: {
//             iconTheme: {
//               primary: '#4ade80',
//               secondary: '#fff',
//             },
//           },
//           error: {
//             iconTheme: {
//               primary: '#ef4444',
//               secondary: '#fff',
//             },
//           },
//         }}
//       />

//       {!hideNavbar && <Navbar />}

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className="container mx-auto px-4 py-8"
//         >
//           <Routes location={location}>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             <Route path="/" element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             } />

//             <Route path="/recipe/:id" element={
//               <ProtectedRoute>
//                 <RecipeDetails />
//               </ProtectedRoute>
//             } />

//             <Route path="/saved-recipes" element={
//               <ProtectedRoute>
//                 <Saved />
//               </ProtectedRoute>
//             } />

//             <Route path="/add-recipe" element={
//               <ProtectedRoute>
//                 <AddRecipe />
//               </ProtectedRoute>
//             } />

//             <Route path="/profile" element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             } />

//             <Route path="/about" element={<About />} />

//             <Route path="/edit/:id" element={
//               <ProtectedRoute>
//                 <EditRecipe />
//               </ProtectedRoute>
//             } />

//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// const App = () => (
//   <AuthProvider>
//     <Router>
//       <AppContent />
//     </Router>
//   </AuthProvider>
// );

// export default App;

// App.js
// import React from 'react';
// import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import AddRecipe from './components/AddRecipe';
// import FetchRecipeById from './components/FetchRecipeById';
// import AuthPage from './components/AuthPage';
// import Profile from './components/Profile';
// import Saved from './components/Saved';
// import ProtectedRoute from './components/ProtectedRoute';
// import Landing from './components/Landing';
// import EditRecipe from './components/EditRecipe';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Routes>
//           {/* Landing page as the new home */}
//           <Route path="/" element={<Landing />} />

//           {/* Existing routes */}
//           <Route path="/home" element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } />
//           <Route path="/about" element={<About />} />
//           <Route path="/add-recipe" element={
//             <ProtectedRoute>
//               <AddRecipe />
//             </ProtectedRoute>
//           } />
//           <Route path="/recipe/:id" element={<FetchRecipeById />} />
//           <Route path="/edit-recipe/:id" element={
//             <ProtectedRoute>
//               <EditRecipe />
//             </ProtectedRoute>
//           } />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/profile" element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           } />
//           <Route path="/saved" element={
//             <ProtectedRoute>
//               <Saved />
//             </ProtectedRoute>
//           } />

//           {/* Redirect unknown routes to landing */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import AddRecipe from './components/AddRecipe';
// import FetchRecipeById from './components/FetchRecipeById';
// import AuthPage from './components/AuthPage';
// import Profile from './components/Profile';
// import Saved from './components/Saved';
// import ProtectedRoute from './components/ProtectedRoute';
// import Landing from './components/Landing';
// import EditRecipe from './components/EditRecipe';
// // import Recipes from './components/Recipes'; // Make sure you have this component

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/home" element={<Home />} />
//         {/* <Route path="/recipes" element={<Recipes />} /> */}
//         {/* <Route path="/categories" element={<Categories />} /> */}
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/auth" element={<AuthPage />} />
//         {/* <Route path="/recipe/:id" element={<FetchRecipeById />} /> */}
//         <Route path="/add-recipe" element={
//           <ProtectedRoute>
//             <AddRecipe />
//           </ProtectedRoute>
//         } />
//         <Route path="/edit-recipe/:id" element={
//           <ProtectedRoute>
//             <EditRecipe />
//           </ProtectedRoute>
//         } />
//         <Route path="/profile" element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         } />
//         <Route path="/saved" element={
//           <ProtectedRoute>
//             <Saved />
//           </ProtectedRoute>
//         } />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import Saved from './components/Saved';
// import AddRecipe from './components/AddRecipe';
// import RecipeDetails from './components/RecipeDetails';
// import Profile from './components/Profile';
// import About from './components/About';
// import EditRecipe from './components/EditRecipe';
// import ProtectedRoute from './components/ProtectedRoute';
// import Landing from './components/Landing';
// const AppContent = () => {
//   const location = useLocation();
//   const hideNavbar = ["/login", "/register"].includes(location.pathname);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#333',
//             color: '#fff',
//             borderRadius: '12px',
//             padding: '16px 24px',
//             fontSize: '14px',
//             boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//           },
//           success: {
//             iconTheme: {
//               primary: '#4ade80',
//               secondary: '#fff',
//             },
//           },
//           error: {
//             iconTheme: {
//               primary: '#ef4444',
//               secondary: '#fff',
//             },
//           },
//         }}
//       />

//       {!hideNavbar && <Navbar />}

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className="container mx-auto px-4 py-8"
//         >
//           <Routes location={location}>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             <Route path="/" element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             } />

//             <Route path="/recipe/:id" element={
//               <ProtectedRoute>
//                 <RecipeDetails />
//               </ProtectedRoute>
//             } />

//             <Route path="/saved-recipes" element={
//               <ProtectedRoute>
//                 <Saved />
//               </ProtectedRoute>
//             } />

//             <Route path="/add-recipe" element={
//               <ProtectedRoute>
//                 <AddRecipe />
//               </ProtectedRoute>
//             } />

//             <Route path="/profile" element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             } />

//             <Route path="/about" element={<About />} />

//             <Route path="/edit/:id" element={
//               <ProtectedRoute>
//                 <EditRecipe />
//               </ProtectedRoute>
//             } />

//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// const App = () => (
//   <AuthProvider>
//     <Router>
//       <AppContent />
//     </Router>
//   </AuthProvider>
// );

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import Saved from './components/Saved';
// import AddRecipe from './components/AddRecipe';
// import RecipeDetails from './components/RecipeDetails';
// import Profile from './components/Profile';
// import About from './components/About';
// import EditRecipe from './components/EditRecipe';
// import ProtectedRoute from './components/ProtectedRoute';
// import Landing from './components/Landing';

// const AppContent = () => {
//   const location = useLocation();
//   const { user } = useAuth(); // Assuming useAuth provides the current user
//   const hideNavbar = ['/login', '/register'].includes(location.pathname);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#333',
//             color: '#fff',
//             borderRadius: '12px',
//             padding: '16px 24px',
//             fontSize: '14px',
//             boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//           },
//           success: {
//             iconTheme: {
//               primary: '#4ade80',
//               secondary: '#fff',
//             },
//           },
//           error: {
//             iconTheme: {
//               primary: '#ef4444',
//               secondary: '#fff',
//             },
//           },
//         }}
//       />

//       {!hideNavbar && <Navbar />}

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className="container mx-auto px-4 py-8"
//         >
//           <Routes location={location}>
//             {/* Landing page for unauthenticated users, redirect to /home if authenticated */}
//             <Route
//               path="/"
//               element={
//                 user ? <Navigate to="/home" replace /> : <Landing />
//               }
//             />

//             {/* Login and Register routes, accessible to all */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* Protected routes */}
//             <Route
//               path="/home"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/recipe/:id"
//               element={
//                 <ProtectedRoute>
//                   <RecipeDetails />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/saved-recipes"
//               element={
//                 <ProtectedRoute>
//                   <Saved />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/add-recipe"
//               element={
//                 <ProtectedRoute>
//                   <AddRecipe />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="/about" element={<About />} />

//             <Route
//               path="/edit/:id"
//               element={
//                 <ProtectedRoute>
//                   <EditRecipe />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Catch-all route to redirect to landing page */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// const App = () => (
//   <AuthProvider>
//     <Router>
//       <AppContent />
//     </Router>
//   </AuthProvider>
// );

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import Saved from './components/Saved';
// import AddRecipe from './components/AddRecipe';
// import RecipeDetails from './components/RecipeDetails';
// import Profile from './components/Profile';
// import About from './components/About';
// import EditRecipe from './components/EditRecipe';
// import ProtectedRoute from './components/ProtectedRoute';
// import Landing from './components/Landing';
// import ContactForm from './components/ContactForm';
// const AppContent = () => {
//   const location = useLocation();
//   const { user } = useAuth(); // Assuming useAuth provides the current user
//   const hideNavbar = ['/', '/login', '/register'].includes(location.pathname); // Hide Navbar on Landing, Login, Register

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#333',
//             color: '#fff',
//             borderRadius: '12px',
//             padding: '16px 24px',
//             fontSize: '14px',
//             boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//           },
//           success: {
//             iconTheme: {
//               primary: '#4ade80',
//               secondary: '#fff',
//             },
//           },
//           error: {
//             iconTheme: {
//               primary: '#ef4444',
//               secondary: '#fff',
//             },
//           },
//         }}
//       />

//       {!hideNavbar && <Navbar />}

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className="container mx-auto px-4 py-8"
//         >
//           <Routes location={location}>
//             {/* Landing page shown first for all users (no redirect based on auth) */}
//             <Route path="/" element={<Landing />} />

//             {/* Login and Register routes, accessible to all */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* Protected routes - authenticated users can access these */}
//             <Route
//               path="/home"
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/recipe/:id"
//               element={
//                 <ProtectedRoute>
//                   <RecipeDetails />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/saved-recipes"
//               element={
//                 <ProtectedRoute>
//                   <Saved />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/add-recipe"
//               element={
//                 <ProtectedRoute>
//                   <AddRecipe />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />

//             <Route path="/about" element={<About />} />

//             <Route
//               path="/edit/:id"
//               element={
//                 <ProtectedRoute>
//                   <EditRecipe />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Catch-all route to redirect to landing page */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// const App = () => (
//   <AuthProvider>
//     <Router>
//       <AppContent />
//     </Router>
//   </AuthProvider>
// );

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Saved from './components/Saved';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import Profile from './components/Profile';
import About from './components/About';
import EditRecipe from './components/EditRecipe';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './components/Landing';
import ContactForm from './components/ContactForm';

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth(); // Assuming useAuth provides the current user
  const hideNavbar = ['/', '/login', '/register', '/contact'].includes(location.pathname); // Hide Navbar on Landing, Login, Register, Contact

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px 24px',
            fontSize: '14px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {!hideNavbar && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="container mx-auto px-4 py-8"
        >
          <Routes location={location}>
            {/* Landing page shown first for all users (no redirect based on auth) */}
            <Route path="/" element={<Landing />} />

            {/* Login and Register routes, accessible to all */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Contact route - accessible to all users */}
            <Route path="/contact" element={<ContactForm />} />

            {/* Protected routes - authenticated users can access these */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recipe/:id"
              element={
                <ProtectedRoute>
                  <RecipeDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-recipes"
              element={
                <ProtectedRoute>
                  <Saved />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-recipe"
              element={
                <ProtectedRoute>
                  <AddRecipe />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/about" element={<About />} />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route to redirect to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;