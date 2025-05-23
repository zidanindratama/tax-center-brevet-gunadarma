import FAQ from "@/components/(main)/faq";
import FeaturedCoursesCarousel from "@/components/(main)/featured-courses";
import FeaturedPrograms from "@/components/(main)/featured-programs";
import Footer from "@/components/(main)/footer";
import Hero from "@/components/(main)/hero";
import Navbar from "@/components/(main)/navbar";
import Pricing from "@/components/(main)/priccing";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedPrograms />
      <FeaturedCoursesCarousel />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
