// src/components/admin/Users.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaUserCheck,
  FaUserTimes,
  FaUserPlus,
  FaEnvelope,
  FaStar,
  FaBriefcase,
  FaClock,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('joined');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const [users] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'freelancer',
      status: 'active',
      joined: '2024-03-01',
      rating: 4.8,
      completedJobs: 32,
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff',
      location: 'New York, USA',
      lastActive: '2024-03-10'
    },
    {
      id: 2,
      name: 'Sarah Lee',
      email: 'sarah@example.com',
      role: 'client',
      status: 'active',
      joined: '2024-03-02',
      rating: 4.6,
      completedJobs: 9,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=22c55e&color=fff',
      location: 'London, UK',
      lastActive: '2024-03-09'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'freelancer',
      status: 'suspended',
      joined: '2024-02-28',
      rating: 4.2,
      completedJobs: 15,
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=d946ef&color=fff',
      location: 'Toronto, CA',
      lastActive: '2024-03-05'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'client',
      status: 'pending',
      joined: '2024-03-05',
      rating: 0,
      completedJobs: 0,
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=ef4444&color=fff',
      location: 'Sydney, AU',
      lastActive: '2024-03-05'
    },
    {
      id: 5,
      name: 'Alex Chen',
      email: 'alex@example.com',
      role: 'freelancer',
      status: 'active',
      joined: '2024-02-25',
      rating: 4.9,
      completedJobs: 45,
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=8b5cf6&color=fff',
      location: 'Singapore',
      lastActive: '2024-03-10'
    }
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      suspended: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700',
      inactive: 'bg-gray-100 text-gray-700'
    };
    return styles[status] || styles.pending;
  };

  const getRoleBadge = (role) => {
    const styles = {
      freelancer: 'bg-blue-100 text-blue-700',
      client: 'bg-purple-100 text-purple-700',
      admin: 'bg-red-100 text-red-700'
    };
    return styles[role] || styles.freelancer;
  };

  const handleAction = (action, user) => {
    const messages = {
      activate: `${user.name} has been activated!`,
      suspend: `${user.name} has been suspended!`,
      delete: `${user.name} has been deleted!`,
      verify: `${user.name} has been verified!`
    };
    toast.success(messages[action] || 'Action completed');
    setShowActionModal(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === 'rating') {
        aVal = aVal || 0;
        bVal = bVal || 0;
      }
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">User Management</h1>
            <p className="text-dark-600 mt-2">
              Manage all users on the platform
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <FaUserPlus />
            Add User
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Total Users</p>
              <p className="text-2xl font-bold text-dark-900">{users.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaUsers className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Freelancers</p>
              <p className="text-2xl font-bold text-dark-900">
                {users.filter(u => u.role === 'freelancer').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
              <FaBriefcase className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Clients</p>
              <p className="text-2xl font-bold text-dark-900">
                {users.filter(u => u.role === 'client').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500">
              <FaEnvelope className="text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-500">Suspended</p>
              <p className="text-2xl font-bold text-dark-900">
                {users.filter(u => u.status === 'suspended').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
              <FaUserTimes className="text-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Search
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-primary pl-12"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="input-primary"
            >
              <option value="all">All Roles</option>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRole('all');
                setFilterStatus('all');
              }}
              className="text-dark-500 hover:text-dark-700 transition-colors flex items-center gap-2"
            >
              <FaFilter />
              Clear Filters
            </button>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  User
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider cursor-pointer hover:text-dark-700"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center gap-1">
                    Role
                    {sortBy === 'role' && (
                      sortOrder === 'asc' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider cursor-pointer hover:text-dark-700"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center gap-1">
                    Rating
                    {sortBy === 'rating' && (
                      sortOrder === 'asc' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider cursor-pointer hover:text-dark-700"
                  onClick={() => handleSort('joined')}
                >
                  <div className="flex items-center gap-1">
                    Joined
                    {sortBy === 'joined' && (
                      sortOrder === 'asc' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dark-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-dark-900">{user.name}</div>
                        <div className="text-sm text-dark-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-medium">{user.rating}</span>
                      </div>
                    ) : (
                      <span className="text-dark-400 text-sm">No rating</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-500">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowActionModal(true);
                        }}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      {user.status === 'suspended' ? (
                        <button
                          onClick={() => handleAction('activate', user)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                        >
                          <FaUserCheck />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction('suspend', user)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        >
                          <FaUserTimes />
                        </button>
                      )}
                      <button
                        onClick={() => handleAction('delete', user)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <FaEdit className="text-2xl text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Edit User</h3>
              <p className="text-dark-500 mb-4">
                Managing user: <span className="font-medium">{selectedUser.name}</span>
              </p>
              <div className="space-y-3 text-left">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={selectedUser.name}
                    className="input-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedUser.email}
                    className="input-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Role</label>
                  <select
                    defaultValue={selectedUser.role}
                    className="input-primary"
                  >
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    toast.success('User updated successfully!');
                    setShowActionModal(false);
                  }}
                  className="flex-1 btn-primary"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowActionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-dark-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;