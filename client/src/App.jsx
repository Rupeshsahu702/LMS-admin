import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setNavigation } from './redux/slice';

const PublicPortal = lazy(() => import('./portals/public'));
const AdminPortal = lazy(() => import('./portals/admin'));
const StudentPortal = lazy(() => import('./portals/student'));

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

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
