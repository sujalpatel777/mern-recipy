import { useSelector, useDispatch } from 'react-redux';

// Theme hooks
export const useTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  const toggleDarkMode = () => {
    dispatch({ type: 'theme/toggleDarkMode' });
  };
  
  const setTheme = (theme) => {
    dispatch({ type: 'theme/setTheme', payload: theme });
  };
  
  return { isDarkMode, toggleDarkMode, setTheme };
};

// App hooks
export const useApp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  const recipe = useSelector((state) => state.app.recipe);
  const savedRecipe = useSelector((state) => state.app.savedRecipe);
  const userRecipe = useSelector((state) => state.app.userRecipe);
  const error = useSelector((state) => state.app.error);
  const loading = useSelector((state) => state.app.loading);
  
  const setUser = (userData) => {
    dispatch({ type: 'app/setUser', payload: userData });
  };
  
  const logout = () => {
    dispatch({ type: 'app/logout' });
  };
  
  const clearError = () => {
    dispatch({ type: 'app/clearError' });
  };
  
  const setLoading = (loadingState) => {
    dispatch({ type: 'app/setLoading', payload: loadingState });
  };
  
  return {
    user,
    isAuthenticated,
    recipe,
    savedRecipe,
    userRecipe,
    error,
    loading,
    setUser,
    logout,
    clearError,
    setLoading,
  };
};
