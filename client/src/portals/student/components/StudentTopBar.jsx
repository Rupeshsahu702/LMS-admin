import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { setStudentSidebarOpen } from '@/redux/slice';

const StudentTopBar = () => {
  const dispatch = useDispatch();
  const studentSidebarOpen = useSelector(state => state.global.studentSidebarOpen);
  const currentNavigation = useSelector(state => state.global.currentNavigation);
  const toggleSidebar = () => {
    dispatch(setStudentSidebarOpen(!studentSidebarOpen));
  };
  return (
    <div className="h-20 bg-black/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => toggleSidebar()}
          className="md:hidden text-zinc-400 hover:text-white"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold hidden sm:block capitalize">
          {currentNavigation.split('/').slice(-1)[0].replaceAll('-', ' ') || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative group">
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></div>
          <Bell
            size={20}
            className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentTopBar;
