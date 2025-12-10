import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'tasks.json');

// Helper function to read tasks from file
async function readTasks() {
  try {
    const data = await readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper function to write tasks to file
async function writeTasks(tasks: any[]) {
  await writeFile(DATA_FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const tasks = await readTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newTask = await request.json();
    const tasks = await readTasks();
    
    // Generate a new ID (simple increment, in production use UUID or similar)
    const newId = tasks.length > 0 
      ? Math.max(...tasks.map((t: any) => parseInt(t.id))) + 1 
      : 1;
    
    const taskWithId = { ...newTask, id: newId.toString() };
    tasks.push(taskWithId);
    
    await writeTasks(tasks);
    
    return NextResponse.json(taskWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedTask = await request.json();
    let tasks = await readTasks();
    
    tasks = tasks.map((task: any) => 
      task.id === updatedTask.id ? updatedTask : task
    );
    
    await writeTasks(tasks);
    
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    let tasks = await readTasks();
    
    tasks = tasks.filter((task: any) => task.id !== id);
    
    await writeTasks(tasks);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
