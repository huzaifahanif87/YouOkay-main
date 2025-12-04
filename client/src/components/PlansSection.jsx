import React from "react";
import { CheckCircle,ChevronRight } from "lucide-react"; // Importing an icon for features

export function PlansSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Left Side: Text and Introduction */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
            Choose Your Perfect <span className="text-secondary">Connection</span> Plan
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Get the plan for daily support, motivation, and connection. Our regular texting service ensures you stay on track, every single day.
            If life gets busy, we'll gently follow up to keep you engaged.
          </p>
          <ul className="text-left text-gray-700 space-y-3 mb-8 max-w-md mx-auto lg:mx-0">
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0" />
              <span>Daily tailored messages directly to your phone.</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0" />
              <span>Gentle follow-ups if you don't respond.</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0" />
              <span>Seamless, private, and convenient communication.</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0" />
              <span>Friendly service without asking much about privacy.</span>
            </li>
          </ul>
          <a
            href="/services" // Link to a page with all plans
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300"
          >
            Learn More
            <ChevronRight className="ml-2 -mr-1 w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Premium Plan Card */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 max-w-sm w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-secondary mb-2">Premium Plan</h3>
              <p className="text-gray-500">For those who seek consistent, dedicated support.</p>
            </div>
            <div className="flex items-baseline justify-center mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$10</span>
              <span className="text-xl font-medium text-gray-500">/month</span>
            </div>
            <ul className="space-y-4 mb-8 text-gray-700">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span>A text every 6 hours.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span>Up to 2 follow-up texts if no reply.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span>A call to emergency contact in 24 hrs of inactivity.</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span>SMS as the way to contact</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                <span>No internet needed after subscription</span>
              </li>
            </ul>
            <button
              className="w-full py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Get Premium Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}