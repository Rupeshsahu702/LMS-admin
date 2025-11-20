import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className=" bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
        {/* --- FOOTER --- */}
        <footer className="bg-black border-t border-zinc-800 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <Link to="/">
                  <div className="font-bold text-xl tracking-tighter mb-4">
                    LMS<span className="text-blue-500">PORTAL</span>
                  </div>
                </Link>

                <p className="text-gray-500 text-sm">
                  Empowering students with practical skills and industry-ready projects.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-white">Platform</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <Link to="/browse" className="hover:text-blue-400">
                      Browse Streams
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="hover:text-blue-400">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/verification" className="hover:text-blue-400">
                      Verification
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-white">Community</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <Link to="/campus" className="hover:text-blue-400">
                      Campus Ambassador
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="hover:text-blue-400">
                      Events
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-white">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <Link to="#" className="hover:text-blue-400">
                      Twitter / X
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-400">
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-400">
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-400">
                      Discord
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
              <p>© 2025 LMS Portal. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
