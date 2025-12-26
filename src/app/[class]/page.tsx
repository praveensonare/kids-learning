'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getClassById, getSubjectsByClass } from '@/data/classes';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ClassPage() {
  const params = useParams();
  const classId = params.class as string;

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);

  if (!classData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Class not found</h1>
          <Link href="/" className="text-purple-600 hover:underline font-semibold">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b-2 border-purple-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all shadow-lg border border-purple-200"
                >
                  <ArrowLeft className="w-5 h-5 text-purple-700" />
                </motion.button>
              </Link>
              <div className={`${classData.color} p-3 rounded-2xl shadow-lg border-2 border-white`}>
                <span className="text-3xl">{classData.icon}</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {classData.name}
                </h1>
                <p className="text-xs md:text-sm text-gray-700 font-semibold">{classData.level}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Sparkles className="w-10 h-10 text-purple-600" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Choose Your Subject
            </h2>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <span className="text-4xl">📚</span>
            </motion.div>
          </div>
          <p className="text-lg md:text-xl text-gray-700 font-semibold">
            Select a subject to explore topics and start learning!
          </p>
        </motion.div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${classId}/${subject.id}`}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${subject.color} rounded-3xl p-6 md:p-8 shadow-2xl cursor-pointer h-full transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative overflow-hidden group border-2 border-white/30`}
                  style={{ minHeight: '320px' }}
                >
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`subject-pattern-${index}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                          <circle cx="15" cy="15" r="2" fill="white" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#subject-pattern-${index})`} />
                    </svg>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 group-hover:from-white/10 group-hover:to-black/10 transition-all duration-300"></div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/25 transition-all duration-500 transform -translate-x-full group-hover:translate-x-full"></div>

                  <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                    {/* Icon with Glow */}
                    <motion.div
                      className="text-7xl md:text-8xl mb-4 drop-shadow-2xl filter brightness-110"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      {subject.icon}
                    </motion.div>

                    <div className="flex-1 flex flex-col justify-center">
                      {/* Subject Name */}
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                        {subject.name}
                      </h3>

                      {/* Description Badge */}
                      <div className="bg-white/40 backdrop-blur-xl px-5 py-2.5 rounded-full border-2 border-white/70 shadow-lg mx-auto">
                        <p className="text-sm md:text-base font-black text-white drop-shadow-md">
                          Explore Topics
                        </p>
                      </div>
                    </div>

                    {/* Click Indicator */}
                    <motion.div
                      className="mt-4"
                      animate={{ x: [0, 10, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <div className="bg-white/50 backdrop-blur-md p-3 rounded-full border-2 border-white/80 shadow-xl group-hover:bg-white/80 transition-all">
                        <svg
                          className="w-6 h-6 text-white drop-shadow-lg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={4}
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
      </main>
    </div>
  );
}
