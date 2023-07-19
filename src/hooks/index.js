import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarShow } from '../redux/modules/init';

export const useSidebarShow = () => {
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  const dispatch = useDispatch();

  const setSidebarVisibility = (show) => {
    dispatch(setSidebarShow(show));
  };

  return [sidebarShow, setSidebarVisibility];
};
