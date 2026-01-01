import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CURRICULUM_DATA } from '../constants';
import { Plus, Search, Bell, Share2, Download, Target, Clock, CheckCircle2, Edit, Users } from 'lucide-react';

interface DashboardProps {
  completedActivities: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ completedActivities }) => {
  // Calculate stats
  let totalActivities = 0;
  let currentCompleted = completedActivities.length;

  CURRICULUM_DATA.forEach(phase => {
    phase.days.forEach(day => totalActivities += day.activities.length);
  });

  const overallProgress = totalActivities > 0 ? Math.round((currentCompleted / totalActivities) * 100) : 63;

  // Mock data for weekly plan chart
  const weeklyData = [
    { day: 'M', work: 5, meditation: 3 },
    { day: 'T', work: 7, meditation: 4 },
    { day: 'W', work: 6, meditation: 5 },
    { day: 'T', work: 8, meditation: 3 },
    { day: 'F', work: 6, meditation: 6 },
    { day: 'S', work: 5, meditation: 4 },
    { day: 'S', work: 7, meditation: 5 },
  ];

  // Donut chart data
  const donutData = [
    { name: 'Completed', value: currentCompleted || 63 },
    { name: 'Remaining', value: totalActivities - currentCompleted || 37 },
  ];

  const COLORS = ['#14b8a6', '#e2e8f0'];

  return (
    <div className="min-h-screen bg-slate-600 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-300">Greetings!</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 font-medium transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Search className="w-5 h-5 text-slate-700" />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5 text-slate-700" />
          </button>
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">U</span>
          </div>
        </div>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* General Overview - Red Card */}
        <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">General Overview</h2>
            <div className="flex space-x-2">
              <button className="hover:bg-white/20 p-1 rounded">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="hover:bg-white/20 p-1 rounded">
                <span className="text-lg">⋮</span>
              </button>
            </div>
          </div>

          <div className="flex space-x-8 mb-6">
            <div>
              <div className="text-5xl font-bold">39</div>
              <div className="text-red-100 text-sm">Task done<br />for all time</div>
            </div>
            <div className="border-l border-red-300 pl-8">
              <div className="text-5xl font-bold">1</div>
              <div className="text-red-100 text-sm">Project's<br />are stoped</div>
            </div>
          </div>

          <div className="w-full bg-red-300 h-2 rounded-full mb-6">
            <div className="bg-teal-400 h-full w-3/4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-300/50 backdrop-blur rounded-xl p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-red-100">Project's</div>
            </div>
            <div className="bg-red-300/50 backdrop-blur rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-xs text-red-100">In Progress</div>
            </div>
            <div className="bg-red-300/50 backdrop-blur rounded-xl p-4 text-center">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">15</div>
              <div className="text-xs text-red-100">Completed</div>
            </div>
          </div>
        </div>

        {/* Weekly Plan - Dark Card */}
        <div className="bg-slate-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Weekly Plan</h2>
            <Target className="w-5 h-5" />
          </div>

          <div className="flex space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <span className="text-sm">Work</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm">Meditation</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="day" stroke="#94a3b8" strokeWidth={0} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis hide />
              <Line type="monotone" dataKey="work" stroke="#14b8a6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="meditation" stroke="#f87171" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex justify-between text-xs text-slate-400 mt-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>
        </div>

        {/* Month Progress - White Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Month Progress</h2>
              <div className="text-sm text-slate-500 mt-1">
                <span className="text-slate-800 font-bold">{overallProgress}%</span> completed to last month*
              </div>
            </div>
            <Share2 className="w-5 h-5 text-slate-400" />
          </div>

          <div className="mb-4">
            <div className="text-xs font-semibold text-teal-600 mb-2">OVERVIEW</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <span className="text-slate-600">Work</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-slate-600">Meditation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                <span className="text-slate-600">Project's</span>
              </div>
            </div>
          </div>

          <div className="relative h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
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
              <span className="text-2xl font-bold text-slate-800">{overallProgress}%</span>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="border border-teal-500 text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly Goals */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-slate-800">Monthly Goal's</h2>
              <div className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">1/4</div>
            </div>
            <Edit className="w-5 h-5 text-slate-400" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" checked className="w-5 h-5 rounded accent-slate-800" readOnly />
              <span className="text-slate-800">1h Meditation</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 rounded accent-slate-800" />
              <span className="text-slate-500">30 m walk</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 rounded accent-slate-800" />
              <span className="text-slate-500">60 m Workout</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-5 h-5 rounded accent-slate-800" />
              <span className="text-slate-500">30 m Write Journal</span>
            </div>
          </div>
        </div>

        {/* Task Cards */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <Users className="w-6 h-6 text-slate-700" />
            <span className="text-2xl">⋮</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Discuss Project<br />with HR</h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-slate-500">Evening</span>
            <div className="bg-teal-400 p-2 rounded-full">
              <Bell className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <Users className="w-6 h-6 text-slate-700" />
            <span className="text-2xl">⋮</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Consultation<br />with boss</h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-slate-500">Next Morning</span>
            <div className="bg-slate-800 p-2 rounded-full">
              <Bell className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Projects Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-teal-300">Current Project's</h2>
          <button className="text-teal-300 hover:text-teal-200 text-sm">Open archive →</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-teal-400 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">New Schedule</h3>
              <div className="bg-white/30 p-1 rounded-full">
                <Plus className="w-5 h-5" />
              </div>
            </div>
            <div className="text-sm mb-2">• In progress</div>
            <p className="text-sm text-teal-100">Done: Create a new end unique in design for my youtube family.</p>
          </div>

          <div className="bg-teal-400 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">Manga-style UI</h3>
              <div className="bg-white/30 p-1 rounded-full">
                <Plus className="w-5 h-5" />
              </div>
            </div>
            <div className="text-sm">• Completed</div>
          </div>

          <div className="bg-teal-400 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">Aesthetic UI Design</h3>
              <div className="bg-white/30 p-1 rounded-full">
                <Plus className="w-5 h-5" />
              </div>
            </div>
            <div className="text-sm">• Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;