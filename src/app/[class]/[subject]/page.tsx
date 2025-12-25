'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { getClassById, getSubjectsByClass, getLessonsBySubject } from '@/data/classes';
import { ArrowLeft, BookOpen, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function SubjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const classId = params.class as string;
  const subjectId = params.subject as string;

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);
  const subjectData = subjects.find((s) => s.id === subjectId);
  const lessons = getLessonsBySubject(classId, subjectId);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          📖
        </motion.div>
      </div>
    );
  }

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
          <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
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
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      {/* Lesson Number */}
                      <div className={`${subjectData.color} rounded-xl p-4 flex-shrink-0`}>
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {index + 1}
                        </span>
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                          {lesson.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-700 font-medium">
                              {lesson.duration}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-2 ${difficultyColors[lesson.difficulty]} bg-opacity-10 px-3 py-1 rounded-lg`}
                          >
                            <TrendingUp
                              className={`w-4 h-4 ${difficultyColors[lesson.difficulty].replace('bg-', 'text-')}`}
                            />
                            <span
                              className={`text-sm font-medium ${difficultyColors[lesson.difficulty].replace('bg-', 'text-')}`}
                            >
                              {difficultyIcons[lesson.difficulty]} {lesson.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="flex-shrink-0 hidden md:block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <div className={`${subjectData.color} bg-opacity-20 p-2 rounded-full`}>
                          <svg
                            className={`w-6 h-6 ${subjectData.color.replace('bg-', 'text-')}`}
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
