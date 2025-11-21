import { Outlet } from 'react-router-dom';

import StudentSidebar from '../components/StudentSidebar';
import StudentTopBar from '../components/StudentTopBar';

const StudentLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 shrink-0">
        <StudentSidebar />
      </div>
      <div className="grow overflow-auto flex flex-col">
        <div className="w-full shrink-0">
          <StudentTopBar />
        </div>
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
