import React from 'react';

const EnrollmentsTable = () => {
  const enrollments = [
    {
      studentName: 'Alex Johnson',
      course: 'Advanced JavaScript',
      college: 'College of Engineering',
      date: '2023-10-26',
    },
    {
      studentName: 'Maria Garcia',
      course: 'UI/UX Design Fundamentals',
      college: 'College of Arts & Design',
      date: '2023-10-26',
    },
    {
      studentName: 'James Smith',
      course: 'Data Structures & Algorithms',
      college: 'College of Science',
      date: '2023-10-25',
    },
    {
      studentName: 'Patricia Brown',
      course: 'Introduction to Python',
      college: 'College of Engineering',
      date: '2023-10-25',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Student Enrollments</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                College
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrollments.map((enrollment, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{enrollment.studentName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{enrollment.course}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{enrollment.college}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{enrollment.date}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentsTable;
