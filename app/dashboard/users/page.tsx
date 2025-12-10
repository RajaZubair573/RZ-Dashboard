"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  User,
  Shield,
  Edit,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

type UserRole = "admin" | "editor" | "viewer" | "user";
type UserStatus = "active" | "inactive" | "suspended" | "pending";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  lastActive: string;
  joinDate: string;
  phone?: string;
  department?: string;
}

const roleColors = {
  admin: "bg-purple-100 text-purple-800",
  editor: "bg-blue-100 text-blue-800",
  viewer: "bg-green-100 text-green-800",
  user: "bg-gray-100 text-gray-800"
};

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  suspended: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800"
};

const statusIcons = {
  active: <div className="w-2 h-2 rounded-full bg-green-500" />,
  inactive: <div className="w-2 h-2 rounded-full bg-gray-500" />,
  suspended: <div className="w-2 h-2 rounded-full bg-red-500" />,
  pending: <div className="w-2 h-2 rounded-full bg-yellow-500" />
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "admin",
      status: "active",
      avatar: "",
      lastActive: "2023-12-08T14:30:00",
      joinDate: "2022-01-15",
      phone: "+1 (555) 123-4567",
      department: "Engineering"
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      role: "editor",
      status: "active",
      avatar: "",
      lastActive: "2023-12-09T09:15:00",
      joinDate: "2022-03-22",
      phone: "+1 (555) 234-5678",
      department: "Marketing"
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "viewer",
      status: "inactive",
      avatar: "",
      lastActive: "2023-11-28T16:45:00",
      joinDate: "2023-05-10",
      department: "Sales"
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      role: "user",
      status: "pending",
      avatar: "",
      lastActive: "2023-12-05T11:20:00",
      joinDate: "2023-10-15",
      phone: "+1 (555) 345-6789",
      department: "Support"
    },
    {
      id: "5",
      name: "David Kim",
      email: "david.kim@example.com",
      role: "editor",
      status: "suspended",
      avatar: "",
      lastActive: "2023-11-15T13:10:00",
      joinDate: "2021-11-30",
      phone: "+1 (555) 456-7890",
      department: "Product"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const [newUser, setNewUser] = useState<Omit<User, "id" | "avatar" | "lastActive" | "joinDate">>({
    name: "",
    email: "",
    role: "user",
    status: "pending",
    phone: "",
    department: ""
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue && bValue) {
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Validation Error", {
        description: "Name and email are required fields."
      });
      return;
    }

    const user: User = {
      ...newUser,
      id: Date.now().toString(),
      avatar: "",
      lastActive: new Date().toISOString(),
      joinDate: new Date().toISOString().split("T")[0]
    };

    setUsers([...users, user]);

    toast.success("User Added", {
      description: `${newUser.name} has been added successfully.`,
      action: {
        label: "Undo",
        onClick: () => {
          setUsers((prev) => prev.filter((u) => u.id !== user.id));
          toast.success("Action Reverted", {
            description: "The user was not added."
          });
        }
      }
    });

    setNewUser({
      name: "",
      email: "",
      role: "user",
      status: "pending",
      phone: "",
      department: ""
    });
    setShowNewUserForm(false);
  };

  const updateUserStatus = (userId: string, newStatus: UserStatus) => {
    const user = users.find((u) => u.id === userId);
    const oldStatus = user?.status;

    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)));

    toast.success("Status Updated", {
      description: `${user?.name}'s status changed from ${oldStatus} to ${newStatus}.`,
      action: {
        label: "Undo",
        onClick: () => {
          setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, status: oldStatus as UserStatus } : u))
          );
          toast.info("Action Reverted", {
            description: `Reverted ${user?.name}'s status back to ${oldStatus}.`
          });
        }
      }
    });
  };

  const deleteUser = (userId: string) => {
    const userToDelete = users.find((user) => user.id === userId);

    const deleteAction = () => {
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== userId);
        return updatedUsers;
      });

      toast.success("User Deleted", {
        description: `${userToDelete?.name} has been removed from the system.`,
        action: {
          label: "Undo",
          onClick: () => {
            if (userToDelete) {
              setUsers((prev) => [...prev, userToDelete]);
              toast.success("User Restored", {
                description: `${userToDelete.name} has been restored.`
              });
            }
          }
        }
      });
    };

    // Show confirmation toast instead of native alert
    toast.warning("Confirm Deletion", {
      description: `Are you sure you want to delete ${userToDelete?.name}?`,
      action: {
        label: "Delete",
        onClick: deleteAction
      },
      cancel: {
        label: "Cancel",
        onClick: () => {}
      }
    });
  };

  const viewUserDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <UsersIcon className="w-6 h-6" />
            User Management
          </h1>
          <p className="text-gray-500">Manage your team members and their permissions</p>
        </div>
        <button
          onClick={() => setShowNewUserForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
            <option value="user">User</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>

          <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    User
                    {sortConfig?.key === "name" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 w-4 h-4" />
                      ) : (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => requestSort("role")}
                >
                  <div className="flex items-center">
                    Role
                    {sortConfig?.key === "role" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 w-4 h-4" />
                      ) : (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortConfig?.key === "status" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 w-4 h-4" />
                      ) : (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={() => requestSort("lastActive")}
                >
                  <div className="flex items-center">
                    Last Active
                    {sortConfig?.key === "lastActive" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 w-4 h-4" />
                      ) : (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td
                      className="px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => viewUserDetails(user)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                          {getInitials(user.name)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          roleColors[user.role]
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {statusIcons[user.status]}
                        <span className={`ml-2 text-sm ${statusColors[user.status]}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastActive).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        <div className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => viewUserDetails(user)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </button>
                            <button
                              onClick={() =>
                                updateUserStatus(
                                  user.id,
                                  user.status === "active" ? "suspended" : "active"
                                )
                              }
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {user.status === "active" ? (
                                <>
                                  <X className="mr-2 h-4 w-4 text-red-500" />
                                  Suspend
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4 text-green-500" />
                                  Activate
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found. Create a new user to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New User Modal */}
      {showNewUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newUser.status}
                      onChange={(e) =>
                        setNewUser({ ...newUser, status: e.target.value as UserStatus })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    placeholder="e.g., Engineering, Marketing"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowNewUserForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addUser}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    disabled={!newUser.name || !newUser.email}
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[selectedUser.status]
                    }`}
                  >
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </span>
                  <button
                    onClick={() => setShowUserDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            roleColors[selectedUser.role]
                          }`}
                        >
                          {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                        </span>
                      </p>
                    </div>
                    {selectedUser.department && (
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium">{selectedUser.department}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Active</p>
                      <p className="font-medium">
                        {new Date(selectedUser.lastActive).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-500" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>
                    {selectedUser.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {selectedUser.phone}
                        </p>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-500" />
                    Permissions
                  </h3>
                  <div className="space-y-2">
                    {selectedUser.role === "admin" && (
                      <p className="text-sm">Full access to all features and settings</p>
                    )}
                    {selectedUser.role === "editor" && (
                      <p className="text-sm">
                        Can create and edit content, but cannot manage users or system settings
                      </p>
                    )}
                    {selectedUser.role === "viewer" && (
                      <p className="text-sm">Can view content but cannot make changes</p>
                    )}
                    {selectedUser.role === "user" && (
                      <p className="text-sm">Basic access with limited permissions</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    updateUserStatus(
                      selectedUser.id,
                      selectedUser.status === "active" ? "suspended" : "active"
                    );
                    setShowUserDetails(false);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    selectedUser.status === "active"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {selectedUser.status === "active" ? "Suspend User" : "Activate User"}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${selectedUser.name}?`)) {
                      deleteUser(selectedUser.id);
                      setShowUserDetails(false);
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
