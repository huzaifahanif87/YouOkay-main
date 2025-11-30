// AboutUsPage.jsx

import React from "react";
import {
  Heart,
  Users,
  Shield,
  MessageCircle,
} from "lucide-react";
import FAQ from "../components/FAQ";
import { RevealOnScroll } from "../components/RevealOnScroll";

const AboutUsPage = () => {
  return (
    <div className="bg-white pt-10 min-h-screen">
      {/* Hero Section */}
      <RevealOnScroll>
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-blue-100 py-24 px-6 text-center">
        <div className="max-w-screen-xl mx-auto animate-fadeInUp">
          <Heart className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            A Friend Who Checks In
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            You know that moment when a friend or loved one looks at you and says — "Hey, are you okay?" That small sentence can mean the world. But life changes, people get busy, and sometimes, no one's around to ask. That's why we built You Okay?
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-sky-500/50 border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md">
              <Shield className="w-4 h-4" /> Privacy First
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-sky-500/50 border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md">
              <Heart className="w-4 h-4" /> Human-Centered
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium bg-sky-500/50 border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md">
              <MessageCircle className="w-4 h-4" /> Real-Time Check-Ins
            </span>
          </div>
        </div>
      </section>
      </RevealOnScroll>
      <RevealOnScroll>
      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-screen-md mx-auto shadow py-4 px-10 rounded-xl border border-gray-100 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our Purpose
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            You Okay? was born out of empathy. We saw how social media started as a place for connection, but gradually became a stream of distractions. People felt more isolated than ever. Even when surrounded by friends online, true connection was missing.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            So we built something different. A space that feels like a friend. A project by HA Softwares — not for profits or data, but to keep alive that basic human need: to feel seen, heard, and cared for.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            This is just the beginning. As we grow and as you put your trust in us, we'll keep improving, keep evolving. Because no one deserves to feel alone. And together, we can build something that makes sure of that.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            We're working hard to add new features — smarter check-ins, deeper emotional support options, and better ways to connect with your trusted circle. But this only works with your help. If the start goes well and people find meaning here, we'll make sure You Okay? becomes even more powerful and helpful for everyone.
          </p>
          <p className="text-lg text-gray-600">
            In a world that often feels too fast, too noisy, and too distant — we’re here to slow it down, to listen, and to remind you that you matter.
          </p>
        </div>
      </section>
      </RevealOnScroll>

      <RevealOnScroll>

      {/* Pricing Philosophy */}
      <section className="py-16 px-6 bg-white ">
        <div className="max-w-screen-md mx-auto shadow py-4 px-10 rounded-xl border border-gray-100 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Why We Charge</h3>
          <p className="text-md text-gray-600 mb-2">
            We don’t believe in putting care behind a paywall. Our prices are minimal — just enough to cover basic infrastructure and keep this companion alive. Because no one should lose a friend due to cost.
          </p>
          <p className="text-md text-gray-600 mb-2">
            Every dollar helps us continue building, testing, and listening. It helps us hire people who care, improve features that matter, and keep data safe.
          </p>
          <p className="text-md text-gray-600">
            Your support helps us grow this platform with new features that make caring and being cared for even easier and more reliable.
          </p>
        </div>
      </section>
      </RevealOnScroll>

      {/* FAQ Section */}
      <section className="">
      <RevealOnScroll>
        <FAQ />
      </RevealOnScroll>
      </section>
    </div>
  );
};

export default AboutUsPage;
