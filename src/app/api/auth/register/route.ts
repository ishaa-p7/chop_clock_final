import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, role } = await req.json()

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 },
      )
    }

    console.log({ username, email, password, role })

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user with a default role (if not provided)
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        //  role: role || 'USER',  // Default to "USER" if role is not provided
      },
    })

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
