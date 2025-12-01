import { createSlice } from '@reduxjs/toolkit';

// Token storage keys - consistent with api.js
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

// Initialize from localStorage
const savedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
const savedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
const savedUser = localStorage.getItem(USER_KEY);

// Clean up old 'token' key if it exists (migration)
if (localStorage.getItem('token')) {
  localStorage.removeItem('token');
}

const initialState = {
  accessToken: savedAccessToken || null,
  refreshToken: savedRefreshToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!(savedAccessToken && savedRefreshToken),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.isAuthenticated = true;

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    logout: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },

    updateTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      if (accessToken) {
        state.accessToken = accessToken;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      }
      if (refreshToken) {
        state.refreshToken = refreshToken;
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
    },
  },
});

// Actions
export const { login, logout, updateTokens, updateUser } = authSlice.actions;

// Selectors
export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.user;
export const selectAccessToken = state => state.auth.accessToken;
export const selectRefreshToken = state => state.auth.refreshToken;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;

// Backward compatibility - alias for selectAccessToken
export const selectToken = state => state.auth.accessToken;

export default authSlice.reducer;
