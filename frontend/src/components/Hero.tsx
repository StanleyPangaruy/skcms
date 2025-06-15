const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 w-full">
    {/* Animated Background Elements - Adjusted for mobile */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-10 left-5 w-32 h-32 sm:top-20 sm:left-20 sm:w-72 sm:h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-5 w-32 h-32 sm:top-40 sm:right-20 sm:w-72 sm:h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/2 w-32 h-32 sm:bottom-20 sm:w-72 sm:h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
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
    
    {/* Floating Elements - Reduced for mobile */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-3 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-lime-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-1/3 right-4 sm:right-16 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-300 rounded-full animate-bounce opacity-60 animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 sm:w-5 sm:h-5 bg-green-300 rounded-full animate-bounce opacity-60 animation-delay-2000"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-teal-300 rounded-full animate-bounce opacity-60 animation-delay-3000"></div>
    </div>
    
    {/* Glass Card Container - Responsive padding and sizing */}
    <div className="relative z-10 w-full max-w-xs sm:max-w-lg md:max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <div className="backdrop-blur-md bg-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-700">
        
        {/* Main Logo/Badge - Responsive sizing */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-lime-400 to-green-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">SK</span>
            </div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Main Title - Heavily responsive */}
        <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-emerald-200 mb-4 sm:mb-6 leading-tight">
          <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-1 sm:mb-2 text-lime-300">Sangguniang Kabataan</span>
          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">GOMEZ</span>
        </h1>
        
        {/* Tagline - Responsive text sizing */}
        <div className="relative mb-6 sm:mb-8">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-lime-300 mb-2 tracking-wide">
            Para sa Kabataan
          </p>
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-sm sm:text-lg md:text-xl lg:text-2xl text-green-100">
            <span className="w-6 sm:w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></span>
            <span className="font-semibold">Para sa Bayan</span>
            <span className="w-6 sm:w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></span>
          </div>
        </div>
        
        {/* Action Buttons - Better mobile stacking */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-10">
          <button className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-bold text-white text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Makipag-ugnayan</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 rounded-full font-bold text-white text-base sm:text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            <span className="group-hover:text-yellow-300 transition-colors duration-300">Mga Programa</span>
          </button>
        </div>
        
        {/* Stats or Info Cards - Better mobile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-1 sm:mb-2">2024</div>
            <div className="text-xs sm:text-sm text-blue-100">Aktibong Taon</div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-green-300 mb-1 sm:mb-2">100%</div>
            <div className="text-xs sm:text-sm text-blue-100">Para sa Komunidad</div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-bold text-pink-300 mb-1 sm:mb-2">∞</div>
            <div className="text-xs sm:text-sm text-blue-100">Pagkakaisa</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Scroll Indicator - Responsive sizing */}
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
        <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
);

export default Hero;