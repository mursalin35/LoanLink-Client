// src/pages/Dashboard/Admin/ManageUsers.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null); // { email, role, suspended, suspendReason }

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ email, payload }) =>
      axiosSecure.patch(`/admin/users/role/${email}`, payload),
    onSuccess: () => {
      toast.success("User updated");
      qc.invalidateQueries(["admin-users"]);
      setEditUser(null);
    },
    onError: () => toast.error("Update failed"),
  });

  const filtered = users.filter((u) =>
    `${u.displayName || u.name || ""} ${u.email} ${u.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (isLoading) return <Spinner/>;

  return (
   <div className="min-h-screen bg-[#F4F7F5] px-4 sm:px-6 pt-4 pb-10 max-w-7xl mx-auto">
  <title>Manage Users</title>

  {/* Header */}
  <div className="mb-6 text-center sm:text-left">
    <h2 className="text-3xl font-semibold text-[#1C2B27]">
      Manage Users
    </h2>
    <p className="text-sm sm:text-base text-[#6B7C75] mt-2">
      View and manage platform users
    </p>
  </div>

  {/* Search */}
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search by name / email / role"
    className="w-full mb-4 px-4 py-2 rounded-md border border-gray-200
               bg-white text-[#1C2B27]
               focus:outline-none focus:ring-2 focus:ring-[#B6E04C]"
  />

  {/* Desktop Table */}
  <div className="hidden sm:block bg-white rounded-md shadow-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm sm:text-base">
        <thead className="bg-[#1F4F45] text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {filtered.map((u) => (
            <tr key={u.email} className="hover:bg-[#F4F7F5] transition">
              <td className="px-4 py-3 font-semibold text-[#1C2B27]">
                {u.displayName || u.name || "—"}
              </td>
              <td className="px-4 py-3 text-[#6B7C75]">
                {u.email}
              </td>
              <td className="px-4 py-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold
                                 bg-[#B6E04C]/30 text-[#1C2B27]">
                  {u.role || "user"}
                </span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => setEditUser(u)}
                  className="px-3 py-1 rounded-md bg-[#B6E04C]
                             text-[#1C2B27] font-semibold text-sm
                             hover:bg-[#6FBF73] transition-colors"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Mobile Card View */}
  <div className="sm:hidden space-y-4">
    {filtered.map((u) => (
      <div
        key={u.email}
        className="bg-white rounded-2xl shadow-md p-5 space-y-3 border border-gray-100"
      >
        <div>
          <h3 className="font-semibold text-[#1C2B27] text-lg">
            {u.displayName || u.name || "—"}
          </h3>
          <p className="text-xs text-[#6B7C75]">{u.email}</p>
        </div>

        <p className="text-sm">
          <strong>Role:</strong>{" "}
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
                           bg-[#B6E04C]/30 text-[#1C2B27]">
            {u.role || "user"}
          </span>
        </p>

        <button
          onClick={() => setEditUser(u)}
          className="w-full px-3 py-2 rounded-md bg-[#B6E04C]
                     text-[#1C2B27] font-semibold text-sm
                     hover:bg-[#6FBF73]"
        >
          Update
        </button>
      </div>
    ))}
  </div>

  {/* Edit User Modal */}
  {editUser && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setEditUser(null)}
          className="absolute top-4 right-4 text-2xl font-bold
                     text-[#6B7C75] hover:text-[#ef4f4f]"
        >
          &times;
        </button>

        <h3 className="text-2xl font-extrabold mb-4 text-center text-[#1F4F45]">
          Update User
        </h3>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#1C2B27]">
            Email
          </label>
          <input
            readOnly
            value={editUser.email}
            className="w-full mt-1 px-3 py-2 rounded-md
                       bg-gray-100 border text-[#1C2B27]"
          />
        </div>

        {/* Role */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-[#1C2B27]">
            Role
          </label>
          <select
            value={editUser.role || "user"}
            onChange={(e) =>
              setEditUser((p) => ({ ...p, role: e.target.value }))
            }
            className="w-full mt-1 px-3 py-2 rounded-md border
                       focus:ring-2 focus:ring-[#B6E04C]"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Suspend */}
        <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#1C2B27]">
          <input
            type="checkbox"
            checked={!!editUser.suspended}
            onChange={(e) =>
              setEditUser((p) => ({ ...p, suspended: e.target.checked }))
            }
            className="accent-[#6FBF73]"
          />
          Suspend user
        </label>

        {editUser.suspended && (
          <textarea
            value={editUser.suspendReason || ""}
            onChange={(e) =>
              setEditUser((p) => ({ ...p, suspendReason: e.target.value }))
            }
            placeholder="Suspend reason"
            className="w-full px-3 py-2 rounded-md border mb-3
                       focus:ring-2 focus:ring-[#B6E04C]"
          />
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setEditUser(null)}
            className="px-3 py-1 rounded-md bg-gray-200
                       text-[#1C2B27] font-semibold
                       hover:bg-[#1F4F45] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              roleMutation.mutate({
                email: editUser.email,
                payload: {
                  role: editUser.role,
                  suspend: !!editUser.suspended,
                  suspendReason: editUser.suspendReason,
                },
              })
            }
            className="px-3 py-1 rounded-md bg-[#B6E04C]
                       text-[#1C2B27] font-semibold
                       hover:bg-[#6FBF73]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default ManageUsers;
