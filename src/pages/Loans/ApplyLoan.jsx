import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Application = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!user) {
    navigate("/login");
    return null;
  }

  if (user.role === "admin" || user.role === "manager") {
    toast.error("Only users can apply for loans");
    navigate("/");
    return null;
  }

  // Fetch loan info
  const { data: loan, isLoading } = useQuery({
    queryKey: ["loanDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/loans/${id}`);
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nationalID: "",
    incomeSource: "",
    monthlyIncome: "",
    loanAmount: "",
    reason: "",
    address: "",
    extraNotes: "",
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/applications", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Loan application submitted!");
      queryClient.invalidateQueries(["myLoans"]);
      navigate("/dashboard/my-loans");
    },
    onError: () => {
      toast.error("Failed to submit application");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = {
      loanId: id,
      loanTitle: loan.title,
      interestRate: loan.interest,
      userEmail: user.email,
      ...formData,
      appliedAt: new Date(),
    };

    mutation.mutate(applicationData);
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <title>Apply loan</title>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Apply for {loan.title}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 flex flex-col gap-4"
      >
        {/* Read-only auto fields */}
        <input
          type="email"
          value={user.email}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          value={loan.title}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          value={loan.interest + "%"}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />

        {/* User input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="nationalID"
          placeholder="National ID / Passport Number"
          value={formData.nationalID}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="incomeSource"
          placeholder="Income Source"
          value={formData.incomeSource}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="monthlyIncome"
          placeholder="Monthly Income"
          value={formData.monthlyIncome}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="loanAmount"
          placeholder="Loan Amount"
          value={formData.loanAmount}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="reason"
          placeholder="Reason for Loan"
          value={formData.reason}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <textarea
          name="extraNotes"
          placeholder="Extra Notes"
          value={formData.extraNotes}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`${
            mutation.isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white py-3 rounded transition-all duration-300 mt-4`}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default Application;
