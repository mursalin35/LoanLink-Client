import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";


export default function AvailableLoans() {
  const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();

  // Fetch loans from backend
  const { data: loans = [], isLoading, isError } = useQuery({
    queryKey: ["homeLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading loans...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load loans.
      </div>
    );
  }

  // Filter showOnHome = true & limit 6
  const homeLoans = loans.filter((loan) => loan.showOnHome).slice(0, 6);

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Available Loans
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our most popular microloans and find the perfect solution for your needs.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {homeLoans.map((loan, i) => (
          <motion.div
            key={loan._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={loan.image}
                alt={loan.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{loan.title}</h3>

              <p className="mt-2 text-gray-600">
                {loan.description?.slice(0, 80)}...
              </p>

              <p className="mt-4 text-gray-800 font-medium">
                Max Limit: 
                <span className="text-primary font-bold"> {loan.maxLimit}</span>
              </p>

              <button 
               onClick={() => navigate(`/all-loans/${loan._id}`)}
              className="mt-6 w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
