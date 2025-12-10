import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

// Helper function to read users from file
async function readUsers() {
  try {
    const data = await readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default users
    const defaultUsers = [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        role: 'admin',
        status: 'active',
        avatar: '',
        lastActive: '2023-12-08T14:30:00',
        joinDate: '2022-01-15',
        phone: '+1 (555) 123-4567',
        department: 'Engineering'
      },
      {
        id: '2',
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        role: 'editor',
        status: 'active',
        avatar: '',
        lastActive: '2023-12-09T09:15:00',
        joinDate: '2022-03-22',
        phone: '+1 (555) 234-5678',
        department: 'Marketing'
      },
      {
        id: '3',
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        role: 'viewer',
        status: 'inactive',
        avatar: '',
        lastActive: '2023-11-28T16:45:00',
        joinDate: '2023-05-10',
        department: 'Sales'
      }
    ];
    
    // Create data directory if it doesn't exist
    const fs = require('fs');
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write default users to file
    await writeFile(DATA_FILE_PATH, JSON.stringify(defaultUsers, null, 2), 'utf-8');
    return defaultUsers;
  }
}

// Helper function to write users to file
async function writeUsers(users: any[]) {
  await writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const users = await readUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    const users = await readUsers();
    
    // Check if user with email already exists
    if (users.some((user: any) => user.email === newUser.email)) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Generate a new ID (simple increment, in production use UUID or similar)
    const newId = users.length > 0 
      ? Math.max(...users.map((u: any) => parseInt(u.id))) + 1 
      : 1;
    
    const userWithId = { 
      ...newUser, 
      id: newId.toString(),
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      avatar: ''
    };
    
    users.push(userWithId);
    await writeUsers(users);
    
    return NextResponse.json(userWithId, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedUser = await request.json();
    let users = await readUsers();
    
    // Check if another user has the same email
    const emailExists = users.some(
      (user: any) => user.email === updatedUser.email && user.id !== updatedUser.id
    );
    
    if (emailExists) {
      return NextResponse.json(
        { error: 'Another user with this email already exists' },
        { status: 400 }
      );
    }
    
    users = users.map((user: any) => 
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    
    await writeUsers(users);
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    let users = await readUsers();
    
    // Don't allow deleting the last admin
    const userToDelete = users.find((u: any) => u.id === id);
    if (userToDelete?.role === 'admin') {
      const adminCount = users.filter((u: any) => u.role === 'admin').length;
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last admin user' },
          { status: 400 }
        );
      }
    }
    
    users = users.filter((user: any) => user.id !== id);
    await writeUsers(users);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
