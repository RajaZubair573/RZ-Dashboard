'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, User, ListTodo, Users, Home } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      name: 'Tasks',
      href: '/dashboard/tasks',
      icon: <ListTodo className="w-5 h-5" />,
    },
    {
      name: 'Users',
      href: '/dashboard/users',
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-8 pl-2">Dashboard</h1>
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
