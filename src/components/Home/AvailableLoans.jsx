import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";


export default function AvailableLoans() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["homeLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className=" mt-20 text-center pt-4  pb-20 ">
    <span className="loading loading-bars loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load loans.
      </div>
    );

  const homeLoans = loans.filter((loan) => loan.showOnHome).slice(0, 6);

  return (
  <section className="bg-[#F4F7F5] dark:bg-[#11121A] py-20 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#1C2B27] dark:text-[#E6F4F1]">
        Available Loans
      </h2>
      <p className="mt-4 text-[#6B7C75] dark:text-gray-300 text-lg max-w-2xl mx-auto">
        Explore our most popular microloans and find the perfect solution for your needs.
      </p>
    </div>

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {homeLoans.map((loan, i) => (
        <motion.div
          key={loan._id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.15 }}
          className="group relative bg-white dark:bg-[#1C1C28] rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[#6FBF73]/40 transition-all duration-500 flex flex-col overflow-hidden"
          style={{ minHeight: "420px" }}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            {loan.image ? (
              <>
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/60 to-transparent" />
              </>
            ) : (
              <div className="w-full h-full bg-[#6FBF73] dark:bg-[#14532D] flex items-center justify-center text-white font-bold text-xl">
                No Image
              </div>
            )}

            <div className="absolute top-4 left-4 bg-[#B6E04C] text-[#1F4F45] dark:bg-[#6FBF73] dark:text-[#1C2B27] text-sm font-bold px-3 py-1 rounded-full shadow-md">
              Popular
            </div>
          </div>

          {/* Content */}
          <div className="p-7 flex flex-col flex-1">
            <h3 className="text-2xl font-bold text-[#1C2B27] dark:text-[#E6F4F1] min-h-[40px]">
              {loan.title ? loan.title.slice(0, 26) + ".." : "No Title."}
            </h3>

            <p className="text-[#616865] dark:text-gray-300 text-sm leading-relaxed flex-1">
              {loan.description ? loan.description.slice(0, 130) + "..." : "No description available."}
            </p>

            <p className="mt-4 text-[#1C2B27] dark:text-[#E6F4F1] font-semibold">
              Max Limit:{" "}
              <span className="text-[#1F4F45] dark:text-[#B6E04C] font-bold">
                ${loan.maxLimit}
              </span>
            </p>

            <button
              onClick={() => navigate(`/all-loans/${loan._id}`)}
              className="mt-6 w-full py-3 rounded-xl bg-[#1F4F45] dark:bg-gradient-to-r dark:from-[#6FBF73] dark:to-[#B6E04C] text-white dark:text-[#1C2B27] font-semibold text-lg transition-all duration-500 hover:bg-[#B6E04C] dark:hover:from-[#B6E04C] dark:hover:to-[#6FBF73] hover:text-[#1F4F45] shadow-md dark:shadow-lg"
            >
              View Details
            </button>
          </div>

          <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-[#6FBF73]/40 transition-all duration-500 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  </div>
</section>


  );
}
