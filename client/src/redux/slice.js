import { createSlice } from '@reduxjs/toolkit';

const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user');

const initialState = {
  token: savedToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  currentNavigation: '/',
  studentSidebarOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,

  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: state => {
      state.token = null;
      state.user = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setNavigation: (state, action) => {
      state.currentNavigation = action.payload;
    },
    setStudentSidebarOpen: (state, action) => {
      state.studentSidebarOpen = action.payload;
    },
  },
});

export const { login, logout, setNavigation, setStudentSidebarOpen } = globalSlice.actions;
export default globalSlice.reducer;
