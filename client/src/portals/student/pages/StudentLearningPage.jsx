import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Notebook,
  FileText,
  CheckCircle,
  UploadCloud,
  Award,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Video,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import QuizCard from '../components/QuizCard';
import AssignmentCard from '../components/AssignmentCard';
import { useCourseDetails, useMarkModuleAccessed, useCourseProgress } from '../hooks';

const StudentLearningPage = () => {
  const { coursename } = useParams();
  const [activeModule, setActiveModule] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [bar, setbar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch course details and progress
  const { course, loading, error, refetch } = useCourseDetails(coursename);
  const { progress, refetch: refetchProgress } = useCourseProgress(coursename);
  const { markAccessed } = useMarkModuleAccessed();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set first module as active when course loads
  useEffect(() => {
    if (course?.modules && activeModule === null) {
      const firstModule = course.modules[0];
      if (firstModule) {
        setActiveModule(firstModule._id || firstModule.id);
      }
    }
  }, [course, activeModule]);

  // Track module access
  const handleModuleAccess = async moduleId => {
    if (!course) return;
    try {
      await markAccessed(course._id || course.id, moduleId);
    } catch (err) {
      // Silently fail - this is just for tracking
      console.error('Failed to track module access:', err);
    }
  };

  const handleContentClick = (type, data, module) => {
    setActiveContent({ type, data, moduleId: module._id || module.id });
    handleModuleAccess(module._id || module.id);

    if (isMobile) {
      setbar(false);
    }
  };

  const handleQuizComplete = () => {
    refetch();
    refetchProgress();
    toast.success('Quiz completed!');
  };

  const handleTaskComplete = () => {
    refetch();
    refetchProgress();
    toast.success('Assignment submitted!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 bg-black text-white">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-red-400">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white">
        <BookOpen size={64} className="text-zinc-600 mb-4" />
        <p className="text-zinc-400">Course not found</p>
      </div>
    );
  }

  // Calculate overall progress
  const overallProgress = progress?.progressPercentage || course.progress || 0;

  return (
    <div className="flex h-full relative bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Main Content Area */}
      <div className="grow overflow-hidden p-6 md:p-10">
        {/* No selection state */}
        {!activeContent && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <Notebook size={64} className="mb-4 opacity-20" />
            <h2 className="text-2xl font-bold text-zinc-300">Select content to start learning</h2>
            <p>Choose a module from the sidebar.</p>
          </div>
        )}

        {/* Text Link Content */}
        {activeContent?.type === 'textLink' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText size={32} className="text-blue-400" />
                <h2 className="text-2xl font-bold">{activeContent.data.title}</h2>
              </div>

              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-zinc-400">
                  Click the link below to access the reading material for this section.
                </p>
              </div>

              <a
                href={activeContent.data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
              >
                <ExternalLink size={18} />
                Open Reading Material
              </a>
            </div>
          </div>
        )}

        {/* Video Link Content */}
        {activeContent?.type === 'videoLink' && (
          <div className="space-y-6">
            <div className="aspect-video bg-black rounded-xl border border-zinc-800 overflow-hidden">
              {activeContent.data.url.includes('youtube.com') ||
              activeContent.data.url.includes('youtu.be') ? (
                <iframe
                  src={activeContent.data.url
                    .replace('watch?v=', 'embed/')
                    .replace('youtu.be/', 'youtube.com/embed/')}
                  title={activeContent.data.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Video size={64} className="text-zinc-600 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">{activeContent.data.title}</h3>
                  <a
                    href={activeContent.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
                  >
                    <ExternalLink size={18} />
                    Watch Video
                  </a>
                </div>
              )}
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h3 className="text-lg font-bold mb-2">{activeContent.data.title}</h3>
              {activeContent.data.description && (
                <p className="text-zinc-400">{activeContent.data.description}</p>
              )}
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {activeContent?.type === 'quiz' && (
          <QuizCard
            courseSlug={coursename}
            quizId={activeContent.data._id || activeContent.data.id}
            courseId={course._id || course.id}
            moduleId={activeContent.moduleId}
            onComplete={handleQuizComplete}
          />
        )}

        {/* Task/Assignment Content */}
        {activeContent?.type === 'task' && (
          <AssignmentCard
            task={activeContent.data}
            courseId={course._id || course.id}
            moduleId={activeContent.moduleId}
            onComplete={handleTaskComplete}
          />
        )}
      </div>

      {/* Sidebar Toggle Button */}
      <div
        className={`absolute transition-all top-4 rounded-s-full overflow-hidden border-2 border-e-0 border-zinc-700 ${bar === true ? 'right-80' : 'right-0'}`}
      >
        <button className="p-4 bg-zinc-900" onClick={() => setbar(!bar)}>
          {bar && <ChevronRight size={20} />}
          {!bar && <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-20 absolute lg:static right-0 shrink-0 h-[calc(100vh-5rem)] overflow-auto transition-all bg-zinc-900 border border-zinc-700 ${bar ? 'w-80' : 'w-0'}`}
      >
        {/* Course Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-900 flex justify-between items-center sticky top-0">
          <div>
            <h2 className="font-bold text-lg leading-tight line-clamp-1">{course.title}</h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
              <div className="flex-1 h-1.5 bg-zinc-700 rounded-full w-24 overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${overallProgress}%` }}></div>
              </div>
              <span>{overallProgress}% Done</span>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.modules?.map((module, moduleIndex) => {
            const moduleId = module._id || module.id;
            const moduleProgress = progress?.moduleProgress?.find(
              mp => mp.moduleId?.toString() === moduleId?.toString(),
            );
            const isModuleCompleted = moduleProgress?.progressPercentage === 100;

            return (
              <div
                key={moduleId}
                className="border rounded-xl overflow-hidden transition-all border-zinc-700 bg-black/20"
              >
                {/* Module Header */}
                <button
                  onClick={() => setActiveModule(activeModule === moduleId ? null : moduleId)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isModuleCompleted ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center text-xs">
                        {moduleIndex + 1}
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-sm text-white block">{module.title}</span>
                      {module.maxTimelineInDays && (
                        <span className="text-xs text-zinc-500">
                          {module.maxTimelineInDays} days
                        </span>
                      )}
                    </div>
                  </div>
                  {activeModule === moduleId ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {/* Module Content */}
                {activeModule === moduleId && (
                  <div className="bg-zinc-900/50 border-t border-zinc-800">
                    {/* Text Links */}
                    {module.textLinks?.length > 0 && (
                      <div className="px-3 pt-3">
                        <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2 pl-8">
                          Reading Materials
                        </p>
                        {module.textLinks.map((url, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              handleContentClick(
                                'textLink',
                                { url, title: `Reading ${idx + 1}` },
                                module,
                              )
                            }
                            className={`w-full p-3 pl-11 flex items-center gap-3 text-sm hover:bg-blue-900/20 transition-colors border-l-2 ${
                              activeContent?.type === 'textLink' && activeContent?.data?.url === url
                                ? 'border-blue-500 bg-blue-900/10 text-blue-400'
                                : 'border-transparent text-zinc-400'
                            }`}
                          >
                            <FileText size={14} />
                            <span className="truncate">Reading Material {idx + 1}</span>
                            <ExternalLink size={12} className="ml-auto opacity-50" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Video Links */}
                    {module.videoLinks?.length > 0 && (
                      <div className="px-3 pt-3">
                        <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2 pl-8">
                          Video Lessons
                        </p>
                        {module.videoLinks.map((url, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              handleContentClick(
                                'videoLink',
                                { url, title: `Video ${idx + 1}` },
                                module,
                              )
                            }
                            className={`w-full p-3 pl-11 flex items-center gap-3 text-sm hover:bg-blue-900/20 transition-colors border-l-2 ${
                              activeContent?.type === 'videoLink' &&
                              activeContent?.data?.url === url
                                ? 'border-blue-500 bg-blue-900/10 text-blue-400'
                                : 'border-transparent text-zinc-400'
                            }`}
                          >
                            <Video size={14} />
                            <span className="truncate">Video Lesson {idx + 1}</span>
                            <ExternalLink size={12} className="ml-auto opacity-50" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Quizzes */}
                    {module.quizzes?.length > 0 && (
                      <div className="px-3 pt-3">
                        <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2 pl-8">
                          Quizzes
                        </p>
                        {module.quizzes.map(quiz => {
                          const quizId = quiz._id || quiz.id;
                          return (
                            <button
                              key={quizId}
                              onClick={() => handleContentClick('quiz', quiz, module)}
                              className={`w-full p-3 pl-11 flex items-center gap-3 text-sm hover:bg-blue-900/20 transition-colors border-l-2 ${
                                activeContent?.type === 'quiz' &&
                                (activeContent?.data?._id || activeContent?.data?.id) === quizId
                                  ? 'border-blue-500 bg-blue-900/10 text-blue-400'
                                  : 'border-transparent text-zinc-400'
                              }`}
                            >
                              <Notebook size={14} />
                              <span className="truncate">{quiz.title}</span>
                              {quiz.isCompleted && (
                                <CheckCircle size={12} className="ml-auto text-green-500" />
                              )}
                              {quiz.questionsCount && !quiz.isCompleted && (
                                <span className="ml-auto text-xs text-zinc-500">
                                  {quiz.questionsCount} Q
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Tasks/Assignments */}
                    {module.tasks?.length > 0 && (
                      <div className="px-3 pt-3 pb-3">
                        <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2 pl-8">
                          Tasks & Assignments
                        </p>
                        {module.tasks.map(task => {
                          const taskId = task._id || task.id;
                          return (
                            <button
                              key={taskId}
                              onClick={() => handleContentClick('task', task, module)}
                              className={`w-full p-3 pl-11 flex items-center gap-3 text-sm hover:bg-blue-900/20 transition-colors border-l-2 ${
                                activeContent?.type === 'task' &&
                                (activeContent?.data?._id || activeContent?.data?.id) === taskId
                                  ? 'border-blue-500 bg-blue-900/10 text-blue-400'
                                  : 'border-transparent text-zinc-400'
                              }`}
                            >
                              <UploadCloud size={14} />
                              <span className="truncate">{task.title}</span>
                              {task.isCompleted && (
                                <CheckCircle size={12} className="ml-auto text-green-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Capstone Projects */}
          {course.capstoneProjects?.length > 0 && (
            <div className="border rounded-xl border-yellow-500/30 bg-yellow-900/10 p-4">
              <div className="flex items-center gap-3 mb-3">
                <Award size={20} className="text-yellow-500" />
                <span className="font-bold text-sm">Capstone Projects</span>
              </div>
              {course.capstoneProjects.map((project, idx) => (
                <div key={idx} className="mt-2 p-3 bg-black/20 rounded-lg">
                  <h4 className="font-medium text-sm">{project.title}</h4>
                  {project.description && (
                    <p className="text-xs text-zinc-500 mt-1">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certification */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard size={20} className="text-blue-400" />
              <span className="font-bold text-sm text-blue-100">Final Certification</span>
            </div>
            <p className="text-xs text-blue-300/70 mb-3">Complete all modules to get certified.</p>
            <button
              disabled={overallProgress < 100}
              className="w-full bg-blue-600 disabled:bg-zinc-700 disabled:text-zinc-500 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded transition-colors"
            >
              {overallProgress < 100 ? `${overallProgress}% Complete` : 'Get Certificate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLearningPage;
