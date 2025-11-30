import React, { useState } from "react";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { contactService } from "../services/contactService";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSent(false);

    try {
      await contactService.sendMessage({ name, email, message });
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white pt-24 pb-32 px-4 md:px-10 min-h-screen">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto mb-20">
        <MessageCircle className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Let’s Connect</h1>
        <p className="text-lg text-gray-600">
          Whether you need help, want to share feedback, or just say hi — we're here and listening.
        </p>
      </section>

      {/* Contact Options */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        {/* Email Form */}
        <div className="bg-white border border-gray-200 shadow-xl p-8 rounded-2xl transition hover:shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Email Us
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jane Doe"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send Message"}
            </button>

            {sent && <p className="text-green-600 mt-3 text-sm">✅ Message sent successfully!</p>}
            {error && <p className="text-red-600 mt-3 text-sm">⚠️ {error}</p>}
          </form>
        </div>

        {/* WhatsApp */}
        <div className="bg-white border border-green-200 shadow-xl p-8 rounded-2xl transition h-65 hover:shadow-2xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            Chat on WhatsApp
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Prefer real-time messaging? Reach out to us on WhatsApp during working hours and we’ll respond as quickly as we can.
          </p>
          <a
            href="https://wa.me/923001234567" // Replace with your number
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            <Phone className="w-5 h-5" />
            Message on WhatsApp
          </a>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-3xl mx-auto text-center mt-20 text-gray-500 text-sm">
        <p>
          We’re a small, independent project run by <strong>HA Softwares</strong>. Every message makes a difference. 💙
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
