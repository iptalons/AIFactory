import React, { useState } from 'react';
import { CURRICULUM_DATA } from '../constants';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';

interface PhaseViewProps {
  completedActivities: string[];
  toggleActivity: (id: string) => void;
}

const PhaseView: React.FC<PhaseViewProps> = ({ completedActivities, toggleActivity }) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-slate-600 p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-sinhala text-teal-300">පුහුණු සැලැස්ම (Curriculum)</h2>
        <p className="text-slate-300 font-sinhala">දින 100 ක ක්‍රියාකාරකම් මාලාව</p>
      </div>

      {CURRICULUM_DATA.map((phase) => {
        const isExpanded = expandedPhase === phase.id;
        
        return (
          <div key={phase.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
            {/* Phase Header */}
            <button 
              onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              className={`w-full flex items-center justify-between p-5 text-left transition-colors ${isExpanded ? 'bg-teal-50' : 'hover:bg-slate-50'}`}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${isExpanded ? 'bg-teal-200 text-teal-800' : 'bg-slate-200 text-slate-600'}`}>
                    PHASE {phase.id}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold font-sinhala text-slate-800">{phase.sinhalaTitle}</h3>
                <p className="text-sm text-slate-500 font-sinhala mt-1">{phase.description}</p>
              </div>
              {isExpanded ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-400" />}
            </button>

            {/* Days & Activities */}
            {isExpanded && (
              <div className="border-t border-slate-100 bg-white p-5 space-y-6">
                {phase.days.map((day, dIndex) => (
                  <div key={day.id} className="ml-2 md:ml-4 border-l-2 border-slate-100 pl-4 md:pl-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <span className="text-xs font-semibold text-teal-600 block mb-1">{day.range}</span>
                        <h4 className="font-bold font-sinhala text-slate-700 text-lg">{day.title}</h4>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mt-2">
                      {day.activities.map((activity, aIndex) => {
                        const activityId = `p${phase.id}-d${day.id}-a${aIndex}`;
                        const isChecked = completedActivities.includes(activityId);

                        return (
                          <li key={aIndex} className="flex items-start space-x-3 group cursor-pointer" onClick={() => toggleActivity(activityId)}>
                            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                              isChecked ? 'bg-teal-600 border-teal-600' : 'border-slate-300 bg-white group-hover:border-teal-400'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <span className={`text-base font-sinhala leading-relaxed transition-colors ${isChecked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                              {activity}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PhaseView;