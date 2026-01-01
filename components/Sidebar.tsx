import React from 'react';
import { LayoutDashboard, BookOpen, Bot, Settings, Menu } from 'lucide-react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { id: AppTab.DASHBOARD, label: 'මුල් පිටුව', icon: LayoutDashboard },
    { id: AppTab.CURRICULUM, label: 'පුහුණු සැලැස්ම', icon: BookOpen },
    { id: AppTab.AI_TOOLS, label: 'AI සහායක', icon: Bot },
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
      <div className={`fixed inset-y-0 left-0 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl`}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-xl font-bold font-sinhala text-teal-400">AI Factory Master</h1>
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 font-sinhala ${
                activeTab === item.id 
                  ? 'bg-teal-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-lg">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="bg-slate-800 p-3 rounded-lg">
             <p className="text-xs text-slate-400 mb-1">ප්‍රගතිය (Progress)</p>
             <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
               <div className="bg-teal-500 h-full w-0 animate-pulse" id="sidebar-progress-bar"></div> 
               {/* Note: Width is controlled by React logic in parent, using ID for now as placeholder if needed but usually passed via props. 
                   Better implementation: Pass progress percent to sidebar. 
               */}
             </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;