import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { addUser, findUserByEmail, User } from '@/lib/users'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    }

    addUser(newUser)

    // Return success (don't include password)
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}