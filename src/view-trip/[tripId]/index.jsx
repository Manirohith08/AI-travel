import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

// Components
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import TripPlace from '../components/TripPlace';
import Footer from '../components/Footer';

function ViewTrip() {
  const location = useLocation();

  // ----------- Extract trip data from React Router state -----------
  const data = location.state || {};

  const trip = data.tripData || null;
  const userSelection = data.userSelection || {};

  const [loading, setLoading] = useState(false);

  // -------- Loading Screen --------
  if (loading) {
    return (
      <>
        <style jsx>{`
          @keyframes roadTrip {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(calc(100vw + 100px)); }
          }
          @keyframes mountainPeak {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes carDrive {
            0% { transform: translateX(-80px) rotate(0deg); }
            25% { transform: translateX(25vw) rotate(1deg); }
            50% { transform: translateX(50vw) rotate(-1deg); }
            75% { transform: translateX(75vw) rotate(0.5deg); }
            100% { transform: translateX(calc(100vw + 80px)) rotate(0deg); }
          }
          @keyframes sunsetGlow {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
          @keyframes compassSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes loadingPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          .car-drive { animation: carDrive 20s ease-in-out infinite; }
          .mountain-peak { animation: mountainPeak 4s ease-in-out infinite; }
          .road-trip { animation: roadTrip 15s linear infinite; }
          .sunset-glow { animation: sunsetGlow 3s ease-in-out infinite; }
          .compass-spin { animation: compassSpin 8s linear infinite; }
          .loading-pulse { animation: loadingPulse 2s ease-in-out infinite; }
        `}</style>
        
        <div className="min-h-screen bg-gradient-to-br from-orange-200 via-red-200 to-purple-200 relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full sunset-glow opacity-80"></div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-32" viewBox="0 0 1200 200" preserveAspectRatio="none">
              <path d="M0,200 L0,100 L200,60 L400,80 L600,40 L800,60 L1000,50 L1200,70 L1200,200 Z" 
                    fill="url(#sunsetGradient)" opacity="0.6"/>
              <defs>
                <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="car-drive absolute bottom-24 left-0 text-3xl">🚗</div>
          <div className="absolute bottom-16 left-0 right-0 h-2 bg-gray-800 opacity-30"></div>
          <div className="road-trip absolute bottom-16 left-0 w-20 h-1 bg-yellow-400 opacity-60"></div>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 text-center relative z-10">
            <div className="compass-spin text-6xl mb-6">🧭</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Planning Your Journey</h2>
            <p className="text-xl text-gray-600 mb-8">Loading trip data...</p>
            <div className="flex justify-center items-center gap-4">
              <div className="loading-pulse w-4 h-4 bg-orange-500 rounded-full"></div>
              <div className="loading-pulse w-4 h-4 bg-red-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
              <div className="loading-pulse w-4 h-4 bg-purple-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // -------- Trip Not Found --------
  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-3xl mb-4">⚠️ Trip Not Found</h2>
          <p>Please regenerate your trip.</p>
        </div>
      </div>
    );
  }

  // -------- Normalize keys --------
  const hotelOptions =
    trip.hotelOptions ||
    trip.HotelOptions ||
    trip.hotels_options ||
    [];

  const itinerary =
    trip.itinerary ||
    trip.Itinerary ||
    [];

  return (
    <>
      <style jsx>{`
        @keyframes journeyPath {
          0% { transform: translateX(-120px) translateY(0px); }
          25% { transform: translateX(25vw) translateY(-15px); }
          50% { transform: translateX(50vw) translateY(10px); }
          75% { transform: translateX(75vw) translateY(-5px); }
          100% { transform: translateX(calc(100vw + 120px)) translateY(0px); }
        }
        @keyframes trainMove {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        @keyframes hotAirBalloon {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(5px) rotate(-1deg); }
          75% { transform: translateY(-5px) rotate(0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes desertWind {
          0% { transform: translateX(-80px) scaleX(1); }
          50% { transform: translateX(50vw) scaleX(1.2); }
          100% { transform: translateX(calc(100vw + 80px)) scaleX(1); }
        }
        @keyframes camelWalk {
          0% { transform: translateX(-70px) rotate(0deg); }
          33% { transform: translateX(33vw) rotate(1deg); }
          66% { transform: translateX(66vw) rotate(-1deg); }
          100% { transform: translateX(calc(100vw + 70px)) rotate(0deg); }
        }
        @keyframes oasisShimmer {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes scrollFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes compassNeedle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(270deg); }
          100% { transform: rotate(360deg); }
        }
        
        .journey-path { animation: journeyPath 28s ease-in-out infinite; }
        .train-move { animation: trainMove 22s linear infinite; }
        .hot-air-balloon { animation: hotAirBalloon 6s ease-in-out infinite; }
        .desert-wind { animation: desertWind 12s ease-in-out infinite; }
        .camel-walk { animation: camelWalk 25s ease-in-out infinite; }
        .oasis-shimmer { animation: oasisShimmer 4s ease-in-out infinite; }
        .scroll-float { animation: scrollFloat 3s ease-in-out infinite; }
        .compass-needle { animation: compassNeedle 12s linear infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 relative overflow-hidden">
        
        <div className="relative z-10 p-6 md:px-20 lg:px-36 xl:px-48">

          {/* INFO SECTION */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative">
            <InfoSection trip={{ ...trip, userSelection }} />
          </div>

          {/* HOTELS */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative">
            <Hotels trip={{ ...trip, hotelOptions }} />
          </div>

          {/* ITINERARY */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-8 mb-8 relative">
            <TripPlace trip={{ ...trip, itinerary }} />
          </div>

          <Footer />

        </div>
      </div>
    </>
  );
}

export default ViewTrip;
