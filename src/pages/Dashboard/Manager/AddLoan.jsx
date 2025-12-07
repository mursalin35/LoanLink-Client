import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddLoan = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    interest: "",
    maxLimit: "",
    emiPlans: "",
    image: "",
    showOnHome: false,
  });

  const mutation = useMutation({
    mutationFn: async (loanData) => {
      const res = await axiosSecure.post("/loans", loanData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Loan added successfully!");
      queryClient.invalidateQueries(["loans"]);
      setForm({
        title: "",
        description: "",
        category: "",
        interest: "",
        maxLimit: "",
        emiPlans: "",
        image: "",
        showOnHome: false,
      });
    },
    onError: () => toast.error("Failed to add loan"),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      interest: Number(form.interest),
      maxLimit: Number(form.maxLimit),
      emiPlans: form.emiPlans
        ? form.emiPlans.split(",").map((v) => Number(v.trim()))
        : [],
      image: form.image,
      showOnHome: form.showOnHome,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Loan</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="interest"
            value={form.interest}
            onChange={handleChange}
            placeholder="Interest (%)"
            type="number"
            className="border p-2 rounded"
            required
          />
          <input
            name="maxLimit"
            value={form.maxLimit}
            onChange={handleChange}
            placeholder="Max Limit"
            type="number"
            className="border p-2 rounded"
            required
          />
        </div>

        <input
          name="emiPlans"
          value={form.emiPlans}
          onChange={handleChange}
          placeholder="EMI Plans (3,6,9,12)"
          className="w-full border p-2 rounded"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showOnHome"
            checked={form.showOnHome}
            onChange={handleChange}
          />
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
