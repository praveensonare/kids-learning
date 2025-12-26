'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getClassById, getSubjectsByClass, getLessonsBySubject } from '@/data/classes';
import { ArrowLeft, BookOpen, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function SubjectPage() {
  const params = useParams();
  const classId = params.class as string;
  const subjectId = params.subject as string;

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);
  const subjectData = subjects.find((s) => s.id === subjectId);
  const lessons = getLessonsBySubject(classId, subjectId);

  if (!classData || !subjectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Subject not found</h1>
          <Link href="/" className="text-purple-600 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  const difficultyIcons = {
    easy: '⭐',
    medium: '⭐⭐',
    hard: '⭐⭐⭐',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-orange-300/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b-2 border-purple-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href={`/${classId}`}>
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all shadow-lg border border-purple-200"
              >
                <ArrowLeft className="w-5 h-5 text-purple-700" />
              </motion.button>
            </Link>
            <div className={`${subjectData.color} p-3 rounded-2xl shadow-lg border-2 border-white`}>
              <span className="text-3xl">{subjectData.icon}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-lg md:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {subjectData.name}
              </h1>
              <p className="text-xs md:text-sm text-gray-700 font-semibold">
                {classData.name} · {subjectData.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
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
              <BookOpen className="w-10 h-10 text-purple-600" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Lessons & Topics
            </h2>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <span className="text-4xl">✨</span>
            </motion.div>
          </div>
          <p className="text-gray-700 text-lg font-semibold">
            Choose a lesson to start your learning adventure!
          </p>
        </motion.div>

        {/* Lessons List */}
        {lessons.length > 0 ? (
          <div className="grid gap-5 md:gap-6 max-w-5xl mx-auto">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${classId}/${subjectId}/${lesson.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all p-6 md:p-7 cursor-pointer border-2 border-purple-200 hover:border-purple-300 relative overflow-hidden group"
                  >
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`lesson-pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-purple-500" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#lesson-pattern-${index})`} />
                      </svg>
                    </div>

                    <div className="flex items-start gap-4 md:gap-5 relative z-10">
                      {/* Lesson Number */}
                      <div className={`${subjectData.color} rounded-2xl p-4 md:p-5 flex-shrink-0 shadow-lg border-2 border-white group-hover:scale-110 transition-transform`}>
                        <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">
                          {index + 1}
                        </span>
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-purple-700 transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed font-medium">
                          {lesson.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-xl border-2 border-blue-200 shadow-md">
                            <Clock className="w-4 h-4 text-white" />
                            <span className="text-xs md:text-sm text-white font-bold">
                              {lesson.duration}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 shadow-md ${
                              lesson.difficulty === 'easy'
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-200'
                                : lesson.difficulty === 'medium'
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 border-yellow-200'
                                : 'bg-gradient-to-r from-red-400 to-pink-500 border-red-200'
                            }`}
                          >
                            <TrendingUp className="w-4 h-4 text-white" />
                            <span className="text-xs md:text-sm font-bold text-white">
                              {difficultyIcons[lesson.difficulty]} {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="flex-shrink-0 hidden md:flex items-center"
                        animate={{ x: [0, 8, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <div className={`${subjectData.color} p-3 rounded-full shadow-lg border-2 border-white`}>
                          <svg
                            className="w-6 h-6 text-white"
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
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Coming Soon!
              </h3>
              <p className="text-gray-600">
                Exciting lessons are being prepared for this subject. Check back soon!
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
