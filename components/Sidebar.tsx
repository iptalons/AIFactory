import React from 'react';
import { LayoutDashboard, Bot, Calendar, Target, BookOpen } from 'lucide-react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  const mainNavItems = [
    { id: AppTab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppTab.CURRICULUM, label: '100 Days', icon: Calendar },
    { id: AppTab.AI_TOOLS, label: 'AI Chat', icon: Bot },
    { id: AppTab.RESOURCES, label: 'Resources', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-[#0f1419] border-r border-slate-800 flex flex-col h-full shadow-xl`}>

        {/* Logo/Brand */}
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <div className="w-10 h-10 bg-teal-500/20 border border-teal-500 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-teal-400" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">CONTROL</h1>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-teal-500/20 border border-teal-500 text-teal-400 shadow-lg shadow-teal-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Profile Image at Bottom */}
        <div className="p-4 border-t border-slate-800">
          <div className="text-center mb-3">
            <div className="text-xs text-slate-500 font-semibold">OPERATOR ID</div>
            <div className="text-sm text-teal-400">TL-001</div>
          </div>
          <img
            src="/images/TL.jpg"
            alt="Operator Profile"
            className="w-1/2 mx-auto rounded-lg shadow-lg shadow-black/50 object-cover border border-slate-700"
            style={{ aspectRatio: '1/1' }}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;