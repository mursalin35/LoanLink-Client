import React from "react";
import Hero from "../../components/Home/Hero";
import AvailableLoans from "../../components/Home/AvailableLoans";
import HowItWorks from "../../components/Home/HowItWorks";
import CustomerFeedback from "../../components/Home/CustomerFeedback";
import TrustBar from "../../components/Home/TrustBar";
import FAQ from "../../components/Home/FAQ";

const Home = () => {
  return (
    <div>
      <Hero />
      <AvailableLoans />
      <HowItWorks />
      <CustomerFeedback />
      <TrustBar />
      <FAQ />
    </div>
  );
};

export default Home;
