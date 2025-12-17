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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name/email/role"
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.email} className="border-t">
                <td className="p-2">{u.displayName || u.name || "—"}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role || "user"}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => setEditUser(u)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Update User</h3>

            <div className="mb-2">
              <label className="block text-sm">Email</label>
              <input
                readOnly
                value={editUser.email}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Role</label>
              <select
                value={editUser.role || "user"}
                onChange={(e) =>
                  setEditUser((p) => ({ ...p, role: e.target.value }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="user">user</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!editUser.suspended}
                  onChange={(e) =>
                    setEditUser((p) => ({ ...p, suspended: e.target.checked }))
                  }
                />
                Suspend user
              </label>
            </div>

            {editUser.suspended && (
              <textarea
                value={editUser.suspendReason || ""}
                onChange={(e) =>
                  setEditUser((p) => ({ ...p, suspendReason: e.target.value }))
                }
                placeholder="Suspend reason"
                className="w-full p-2 border rounded mb-2"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
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
