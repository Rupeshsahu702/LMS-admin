import React, { useState } from 'react';
import { Github, FileText } from 'lucide-react';

const AssignmentCard = () => {
  const [githubLink, setGithubLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const assignment = {
    title: 'Build a Responsive Landing Page',
    description: [
      'Create a fully responsive landing page using HTML, CSS, and JavaScript.',
      'The page must include a header with navigation, a hero section, a features section, and a footer.',
      'Ensure cross-device compatibility for mobile, tablet, and desktop screens.',
      'Implement modern design principles with clean, accessible code.',
    ],
    note: 'Submit the GitHub repository link containing your code, along with a demo video and screenshots in the repository.',
  };

  const isValidUrl = url => {
    try {
      new URL(url);
      return url.includes('github.com');
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    if (isValidUrl(githubLink)) {
      console.log('Submitted GitHub link:', githubLink);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      alert('Please enter a valid GitHub repository link.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={32} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">{assignment.title}</h2>
        <div className="text-zinc-300 mb-6 max-w-lg mx-auto">
          <ol className="space-y-2 list-decimal list-inside text-start">
            {assignment.description.map((para, index) => (
              <li key={index} className="text-base">
                {para}
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-8">
          <p className="text-blue-200 text-sm">
            <strong>Note:</strong> {assignment.note}
          </p>
        </div>

        <div className="w-full mb-6">
          <label className="block text-sm font-medium text-zinc-200 mb-2 text-left">
            GitHub Repository Link
          </label>
          <input
            type="url"
            value={githubLink}
            onChange={e => setGithubLink(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!githubLink || isSubmitted}
          className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
            isSubmitted
              ? 'bg-green-600 cursor-not-allowed'
              : githubLink && isValidUrl(githubLink)
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-zinc-600 cursor-not-allowed'
          }`}
        >
          {isSubmitted ? 'Submitted Successfully!' : 'Submit Assignment'}
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
