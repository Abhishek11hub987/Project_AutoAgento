import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const TASKS = [
  { id: 1, title: 'No tasks assigned yet', status: 'empty', date: 'Assign a task via chat' },
];

const TaskQueue = () => {
  return (
    <div className="card-static p-5">
      <h3 className="font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider mb-4">Task Queue</h3>
      <div className="space-y-3">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-[var(--text-muted)]" />
          </div>
          <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">No tasks yet</p>
          <p className="text-[10px] text-[var(--text-muted)]">Tasks will appear here as you chat</p>
        </div>
      </div>
    </div>
  );
};

export default TaskQueue;
