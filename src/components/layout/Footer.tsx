import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'; // Example social icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
  ];

  const quickLinks = [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "FAQ", to: "/faq" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
  ];
  
  const companyLinks = [
    { label: "Careers", to: "/careers" },
    { label: "Press", to: "/press" },
    { label: "Partners", to: "/partners" },
  ];


  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand/Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">TravelCo</h2>
            <p className="text-sm text-gray-400 mb-4">
              Your journey, our passion. Discover amazing destinations with us.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm hover:text-sky-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
           <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm hover:text-sky-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Column 4: Newsletter/Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter for deals and updates.</p>
            <form className="flex">
              <input type="email" placeholder="Enter your email" className="bg-gray-700 text-white border-gray-600 focus:ring-sky-500 focus:border-sky-500 rounded-l-md py-2 px-3 text-sm w-full" />
              <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} TravelCo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;