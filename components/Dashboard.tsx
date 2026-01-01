import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CURRICULUM_DATA } from '../constants';
import { Plus, Search, Bell, Share2, Target, Trophy, BookOpen, Calendar } from 'lucide-react';

interface DashboardProps {
  completedActivities: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ completedActivities }) => {
  // Calculate stats
  let totalActivities = 0;
  let currentCompleted = completedActivities.length;

  // Calculate phase-wise progress
  const phaseData = CURRICULUM_DATA.map(phase => {
    let phaseTotal = 0;
    phase.days.forEach(day => phaseTotal += day.activities.length);
    totalActivities += phaseTotal;

    const completedInPhase = completedActivities.filter(id => id.startsWith(`p${phase.id}`)).length;

    return {
      name: `Phase ${phase.id}`,
      sinhalaName: `අදියර ${phase.id}`,
      completed: completedInPhase,
      total: phaseTotal,
      percentage: phaseTotal > 0 ? Math.round((completedInPhase / phaseTotal) * 100) : 0
    };
  });

  const overallProgress = totalActivities > 0 ? Math.round((currentCompleted / totalActivities) * 100) : 0;
  const remainingActivities = totalActivities - currentCompleted;
  const estimatedDaysRemaining = Math.ceil(remainingActivities / 3); // Assuming ~3 activities per day

  // Donut chart data
  const donutData = [
    { name: 'Completed', value: currentCompleted || 1 },
    { name: 'Remaining', value: remainingActivities || 99 },
  ];

  const COLORS = ['#14b8a6', '#e2e8f0'];

  return (
    <div className="min-h-screen bg-slate-600 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-300 font-sinhala">ආයුබෝවන්! (Greetings!)</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-white p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Search className="w-5 h-5 text-slate-700" />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5 text-slate-700" />
          </button>
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Trophy className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Overall Progress</h3>
          </div>
          <div className="text-5xl font-bold mb-2">{overallProgress}%</div>
          <p className="text-red-100 text-sm font-sinhala">100 දින වැඩසටහන</p>
          <div className="w-full bg-red-300 h-2 rounded-full mt-4">
            <div
              className="bg-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen className="w-8 h-8 text-teal-600" />
            <h3 className="text-lg font-semibold text-slate-800">Activities</h3>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">
            {currentCompleted} / {totalActivities}
          </div>
          <p className="text-slate-500 text-sm font-sinhala">සම්පූර්ණ කළ ක්‍රියාකාරකම්</p>
        </div>

        <div className="bg-slate-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Days Remaining</h3>
          </div>
          <div className="text-4xl font-bold mb-2">~{estimatedDaysRemaining}</div>
          <p className="text-slate-300 text-sm font-sinhala">ඉතිරි ක්‍රියාකාරකම් අනුව</p>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Phase Progress Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-4 font-sinhala">අදියර අනුව ප්‍රගතිය</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={phaseData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <XAxis type="number" domain={[0, 'dataMax']} hide />
              <YAxis dataKey="sinhalaName" type="category" tick={{ fontSize: 14, fill: '#475569' }} width={70} />
              <Tooltip />
              <Bar dataKey="completed" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={20} name="Completed" />
              <Bar dataKey="total" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Completion Donut */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 font-sinhala">සමස්ත සාර්ථකත්වය</h3>
              <p className="text-sm text-slate-500 mt-1">100-Day Curriculum Progress</p>
            </div>
            <Share2 className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>

          <div className="relative h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">{overallProgress}%</div>
                <div className="text-xs text-slate-500 font-sinhala">සම්පූර්ණ</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600">{currentCompleted}</div>
              <div className="text-xs text-slate-500 font-sinhala">සම්පූර්ණ කළ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-400">{remainingActivities}</div>
              <div className="text-xs text-slate-500 font-sinhala">ඉතිරි</div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Details Cards */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-teal-300 mb-4 font-sinhala">අදියර විස්තර (Phase Details)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {phaseData.map((phase, index) => (
            <div key={index} className="bg-teal-400 rounded-xl p-4 text-white shadow-lg">
              <div className="text-sm font-semibold mb-2">{phase.sinhalaName}</div>
              <div className="text-3xl font-bold mb-1">{phase.percentage}%</div>
              <div className="text-xs text-teal-100">
                {phase.completed} / {phase.total} activities
              </div>
              <div className="w-full bg-teal-300 h-1.5 rounded-full mt-3">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${phase.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;