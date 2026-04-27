import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  failedAttempts: 0,
  lockedUntil: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        isAuthenticated: true,
        isLoading: false,
        failedAttempts: 0,
        lockedUntil: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        failedAttempts: state.failedAttempts + 1,
        isLoading: false
      };
    case 'LOCK_ACCOUNT':
      return {
        ...state,
        lockedUntil: action.payload.lockedUntil
      };
    case 'UNLOCK_ACCOUNT':
      return {
        ...state,
        lockedUntil: null,
        failedAttempts: 0
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('mu_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, role: user.role }
      });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('mu_user', JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, role: user.role } });
  };

  const logout = () => {
    localStorage.removeItem('mu_user');
    dispatch({ type: 'LOGOUT' });
  };

  const loginFailure = () => {
    dispatch({ type: 'LOGIN_FAILURE' });
  };

  const lockAccount = (lockedUntil) => {
    dispatch({ type: 'LOCK_ACCOUNT', payload: { lockedUntil } });
  };

  const unlockAccount = () => {
    dispatch({ type: 'UNLOCK_ACCOUNT' });
  };

  const updateUser = (updates) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem('mu_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      loginFailure,
      lockAccount,
      unlockAccount,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
