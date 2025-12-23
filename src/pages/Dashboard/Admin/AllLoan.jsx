// src/pages/Dashboard/Admin/AdminAllLoans.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../../components/Spinner";

const AdminAllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const [q, setQ] = useState("");
  const [edit, setEdit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["admin-loans", q],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/loans${q ? `?q=${encodeURIComponent(q)}` : ""}`
      );
      return res.data;
    },
  });

  const updateM = useMutation({
    mutationFn: async ({ id, update }) =>
      axiosSecure.patch(`/admin/loans/${id}`, update),
    onSuccess: () => {
      toast.success("Loan updated successfully");
      qc.invalidateQueries(["admin-loans"]);
      setEdit(null);
    },
    onError: () => toast.error("Update failed"),
  });

  const delM = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/admin/loans/${id}`),
    onSuccess: () => {
      toast.success("Loan deleted");
      qc.invalidateQueries(["admin-loans"]);
      setDeleteId(null);
    },
    onError: () => toast.error("Delete failed"),
  });

  const toggleHomeM = useMutation({
    mutationFn: async ({ id, val }) =>
      axiosSecure.patch(`/admin/loans/show-home/${id}`, { showOnHome: val }),
    onSuccess: () => qc.invalidateQueries(["admin-loans"]),
  });

  if (isLoading) return <Spinner />;

  // Mail contain 
  return (
   <div className="min-h-screen bg-[#F4F7F5] px-4 sm:px-6 pt-4 pb-10 max-w-7xl mx-auto">
  <title>All Loans</title>

  {/* Header */}
  <div className="mb-6 text-center sm:text-left">
    <h2 className="text-3xl font-semibold text-[#1C2B27]">All Loans</h2>
    <p className="text-sm sm:text-base text-[#6B7C75] mt-2">
      Manage all loan products
    </p>
  </div>

  {/* Search */}
  <input
    placeholder="Search title or category"
    value={q}
    onChange={(e) => setQ(e.target.value)}
    className="w-full mb-4 px-4 py-2 rounded-md border border-gray-200
               focus:outline-none focus:ring-2 focus:ring-[#B6E04C]
               bg-white text-[#1C2B27]"
  />

  {/* Desktop Table */}
  <div className="hidden sm:block bg-white rounded-md shadow-lg overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm sm:text-base">
        <thead className="bg-[#1F4F45] text-white">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Interest</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Created By</th>
            <th className="px-4 py-3 text-left">Show on Home</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {loans.map((loan) => (
            <tr key={loan._id} className="hover:bg-[#F4F7F5] transition">
              <td className="px-4 py-3">
                {loan.image ? (
                  <img
                    src={loan.image}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  "—"
                )}
              </td>

              <td className="px-4 py-3 font-semibold text-[#1C2B27]">
                {loan.title}
              </td>

              <td className="px-4 py-3 text-[#1F4F45]">
                {loan.interest}%
              </td>

              <td className="px-4 py-3 text-[#1C2B27]">
                {loan.category}
              </td>

              <td className="px-4 py-3 text-[#6B7C75]">
                {loan.createdBy}
              </td>

              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={!!loan.showOnHome}
                  onChange={(e) =>
                    toggleHomeM.mutate({
                      id: loan._id,
                      val: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-[#6FBF73]"
                />
              </td>

              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setEdit(loan)}
                    className="px-3 py-1 rounded-md bg-[#B6E04C]
                               text-[#1C2B27] font-semibold text-sm
                               hover:bg-[#6FBF73] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(loan._id)}
                    className="px-3 py-1 rounded-md bg-red-400
                               text-white font-semibold text-sm
                               hover:bg-red-500 transition-colors"
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
  </div>

  {/* Mobile Card View */}
  <div className="sm:hidden space-y-4">
    {loans.map((loan) => (
      <div
        key={loan._id}
        className="bg-white rounded-2xl shadow-md p-5 space-y-3 border border-gray-100"
      >
        <div className="flex gap-3 items-center">
          {loan.image ? (
            <img
              src={loan.image}
              alt=""
              className="w-14 h-14 rounded-xl object-cover"
            />
          ) : (
            <div className="w-14 h-14 bg-gray-200 rounded-xl" />
          )}
          <div>
            <h3 className="font-semibold text-[#1C2B27]">
              {loan.title}
            </h3>
            <p className="text-xs text-[#6B7C75]">{loan.category}</p>
          </div>
        </div>

        <div className="text-sm text-[#1C2B27] space-y-1">
          <p><strong>Interest:</strong> {loan.interest}%</p>
          <p><strong>Created By:</strong> {loan.createdBy}</p>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-[#1C2B27]">
            Show on Home
          </label>
          <input
            type="checkbox"
            checked={!!loan.showOnHome}
            onChange={(e) =>
              toggleHomeM.mutate({
                id: loan._id,
                val: e.target.checked,
              })
            }
            className="w-4 h-4 accent-[#6FBF73]"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setEdit(loan)}
            className="flex-1 px-3 py-2 rounded-md bg-[#B6E04C]
                       text-[#1C2B27] font-semibold text-sm
                       hover:bg-[#6FBF73]"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteId(loan._id)}
            className="flex-1 px-3 py-2 rounded-md bg-red-400
                       text-white font-semibold text-sm
                       hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Edit Modal */}
  {edit && (
    <EditLoanModal loan={edit} setLoan={setEdit} updateM={updateM} />
  )}

  {/* Delete Modal */}
  {deleteId && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h3 className="text-lg font-semibold text-[#1C2B27] mb-3">
          Confirm Delete
        </h3>
        <p className="text-sm text-[#6B7C75]">
          Are you sure you want to delete this loan?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setDeleteId(null)}
            className="px-3 py-1 rounded-md bg-gray-200
                       text-[#1C2B27] font-semibold
                       hover:bg-[#1F4F45] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => delM.mutate(deleteId)}
            className="px-3 py-1 rounded-md bg-red-500
                       text-white font-semibold hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

// -----------------------------------------------------------
// EDIT LOAN MODAL  — NOW USING REACT HOOK FORM
// -----------------------------------------------------------
const EditLoanModal = ({ loan, setLoan, updateM }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: loan.title,
      description: loan.description,
      category: loan.category,
      interest: loan.interest,
      maxLimit: loan.maxLimit,
      image: loan.image,
      emiPlansText: loan.emiPlans?.join(", ") || "",
    },
  });

  const handleLoanImageUpdate = async (data) => {
  try {
   
    // 2️⃣ Upload new image
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
    const imgRes = await axios.post(imageAPI, formData);

    const imageUrl = imgRes.data.data.url;

    // 3️⃣ Update payload
    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      interest: Number(data.interest),
      maxLimit: Number(data.maxLimit || 0),

         emiPlans: data.emiPlansText
        .split(",")
        .map((v) => (v.trim())),

      image: imageUrl, // ✅ new image only

      showOnHome: !!loan.showOnHome,
    };

    // 4️⃣ Update DB
    await updateM.mutate({id: loan._id, update: payload,});

  } catch (error) {
    console.error(error);
    toast.error("Image update failed");
  }
};


  return (
   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
    
    {/* Header */}
    <h3 className="text-xl font-semibold text-[#1C2B27] mb-4">
      Edit Loan
    </h3>

    <form onSubmit={handleSubmit(handleLoanImageUpdate)} className="space-y-3">

      <input
        {...register("title")}
        className="w-full px-3 py-2 rounded-md border border-gray-200
                   focus:outline-none focus:ring-2 focus:ring-[#B6E04C]
                   text-[#1C2B27]"
        placeholder="Loan Title"
      />

      <textarea
        {...register("description")}
        rows={3}
        className="w-full px-3 py-2 rounded-md border border-gray-200
                   focus:outline-none focus:ring-2 focus:ring-[#B6E04C]
                   text-[#1C2B27]"
        placeholder="Description"
      />

      <input
        {...register("category")}
        className="w-full px-3 py-2 rounded-md border border-gray-200
                   focus:outline-none focus:ring-2 focus:ring-[#B6E04C]
                   text-[#1C2B27]"
        placeholder="Category"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          {...register("interest")}
          type="number"
          className="w-full px-3 py-2 rounded-md border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-[#B6E04C]"
          placeholder="Interest %"
        />

        <input
          {...register("maxLimit")}
          type="number"
          className="w-full px-3 py-2 rounded-md border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-[#B6E04C]"
          placeholder="Max Limit"
        />
      </div>

      <input
        {...register("emiPlansText")}
        className="w-full px-3 py-2 rounded-md border border-gray-200
                   focus:outline-none focus:ring-2 focus:ring-[#B6E04C]"
        placeholder="EMI Plans (3, 5, 7 month)"
      />

      {/* File Upload */}
      <div className="border border-dashed border-gray-300 rounded-md p-3 text-sm">
        <input
          type="file"
          {...register("image")}
          className="w-full text-sm file:mr-3 file:px-3 file:py-1
                     file:rounded-md file:border-0
                     file:bg-[#B6E04C] file:text-[#1C2B27]
                     file:font-semibold hover:file:bg-[#6FBF73]"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => setLoan(null)}
          className="px-4 py-1.5 rounded-md bg-gray-200
                     text-[#1C2B27] font-semibold
                     hover:bg-[#1F4F45] hover:text-white transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-1.5 rounded-md bg-[#6FBF73]
                     text-[#1C2B27] font-semibold
                     hover:bg-[#B6E04C] transition"
        >
          Update
        </button>
      </div>

    </form>
  </div>
</div>

  );
};

export default AdminAllLoans;
