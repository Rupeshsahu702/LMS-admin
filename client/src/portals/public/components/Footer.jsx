import {
  Facebook,
  Github,
  InstagramIcon,
  Linkedin,
  MessageSquareQuote,
  Twitter,
  Youtube,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigateWithRedux } from '@/common/hooks/useNavigateWithRedux';

const Footer = () => {
  const navigateAndStore = useNavigateWithRedux();

  const handleInternalNav = (e, path) => {
    // If the user opened via middle-click or ctrl/cmd+click, let the browser handle it.
    // Otherwise prevent default and use our custom navigation that also scrolls to top + stores state.
    if (
      e.button === 0 && // left click
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      navigateAndStore(path);
    }
    // else: allow default so open-in-new-tab works
  };

  return (
    <div className=" bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-zinc-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              {/* Use anchor so middle-click/open-in-new-tab still works; onClick uses navigateAndStore */}
              <a
                href="/"
                onClick={e => handleInternalNav(e, '/')}
                className="inline-block"
                aria-label="Go to home"
              >
                <div className="font-bold text-xl tracking-tighter mb-4">
                  CODE2DBUG<span className="text-blue-500"></span>
                </div>
              </a>

              <p className="text-gray-500 text-sm">
                Empowering students with practical skills and industry-ready projects.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg text-white">Platform</h4>
              <ul className="space-y-2 text-lg text-gray-500">
                <li>
                  <a
                    href="/browse"
                    onClick={e => handleInternalNav(e, '/browse')}
                    className="hover:text-blue-400"
                  >
                    Browse Streams
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    onClick={e => handleInternalNav(e, '/pricing')}
                    className="hover:text-blue-400"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/verification"
                    onClick={e => handleInternalNav(e, '/verification')}
                    className="hover:text-blue-400"
                  >
                    Verification
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg text-white">Community</h4>
              <ul className="space-y-2 text-lg text-gray-500">
                <li>
                  <a
                    href="/campus"
                    onClick={e => handleInternalNav(e, '/campus')}
                    className="hover:text-blue-400"
                  >
                    Campus Ambassador
                  </a>
                </li>
                <li>
                  <a
                    href="/events"
                    onClick={e => handleInternalNav(e, '/events')}
                    className="hover:text-blue-400"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg  text-white">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex ">
                  <a
                    href="https://x.com/research19049" // <-- replace with real url
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 gap-3 text-lg flex items-center"
                  >
                    <Twitter /> <span className="ml-2">Twitter / X</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/code2dbug" // <-- replace with real url
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 gap-3 text-lg flex items-center"
                  >
                    <Linkedin /> <span className="ml-2">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/your_org" // <-- replace with real url
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 gap-3 text-lg flex items-center"
                  >
                    <Github /> <span className="ml-2">Github</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/share/1C3ETHuKWq/?mibextid=wwXIfr" // <-- replace with real url
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 gap-3 text-lg flex items-center"
                  >
                    <Facebook /> <span className="ml-2">Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@CODE2DBUG" // <-- replace with real url
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 gap-3 text-lg flex items-center"
                  >
                    <Youtube /> <span className="ml-2">Youtube</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/code2dbug?igsh=Y3BqZ3oydno1aWd2" // <-- replace with real url
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 gap-3 text-lg flex items-center"
                  >
                    <InstagramIcon /> <span className="ml-2">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} CODE2DBUG. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="/privacy"
                onClick={e => handleInternalNav(e, '/privacy')}
                className="text-gray-600  hover:text-blue-600 hover:underline transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onClick={e => handleInternalNav(e, '/terms')}
                className="text-gray-600  hover:text-blue-600 hover:underline transition duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
