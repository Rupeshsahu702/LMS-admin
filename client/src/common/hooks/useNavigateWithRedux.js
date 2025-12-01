import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setNavigation } from '@/redux/slices';

export const useNavigateWithRedux = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateAndStore = path => {
    dispatch(setNavigation(path));
    navigate(path);
    window.scrollTo(0, 0);
  };

  return navigateAndStore;
};
