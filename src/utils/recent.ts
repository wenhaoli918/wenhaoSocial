export const sRecent = (data:any) => {
  localStorage.setItem('users',JSON.stringify(data))
}

export const gRecent = () => {
  return JSON.parse(localStorage.getItem('users') || '[]')
}

export const rRecent = () => {
  localStorage.removeItem('users')
}
