import { useEffect, useState } from "react";
import axios from "../api/axios";
import type { Member } from "../types";

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    axios.get("/members").then((res) => setMembers(res.data));
  }, []);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden" id="members">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-200 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="memberGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="#10b981"/>
              <circle cx="0" cy="0" r="1" fill="#059669"/>
              <circle cx="60" cy="60" r="1" fill="#047857"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#memberGrid)"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-none px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">Mga Miyembro</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 mb-6">
            Committee Members
          </h2>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-green-400"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-green-400"></div>
          </div>
          
          <p className="text-xl text-green-700 max-w-2xl mx-auto leading-relaxed">
            Narito ang mga dedicated na miyembro ng Sangguniang Kabataan na handang maglingkod sa aming komunidad
          </p>
        </div>

        {/* Members Hierarchy Layout */}
        <div className="space-y-12 w-full">
          {/* SK Chairperson - Largest Circle */}
          {members.filter(m => m.position.toLowerCase().includes('chairperson')).map((m) => (
            <div key={m.id} className="flex justify-center w-full">
              <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-green-300/50 w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/70 to-emerald-100/70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Chairperson Crown Icon */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">👑</span>
                </div>
                
                <div className="relative mb-6">
                  <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden ring-6 ring-green-400 group-hover:ring-green-500 transition-all duration-300 shadow-2xl">
                    <img
                      src={`https://skgomez.onrender.com/uploads/${m.photo_url}`}
                      alt={m.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                <div className="relative text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-3 group-hover:text-green-900 transition-colors duration-300">
                    {m.name}
                  </h3>
                  <div className="inline-block bg-gradient-to-r from-green-200 to-emerald-200 px-6 py-3 rounded-full border-2 border-green-300">
                    <p className="text-lg font-bold text-green-800">{m.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* SK Secretary and Treasurer - Medium Circles */}
          <div className="grid gap-6 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 w-full">
            {members.filter(m => 
              m.position.toLowerCase().includes('secretary') || 
              m.position.toLowerCase().includes('treasurer')
            ).map((m) => (
              <div key={m.id} className="flex justify-center">
                <div className="group relative bg-white/75 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-green-200/50 w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-emerald-50/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Position Icons */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs">
                      {m.position.toLowerCase().includes('secretary') ? '📝' : '💰'}
                    </span>
                  </div>
                  
                  <div className="relative mb-6">
                    <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden ring-4 ring-green-300 group-hover:ring-green-400 transition-all duration-300 shadow-lg">
                      <img
                        src={`https://skgomez.onrender.com/${m.photo_url}`}
                        alt={m.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  
                  <div className="relative text-center">
                    <h3 className="text-xl font-bold text-green-800 mb-2 group-hover:text-green-900 transition-colors duration-300">
                      {m.name}
                    </h3>
                    <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
                      <p className="text-sm font-semibold text-green-700">{m.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 7 Councilors - Regular Size */}
          <div className="w-full">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-green-800 mb-4">Mga Councilor</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 w-full">
              {members.filter(m => 
                m.position.toLowerCase().includes('councilor')
              ).slice(0, 7).map((m, index) => (
                <div
                  key={m.id}
                  className="group relative bg-white/70 backdrop-blur-sm p-4 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 w-full"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative mb-4">
                    <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-3 ring-green-200 group-hover:ring-green-300 transition-all duration-300">
                      <img
                        src={`https://skgomez.onrender.com/${m.photo_url}`}
                        alt={m.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 border-white shadow-md">
                      <div className="w-full h-full bg-green-300 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  
                  <div className="relative text-center">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-800 mb-2 group-hover:text-green-900 transition-colors duration-300 leading-tight">
                      {m.name}
                    </h3>
                    <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-1 rounded-full border border-green-200">
                      <p className="text-xs font-semibold text-green-700">{m.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Committee Members - Regular Size */}
          <div className="w-full">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-green-800 mb-4">Mga Committee Member</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid gap-6 sm:gap-8 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {members.filter(m => 
                m.position.toLowerCase().includes('committee') ||
                (!m.position.toLowerCase().includes('chairperson') &&
                 !m.position.toLowerCase().includes('secretary') &&
                 !m.position.toLowerCase().includes('treasurer') &&
                 !m.position.toLowerCase().includes('councilor'))
              ).slice(0, 3).map((m, index) => (
                <div
                  key={m.id}
                  className="group relative bg-white/70 backdrop-blur-sm p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 w-full max-w-sm mx-auto"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative mb-4">
                    <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden ring-3 ring-green-200 group-hover:ring-green-300 transition-all duration-300">
                      <img
                        src={`https://skgomez.onrender.com/uploads/${m.photo_url}`}
                        alt={m.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-md">
                      <div className="w-full h-full bg-green-300 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  
                  <div className="relative text-center">
                    <h3 className="text-lg font-bold text-green-800 mb-2 group-hover:text-green-900 transition-colors duration-300">
                      {m.name}
                    </h3>
                    <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full border border-green-200">
                      <p className="text-xs font-semibold text-green-700">{m.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Gusto mo bang maging parte ng SK Gomez?
            </h3>
            <p className="text-green-100 mb-6 max-w-md">
              Samahan mo kami sa paglilingkod sa aming komunidad at sa pagbubuo ng mas magandang kinabukasan para sa lahat.
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Makipag-ugnayan sa Amin
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-emerald-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-teal-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-lime-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1.5s'}}></div>
    </section>
  );
};

export default Members;