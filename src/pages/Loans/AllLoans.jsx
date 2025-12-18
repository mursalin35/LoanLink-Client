import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["allLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-20 text-lg font-semibold text-[#1C2B27]">
        Loading Loans...
      </div>
    );

  if (isError) {
    toast.error("Failed to fetch loans. Please try again!");
    return (
      <div className="text-center mt-20 text-red-500">
        Error loading loans!
      </div>
    );
  }

  return (
    <section className="bg-[#F4F7F5] py-10 px-4">
      <title>All Loans</title>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1C2B27]">
            All Loans
          </h2>
          <p className="mt-4 text-[#6B7C75] text-lg max-w-2xl mx-auto">
            Explore all loan options in one place and find the right solution for your needs.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden"
              style={{ minHeight: "420px" }}
            >
              {/* SAME CARD STRUCTURE */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {loan.image ? (
                  <>
                    <img
                      src={loan.image}
                      alt={loan.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-[#6FBF73] flex items-center justify-center text-white font-bold text-xl">
                    No Image
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-[#B6E04C] text-[#1F4F45] text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  Loan
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-[#1C2B27] min-h-[40px]">
                {loan.title
                    ? loan.title.slice(0, 25) + "..."
                    : "No Title"}
                </h3>

                <p className=" text-[#616865] text-sm leading-relaxed flex-1">
                  {loan.description
                    ? loan.description.slice(0, 130) + "..."
                    : "No description available."}
                </p>

             {/* Info */}
                <div className="mt-3 space-y-2 text-sm">
                  <p className="flex justify-between text-[#1C2B27]">
                    <span className="font-medium">Category</span>
                    <span>{loan.category}</span>
                  </p>
                  <p className="flex justify-between text-[#1C2B27]">
                    <span className="font-medium">Interest</span>
                    <span>{loan.interest}%</span>
                  </p>
                  <p className="flex justify-between text-[#1C2B27]">
                    <span className="font-medium">Max Loan</span>
                    <span className="font-bold text-[#1F4F45]">
                      ${loan.maxLimit}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/all-loans/${loan._id}`)}
                  className="mt-6 w-full py-3 rounded-xl bg-[#1F4F45] text-white font-semibold text-lg transition-all duration-500 hover:bg-[#B6E04C] hover:text-[#1F4F45]"
                >
                  View Details
                </button>
              </div>

              <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-[#6FBF73]/40 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllLoans;
