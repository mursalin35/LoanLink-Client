import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const AddLoan = () => {
  const { user } = useAuth();
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
      // image upload
      const loanImage = data.image[0];
      const formData = new FormData();
      formData.append("image", loanImage);

      const loanImageAPI = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(loanImageAPI, formData);
      const imageUrl = imgRes.data.data.url;

      
      const payload = {
        title: data.title,
        description: data.description,
        category: data.category,
        interest: Number(data.interest),
        maxLimit: Number(data.maxLimit),

        requiredDocuments: data.requiredDocuments
          ? data.requiredDocuments.split(",").map((v) => v.trim())
          : [],

        emiPlans: data.emiPlans
          ? data.emiPlans.split(",").map((v) => v.trim())
          : [],

        image: imageUrl, // url jabe

        showOnHome: data.showOnHome || false,
        createdBy: `Manager - ${user?.displayName || "Unknown"}`,
      };

      // db te data pathano
      mutation.mutate(payload);
    } catch (error) {
      console.error(error);
      toast.error("Image upload or loan add failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-[#162B25] rounded-3xl shadow-xl border border-[#E2E8E6] dark:border-[#1F3D36]">
      <title>Add Loan</title>

      <h2 className="text-3xl font-extrabold mb-6 text-[#1C2B27] dark:text-[#E6F4F1]">
        Add Loan
      </h2>

      <form onSubmit={handleSubmit(handleFormAddLoan)} className="space-y-4">
        {/* Title */}
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full border border-gray-300 dark:border-[#2A4B3D] p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#1F3D36] text-[#1C2B27] dark:text-[#E6F4F1] placeholder-gray-400 dark:placeholder-[#9FB7AF]"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">Title is required</p>
        )}

        {/* Description */}
        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          rows={4}
          className="w-full border border-gray-300 dark:border-[#2A4B3D] p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#1F3D36] text-[#1C2B27] dark:text-[#E6F4F1] placeholder-gray-400 dark:placeholder-[#9FB7AF]"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}

        {/* Category */}
        <input
          {...register("category")}
          placeholder="Category"
          className="w-full border border-gray-300 dark:border-[#2A4B3D] p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#1F3D36] text-[#1C2B27] dark:text-[#E6F4F1] placeholder-gray-400 dark:placeholder-[#9FB7AF]"
        />

        {/* Interest & Max Limit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("interest", { required: true })}
            placeholder="Interest (%)"
            type="number"
            className="border border-gray-300 dark:border-[#2A4B3D] p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#1F3D36] text-[#1C2B27] dark:text-[#E6F4F1] placeholder-gray-400 dark:placeholder-[#9FB7AF]"
          />
          <input
            {...register("maxLimit", { required: true })}
            placeholder="Max Limit"
            type="number"
            className="border border-gray-300 dark:border-[#2A4B3D] p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#1F3D36] text-[#1C2B27] dark:text-[#E6F4F1] placeholder-gray-400 dark:placeholder-[#9FB7AF]"
          />
        </div>

        {/* EMI Plans */}
        <input
          {...register("emiPlans")}
          placeholder="EMI Plans (3 month, 5 month, 7 month)"
          className="w-full border border-gray-300 dark:border-[#2A4B3D] p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#1F3D36] text-[#1C2B27] dark:text-[#E6F4F1] placeholder-gray-400 dark:placeholder-[#9FB7AF]"
        />

        {/* Required Documents */}
        <textarea
          {...register("requiredDocuments")}
          placeholder="Required Documents (comma separated)"
          rows={3}
          className="w-full border border-gray-300 dark:border-[#2A4B3D] p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#1F3D36] text-[#1C2B27] dark:text-[#E6F4F1] placeholder-gray-400 dark:placeholder-[#9FB7AF]"
        />

        {/* Image Upload */}
      <input
  type="file"
  {...register("image", { required: true })}
  className="file-input file-input-bordered w-full 
    border-gray-300 dark:border-[#2A4B3D] 
    bg-[#f4f7f7] dark:bg-[#1F3D36] 
    file:bg-[#0b8974] file:text-white
    text-[#1C2B27] dark:text-[#E6F4F1]"
/>

        {errors.image && (
          <p className="text-red-500 text-sm">Photo is required</p>
        )}

        {/* Show on Home */}
        <label className="flex items-center gap-2 text-[#1C2B27] dark:text-[#E6F4F1]">
          <input
            type="checkbox"
            {...register("showOnHome")}
            className="accent-[#1F4F45] "
          />
          <span>Show on Home</span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#1F4F45] to-[#2F6F62] hover:from-[#163C35] hover:to-[#255B52] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
        >
          {mutation.isLoading ? "Adding..." : "Add Loan"}
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
