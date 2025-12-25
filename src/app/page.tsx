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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  Kids Learning
                </h1>
                <p className="text-xs md:text-sm text-gray-600">Cambridge Standards</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  {userName}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${classItem.id}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${classItem.color} rounded-3xl p-6 shadow-xl cursor-pointer h-full transition-shadow hover:shadow-2xl`}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <motion.div
                      className="text-6xl md:text-7xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      {classItem.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {classItem.name}
                    </h3>

                    {/* Level */}
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-3">
                      <p className="text-sm font-semibold text-white">
                        {classItem.level}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/90 text-sm md:text-base">
                      {classItem.description}
                    </p>

                    {/* Arrow Icon */}
                    <motion.div
                      className="mt-4"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
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
          className="mt-12 text-center"
        >
          <div className="inline-block bg-white rounded-2xl shadow-lg px-6 py-4">
            <p className="text-gray-700 text-sm md:text-base">
              📚 Following <span className="font-bold text-purple-600">Cambridge International Standards</span>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
