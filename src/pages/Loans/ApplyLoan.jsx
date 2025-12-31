import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

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
      loanCategory: loan.category,
      userEmail: user.email,
      ...formData,
      appliedAt: new Date(),
    };

    mutation.mutate(applicationData);
  };

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen ">
      <title>Apply Loan</title>

      {/* Page Heading */}
      <div className="mb-10 text-center text-[#1C2B27] dark:text-[#E6F4F1]">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Apply for {loan.title}
        </h1>

        <p className="text-center text-sm mt-4 md:text-base text-[#6B7C75] dark:text-[#A8C5BE] mb-10 max-w-2xl mx-auto">
          Please fill in the form below to apply for this loan. Make sure all
          information is accurate, as it will be reviewed by our verification
          team.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] dark:bg-[#1C1C28] shadow-2xl rounded-3xl p-10 flex flex-col gap-6 transition-colors duration-300"
      >
        {/* Read-only auto fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            value={user.email}
            readOnly
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#11121A] text-[#1C2B27] dark:text-[#E6F4F1] font-medium"
          />
          <input
            type="text"
            value={loan.title}
            readOnly
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#11121A] text-[#1C2B27] dark:text-[#E6F4F1] font-medium"
          />
          <input
            type="text"
            value={loan.interest + "%"}
            readOnly
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#11121A] text-[#1C2B27] dark:text-[#E6F4F1] font-medium"
          />
          <input
            type="text"
            value={loan.category}
            readOnly
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-[#F4F7F5] dark:bg-[#11121A] text-[#1C2B27] dark:text-[#E6F4F1] font-medium"
          />
        </div>

        {/* User input fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[#1C2B27] dark:text-[#E6F4F1]">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A] "
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A] dark:text-[#E6F4F1]"
          />
        </div>

        <input
          type="number"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A]  text-[#1C2B27] dark:text-[#E6F4F1]"
        />

        <input
          type="text"
          name="nationalID"
          placeholder="National ID / Passport Number"
          value={formData.nationalID}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A]  text-[#1C2B27] dark:text-[#E6F4F1]"
        />

        <input
          type="text"
          name="incomeSource"
          placeholder="Income Source"
          value={formData.incomeSource}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A] text-[#1C2B27] dark:text-[#E6F4F1]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="number"
            name="monthlyIncome"
            placeholder="Monthly Income"
            value={formData.monthlyIncome}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A]  text-[#1C2B27] dark:text-[#E6F4F1]"
          />
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A]  text-[#1C2B27] dark:text-[#E6F4F1]"
          />
        </div>

        <input
          type="text"
          name="reason"
          placeholder="Reason for Loan"
          value={formData.reason}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A]  text-[#1C2B27] dark:text-[#E6F4F1]"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A]  text-[#1C2B27] dark:text-[#E6F4F1]"
        />

        <textarea
          name="extraNotes"
          placeholder="Extra Notes"
          value={formData.extraNotes}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B6E04C] dark:bg-[#11121A]  text-[#1C2B27] dark:text-[#E6F4F1] resize-none h-28"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`${
            mutation.isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#387065] hover:bg-[#1F4F45]"
          } text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300 mt-4 shadow-lg hover:shadow-xl`}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default Application;
