export function maskEmail(email?: string | null): string | null {
  if (!email || typeof email !== 'string') return null
  const atIndex = email.indexOf('@')
  if (atIndex <= 0) {
    // Not a valid email format; return null to signal no displayable mask
    return null
  }
  const local = email.slice(0, atIndex)
  const domain = email.slice(atIndex)
  if (local.length === 0) return null
  // Keep first 2 chars if available, else keep first 1, mask the rest up to @
  const keep = local.length >= 2 ? 2 : 1
  const visible = local.slice(0, keep)
  const masked = '*'.repeat(Math.max(0, local.length - keep))
  return `${visible}${masked}${domain}`
}
