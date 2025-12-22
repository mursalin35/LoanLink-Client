import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import Swal from "sweetalert2";

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
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMutation.mutate(id);
      Swal.fire("Deleted!", "The loan has been deleted.", "success");
    }
  });
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
   <div className="min-h-screen bg-[#F4F7F5] p-4">
  <title>Manage Loans</title>

 {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-semibold text-[#1C2B27]">
          Manage Loans
        </h1>
        <p className="text-sm sm:text-base text-[#6B7C75] mt-2">
         View, update, and manage all loan applications
        </p>
      </div>
  {/* Search */}
  <input
    type="text"
    placeholder="Search by Title or Category"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mb-4 p-2 border rounded w-full"
  />

  {/* ================= MOBILE + TABLET CARD VIEW ================= */}
  <div className="md:hidden space-y-4">
    {filteredLoans.map((loan) => (
      <div
        key={loan._id}
        className="bg-white rounded-xl shadow-lg border border-[#E3ECE8] p-4 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          {loan.image ? (
            <img
              src={loan.image}
              className="w-16 h-16 rounded-lg object-cover border"
            />
          ) : (
            <div className="w-16 h-16 bg-[#F4F7F5] rounded-lg flex items-center justify-center text-xs text-[#6B7C75]">
              No Image
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1C2B27]">
              {loan.title}
            </h3>
            <p className="text-sm text-[#6B7C75]">{loan.category}</p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#F4F7F5] rounded-lg p-3 grid grid-cols-2 gap-2 text-sm text-[#1C2B27]">
          <p>
            <strong>Interest:</strong> {loan.interest}%
          </p>
          <p>
            <strong>Max Limit:</strong> ${loan.maxLimit}
          </p>
          <p>
            <strong>Show Home:</strong>{" "}
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                loan.showOnHome
                  ? "bg-[#6FBF73]/30 text-[#1F4F45]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {loan.showOnHome ? "Yes" : "No"}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => handleEditOpen(loan)}
            className="flex-1 px-3 py-2 rounded-md bg-[#B6E04C] text-[#1C2B27] font-semibold text-sm hover:bg-[#6FBF73] transition"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(loan._id)}
            className="flex-1 px-3 py-2 rounded-md bg-red-400 text-white font-semibold text-sm hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* ================= DESKTOP TABLE VIEW ================= */}
  <div className="hidden md:block overflow-x-auto rounded-md shadow-lg ">
    <table className="min-w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-[#1F4F45] text-white text-left">
          <th className="py-3 px-4">Image</th>
          <th className="py-3 px-4">Title</th>
          <th className="py-3 px-4">Category</th>
          <th className="py-3 px-4">Interest</th>
          <th className="py-3 px-4">Max Limit</th>
          <th className="py-3 px-4">Show on Home</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredLoans.map((loan) => (
          <tr key={loan._id} className="border-t hover:bg-[#F4F7F5]">
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
            <td className="py-2 px-4 text-[#1C2B27] font-semibold">{loan.title}</td>
            <td className="py-2 px-4 text-[#1C2B27]">{loan.category}</td>
            <td className="py-2 px-4 text-[#1C2B27]">{loan.interest}%</td>
            <td className="py-2 px-4 text-[#1C2B27]">${loan.maxLimit}</td>
            <td className="py-2 px-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  loan.showOnHome
                    ? "bg-[#6FBF73]/30 text-[#1F4F45]"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {loan.showOnHome ? "Yes" : "No"}
              </span>
            </td>
            <td className="py-2 px-4 ">
              <div className="flex flex-row gap-2">
                <button
                onClick={() => handleEditOpen(loan)}
                className="px-3 py-1 bg-[#B6E04C] text-[#1C2B27] rounded font-semibold text-sm hover:bg-[#6FBF73] transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(loan._id)}
                className="px-3 py-1 bg-red-400 text-white rounded font-semibold text-sm hover:bg-red-500 transition"
              >
                Delete
              </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ================= EDIT MODAL ================= */}
  {editingLoan && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-bold mb-4 text-[#1F4F45]">Edit Loan</h3>

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
            />
            Show on Home
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingLoan(null)}
              className="px-3 py-1 bg-gray-400 hover:bg-gray-500 transition-colors text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#76d57b] hover:bg-[#B6E04C] transition-colors text-[#1C2B27] rounded font-semibold"
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
