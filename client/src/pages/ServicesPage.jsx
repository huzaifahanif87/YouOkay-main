
import React from "react";
import {
  Heart,
  Shield,
  MessageCircle,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { RevealOnScroll } from "../components/RevealOnScroll";

const ServicesInline = () => {
  return (
    <div className="bg-white pt-10 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-blue-100 py-24 px-6 text-center">
        <RevealOnScroll>
        <div className="max-w-screen-xl mx-auto animate-fadeInUp">
          <Heart className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            You're Not Alone, Friend
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We know life can feel overwhelming sometimes. That's why we created "You Okay?" — a gentle digital companion that checks in on you, because everyone deserves to know someone cares.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-gray-100 border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md">
              <Shield className="w-4 h-4" /> Privacy First
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-gray-100 border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md">
              <Heart className="w-4 h-4" /> Human Centered
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-gray-100 border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md">
              <MessageCircle className="w-4 h-4" /> Always Available
            </span>
          </div>
        </div>
        </RevealOnScroll>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <RevealOnScroll>
        <div className="max-w-screen-xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            We Understand Your Story
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Millions of amazing people live alone — seniors, students, remote workers, or folks managing health challenges. In critical moments, there's often no one around to notice quickly.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[{
            icon: <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
            title: "Living Independently",
            text: "Whether you're a senior enjoying your independence, a student far from family, or simply someone who values their space."
          }, {
            icon: <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
            title: "Critical Moments",
            text: "Falls, health episodes, or emotional crises can happen to anyone. Quick response makes all the difference."
          }, {
            icon: <Heart className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
            title: "Peace of Mind",
            text: "Your loved ones worry about you too. Our service gives everyone the comfort of knowing help is always nearby."
          }].map(({ icon, title, text }, i) => (
            <div
              key={i}
              className="bg-white text-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {icon}
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
        </RevealOnScroll>
      </section>

      {/* Footer CTA */}
      <section className="bg-blue-500 text-white py-16 px-6  text-center">
        <RevealOnScroll>
        
        <div className="max-w-screen flex flex-col md:flex-row mx-auto items-center">
        <div className="">
          <Heart className="w-12 h-12 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Know Someone Cares?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join our caring community today. Because everyone deserves to feel safe and supported.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <a href="/user/subscription" className="bg-white text-blue-500 font-semibold text-sm px-6 py-3 rounded-md">
              Get Started Now
            </a>
            <a href="/about-us" className="border border-white text-white font-semibold text-sm px-6 py-3 rounded-md">
              Learn More
            </a>
          </div>
          </div>

          {/* Buy Premium Card */}
          <div className="bg-white  text-left text-gray-700 max-w-md mx-auto rounded-xl shadow-lg border border-blue-200 p-8">
            <div className="flex  justify-center mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-blue-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">Premium Care</h3>
            <p className="text-center text-sm mb-2">Complete peace of mind for you and your loved ones</p>
            <div className="text-center text-4xl font-bold text-blue-500 mb-2">$10 <span className="text-base font-normal text-gray-500">/month</span></div>
            <ul className="space-y-3 mb-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                Regular check-ins every 6 hours
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                Emergency contact alerts (SMS)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                Human follow-up calls 24 hours afer Inactivity
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                Web, mobile & SMS support
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                Complete privacy protection
              </li>
            </ul>
            <a href="/user/subscription" className="w-full bg-blue-500 text-white py-3 rounded-md font-medium flex items-center justify-center gap-2">
              Start Caring Today <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-center text-gray-500 mt-4">
              Join thousands who sleep better knowing someone cares
            </p>
          </div>
        </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default ServicesInline;