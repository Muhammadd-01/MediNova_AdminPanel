"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Eye, Edit, Trash2, X, Plus, CheckCircle, AlertCircle } from "lucide-react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [addUserModal, setAddUserModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null); // { type: "success"|"warning", message: "" }
  const [confirmDelete, setConfirmDelete] = useState(null); // { user }

  const countries = [
    "Pakistan", "India", "Bangladesh", "Sri Lanka", "Nepal", "Afghanistan",
    "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman",
    "Turkey", "Malaysia", "Indonesia", "Egypt", "United States", "United Kingdom",
    "Canada", "Australia", "Germany", "France", "Italy", "Spain", "China", "Japan",
  ];

  const genders = ["Male", "Female", "Other"];

  // ✅ Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4001/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // ✅ Delete user (show confirmation notification)
  const handleDeleteClick = (user) => {
    if (user.role === "superadmin") {
      setNotification({ type: "warning", message: "You cannot delete the Superadmin!" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setConfirmDelete(user); // show confirm notification
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4001/api/users/${confirmDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== confirmDelete._id));
        setNotification({ type: "success", message: "User deleted successfully!" });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      setNotification({ type: "warning", message: "Error deleting user!" });
      setTimeout(() => setNotification(null), 3000);
    }
    setConfirmDelete(null);
  };

  // ✅ Edit user
  const handleEditSave = async () => {
    try {
      const res = await fetch(`http://localhost:4001/api/users/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setEditUser(null);
        fetchUsers();
        setNotification({ type: "success", message: "User updated successfully!" });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // ✅ Add new user
  const handleAddUser = async () => {
    try {
      const res = await fetch("http://localhost:4001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setAddUserModal(false);
        setFormData({});
        fetchUsers();
        setNotification({ type: "success", message: "User added successfully!" });
        setTimeout(() => setNotification(null), 3000);
      } else {
        const err = await res.json();
        setNotification({ type: "warning", message: err.message || "Error adding user" });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="space-y-6 relative">

     {/* ======================= NOTIFICATIONS ======================= */}
<AnimatePresence>
  {/* Success / Warning Notifications */}
  {notification && (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.8 }}
      className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl w-72 backdrop-blur-lg border border-white/20 bg-white/10 text-white`}
    >
      <div className="flex items-center gap-2">
        {notification.type === "success" ? (
          <CheckCircle className="w-6 h-6 text-green-400" />
        ) : (
          <AlertCircle className="w-6 h-6 text-yellow-400" />
        )}
        <p className="text-sm font-medium">{notification.message}</p>
        <button onClick={() => setNotification(null)} className="ml-auto">
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )}

  {/* Confirm Delete Notification */}
  {confirmDelete && (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.8 }}
      className="fixed top-6 right-6 z-50 p-6 rounded-xl shadow-2xl w-72 backdrop-blur-lg border border-white/30 bg-white/10 text-white"
    >
      <p className="mb-4 text-sm">
        Are you sure you want to delete <span className="font-semibold">{confirmDelete.fullName}</span>?
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirmDelete(null)}
          className="px-3 py-1 bg-white/20 rounded-xl hover:bg-white/30"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmDelete}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-xl"
        >
          Delete
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
        <p className="text-white/60">Manage all users, doctors, and patients in the system.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-md"
          />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-10" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl pl-10 pr-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/40 appearance-none cursor-pointer shadow-md"
            >
              <option value="all" className="bg-black text-white">All Roles</option>
              <option value="doctor" className="bg-black text-white">Doctor</option>
              <option value="patient" className="bg-black text-white">Patient</option>
              <option value="admin" className="bg-black text-white">Admin</option>
            </select>
          </div>

          {/* Add User Button */}
          <button
            onClick={() => setAddUserModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl transition-all hover:bg-white/20 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.profilePic || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border border-white/30"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">{user.fullName || "—"}</h3>
                  <p className="text-white/70 text-sm">{user.email || "—"}</p>
                </div>
              </div>

              <div className="space-y-2 text-white/70 text-sm">
                <p><span className="font-semibold text-white">Phone:</span> {user.phoneNumber || "—"}</p>
                <p><span className="font-semibold text-white">Gender:</span> {user.gender || "—"}</p>
                <p><span className="font-semibold text-white">Country:</span> {user.country || "—"}</p>
                <p><span className="font-semibold text-white">Blood:</span> {user.bloodGroup || "—"}</p>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-2 text-white/70 hover:text-blue-400 hover:bg-white/20 rounded-xl transition-all transform hover:scale-110 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setEditUser(user);
                    setFormData(user);
                  }}
                  className="p-2 text-white/70 hover:text-green-400 hover:bg-white/20 rounded-xl transition-all transform hover:scale-110 active:scale-95"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="p-2 text-white/70 hover:text-red-400 hover:bg-white/20 rounded-xl transition-all transform hover:scale-110 active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white/70 col-span-full py-10">No users found</p>
        )}
      </div>

        {/* ======================= ADD USER MODAL ======================= */}
 <AnimatePresence>
  {addUserModal && (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl text-white w-full max-w-md relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button
          onClick={() => setAddUserModal(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Add New User</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName || ""}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          />
          {/* ✅ Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password || ""}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          />

          {/* Gender */}
          <select
            value={formData.gender || ""}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Country */}
          <select
            value={formData.country || ""}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Role */}
          <select
            value={formData.role || ""}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setAddUserModal(false)}
            className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            Add
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* ======================= VIEW MODAL ======================= */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl text-white w-full max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={selectedUser.profilePic || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border border-white/30 mb-4"
                />
                <h2 className="text-xl font-bold">{selectedUser.fullName}</h2>
                <p className="text-white/60">{selectedUser.email}</p>
              </div>
              <div className="mt-4 space-y-2 text-white/70 text-sm">
                <p><span className="font-semibold text-white">Phone:</span> {selectedUser.phoneNumber || "—"}</p>
                <p><span className="font-semibold text-white">Gender:</span> {selectedUser.gender || "—"}</p>
                <p><span className="font-semibold text-white">Country:</span> {selectedUser.country || "—"}</p>
                <p><span className="font-semibold text-white">Allergies:</span> {selectedUser.allergies || "—"}</p>
                <p><span className="font-semibold text-white">History:</span> {selectedUser.history || "—"}</p>
                <p><span className="font-semibold text-white">Created:</span> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================= EDIT MODAL ======================= */}
     <AnimatePresence>
  {editUser && (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl text-white w-full max-w-md relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button
          onClick={() => setEditUser(null)}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <div className="space-y-3">
          {/* Full Name */}
          <input
            type="text"
            value={formData.fullName || ""}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Full Name"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          />

          {/* Email */}
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          />

          {/* Gender Dropdown */}
          <select
            value={formData.gender || ""}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Country Dropdown */}
          <select
            value={formData.country || ""}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            <option value="">Select Country</option>
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Nepal">Nepal</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Qatar">Qatar</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Oman">Oman</option>
            <option value="Turkey">Turkey</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Egypt">Egypt</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
            <option value="China">China</option>
            <option value="Japan">Japan</option>
          </select>

          {/* Role Dropdown */}
          <select
            value={formData.role || ""}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Phone Number */}
          <input
            type="text"
            value={formData.phoneNumber || ""}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Phone Number"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setEditUser(null)}
            className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSave}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}
