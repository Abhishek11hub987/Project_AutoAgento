import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, BarChart3, UserPlus, UserCircle, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-transparent pt-4 pb-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 neu-flat px-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <img src="/logo.png" alt="AutoAgento Logo" className="h-8" />
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="flex items-center text-slate-700 neu-pressed px-4 py-2 rounded-xl text-sm font-medium">
              <Building2 className="w-4 h-4 mr-2" />
              Office Floor
            </Link>
            <Link to="/reports" className="flex items-center text-slate-500 hover:text-slate-700 neu-flat hover:neu-pressed px-4 py-2 rounded-xl text-sm font-medium transition-all">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
            </Link>
            <Link to="#" className="flex items-center text-slate-500 hover:text-slate-700 neu-flat hover:neu-pressed px-4 py-2 rounded-xl text-sm font-medium transition-all">
              <UserPlus className="w-4 h-4 mr-2" />
              Hire
            </Link>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Language Selector */}
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3" />
              <select className="appearance-none bg-transparent neu-pressed text-slate-600 py-2 pl-9 pr-8 text-sm font-medium focus:outline-none cursor-pointer">
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <div className="relative">
              <select className="appearance-none bg-transparent neu-pressed text-slate-600 py-2 pl-4 pr-10 text-sm font-medium focus:outline-none cursor-pointer">
                <option>Acme Corp (GST: 22AAAAA0000A1Z5)</option>
                <option>Globex Inc</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-[#9EBCEC] neu-flat rounded-full transition-all">
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
