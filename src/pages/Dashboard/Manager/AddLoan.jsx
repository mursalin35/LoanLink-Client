import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const AddLoan = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (loanData) => {
      const res = await axiosSecure.post("/loans", loanData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Loan added successfully!");
      queryClient.invalidateQueries(["loans"]);
      reset();
    },
    onError: () => toast.error("Failed to add loan"),
  });

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      interest: Number(data.interest),
      maxLimit: Number(data.maxLimit),

       requiredDocuments: data.requiredDocuments
    ? data.requiredDocuments.split(",").map((v) => v.trim())
    : [],

      // EMI: convert "3,6,9" ⇒ [3,6,9]
      emiPlans: data.emiPlans
        ? data.emiPlans.split(",").map((v) => v.trim())
        : [],

      image: data.image,
      showOnHome: data.showOnHome || false,
      createdBy: `Manager - ${user?.displayName || "Unknown"}`,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Loan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500">Title is required</p>}

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}

        <input
          {...register("category")}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            {...register("interest", { required: true })}
            placeholder="Interest (%)"
            type="number"
            className="border p-2 rounded"
          />

          <input
            {...register("maxLimit", { required: true })}
            placeholder="Max Limit"
            type="number"
            className="border p-2 rounded"
          />
        </div>

        <input
          {...register("emiPlans")}
          placeholder="EMI Plans (3 month, 5 month, 7 month)"
          className="w-full border p-2 rounded"
        />

        <textarea
  {...register("requiredDocuments")}
  placeholder="Required Documents (comma separated)"
  className="w-full border p-2 rounded"
  
/>

        <input
          {...register("image")}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("showOnHome")} />
          <span>Show on Home</span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {mutation.isLoading ? "Adding..." : "Add Loan"}
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
