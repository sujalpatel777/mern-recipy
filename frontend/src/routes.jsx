// import React from 'react';
// import { Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
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

// // Create router with future flags
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Landing />,
//     },
//     {
//         path: "/about",
//         element: <About />,
//     },
//     {
//         path: "/add-recipe",
//         element: <ProtectedRoute><AddRecipe /></ProtectedRoute>,
//     },
//     {
//         path: "/recipe/:id",
//         element: <FetchRecipeById />,
//     },
//     {
//         path: "/login",
//         element: <AuthPage />,
//     },
//     {
//         path: "/register",
//         element: <AuthPage />,
//     },
//     {
//         path: "/profile",
//         element: <ProtectedRoute><Profile /></ProtectedRoute>,
//     },
//     {
//         path: "/saved",
//         element: <ProtectedRoute><Saved /></ProtectedRoute>,
//     },
//     {
//         path: "/edit/:id",
//         element: <ProtectedRoute><EditRecipe /></ProtectedRoute>,
//     },
//     {
//         path: "*",
//         element: <Navigate to={localStorage.getItem('token') ? "/" : "/login"} />,
//     },
// ], {
//     future: {
//         v7_startTransition: true,
//         v7_relativeSplatPath: true
//     }
// });

// function AppRoutes() {
//     return <RouterProvider router={router} />;
// }

// export default AppRoutes; 

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
//     return (
//         <BrowserRouter>
//             <div className="App">
//                 <Routes>
//                     {/* Landing page as the new home */}
//                     <Route path="/" element={<Landing />} />

//                     {/* Existing routes */}
//                     <Route path="/home" element={
//                         <ProtectedRoute>
//                             <Home />
//                         </ProtectedRoute>
//                     } />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/add-recipe" element={
//                         <ProtectedRoute>
//                             <AddRecipe />
//                         </ProtectedRoute>
//                     } />
//                     <Route path="/recipe/:id" element={<FetchRecipeById />} />
//                     <Route path="/edit-recipe/:id" element={
//                         <ProtectedRoute>
//                             <EditRecipe />
//                         </ProtectedRoute>
//                     } />
//                     <Route path="/auth" element={<AuthPage />} />
//                     <Route path="/profile" element={
//                         <ProtectedRoute>
//                             <Profile />
//                         </ProtectedRoute>
//                     } />
//                     <Route path="/saved" element={
//                         <ProtectedRoute>
//                             <Saved />
//                         </ProtectedRoute>
//                     } />

//                     {/* Redirect unknown routes to landing */}
//                     <Route path="*" element={<Navigate to="/" replace />} />
//                 </Routes>
//             </div>
//         </BrowserRouter>
//     );
// }

// export default App;