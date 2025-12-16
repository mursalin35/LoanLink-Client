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
      <div className="text-center mt-10 text-[#1C2B27] font-semibold">
        Loading loans...
      </div>
    );
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Failed to load loans.
      </div>
    );

  const homeLoans = loans.filter((loan) => loan.showOnHome).slice(0, 6);

  return (
    <section className="py-24 px-6 bg-[#F4F7F5]">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1C2B27]">
          Available Loans
        </h2>
        <p className="mt-4 text-[#6B7C75] text-lg max-w-2xl mx-auto">
          Explore our most popular microloans and find the perfect solution for your needs.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {homeLoans.map((loan, i) => (
          <motion.div
            key={loan._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            className="relative rounded-3xl shadow-xl overflow-hidden  transform transition-all hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.05] bg-white/60 backdrop-blur-md flex flex-col"
            style={{ minHeight: "400px" }} // All cards same height
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden rounded-t-3xl relative flex-shrink-0">
              {loan.image ? (
                <>
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full bg-[#6FBF73] flex items-center justify-center text-white text-xl font-bold">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-[#1C2B27] min-h-[40px]">
                {loan.title ? loan.title.slice(0, 27) + ".." : "No Title"}
              </h3>
              <p className="mt-2 text-[#6B7C75] text-sm sm:text-base flex-1">
                {loan.description
                  ? loan.description.slice(0, 120) + "..."
                  : "No description available."}
              </p>

              <p className="mt-4 text-[#1C2B27] font-semibold">
                Max Limit:{" "}
                <span className="text-[#1F4F45] font-bold">
                  {loan.maxLimit || "N/A"}
                </span>
              </p>

              <motion.button
                onClick={() => navigate(`/all-loans/${loan._id}`)}
                whileHover={{
                  scale: 1.01,
                  background:
                    "linear-gradient(90deg, #B6E04C, #6FBF73)",
                  color: "#1F4F45",
                }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full py-3 bg-[#1F4F45] text-white rounded-xl font-semibold text-lg shadow-md transition-all"
              >
                View Details
              </motion.button>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              className="absolute top-4 left-4 bg-[#B6E04C] text-[#1F4F45] font-bold px-3 py-1 rounded-full text-sm shadow-md"
            >
              Popular
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
