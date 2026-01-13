import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { CURRICULUM_DATA } from '../constants';
import { Target, CheckCircle2, Clock, TrendingUp, Activity } from 'lucide-react';

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

  // Get next 5 upcoming activities
  const upcomingActivities: Array<{
    phase: string;
    day: string;
    activity: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'In Progress';
  }> = [];

  CURRICULUM_DATA.forEach(phase => {
    phase.days.forEach(day => {
      day.activities.forEach((activity, actIndex) => {
        const activityId = `p${phase.id}-d${day.id}-a${actIndex}`;
        if (!completedActivities.includes(activityId) && upcomingActivities.length < 5) {
          upcomingActivities.push({
            phase: `Phase ${phase.id}`,
            day: day.range,
            activity: activity,
            priority: upcomingActivities.length === 0 ? 'High' : upcomingActivities.length < 3 ? 'Medium' : 'Low',
            status: upcomingActivities.length === 0 ? 'In Progress' : 'Pending'
          });
        }
      });
    });
  });

  // Mission progress trend data (simulated monthly data)
  const monthlyData = [
    { month: 'Jan', completed: Math.floor(currentCompleted * 0.25), pipeline: 3 },
    { month: 'Feb', completed: Math.floor(currentCompleted * 0.42), pipeline: 5 },
    { month: 'Mar', completed: Math.floor(currentCompleted * 0.58), pipeline: 4 },
    { month: 'Apr', completed: Math.floor(currentCompleted * 0.71), pipeline: 6 },
    { month: 'May', completed: Math.floor(currentCompleted * 0.88), pipeline: 4 },
    { month: 'Jun', completed: currentCompleted, pipeline: remainingActivities > 8 ? 8 : remainingActivities },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e14] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-teal-400" />
            <h1 className="text-2xl font-bold text-white tracking-wide">MISSION CONTROL</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">Operation AI Factory Master • 100-Day Campaign</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs text-slate-500">OPERATOR</div>
            <div className="text-sm font-semibold text-white">Tharindu</div>
          </div>
        </div>
      </div>

      {/* Mission Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Overall Progress */}
        <div className="bg-[#1a1f2b] border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-medium text-slate-300">MISSION PROGRESS</span>
            </div>
            <span className="text-xs text-teal-400">+{overallProgress}%</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{overallProgress}%</div>
          <div className="w-full bg-slate-800 h-2 rounded-full">
            <div
              className="bg-gradient-to-r from-teal-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Campaign Status: <span className={overallProgress > 50 ? "text-teal-400" : "text-yellow-400"}>
              {overallProgress > 75 ? "Excellent" : overallProgress > 50 ? "On Track" : "In Progress"}
            </span>
          </div>
        </div>

        {/* Completed Operations */}
        <div className="bg-[#1a1f2b] border border-slate-800 rounded-lg p-5">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-slate-300">COMPLETED OPS</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-white">{currentCompleted}</span>
            <span className="text-2xl text-slate-500">/ {totalActivities}</span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Success Rate: <span className="text-green-400">98.5%</span>
          </div>
        </div>

        {/* Remaining Operations */}
        <div className="bg-[#1a1f2b] border border-slate-800 rounded-lg p-5">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-slate-300">PENDING OPS</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{remainingActivities}</div>
          <div className="mt-3 text-xs text-slate-500">
            Est. Days: <span className="text-orange-400">~{Math.ceil(remainingActivities / 3)}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Operations Table */}
        <div className="lg:col-span-2 bg-[#1a1f2b] border border-slate-800 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-semibold text-white">UPCOMING OPERATIONS</h2>
            </div>
            <button className="text-xs text-teal-400 hover:text-teal-300">View All →</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-xs font-medium text-slate-400 pb-3">PHASE</th>
                  <th className="text-left text-xs font-medium text-slate-400 pb-3">TIMELINE</th>
                  <th className="text-left text-xs font-medium text-slate-400 pb-3">OBJECTIVE</th>
                  <th className="text-left text-xs font-medium text-slate-400 pb-3">PRIORITY</th>
                  <th className="text-left text-xs font-medium text-slate-400 pb-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {upcomingActivities.map((op, index) => (
                  <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 text-sm text-slate-300">{op.phase}</td>
                    <td className="py-3 text-sm text-slate-400">{op.day}</td>
                    <td className="py-3 text-sm text-slate-300 max-w-xs truncate">{op.activity}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        op.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                        op.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {op.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs ${
                        op.status === 'In Progress' ? 'text-teal-400' : 'text-slate-500'
                      }`}>
                        {op.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Target Card */}
        <div className="bg-[#1a1f2b] border border-slate-800 rounded-lg p-5">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-semibold text-white">NEXT TARGET</h2>
          </div>

          {upcomingActivities.length > 0 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-red-500/30">
                <div className="text-xs text-red-400 font-semibold mb-2">PRIORITY: HIGH</div>
                <div className="text-sm text-white mb-3">{upcomingActivities[0].activity}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{upcomingActivities[0].phase}</span>
                  <span className="text-slate-400">{upcomingActivities[0].day}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-500 font-semibold">MISSION INTEL</div>
                <div className="flex items-center justify-between py-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Campaign Phase</span>
                  <span className="text-xs text-white">{upcomingActivities[0].phase}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Status</span>
                  <span className="text-xs text-teal-400">Active</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-slate-400">Timeline</span>
                  <span className="text-xs text-white">{upcomingActivities[0].day}</span>
                </div>
              </div>

              <button className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded transition-colors">
                BEGIN OPERATION
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mission Progress Chart */}
        <div className="bg-[#1a1f2b] border border-slate-800 rounded-lg p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-1">MISSION PROGRESS</h3>
            <p className="text-xs text-slate-500">Trend vs Last Period: <span className="text-teal-400">+12%</span></p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="completed" stroke="#14b8a6" fillOpacity={1} fill="url(#colorCompleted)" strokeWidth={2} />
              <Area type="monotone" dataKey="pipeline" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPipeline)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Completed Ops</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Ops in Pipeline</span>
            </div>
          </div>
        </div>

        {/* Phase Distribution */}
        <div className="bg-[#1a1f2b] border border-slate-800 rounded-lg p-5">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-1">PHASE DISTRIBUTION</h3>
            <p className="text-xs text-slate-500">Operations by Campaign Phase</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={phaseData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis dataKey="name" type="category" stroke="#64748b" style={{ fontSize: '11px' }} width={60} />
              <Bar dataKey="completed" fill="#14b8a6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="total" fill="#334155" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
              <span className="text-xs text-slate-400">Total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;