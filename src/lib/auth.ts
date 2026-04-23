const STORAGE_TOKEN_KEY = 'authToken'
const SESSION_TOKEN_KEY = 'authToken_session'
const COOKIE_TOKEN_KEY = 'authToken'

function setCookie(name: string, value: string, days = 7) {
  const maxAge = days * 24 * 60 * 60
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${secure}; Max-Age=${maxAge}`
}

function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split('; ')
    .find((cookieEntry) => cookieEntry.startsWith(`${name}=`))
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`
}

export function setAuthToken(token: string, remember = true) {
  if (remember) {
    localStorage.setItem(STORAGE_TOKEN_KEY, token)
  } else {
    sessionStorage.setItem(SESSION_TOKEN_KEY, token)
  }
  setCookie(COOKIE_TOKEN_KEY, token)
}

export function getAuthToken(): string | null {
  return (
    localStorage.getItem(STORAGE_TOKEN_KEY) ||
    sessionStorage.getItem(SESSION_TOKEN_KEY) ||
    getCookie(COOKIE_TOKEN_KEY)
  )
}

export function clearAuthToken(): void {
  localStorage.removeItem(STORAGE_TOKEN_KEY)
  sessionStorage.removeItem(SESSION_TOKEN_KEY)
  deleteCookie(COOKIE_TOKEN_KEY)
}
