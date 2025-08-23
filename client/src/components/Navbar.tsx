import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const { state } = useApp();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/poojas", label: "Poojas" },
    { href: "/kits", label: "Kits" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-saffron-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="logo">
            <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-saffron-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 8.89 10L12 27l1.11-.259C18.16 26.73 22 22.55 22 17V7L12 2zm0 2.236L20 7.618v9.382c0 4.152-2.88 7.531-7 8.236V4.236z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-gradient-saffron">PoojaPath</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  location === link.href
                    ? "text-saffron-600"
                    : "text-gray-700 hover:text-saffron-600"
                }`}
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Cart */}
            <Link href="/cart" className="relative" data-testid="cart-link">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-saffron-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Login/Dashboard */}
            {state.user ? (
              <Link href="/dashboard" data-testid="dashboard-link">
                <Button className="bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login" data-testid="login-link">
                <Button className="bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-saffron-100" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                href="/cart"
                className="block px-3 py-2 text-gray-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="mobile-cart-link"
              >
                Cart ({cartItemCount})
              </Link>

              {state.user ? (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 bg-gradient-saffron text-white rounded-md hover:from-saffron-600 hover:to-saffron-700 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-dashboard-link"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 bg-gradient-saffron text-white rounded-md hover:from-saffron-600 hover:to-saffron-700 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-login-link"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
