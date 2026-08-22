import React from 'react';
import { Folder, Upload, FileText, FileSpreadsheet, File } from 'lucide-react';

const FilesPage = () => (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight mb-1 flex items-center gap-2">
          <Folder className="w-6 h-6 text-[var(--accent-amber)]" />
          Files
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">Upload documents for your agents to analyze</p>
      </div>
      <button className="btn-primary flex items-center gap-2 text-sm">
        <Upload className="w-4 h-4" /> Upload File
      </button>
    </div>

    {/* Upload area */}
    <div className="card-static border-dashed !border-[var(--border-medium)] p-12 text-center mb-8">
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-4">
        <Upload className="w-7 h-7 text-[var(--text-muted)]" />
      </div>
      <h3 className="text-base font-bold mb-2">Drag & drop files here</h3>
      <p className="text-sm text-[var(--text-muted)] mb-4">or click Upload to browse. Supports PDF, Excel, CSV, and text files.</p>
      <button className="btn-secondary text-sm">Browse Files</button>
    </div>

    {/* File type categories */}
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { icon: FileText, label: 'Documents', count: 0, color: 'var(--accent-blue)', ext: 'PDF, DOCX, TXT' },
        { icon: FileSpreadsheet, label: 'Spreadsheets', count: 0, color: 'var(--accent-emerald)', ext: 'XLSX, CSV' },
        { icon: File, label: 'Other', count: 0, color: 'var(--accent-purple)', ext: 'Images, JSON' },
      ].map((cat, i) => (
        <div key={i} className="card-static p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}12` }}>
            <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
          </div>
          <div>
            <p className="text-sm font-bold">{cat.label}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{cat.count} files • {cat.ext}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FilesPage;
