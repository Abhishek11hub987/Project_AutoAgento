import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const TASKS = [
  { id: 1, title: 'No tasks assigned yet', status: 'empty', date: 'Assign a task via chat' },
];

const TaskQueue = ({ tasks = [] }) => {
  return (
    <div className="card-static p-5">
      <h3 className="font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider mb-4">Task Queue</h3>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-[var(--text-muted)]" />
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">No tasks yet</p>
            <p className="text-[10px] text-[var(--text-muted)]">Tasks will appear here as you chat</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] flex items-start gap-3">
              <div className="mt-0.5">
                <div className="w-4 h-4 rounded-full border-2 border-[var(--accent-lime)] border-t-transparent animate-spin" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[var(--text-primary)]">{task.title}</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {task.date}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskQueue;
