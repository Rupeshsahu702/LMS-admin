import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import StudentSidebar from '../components/StudentSidebar';
import StudentTopBar from '../components/StudentTopBar';

const StudentLayout = () => {
  const studentSidebarOpen = useSelector(state => state.global.studentSidebarOpen);
  const currentNavigation = useSelector(state => state.global.currentNavigation);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`z-40 absolute md:static h-screen shrink-0 overflow-hidden transition-all ${studentSidebarOpen ? 'w-64' : 'w-0'}`}
      >
        <StudentSidebar />
      </div>
      <div className="grow flex overflow-auto flex-col">
        <div className="w-full shrink-0 sticky top-0 z-10">
          <StudentTopBar />
        </div>
        <div
          className={`grow ${currentNavigation.split('/').at(-2) === 'my-courses' ? '' : 'container mx-auto'}`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
