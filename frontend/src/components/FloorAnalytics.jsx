import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const FloorAnalytics = () => {
  return (
    <div className="neu-flat p-4 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-slate-200">
        <div className="px-4">
          <div className="flex items-center text-sm font-medium text-slate-500 mb-1">
            <Users className="w-4 h-4 mr-1 text-[#9EBCEC]" />
            Leads Procured
          </div>
          <div className="text-2xl font-bold text-slate-800">142</div>
          <div className="text-xs text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +12% this week
          </div>
        </div>
        
        <div className="px-4">
          <div className="flex items-center text-sm font-medium text-slate-500 mb-1">
            <Activity className="w-4 h-4 mr-1 text-emerald-500" />
            Deals Closed
          </div>
          <div className="text-2xl font-bold text-slate-800">8</div>
          <div className="text-xs text-emerald-600 flex items-center mt-1">
            <TrendingUp className="w-3 h-3 mr-1" /> +2 this week
          </div>
        </div>
        
        <div className="px-4">
          <div className="flex items-center text-sm font-medium text-slate-500 mb-1">
            <DollarSign className="w-4 h-4 mr-1 text-emerald-600" />
            Revenue Gen
          </div>
          <div className="text-2xl font-bold text-slate-800">₹2.4L</div>
        </div>
        
        <div className="px-4">
          <div className="flex items-center text-sm font-medium text-slate-500 mb-1">
            <DollarSign className="w-4 h-4 mr-1 text-red-500" />
            Agent Cost
          </div>
          <div className="text-2xl font-bold text-slate-800">₹850</div>
          <div className="text-xs text-slate-500 mt-1">Per outcome basis</div>
        </div>
      </div>
    </div>
  );
};

export default FloorAnalytics;
