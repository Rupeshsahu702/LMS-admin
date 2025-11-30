import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  Award,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  PlayCircle,
  Target,
  Zap,
} from 'lucide-react';

const StudentLandingPage = () => {
  const features = [
    {
      icon: <BookOpen className="size-6" />,
      title: 'Interactive Courses',
      description: 'Learn with hands-on projects and real-world assignments',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: <Award className="size-6" />,
      title: 'Verified Certificates',
      description: 'Earn industry-recognized certificates upon completion',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/20',
    },
    {
      icon: <Users className="size-6" />,
      title: 'Expert Mentors',
      description: '24/7 support from experienced industry professionals',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10 border-green-500/20',
    },
    {
      icon: <TrendingUp className="size-6" />,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Students' },
    { value: '10+', label: 'Tech Streams' },
    { value: '100%', label: 'Project Based' },
    { value: '24/7', label: 'Mentor Support' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <Zap className="size-4" />
              Start Your Learning Journey Today
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                Code2Dbug
              </span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl text-zinc-300">
                Learning Management System
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Your gateway to mastering tech skills through internship-based, project-driven learning. 
              Access courses, track progress, and earn certificates.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/student/login"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] group"
              >
                <BookOpen className="size-5" />
                LMS Login
                <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/enroll"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-600 hover:border-blue-500 hover:text-blue-400 font-bold text-lg transition-all duration-300"
              >
                <GraduationCap className="size-5" />
                Enroll Now
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8 border-t border-zinc-800">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn with Us?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Experience a unique learning approach that combines theory with practical implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border ${feature.bgColor} hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className={`${feature.color} mb-4 p-3 rounded-xl bg-black/30 inline-block`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LMS Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Personal <span className="text-blue-400">Learning Dashboard</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Track your courses, assignments, quizzes, and achievements all in one place. 
                Our intuitive dashboard helps you stay organized and motivated throughout your learning journey.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Target className="size-5" />, text: 'Personalized learning paths' },
                  { icon: <Clock className="size-5" />, text: 'Track your study hours and streaks' },
                  { icon: <Award className="size-5" />, text: 'Earn badges and certificates' },
                  { icon: <PlayCircle className="size-5" />, text: 'Access video lessons anytime' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-zinc-300">
                    <span className="text-blue-400">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/student/login"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
              >
                <BookOpen className="size-5" />
                Access LMS Portal
                <ChevronRight className="size-5" />
              </Link>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-3xl"></div>
              
              <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6 border-b border-zinc-700 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">Student Dashboard</div>
                </div>

                {/* Mock Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">3</div>
                    <div className="text-xs text-zinc-500">Active Courses</div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">85%</div>
                    <div className="text-xs text-zinc-500">Avg. Score</div>
                  </div>
                </div>

                {/* Mock Progress */}
                <div className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-xl border border-zinc-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Full Stack Development</span>
                      <span className="text-xs text-blue-400">75%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-black/40 rounded-xl border border-zinc-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Data Science Basics</span>
                      <span className="text-xs text-purple-400">45%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-b from-zinc-900/50 to-black border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-zinc-400 text-lg mb-8">
            Join thousands of students who are already building their tech careers with Code2Dbug
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/student/login"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]"
            >
              <BookOpen className="size-5" />
              Login to LMS
            </Link>
            
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-600 hover:border-blue-500 hover:text-blue-400 font-bold text-lg transition-all duration-300"
            >
              Learn More
              <ChevronRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLandingPage;
