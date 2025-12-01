import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentNavigation: '/',
  studentSidebarOpen: false,
  adminSidebarOpen: false,
  globalLoading: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,

  reducers: {
    setNavigation: (state, action) => {
      state.currentNavigation = action.payload;
    },

    setStudentSidebarOpen: (state, action) => {
      state.studentSidebarOpen = action.payload;
    },

    setAdminSidebarOpen: (state, action) => {
      state.adminSidebarOpen = action.payload;
    },

    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },

    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },

    clearNotifications: state => {
      state.notifications = [];
    },
  },
});

// Actions
export const {
  setNavigation,
  setStudentSidebarOpen,
  setAdminSidebarOpen,
  setGlobalLoading,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

// Selectors
export const selectUI = state => state.ui;
export const selectCurrentNavigation = state => state.ui.currentNavigation;
export const selectStudentSidebarOpen = state => state.ui.studentSidebarOpen;
export const selectAdminSidebarOpen = state => state.ui.adminSidebarOpen;
export const selectGlobalLoading = state => state.ui.globalLoading;
export const selectNotifications = state => state.ui.notifications;

export default uiSlice.reducer;
