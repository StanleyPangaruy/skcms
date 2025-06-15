// import React from 'react';

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 w-full">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
    </div>
    
    {/* Geometric Patterns */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>
    
    {/* Floating Elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-lime-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-1/3 right-16 w-3 h-3 bg-emerald-300 rounded-full animate-bounce opacity-60 animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-green-300 rounded-full animate-bounce opacity-60 animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-teal-300 rounded-full animate-bounce opacity-60 animation-delay-3000"></div>
    </div>
    
    {/* Glass Card Container */}
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <div className="backdrop-blur-md bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-700">
        
        {/* Main Logo/Badge */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-lime-400 to-green-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <span className="text-2xl font-bold text-white">SK</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-emerald-200 mb-6 leading-tight">
          <span className="block text-3xl md:text-4xl font-semibold mb-2 text-lime-300">Sangguniang Kabataan</span>
          <span className="text-7xl md:text-8xl">GOMEZ</span>
        </h1>
        
        {/* Tagline */}
        <div className="relative mb-8">
          <p className="text-2xl md:text-3xl font-bold text-lime-300 mb-2 tracking-wide">
            Para sa Kabataan
          </p>
          <div className="flex items-center justify-center space-x-4 text-xl md:text-2xl text-green-100">
            <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></span>
            <span className="font-semibold">Para sa Bayan</span>
            <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-bold text-white text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Makipag-ugnayan</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button className="group px-8 py-4 border-2 border-white/30 rounded-full font-bold text-white text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            <span className="group-hover:text-yellow-300 transition-colors duration-300">Mga Programa</span>
          </button>
        </div>
        
        {/* Stats or Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl font-bold text-yellow-300 mb-2">2024</div>
            <div className="text-sm text-blue-100">Aktibong Taon</div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl font-bold text-green-300 mb-2">100%</div>
            <div className="text-sm text-blue-100">Para sa Komunidad</div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-3xl font-bold text-pink-300 mb-2">∞</div>
            <div className="text-sm text-blue-100">Pagkakaisa</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
    
    {/* Custom animation-delay classes are now in global CSS */}
  </section>
);

export default Hero;