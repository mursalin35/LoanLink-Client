import { motion } from "framer-motion";

const loans = [
  {
    title: "Business Microloan",
    desc: "Quick loans for small business owners to scale operations.",
    maxLimit: "$5,000",
    image: "https://www.business.org/app/uploads/2013/06/15-feat-two-business-men-handshake.jpg",
  },
  {
    title: "Personal Loan",
    desc: "Flexible loans for personal expenses and emergencies.",
    maxLimit: "$2,000",
    image: "https://cdn.vectorstock.com/i/1000v/93/62/loan-application-form-with-man-signing-a-paper-vector-21929362.jpg",
  },
  {
    title: "Education Loan",
    desc: "Support your studies with low-interest education loans.",
    maxLimit: "$10,000",
    image: "https://png.pngtree.com/png-clipart/20231118/original/pngtree-plant-in-coins-loan-photo-png-image_13631785.png",
  },
  {
    title: "Medical Loan",
    desc: "Cover medical expenses without financial stress.",
    maxLimit: "$3,000",
    image: "https://previews.123rf.com/images/pinkomelet/pinkomelet2003/pinkomelet200300033/143041972-close-up-a-loan-application-form-paper-with-pen-home-loan-or-personal-loan-application-concept.jpg",
  },
  {
    title: "Home Renovation Loan",
    desc: "Enhance your home with easy and quick loans.",
    maxLimit: "$8,000",
    image: "https://cdn.corporatefinanceinstitute.com/assets/microfinance-1024x684.jpeg",
  },
  {
    title: "Travel Loan",
    desc: "Plan your dream vacation with flexible repayment options.",
    maxLimit: "$4,000",
    image: "https://www.thebalancemoney.com/thmb/7c34a-0VWUOQz2YLKQ7gV7CTuso%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/businessaskingforfinancing-5352f9887ba44c7ea4a09c7c9b48fd0a.jpg",
  },
];

export default function AvailableLoans() {
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
        {loans.map((loan, i) => (
          <motion.div
            key={i}
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
              <p className="mt-2 text-gray-600">{loan.desc}</p>
              <p className="mt-4 text-gray-800 font-medium">
                Max Limit: <span className="text-primary">{loan.maxLimit}</span>
              </p>
              <button className="mt-6 w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


