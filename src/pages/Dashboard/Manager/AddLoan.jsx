import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

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

  const handleFormAddLoan = async (data) => {
  try {
    // 1️⃣ image upload
    const loanImage = data.image[0];
    const formData = new FormData();
    formData.append("image", loanImage);

    const loanImageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    const imgRes = await axios.post(loanImageAPI, formData);
    const imageUrl = imgRes.data.data.url;

    // 2️⃣ payload তৈরি
    const payload = {
      title: data.title,
      description: data.description,
      category: data.category,
      interest: Number(data.interest),
      maxLimit: Number(data.maxLimit),

      requiredDocuments: data.requiredDocuments
        ? data.requiredDocuments.split(",").map(v => v.trim())
        : [],

      emiPlans: data.emiPlans
        ? data.emiPlans.split(",").map(v => v.trim())
        : [],

      image: imageUrl, // ✅ এখানে URL যাবে

      showOnHome: data.showOnHome || false,
      createdBy: `Manager - ${user?.displayName || "Unknown"}`,
    };

    // 3️⃣ DB তে পাঠানো
    mutation.mutate(payload);

  } catch (error) {
    console.error(error);
    toast.error("Image upload or loan add failed");
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Loan</h2>

      <form onSubmit={handleSubmit(handleFormAddLoan)} className="space-y-3">

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
{/* Image upload  */}
        <input
        type="file"
          {...register("image", { required: true })}
          placeholder="Image Upload"
          className="file-input w-full border p-2 rounded"
        />
          {errors.image && <p className="text-red-500">Photo is required</p>}
        

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
