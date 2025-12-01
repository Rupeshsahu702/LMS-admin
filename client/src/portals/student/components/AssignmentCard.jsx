import React, { useState } from 'react';
import { Github, FileText, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

import { useSubmitAssignment } from '../hooks';

const AssignmentCard = ({ task, courseId, moduleId, onComplete }) => {
  const [githubLink, setGithubLink] = useState(task?.githubLink || '');
  const [isSubmitted, setIsSubmitted] = useState(task?.isSubmitted || false);
  const [submissionStatus, setSubmissionStatus] = useState(task?.status || 'pending');

  const { submit, loading: submitting, error: submitError } = useSubmitAssignment();

  // Default assignment data if not provided
  const assignment = {
    title: task?.title || 'Assignment',
    description: task?.description || '',
    note: 'Submit the GitHub repository link containing your code, along with a demo video and screenshots in the repository.',
  };

  // Parse description if it's a string into array
  const descriptionItems = Array.isArray(assignment.description)
    ? assignment.description
    : assignment.description
      ? [assignment.description]
      : [];

  const isValidUrl = url => {
    try {
      new URL(url);
      return url.includes('github.com');
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isValidUrl(githubLink)) {
      return;
    }

    try {
      const response = await submit({
        courseId,
        moduleId,
        taskId: task?.taskId || task?.id,
        githubLink,
      });

      if (response.success) {
        setIsSubmitted(true);
        setSubmissionStatus('submitted');
        onComplete?.();
      }
    } catch (err) {
      console.error('Assignment submission failed:', err);
    }
  };

  // Already submitted state
  if (isSubmitted && submissionStatus !== 'pending') {
    return (
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{assignment.title}</h2>
          <p className="text-zinc-400 mb-6">
            {submissionStatus === 'graded'
              ? 'Your assignment has been graded!'
              : 'Assignment submitted successfully!'}
          </p>

          {/* Submission Details */}
          <div className="bg-zinc-800 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Github size={16} className="text-zinc-400" />
              <span className="text-sm text-zinc-400">Submitted Repository:</span>
            </div>
            <a
              href={githubLink || task?.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm"
            >
              {githubLink || task?.githubLink}
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Grade & Feedback (if graded) */}
          {submissionStatus === 'graded' && task?.grade && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-400 font-medium">Grade:</span>
                <span className="text-lg font-bold text-green-400">{task.grade}</span>
              </div>
              {task?.feedback && (
                <div>
                  <span className="text-sm text-green-400 font-medium">Feedback:</span>
                  <p className="text-sm text-zinc-300 mt-1">{task.feedback}</p>
                </div>
              )}
            </div>
          )}

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                submissionStatus === 'graded'
                  ? 'bg-green-500'
                  : submissionStatus === 'submitted'
                    ? 'bg-yellow-500'
                    : 'bg-zinc-500'
              }`}
            ></span>
            <span className="capitalize">{submissionStatus}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={32} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">{assignment.title}</h2>

        {descriptionItems.length > 0 && (
          <div className="text-zinc-300 mb-6 max-w-lg mx-auto">
            {descriptionItems.length === 1 ? (
              <p className="text-base text-left">{descriptionItems[0]}</p>
            ) : (
              <ol className="space-y-2 list-decimal list-inside text-start">
                {descriptionItems.map((para, index) => (
                  <li key={index} className="text-base">
                    {para}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8">
          <p className="text-blue-200 text-sm">
            <strong>Note:</strong> {assignment.note}
          </p>
        </div>

        <div className="w-full mb-6">
          <label className="block text-sm font-medium text-zinc-200 mb-2 text-left">
            GitHub Repository Link
          </label>
          <div className="relative">
            <Github
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400"
            />
            <input
              type="url"
              value={githubLink}
              onChange={e => setGithubLink(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          {githubLink && !isValidUrl(githubLink) && (
            <p className="text-red-400 text-sm mt-2 text-left flex items-center gap-1">
              <AlertCircle size={14} />
              Please enter a valid GitHub repository link
            </p>
          )}
        </div>

        {submitError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {submitError}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!githubLink || !isValidUrl(githubLink) || submitting}
          className={`w-full py-3 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 ${
            submitting
              ? 'bg-zinc-600 cursor-wait'
              : githubLink && isValidUrl(githubLink)
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-zinc-600 cursor-not-allowed'
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Assignment'
          )}
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
