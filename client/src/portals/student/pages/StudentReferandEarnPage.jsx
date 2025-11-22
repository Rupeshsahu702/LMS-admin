import React, { useState } from 'react';
import {
  Gift,
  Share2,
  Copy,
  Unlock,
  Lock,
  FileText,
  Linkedin,
  Github,
  Video,
  Users,
  PhoneCall,
  CheckCircle,
  X,
} from 'lucide-react';

const StudentReferandEarnPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [referralCode, setReferralCode] = useState('ALEX-J-2025');
  const [inputCode, setInputCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'admin' or 'qr'

  // Improved Copy Function with Fallback
  const handleCopyCode = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(referralCode);
        alert('Referral code copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy using Clipboard API: ', err);
        fallbackCopyTextToClipboard(referralCode);
      }
    } else {
      fallbackCopyTextToClipboard(referralCode);
    }
  };

  const fallbackCopyTextToClipboard = text => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('Referral code copied to clipboard!');
      } else {
        alert('Unable to copy code. Please copy manually.');
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      alert('Unable to copy code. Please copy manually.');
    }

    document.body.removeChild(textArea);
  };

  // Mock unlock logic
  const handleUnlock = () => {
    if (inputCode.trim().length > 0) {
      setIsUnlocked(true);
    }
  };

  const benefits = [
    {
      id: 1,
      title: 'ATS-Ready Resume',
      desc: 'Get a professional CV review and rewrite to beat the bots.',
      icon: <FileText size={32} className="text-blue-400" />,
      action: 'admin', // triggers Admin Call modal
      color: 'border-blue-500/30 bg-blue-500/5',
    },
    {
      id: 2,
      title: 'LinkedIn Optimization',
      desc: 'Profile makeover to attract recruiters and build your brand.',
      icon: <Linkedin size={32} className="text-blue-500" />,
      action: 'admin',
      color: 'border-blue-600/30 bg-blue-600/5',
    },
    {
      id: 3,
      title: 'GitHub Review',
      desc: 'Expert review of your repositories to showcase your code quality.',
      icon: <Github size={32} className="text-purple-400" />,
      action: 'admin',
      color: 'border-purple-500/30 bg-purple-500/5',
    },
    {
      id: 4,
      title: 'Mock Interview',
      desc: '1-on-1 technical interview practice with industry experts.',
      icon: <Video size={32} className="text-green-400" />,
      action: 'admin',
      color: 'border-green-500/30 bg-green-500/5',
    },
    {
      id: 5,
      title: 'Exclusive Community',
      desc: 'Join our private WhatsApp/Telegram group for insiders.',
      icon: <Users size={32} className="text-yellow-400" />,
      action: 'qr', // triggers QR code modal
      color: 'border-yellow-500/30 bg-yellow-500/5',
    },
    {
      id: 6,
      title: 'Career Guidance Call',
      desc: '30-min strategy call to plan your career path.',
      icon: <PhoneCall size={32} className="text-orange-400" />,
      action: 'admin',
      color: 'border-orange-500/30 bg-orange-500/5',
    },
  ];

  return (
    <div className="p-6 sm:p-10 h-full overflow-y-auto custom-scrollbar bg-black text-white">
      {/* --- HEADER SECTION --- */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-900/20 rounded-full mb-6">
          <Gift size={32} className="text-blue-500" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          Refer Friends, <span className="text-blue-500">Unlock Careers</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Invite your friends to join the LMS Portal. When they enroll, both of you unlock premium
          career services worth <span className="text-white font-bold">₹20,000</span>.
        </p>
      </div>

      {/* --- GENERATE CODE SECTION --- */}
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <h3 className="text-xl font-bold mb-6">Your Unique Referral Code</h3>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-black border border-zinc-700 rounded-xl px-6 py-4 text-2xl font-mono font-bold tracking-widest text-blue-400 select-all">
            {referralCode}
          </div>
          <button
            onClick={handleCopyCode}
            className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors text-white"
            title="Copy Code"
          >
            <Copy size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            <Share2 size={16} /> Share via WhatsApp
          </button>
        </div>
      </div>

      {/* --- ENTER CODE & UNLOCK SECTION --- */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div>
            <h2 className="text-2xl font-bold">Your Premium Benefits</h2>
            <p className="text-zinc-500 text-sm mt-1">Enter a code below to unlock these cards.</p>
          </div>

          {!isUnlocked ? (
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="text"
                placeholder="Enter Friend's Code"
                className="bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 w-full md:w-64"
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
              />
              <button
                onClick={handleUnlock}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                <Unlock size={18} /> Unlock
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-400 bg-green-900/20 px-4 py-2 rounded-lg border border-green-900/50">
              <CheckCircle size={20} />
              <span className="font-bold">Benefits Unlocked</span>
            </div>
          )}
        </div>

        {/* --- BENEFITS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(item => (
            <button
              key={item.id}
              disabled={!isUnlocked}
              onClick={() => setActiveModal(item.action)}
              className={`relative p-6 rounded-2xl border text-left transition-all duration-300 group flex flex-col h-full ${
                isUnlocked
                  ? `hover:-translate-y-1 hover:shadow-2xl cursor-pointer bg-zinc-900 ${item.color}`
                  : 'bg-zinc-900/50 border-zinc-800 opacity-60 cursor-not-allowed grayscale'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-xl bg-black/40 backdrop-blur-sm ${isUnlocked ? '' : 'text-zinc-600'}`}
                >
                  {item.icon}
                </div>
                {!isUnlocked && <Lock size={20} className="text-zinc-600" />}
              </div>

              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 grow">{item.desc}</p>

              {isUnlocked && (
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-xs font-bold uppercase tracking-wider text-blue-400 group-hover:text-blue-300 transition-colors">
                  {item.action === 'qr' ? 'View QR Code' : 'Schedule Now'}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- MODALS --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X size={24} />
            </button>

            {activeModal === 'admin' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                  <PhoneCall size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Schedule Your Session</h3>
                <p className="text-zinc-400 mb-8">
                  Connect with our placement team to redeem this benefit.
                </p>
                <a
                  href="tel:+919876543210"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mb-3 transition-colors"
                >
                  Call Admin Now
                </a>
                <button className="block w-full border border-zinc-700 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl transition-colors">
                  Request Callback
                </button>
              </div>
            )}

            {activeModal === 'qr' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-400">
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Join Elite Community</h3>
                <p className="text-zinc-400 mb-6">Scan this code to join our exclusive group.</p>

                <div className="bg-white p-4 rounded-xl inline-block mb-6">
                  {/* Placeholder QR */}
                  <div className="w-48 h-48 bg-black flex items-center justify-center text-white text-xs">
                    [QR CODE IMAGE]
                  </div>
                </div>

                <p className="text-xs text-zinc-500">Link expires in 30 minutes</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentReferandEarnPage;
