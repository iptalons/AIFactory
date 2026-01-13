import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PhaseView from './components/PhaseView';
import AITools from './components/AITools';
import Resources from './components/Resources';
import { AppTab } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('factory_app_progress');
    if (saved) {
      try {
        setCompletedActivities(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved progress");
      }
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('factory_app_progress', JSON.stringify(completedActivities));
  }, [completedActivities]);

  const toggleActivity = (id: string) => {
    setCompletedActivities(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard completedActivities={completedActivities} />;
      case AppTab.CURRICULUM:
        return <PhaseView completedActivities={completedActivities} toggleActivity={toggleActivity} />;
      case AppTab.AI_TOOLS:
        return <AITools />;
      case AppTab.RESOURCES:
        return <Resources />;
      default:
        return <Dashboard completedActivities={completedActivities} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0e14] overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <main className="flex-1 h-full overflow-auto relative bg-[#0a0e14]">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#0f1419] border-b border-slate-800 p-4 flex items-center shadow-lg sticky top-0 z-10">
          <button onClick={() => setIsMobileOpen(true)} className="mr-4">
            <Menu className="w-6 h-6 text-teal-400" />
          </button>
          <span className="font-bold text-lg text-white tracking-wide">CONTROL</span>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;