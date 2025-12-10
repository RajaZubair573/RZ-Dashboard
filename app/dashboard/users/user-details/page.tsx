import { notFound, redirect } from 'next/navigation';

export default function UserDetails() {
  // For now, redirect to the main users page
  // In a real app, you would fetch user details based on the ID in the URL
  redirect('/dashboard/users');
}