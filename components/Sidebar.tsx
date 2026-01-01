import React from 'react';
import { LayoutDashboard, BookOpen, Bot, Calendar, Target, TrendingUp, FileText, Slack, MessageCircle, UserPlus, Users, Megaphone, Settings } from 'lucide-react';
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
    { id: AppTab.CURRICULUM, label: 'Calendar', icon: Calendar },
    { id: AppTab.AI_TOOLS, label: 'Goals', icon: Target },
    { id: AppTab.SETTINGS, label: 'Stats', icon: TrendingUp },
  ];

  const incorporationItems = [
    { label: 'Slack', icon: Slack },
    { label: 'Discord', icon: MessageCircle },
  ];

  const teamItems = [
    { label: 'Seo', icon: Users },
    { label: 'Marketing', icon: Megaphone },
    { label: 'Setting', icon: Settings },
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
      <div className={`fixed inset-y-0 left-0 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white flex flex-col h-full shadow-lg`}>

        {/* Logo/Brand */}
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Focus</h1>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <div className="pt-4">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-all duration-200">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Docs</span>
            </button>
          </div>

          {/* Incorporation Section */}
          <div className="pt-6">
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              INCORPORATION
            </h3>
            {incorporationItems.map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-all duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-all duration-200">
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Add new plugin</span>
            </button>
          </div>

          {/* Teams Section */}
          <div className="pt-6 pb-4">
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              TEAMS
            </h3>
            {teamItems.map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-all duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;