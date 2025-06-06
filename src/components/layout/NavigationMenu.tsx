import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Menu, X, Search, UserCircle2 } from 'lucide-react'; // Example icons

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-700 hover:bg-sky-100 hover:text-sky-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </Link>
);

const NavigationMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobile menu open:", isMobileMenuOpen);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/search-results", label: "Destinations" },
    { path: "/deals", label: "Deals" },
    { path: "/support", label: "Support" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              {/* Replace with your logo component or SVG */}
              <span className="font-bold text-2xl text-sky-600">TravelCo</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path}>{item.label}</NavLink>
            ))}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
            <Link to="/dashboard">
              <Button variant="outline" className="text-sky-600 border-sky-600 hover:bg-sky-50 hover:text-sky-700">
                <UserCircle2 className="mr-2 h-5 w-5" />
                Account
              </Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 inset-x-0 z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link to="/dashboard" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-sky-600 border-sky-600 hover:bg-sky-50">
                  <UserCircle2 className="mr-2 h-5 w-5" />
                  My Account
                </Button>
              </Link>
            </div>
             <div className="mt-3 px-5">
                <Button variant="ghost" className="w-full justify-start pl-0">
                  <Search className="mr-2 h-5 w-5 text-gray-600" /> Search
                </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;