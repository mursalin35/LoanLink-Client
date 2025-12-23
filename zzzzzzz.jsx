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

  return (
    <div className="p-4">
      <title>All Loan</title>
      <h2 className="text-2xl font-bold mb-4">All Loans</h2>

      <input
        placeholder="Search title or category"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Interest</th>
              <th className="p-2">Category</th>
              <th className="p-2">Created By</th>
              <th className="p-2">Show on Home</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="border-t">
                <td className="p-2">
                  {loan.image ? (
                    <img
                      src={loan.image}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-2">{loan.title}</td>
                <td className="p-2">{loan.interest}%</td>
                <td className="p-2">{loan.category}</td>
                <td className="p-2">{loan.createdBy}</td>

                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={!!loan.showOnHome}
                    onChange={(e) =>
                      toggleHomeM.mutate({
                        id: loan._id,
                        val: e.target.checked,
                      })
                    }
                  />
                </td>

                <td className="p-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                    onClick={() => setEdit(loan)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => setDeleteId(loan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {edit && (
        <EditLoanModal loan={edit} setLoan={setEdit} updateM={updateM} />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded max-w-sm">
            <p>Confirm delete?</p>
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => delM.mutate(deleteId)}
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded max-w-md w-full">
        <h3 className="font-bold text-lg mb-3">Edit Loan</h3>

        <form onSubmit={handleSubmit(handleLoanImageUpdate)}>
          <input
            {...register("title")}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Title"
          />

          <textarea
            {...register("description")}
            className="w-full p-2 mb-2 border rounded"
            rows={3}
            placeholder="Description"
          />

          <input
            {...register("category")}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Category"
          />

          <input
            {...register("interest")}
            type="number"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Interest (%)"
          />

          <input
            {...register("maxLimit")}
            type="number"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Max Limit"
          />

          <input
            {...register("emiPlansText")}
            className="w-full p-2 mb-2 border rounded"
            placeholder="EMI Plans (3 month, 5 month, 7 month)"
          />

  <input
        type="file"
          {...register("image", )}
          placeholder="Image Upload"
          className="file-input w-full p-2 mb-4 border rounded"
        />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => setLoan(null)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
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
