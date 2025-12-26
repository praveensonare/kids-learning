'use client';

import { motion } from 'framer-motion';
import { classes } from '@/data/classes';
import { LogOut, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function HomePage() {
  const { isLoggedIn, userName, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🎨
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-yellow-300/10 to-orange-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-2.5 rounded-2xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Kids Learning
                </h1>
                <p className="text-xs md:text-sm text-gray-700 font-medium">Cambridge Standards</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-gray-800">
                  {userName}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
              Choose Your Class
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-lg md:text-xl text-gray-600">
            Start your learning journey today!
          </p>
        </motion.div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${classItem.id}`}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${classItem.color} rounded-3xl p-6 shadow-2xl cursor-pointer h-full transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group border-2 border-white/20`}
                  style={{ minHeight: '300px' }}
                >
                  {/* Decorative Pattern Background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="2" fill="white" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                    </svg>
                  </div>

                  {/* Gradient overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 group-hover:from-white/10 group-hover:to-black/10 transition-all duration-300"></div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500 transform -translate-x-full group-hover:translate-x-full"></div>

                  <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                    {/* Icon with glow */}
                    <motion.div
                      className="text-6xl md:text-7xl mb-3 drop-shadow-2xl filter brightness-110"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.05, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      {classItem.icon}
                    </motion.div>

                    <div className="flex-1 flex flex-col justify-center">
                      {/* Title with stronger shadow */}
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                        {classItem.name}
                      </h3>

                      {/* Level Badge */}
                      <div className="inline-block bg-white/40 backdrop-blur-xl px-5 py-2 rounded-full mb-3 border-2 border-white/60 shadow-lg">
                        <p className="text-sm font-black text-white drop-shadow-md">
                          {classItem.level}
                        </p>
                      </div>

                      {/* Description with background */}
                      <div className="bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                        <p className="text-white text-sm md:text-base font-bold drop-shadow-md leading-snug">
                          {classItem.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Icon with pulse effect */}
                    <motion.div
                      className="mt-4"
                      animate={{ x: [0, 8, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <div className="bg-white/50 backdrop-blur-md p-3 rounded-full border-2 border-white/70 shadow-xl group-hover:bg-white/70 transition-all">
                        <svg
                          className="w-6 h-6 text-white drop-shadow-lg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={3.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center relative z-10"
        >
          <div className="inline-block bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl px-8 py-5 border-2 border-purple-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <p className="text-gray-800 text-sm md:text-base font-semibold">
                Following <span className="font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Cambridge International Standards</span>
              </p>
              <span className="text-3xl">✨</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
