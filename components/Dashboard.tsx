import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { CURRICULUM_DATA } from '../constants';
import { Phase } from '../types';
import { Trophy, CheckCircle, Clock } from 'lucide-react';

interface DashboardProps {
  completedActivities: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ completedActivities }) => {
  // Calculate stats
  let totalActivities = 0;
  let currentCompleted = completedActivities.length;
  
  const phaseData = CURRICULUM_DATA.map(phase => {
    let phaseTotal = 0;
    phase.days.forEach(day => phaseTotal += day.activities.length);
    totalActivities += phaseTotal;
    
    // Count completed in this phase (naive approach: checks if activity ID string contains phase prefix?)
    // Since we store exact activity strings, let's just match them.
    // To make this robust, we should probably generate unique IDs for activities. 
    // For this prototype, let's assume `completedActivities` is a list of "PhaseID-DayID-Index" strings.
    
    const completedInPhase = completedActivities.filter(id => id.startsWith(`p${phase.id}`)).length;

    return {
      name: `අදියර ${phase.id}`,
      completed: completedInPhase,
      total: phaseTotal,
      percent: phaseTotal > 0 ? (completedInPhase / phaseTotal) * 100 : 0
    };
  });

  const overallProgress = totalActivities > 0 ? Math.round((currentCompleted / totalActivities) * 100) : 0;

  const data = [
    { name: 'Completed', value: currentCompleted },
    { name: 'Remaining', value: totalActivities - currentCompleted },
  ];

  const COLORS = ['#0d9488', '#e2e8f0']; // Teal-600, Slate-200

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fade-in">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-sinhala">ආයුබෝවන්! (Welcome Back)</h2>
        <p className="text-slate-600 mt-2 font-sinhala">ඔබගේ දින 100 පුහුණු වැඩසටහනේ ප්‍රගතිය මෙන්න.</p>
      </header>

      {/* High Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-teal-100 text-teal-600 rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-sinhala">මුළු ප්‍රගතිය</p>
            <p className="text-3xl font-bold text-slate-900">{overallProgress}%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-sinhala">සම්පූර්ණ කළ ක්‍රියාකාරකම්</p>
            <p className="text-3xl font-bold text-slate-900">{currentCompleted} / {totalActivities}</p>
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-sinhala">ඉතිරි දින ගණන</p>
            <p className="text-3xl font-bold text-slate-900">{(totalActivities - currentCompleted > 0) ? '~' + Math.ceil((100 - (currentCompleted/totalActivities * 100))) : 0}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Progress per Phase */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-80">
          <h3 className="text-lg font-semibold mb-4 font-sinhala text-slate-700">අදියර අනුව ප්‍රගතිය</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={phaseData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" domain={[0, 'auto']} hide />
              <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: '#475569'}} width={60} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="completed" fill="#0d9488" radius={[0, 4, 4, 0]} barSize={20} name="සම්පූර්ණ කළ" />
              <Bar dataKey="total" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} name="මුළු" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Completion Donut */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-80 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 font-sinhala text-slate-700 w-full text-left">සමස්ත සාර්ථකත්වය</h3>
          <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-4xl font-bold text-teal-600">{overallProgress}%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;