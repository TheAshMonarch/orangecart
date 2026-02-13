"use client";
import SignUpFlow from "@/components/signup/signup-flow";
import SignInFlow from "@/components/signin/signin-flow";
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const OrangeCartHomepage = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Color themes that work well with orange and white
  const themes = [
    {
      bg: 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700',
      text: 'text-white',
      inputBg: 'bg-white/10 backdrop-blur-sm',
      inputText: 'text-white placeholder-white/70',
      button: 'bg-white text-orange-600 hover:bg-orange-50'
    },
    {
      bg: 'bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200',
      text: 'text-gray-800',
      inputBg: 'bg-white/80 backdrop-blur-sm',
      inputText: 'text-gray-800 placeholder-gray-500',
      button: 'bg-orange-500 text-white hover:bg-orange-600'
    },
    {
      bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50',
      text: 'text-gray-800',
      inputBg: 'bg-white/60 backdrop-blur-sm',
      inputText: 'text-gray-800 placeholder-gray-500',
      button: 'bg-orange-500 text-white hover:bg-orange-600'
    },
    {
      bg: 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
      text: 'text-white',
      inputBg: 'bg-white/10 backdrop-blur-sm',
      inputText: 'text-white placeholder-white/60',
      button: 'bg-orange-500 text-white hover:bg-orange-600'
    }
  ];

  // Auto-switch themes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-1000 ease-in-out`}>
      {/* Navigation */}
      
 <nav className="px-4 py-4 md:px-6">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Logo */}
    <div className={`text-2xl font-bold ${theme.text} flex items-center gap-2`}>
      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
        🐱
      </div>
      orangecart
    </div>

    {/* Desktop links */}
    <div className={`hidden md:flex items-center gap-8 ${theme.text}`}>
      <Link href="#" className="hover:opacity-80 transition">Categories</Link>
      <Link href="/deals" className="hover:opacity-80 transition">Deals</Link>
      <Link href="/about" className="hover:opacity-80 transition">About</Link>
      <Link href="/contact" className="hover:opacity-80 transition">Contact</Link>
    </div>

    {/* Auth buttons - hide join on very small screens if needed */}
    <div className="flex items-center gap-3 md:gap-4">
      <button onClick={() => setShowSign(true)} className={`${theme.text} hover:opacity-80 transition text-sm md:text-base`}>
        Sign in
      </button>
      <button onClick={() => setShowAuth(true)} className={`px-4 py-2 md:px-6 md:py-2 rounded-lg ${theme.button} transition font-medium text-sm md:text-base`}>
        Join
      </button>

      {/* Hamburger */}
      <button 
        className="md:hidden text-2xl" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu size={28} />
      </button>
    </div>
  </div>

  {/* Mobile menu dropdown */}
  {isMobileMenuOpen && (
    <div className="md:hidden mt-4 px-4 py-6 bg-white/10 backdrop-blur-md rounded-xl">
      <div className="flex flex-col gap-5 text-center">
        <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
        <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)}>Deals</Link>
        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
      </div>
    </div>
  )}
</nav>

    {showSign && <SignInFlow onClose={() => setShowSign(false)} setShowAuth={setShowAuth} setShowSign={setShowSign}  />}
    {showAuth && <SignUpFlow onClose={() => setShowAuth(false)} setShowAuth={setShowAuth} setShowSign={setShowSign}/>}
      {/* Hero Section */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
  <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-10 md:gap-12">
    {/* Left - Content (full width on mobile) */}
    <div className="space-y-6 md:space-y-8 w-full">
      <div className="space-y-3 md:space-y-4">
        <p className={`text-xs sm:text-sm uppercase tracking-wider ${theme.text} opacity-80`}>
          Ecommerce Platform
        </p>
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${theme.text} leading-tight text-center md:text-left`}>
          Shop everything
          <br className="hidden sm:block" />
          in one place
        </h1>
      </div>

            {/* Search Input */}
           <div className="space-y-4 max-w-md mx-auto md:mx-0">
        <div className={`flex items-center gap-3 ${theme.inputBg} rounded-xl px-5 py-3 sm:py-4 border border-white/20`}>
          <Search className={theme.text} size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            className={`flex-1 bg-transparent ${theme.inputText} outline-none text-base`}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className={`flex-1 px-6 py-3 sm:py-4 rounded-xl ${theme.button} transition font-medium text-base sm:text-lg shadow-lg`}>
            Start Shopping
          </button>
          <button className={`flex-1 px-6 py-3 sm:py-4 rounded-xl ${theme.inputBg} ${theme.text} transition font-medium text-base sm:text-lg border border-white/20 hover:bg-white/20`}>
            Browse Categories
          </button>
        </div>
      </div>

            {/* Rating */}
            <div className={`flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 ${theme.text}`}>
        {/* rating stars */}
        <div className="flex items-center gap-1">
          {[1,2,3,4].map(i => <span key={i} className="text-orange-400 text-xl">★</span>)}
          <span className="text-orange-400 text-xl opacity-40">★</span>
        </div>
        <span className="text-xl font-bold">4.8/5</span>
        <span className="opacity-70 text-sm sm:text-base">from 12,456 reviews</span>
      </div>

      <div className={`${theme.text} opacity-80 text-center md:text-left`}>
        <a href="#" className="hover:opacity-100 transition inline-flex items-center gap-2 text-sm sm:text-base">
          Check out our customer stories →
        </a>
      </div>
    </div>

          {/* Right - Product Showcase */}
          <div className="relative min-h-[400px] sm:min-h-[500px] md:h-[600px] w-full md:block hidden lg:block">
            {/* Floating Product Images */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Phone */}
              <div 
                className="absolute top-8 right-12 w-48 h-80 bg-white rounded-3xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '0s'
                }}
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="flex-1 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl flex items-center justify-center">
                    <ShoppingBag size={48} className="text-white" />
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Business Card */}
              <div 
                className="absolute top-20 left-8 w-64 h-40 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 p-6"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              >
                <div className="text-white">
                  <div className="w-12 h-12 bg-white rounded-full mb-3 flex items-center justify-center text-2xl">
                    🐱
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-white/80 rounded w-32"></div>
                    <div className="h-2 bg-white/60 rounded w-24"></div>
                    <div className="h-2 bg-white/40 rounded w-20"></div>
                  </div>
                </div>
              </div>

              {/* Product Box */}
              <div 
                className="absolute bottom-24 right-20 w-52 h-52 bg-white rounded-2xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500 overflow-hidden"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '2s'
                }}
              >
                <div className="h-3/5 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center p-6">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>

              {/* Coffee Cup */}
              <div 
                className="absolute bottom-12 left-16 w-40 h-48 transform -rotate-12 hover:-rotate-6 transition-transform duration-500"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '3s'
                }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-rose-100 to-rose-200 rounded-3xl shadow-2xl">
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <div className="text-3xl">☕</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-300 rounded-t-full"></div>
                </div>
              </div>

              {/* Keychain */}
              <div 
                className="absolute top-1/2 left-1/4 w-20 transform -rotate-45 hover:-rotate-30 transition-transform duration-500"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '4s'
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-xl"></div>
                <div className="w-1 h-8 bg-gray-400 mx-auto"></div>
                <div className="w-8 h-8 border-4 border-gray-400 rounded-full mx-auto"></div>
              </div>

              {/* Sticker/Badge */}
              <div 
                className="absolute top-1/3 right-8 w-32 h-32 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 flex items-center justify-center"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '5s'
                }}
              >
                <div className="text-white text-center">
                  <div className="text-3xl mb-1">🎯</div>
                  <div className="text-xs font-bold">BEST<br/>SELLER</div>
                </div>
              </div>
            </div>

            {/* Designer Credit */}
            <div className="absolute bottom-0 right-0">
              <p className={`text-sm ${theme.text} opacity-60 flex items-center gap-2`}>
                Designed by
                <span className="flex items-center gap-1">
                  <span className="w-5 h-5 bg-orange-500 rounded-full"></span>
                  <span className="font-medium">orangecart team</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
                

      {/* Scroll Indicator */}
      <div className="flex justify-center pb-8">
        <button className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ${theme.text} hover:bg-white/30 transition`}>
          <ChevronDown size={20} />
        </button>
      </div>

       {/* REVIEWS SECTION */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Loved by customers worldwide</h2>
            <p className="text-gray-600">See what our community has to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                avatar: "👩‍💼",
                rating: 5,
                text: "OrangeCart has transformed how I run my online store. The platform is intuitive and my sales have tripled since joining!",
              },
              {
                name: "Michael Chen",
                role: "Regular Shopper",
                avatar: "👨‍💻",
                rating: 5,
                text: "I love the variety of unique products I can find here. Shopping has never been easier or more enjoyable!",
              },
              {
                name: "Emma Davis",
                role: "Artisan Seller",
                avatar: "👩‍🎨",
                rating: 5,
                text: "As a creator, OrangeCart gives me the perfect platform to reach customers who truly appreciate handmade goods.",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-orange-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID SECTION */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-3">Trending products</h2>
              <p className="text-gray-600">Discover what's popular right now</p>
            </div>
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Wireless Headphones", price: "$89.99", image: "🎧", category: "Electronics" },
              { name: "Handmade Pottery Set", price: "$45.00", image: "🏺", category: "Home & Garden" },
              { name: "Vintage Camera", price: "$129.99", image: "📷", category: "Photography" },
              { name: "Organic Skincare Kit", price: "$34.99", image: "🧴", category: "Beauty" },
              { name: "Designer Tote Bag", price: "$59.99", image: "👜", category: "Fashion" },
              { name: "Gourmet Coffee Beans", price: "$24.99", image: "☕", category: "Food & Drink" },
              { name: "Yoga Mat Bundle", price: "$39.99", image: "🧘", category: "Sports" },
              { name: "Succulent Plant Set", price: "$19.99", image: "🌵", category: "Plants" },
            ].map((product, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  {product.image}
                </div>
                <div className="p-4">
                  <p className="text-xs text-orange-600 font-semibold mb-1">{product.category}</p>
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    <button className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition opacity-0 group-hover:opacity-100">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIES/FEATURES SECTION */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Explore by category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Electronics", icon: "💻", color: "from-blue-400 to-blue-600" },
              { name: "Fashion", icon: "👗", color: "from-pink-400 to-pink-600" },
              { name: "Home & Garden", icon: "🏡", color: "from-green-400 to-green-600" },
              { name: "Beauty", icon: "💄", color: "from-purple-400 to-purple-600" },
              { name: "Sports", icon: "⚽", color: "from-orange-400 to-orange-600" },
              { name: "Toys & Games", icon: "🎮", color: "from-red-400 to-red-600" },
              { name: "Books", icon: "📚", color: "from-amber-400 to-amber-600" },
              { name: "Food & Drink", icon: "🍕", color: "from-yellow-400 to-yellow-600" },
              { name: "Pets", icon: "🐾", color: "from-teal-400 to-teal-600" },
              { name: "Art & Crafts", icon: "🎨", color: "from-indigo-400 to-indigo-600" },
              { name: "Automotive", icon: "🚗", color: "from-gray-400 to-gray-600" },
              { name: "Music", icon: "🎵", color: "from-rose-400 to-rose-600" },
            ].map((category, i) => (
              <button
                key={i}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {category.icon}
                </div>
                <p className="text-sm font-semibold text-gray-800">{category.name}</p>
              </button>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "On orders over $50 worldwide",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "100% secure transactions",
              },
              {
                icon: "💬",
                title: "24/7 Support",
                desc: "Dedicated customer service",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg">
                  🐱
                </div>
                <span className="text-2xl font-bold">orangecart</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your one-stop marketplace for everything you need. Connect with sellers and buyers from around the world.
              </p>
              <div className="flex gap-4">
                {["📘", "🐦", "📷", "💼"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition text-lg"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-3">
                {["All Products", "Trending", "New Arrivals", "Sale", "Gift Cards"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Press", "Blog", "Partnerships"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {["Help Center", "Contact Us", "Shipping Info", "Returns", "Track Order"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md">
              <h3 className="font-bold text-lg mb-3">Stay updated</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for exclusive deals and updates</p>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition"
                />
                <button className="px-6 py-3 bg-orange-500 b text-white rounded-lg font-medium hover:bg-orange-600 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 OrangeCart. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animation for floating effect */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotate-start, 0deg));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotate-mid, 0deg));
          }
        }
      `}</style>
    </div>
  );
};

export default OrangeCartHomepage;
