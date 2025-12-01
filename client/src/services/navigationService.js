// Navigation service for use outside React components
// This allows axios interceptors to trigger navigation

let navigateFunction = null;
let dispatchFunction = null;

export const setNavigationFunction = (navigate, dispatch) => {
  navigateFunction = navigate;
  dispatchFunction = dispatch;
};

export const navigateTo = path => {
  if (navigateFunction && dispatchFunction) {
    // Use React Router's navigate with Redux dispatch
    import('@/redux/slices').then(({ setNavigation }) => {
      dispatchFunction(setNavigation(path));
      navigateFunction(path);
      window.scrollTo(0, 0);
    });
  } else {
    // Fallback to window.location if navigate not set
    window.location.href = path;
  }
};

export const navigateToLogin = () => {
  navigateTo('/student/login');
};
