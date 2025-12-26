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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href={`/${classId}`}>
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
            </Link>
            <div className={`${subjectData.color} p-2 rounded-xl`}>
              <span className="text-2xl">{subjectData.icon}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                {subjectData.name}
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                {classData.name} - {subjectData.name}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Lessons & Topics
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Choose a lesson to start your learning adventure!
          </p>
        </motion.div>

        {/* Lessons List */}
        {lessons.length > 0 ? (
          <div className="grid gap-4 md:gap-5 max-w-5xl mx-auto">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${classId}/${subjectId}/${lesson.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.01, x: 8 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 md:p-6 cursor-pointer border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      {/* Lesson Number */}
                      <div className={`${subjectData.color} rounded-xl p-3 md:p-4 flex-shrink-0 shadow-md`}>
                        <span className="text-xl md:text-2xl font-bold text-white">
                          {index + 1}
                        </span>
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm md:text-base leading-relaxed">
                          {lesson.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-xs md:text-sm text-blue-700 font-semibold">
                              {lesson.duration}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                              lesson.difficulty === 'easy'
                                ? 'bg-green-50 border-green-200'
                                : lesson.difficulty === 'medium'
                                ? 'bg-yellow-50 border-yellow-200'
                                : 'bg-red-50 border-red-200'
                            }`}
                          >
                            <TrendingUp
                              className={`w-4 h-4 ${difficultyColors[lesson.difficulty].replace('bg-', 'text-')}`}
                            />
                            <span
                              className={`text-xs md:text-sm font-semibold ${difficultyColors[lesson.difficulty].replace('bg-', 'text-')}`}
                            >
                              {difficultyIcons[lesson.difficulty]} {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="flex-shrink-0 hidden md:flex items-center"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <div className={`${subjectData.color} p-2.5 rounded-full shadow-sm`}>
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
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
