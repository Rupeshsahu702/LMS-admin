import { Routes, Route, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setNavigation } from './redux/slice';
import { setNavigationFunction } from './services/navigationService';

const PublicPortal = lazy(() => import('./portals/public'));
const AdminPortal = lazy(() => import('./portals/admin'));
const StudentPortal = lazy(() => import('./portals/student'));

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize navigation service for use outside React components
  useEffect(() => {
    setNavigationFunction(navigate, dispatch);
  }, [navigate, dispatch]);

  useEffect(() => {
    dispatch(setNavigation(location.pathname));
  }, [dispatch, location.pathname]);
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <LoaderCircle className="animate-spin size-16" />
          </div>
        }
      >
        <Routes>
          <Route path="/admin/*" element={<AdminPortal />} />
          <Route path="/student/*" element={<StudentPortal />} />
          <Route path="/*" element={<PublicPortal />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
