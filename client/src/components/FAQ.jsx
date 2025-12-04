import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is 'You Okay?' and how does it work?",
    answer:
      "'You Okay?' is a gentle digital companion that regularly checks in on you. If you don't respond, we alert your emergency contacts or provide human follow-up, depending on your plan.",
  },
  {
    question: "Is my data and privacy safe?",
    answer:
      "Absolutely. We prioritize privacy above all. Your information is never shared without your consent, and everything is encrypted and securely stored.",
  },
  {
    question: "Who is this service for?",
    answer:
      "Anyone who lives alone or wants an added layer of safety — students, seniors, remote workers, or people with health concerns. It's also peace of mind for their loved ones.",
  },
  {
    question: "Why is the pricing so low?",
    answer:
      "We're not here to make huge profits. Our small fee covers server, support, and development costs. We believe care should be affordable and accessible.",
  },
  {
    question: "Is this a real company?",
    answer:
      "Yes. This is a passion project by HA Softwares. Our goal is simple: make sure no one feels forgotten or alone.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-200 rounded-md p-4 mb-2">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left"
    >
      <span className="text-gray-800 font-medium">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>
    {isOpen && <p className="mt-3 text-sm text-gray-600">{answer}</p>}
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600">
          We’ve answered the most common questions people have. Feel free to reach out if you still have doubts.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            {...faq}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;