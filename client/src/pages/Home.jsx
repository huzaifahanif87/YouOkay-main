// pages/Home.jsx
import React from "react"
import Header from "../components/Header"; // Adjust the import path as necessary
import { HeroCarousel } from "../components/Hero-carousel";
import { PlansSection } from "../components/PlansSection";
import ReviewsSection from "../components/ReviewsSection";
import FAQ from "../components/FAQ";


const Home = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <div id="PlansSection">
        <PlansSection />
      </div>
      <div id="FAQs">
        <FAQ />
      </div>
      <ReviewsSection />
    </div>
  )
}

export default Home
