// Simple in-memory user storage (replace with database in production)
export interface User {
  id: string
  name: string
  email: string
  password: string
}

export const users: User[] = []

export function addUser(user: User): void {
  users.push(user)
}

export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email)
}