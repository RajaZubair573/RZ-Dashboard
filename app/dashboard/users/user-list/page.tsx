import { redirect } from 'next/navigation';

export default function UserList() {
  // Redirect to the main users page
  redirect('/dashboard/users');
}
