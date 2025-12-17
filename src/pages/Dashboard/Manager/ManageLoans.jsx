import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [editingLoan, setEditingLoan] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    interest: "",
    maxLimit: "",
    image: "",
    showOnHome: false,
  });

  // Fetch all loans (live search handled here)
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/loans/${id}`);
      return res.data;
    },
    onSuccess: (_, id) => {
      toast.success("Loan deleted successfully");
      // Remove deleted loan from cache
      queryClient.setQueryData(["loans"], (old) =>
        old.filter((loan) => loan._id !== id)
      );
    },
    onError: () => toast.error("Failed to delete loan"),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosSecure.patch(`/loans/${id}`, data);
      return res.data;
    },
    onSuccess: (_, { id, data }) => {
      toast.success("Loan updated successfully");
      // Update cached loan
      queryClient.setQueryData(["loans"], (old) =>
        old.map((loan) => (loan._id === id ? { ...loan, ...data } : loan))
      );
      setEditingLoan(null);
    },
    onError: () => toast.error("Failed to update loan"),
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditOpen = (loan) => {
    setEditingLoan(loan._id);
    setEditForm({
      title: loan.title,
      category: loan.category,
      interest: loan.interest,
      maxLimit: loan.maxLimit,
      image: loan.image || "",
      showOnHome: loan.showOnHome || false,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editingLoan, data: editForm });
  };

    if (isLoading) return <Spinner/>;

  // Filter loans live by search input
  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(search.toLowerCase()) ||
      (loan.category &&
        loan.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Loans</h2>

      <input
        type="text"
        placeholder="Search by Title or Category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Interest</th>
              <th className="py-2 px-4">Max Limit</th>
              <th className="py-2 px-4">Show on Home</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id} className="border-t">
                <td className="py-2 px-4">
                  {loan.image ? (
                    <img
                      src={loan.image}
                      className="w-16 h-16 rounded object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-2 px-4">{loan.title}</td>
                <td className="py-2 px-4">{loan.category}</td>
                <td className="py-2 px-4">{loan.interest}%</td>
                <td className="py-2 px-4">${loan.maxLimit}</td>
                <td className="py-2 px-4">{loan.showOnHome ? "Yes" : "No"}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleEditOpen(loan)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Loan Modal */}
      {editingLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Edit Loan</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
              />
              <input
                name="interest"
                type="number"
                value={editForm.interest}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="maxLimit"
                type="number"
                value={editForm.maxLimit}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="image"
                value={editForm.image}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="showOnHome"
                  checked={editForm.showOnHome}
                  onChange={handleEditChange}
                />{" "}
                Show on Home
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLoan(null)}
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  {updateMutation.isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLoans;
