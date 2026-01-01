import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PhaseView from './components/PhaseView';
import AITools from './components/AITools';
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
      default:
        return <Dashboard completedActivities={completedActivities} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <main className="flex-1 h-full overflow-auto relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
          <button onClick={() => setIsMobileOpen(true)} className="mr-4">
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
          <span className="font-bold text-lg font-sinhala text-teal-600">AI Factory Master</span>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;