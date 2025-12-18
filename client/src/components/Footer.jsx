import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, MessageSquare, Mail, Phone, MapPin } from "lucide-react"; // Droplets icon was not used, removed it from import
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation

const Footer = () => {
  return (
    <footer className="bg-primary text-white max-w-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-8"> {/* Changed max-w-screen to max-w-screen-xl for better content constraint */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"> {/* Increased gap for better spacing */}
          {/* Brand Info */}
          <div className="space-y-4"> {/* Increased space-y for better vertical spacing */}
            <div className="h-16 mx[-20px] flex items-center overflow-hidden">
              <img
                src="/logo.png" // Ensure this path is correct for your logo
                alt="logo"
                className="h-16 max-w-full object-start object-contain"
              />
            </div>

            <p className="text-gray-300 text-sm">
              Your daily companion for motivation, support, and connection. We deliver personalized texts and ensure you stay on track with gentle follow-ups.
            </p>
            <div className="flex space-x-3"> {/* Adjusted space-x */}
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="p-2 rounded-full hover:bg-blue-500 text-gray-300 hover:text-white transition-colors duration-300" // Updated hover to blue-500
                  aria-label={`Link to ${Icon.displayName || Icon.name}`} // Added aria-label for accessibility
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Home", "/"],
                ["How It Works", "/services"],
                ["About Us", "/about-us"],
                ["Contact", "/contact"],
              ].map(([text, href]) => (
                <li key={text}>
                  <Link to={href} className="text-gray-300 hover:text-blue-400 transition-colors duration-300"> {/* Updated hover to blue-400 */}
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Motivational Texts",
                "Productivity Nudges",
                "Wellness Check-ins",
                "Follow-up Support",
              ].map((text) => (
                <li key={text} className="text-gray-300">
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-4 text-sm mb-6">
              <a
                href="tel:+923117337090"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                +92-311-7337090
              </a>
              <a
                href="mailto:contact@hasoftwares.com.pk"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-400" />
                contact@hasoftwares.com.pk
              </a>
              <a
                href="https://maps.google.com/?q=Islamabad,Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                Islamabad, Pakistan
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#334155] mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 You Okay. All rights reserved.</p>
          <div className="flex gap-4">
            <p>Developed and maintained by</p>
            <Link to='https://hasoftwares.com.pk' target="_blank" rel="noopener noreferrer">
              <p className="hover:text-blue-400 transition-colors duration-300">HA SOFTWARES</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
