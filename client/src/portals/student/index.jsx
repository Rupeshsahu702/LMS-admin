import { Routes, Route } from 'react-router-dom';

import StudentDashboard from './pages/StudentDashboard';
import StudentLayout from './layout/StudentLayout.jsx';
import MyCourses from './pages/MyCoursesList.jsx';
import CourseLearningInterface from './pages/CourseLearningInterface.jsx';
import StudentLeaderBoard from './pages/StudentLeaderBoard.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ReferandEarnPage from './pages/ReferandEarnPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import StudentCertificatePage from './pages/StudentCertificatePage';

const StudentPortal = () => {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/courses" element={<CourseLearningInterface />} />
        {/* <Route path="/assignments" element={<Assignments />} /> */}
        {/* <Route path="/quizzes" element={<Quizzes />} /> */}
        <Route path="/leaderboard" element={<StudentLeaderBoard />} />
        <Route path="/certificates" element={<StudentCertificatePage />} />
        <Route path="/refer-and-earn" element={<ReferandEarnPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default StudentPortal;
