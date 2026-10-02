import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import {
  Users,
  Mic2,
  Calendar,
  Shield,
  Search,
  LogOut,
  RefreshCw,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Mail,
  Clock,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { UserProfile } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [adminUids, setAdminUids] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setError(
        'Firebase is not configured. Please ensure VITE_FIREBASE_* environment variables are set.'
      );
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(true);

    // Fetch admins collection IDs to accurately identify and count admins
    const fetchAdmins = async () => {
      try {
        const adminsRef = collection(db, 'admins');
        const adminSnap = await getDocs(adminsRef);
        const uids = new Set<string>();
        adminSnap.forEach((docSnap) => uids.add(docSnap.id));
        setAdminUids(uids);
      } catch (err: any) {
        // If listing admins is not allowed or fails, fallback to current user if admin
        if (currentUser?.uid) {
          setAdminUids(new Set([currentUser.uid]));
        }
      }
    };
    fetchAdmins();

    // Query users collection with real-time onSnapshot listener
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'), limit(200));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedUsers: UserProfile[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetchedUsers.push({
            uid: docSnap.id,
            role: data.role || 'organizer',
            name: data.name || 'Unnamed User',
            email: data.email || 'No email',
            createdAt: data.createdAt || '',
            updatedAt: data.updatedAt || '',
            status: data.status || 'active',
          });
        });
        setUsers(fetchedUsers);
        setLoading(false);
        setRefreshing(false);
      },
      (err: any) => {
        console.error('Error listening to registered users:', err);
        if (err.code === 'permission-denied') {
          setError(
            'Permission denied: Cloud Firestore security rules prevent reading users collection. Verify that your UID is added to the admins/{uid} collection.'
          );
        } else {
          setError(err.message || 'Failed to load users from Firestore.');
        }
        setLoading(false);
        setRefreshing(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const adminsRef = collection(db, 'admins');
      const adminSnap = await getDocs(adminsRef);
      const uids = new Set<string>();
      adminSnap.forEach((docSnap) => uids.add(docSnap.id));
      setAdminUids(uids);
    } catch {
      // ignore
    }
    // Users are automatically synced via onSnapshot
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const totalUsers = users.length;
    const totalAnchors = users.filter((u) => u.role === 'anchor').length;
    const totalOrganizers = users.filter((u) => u.role === 'organizer').length;
    const totalAdmins = Math.max(adminUids.size, users.filter((u) => u.role === 'admin').length);
    return { totalUsers, totalAnchors, totalOrganizers, totalAdmins };
  }, [users, adminUids]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const isUserAdmin = adminUids.has(user.uid) || user.role === 'admin';
      const effectiveRole = isUserAdmin ? 'admin' : user.role;

      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.uid.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        selectedRole === 'all'
          ? true
          : selectedRole === 'admin'
          ? isUserAdmin
          : effectiveRole === selectedRole;

      const matchesStatus =
        selectedStatus === 'all' ? true : user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, adminUids, searchTerm, selectedRole, selectedStatus]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Format date helper
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A120B] text-[#F5E6C8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-[#241A12] border border-[#3E2723] rounded-3xl p-6 sm:p-8 shadow-gold-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3E2723] to-[#1A120B] border border-[#C9A44C]/40 flex items-center justify-center shadow-gold-glow">
              <ShieldCheck className="w-7 h-7 text-[#C9A44C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5E6C8]">
                  Owner Administration
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#C9A44C]/20 border border-[#C9A44C]/40 text-[#DFC27D]">
                  Secure Master
                </span>
              </div>
              <p className="text-xs text-[#F5E6C8]/60 mt-1">
                Connected as <span className="text-[#C9A44C]">{currentUser?.email}</span> ({userProfile?.name || 'Administrator'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 rounded-xl bg-[#1A120B] border border-[#3E2723] hover:border-[#C9A44C] text-xs font-semibold text-[#F5E6C8] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#C9A44C]' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 hover:border-red-500/60 text-xs font-semibold text-red-200 transition-all flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#241A12] border border-[#3E2723] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#F5E6C8]/70">Total Registered Users</span>
              <div className="w-9 h-9 rounded-xl bg-[#3E2723] flex items-center justify-center">
                <Users className="w-4 h-4 text-[#C9A44C]" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#F5E6C8]">
              {loading ? '-' : metrics.totalUsers}
            </div>
            <div className="text-[11px] text-[#F5E6C8]/50 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C9A44C]" />
              Live accounts registered in Firestore
            </div>
          </div>

          <div className="bg-[#241A12] border border-[#3E2723] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#F5E6C8]/70">Anchors / Emcees</span>
              <div className="w-9 h-9 rounded-xl bg-[#3E2723] flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-[#C9A44C]" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#DFC27D]">
              {loading ? '-' : metrics.totalAnchors}
            </div>
            <div className="text-[11px] text-[#F5E6C8]/50 mt-1">
              Public speakers & performers
            </div>
          </div>

          <div className="bg-[#241A12] border border-[#3E2723] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#F5E6C8]/70">Organizers</span>
              <div className="w-9 h-9 rounded-xl bg-[#3E2723] flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#C9A44C]" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#F5E6C8]">
              {loading ? '-' : metrics.totalOrganizers}
            </div>
            <div className="text-[11px] text-[#F5E6C8]/50 mt-1">
              Event managers & companies
            </div>
          </div>

          <div className="bg-[#241A12] border border-[#3E2723] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#F5E6C8]/70">Administrators</span>
              <div className="w-9 h-9 rounded-xl bg-[#3E2723] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#C9A44C]" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-[#C9A44C]">
              {loading ? '-' : metrics.totalAdmins}
            </div>
            <div className="text-[11px] text-[#F5E6C8]/50 mt-1">
              Verified owner credentials
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-red-300">Action Required</div>
              <div>{error}</div>
            </div>
          </div>
        )}

        {/* Search, Filter & Table Container */}
        <div className="bg-[#241A12] border border-[#3E2723] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#C9A44C]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, email, or UID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#3E2723] focus:border-[#C9A44C] focus:ring-1 focus:ring-[#C9A44C] text-xs text-[#F5E6C8] placeholder-[#F5E6C8]/30 transition-all outline-none"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-[#1A120B] border border-[#3E2723] rounded-xl px-3 py-1.5">
                <Filter className="w-3.5 h-3.5 text-[#C9A44C]" />
                <span className="text-xs text-[#F5E6C8]/60">Role:</span>
                <select
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-xs text-[#F5E6C8] outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#1A120B]">All Roles</option>
                  <option value="anchor" className="bg-[#1A120B]">Anchor</option>
                  <option value="organizer" className="bg-[#1A120B]">Organizer</option>
                  <option value="admin" className="bg-[#1A120B]">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-[#1A120B] border border-[#3E2723] rounded-xl px-3 py-1.5">
                <span className="text-xs text-[#F5E6C8]/60">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-xs text-[#F5E6C8] outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#1A120B]">All Status</option>
                  <option value="active" className="bg-[#1A120B]">Active</option>
                  <option value="suspended" className="bg-[#1A120B]">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Registration Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#3E2723]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1A120B] text-[#C9A44C] border-b border-[#3E2723]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">User</th>
                  <th className="py-3.5 px-4 font-semibold">Role</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Registered At</th>
                  <th className="py-3.5 px-4 font-semibold">UID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3E2723]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#F5E6C8]/60">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#C9A44C]" />
                        <span>Loading registered users from Firestore...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#F5E6C8]/60">
                      <Users className="w-8 h-8 text-[#C9A44C]/40 mx-auto mb-2" />
                      <div>No users found matching your criteria.</div>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr
                      key={user.uid}
                      className="hover:bg-[#3E2723]/30 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#F5E6C8]">{user.name}</div>
                        <div className="text-[11px] text-[#F5E6C8]/60 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3 text-[#C9A44C]/60" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {adminUids.has(user.uid) || user.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-950/40 border border-purple-500/30 text-purple-300">
                            <Shield className="w-3 h-3 text-purple-400" />
                            <span>Admin</span>
                          </span>
                        ) : user.role === 'anchor' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#C9A44C]/15 border border-[#C9A44C]/30 text-[#DFC27D]">
                            <Mic2 className="w-3 h-3 text-[#C9A44C]" />
                            <span className="capitalize">Anchor</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#3E2723] border border-[#3E2723] text-[#F5E6C8]/80">
                            <Calendar className="w-3 h-3 text-[#F5E6C8]/70" />
                            <span className="capitalize">{user.role || 'Organizer'}</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            user.status === 'active'
                              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20'
                              : 'bg-red-950/40 text-red-300 border border-red-500/20'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="capitalize">{user.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#F5E6C8]/70">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#C9A44C]/60" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#F5E6C8]/40 font-mono text-[11px]">
                        <span title={user.uid}>
                          {user.uid.length > 12 ? `${user.uid.slice(0, 10)}...` : user.uid}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-[#F5E6C8]/60">
              Showing{' '}
              <span className="font-semibold text-[#F5E6C8]">
                {filteredUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-[#F5E6C8]">
                {Math.min(currentPage * pageSize, filteredUsers.length)}
              </span>{' '}
              of <span className="font-semibold text-[#F5E6C8]">{filteredUsers.length}</span>{' '}
              registered records
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-[#1A120B] border border-[#3E2723] hover:border-[#C9A44C] text-[#F5E6C8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs px-3 py-1.5 rounded-xl bg-[#1A120B] border border-[#3E2723] text-[#F5E6C8]">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-[#1A120B] border border-[#3E2723] hover:border-[#C9A44C] text-[#F5E6C8] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
