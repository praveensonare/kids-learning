'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getClassById, getSubjectsByClass } from '@/data/classes';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function ClassPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const classId = params.class as string;
  const [activeSubject, setActiveSubject] = useState(0);

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);

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
          📚
        </motion.div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Class not found</h1>
          <Link href="/" className="text-purple-600 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </motion.button>
              </Link>
              <div className={`${classData.color} p-2 rounded-xl`}>
                <span className="text-2xl">{classData.icon}</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  {classData.name}
                </h1>
                <p className="text-xs md:text-sm text-gray-600">{classData.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Choose a Subject
          </h2>
          <p className="text-gray-600">Select a subject to start learning</p>
        </motion.div>

        {/* Subject Cards - Mobile View */}
        <div className="md:hidden grid grid-cols-2 gap-4 mb-8">
          {subjects.map((subject, index) => (
            <Link key={subject.id} href={`/${classId}/${subject.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${subject.color} rounded-2xl p-6 shadow-lg cursor-pointer`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl mb-3">{subject.icon}</div>
                  <h3 className="text-lg font-bold text-white">{subject.name}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Subject Tabs - Desktop View */}
        <div className="hidden md:block">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {subjects.map((subject, index) => (
              <motion.button
                key={subject.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSubject(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeSubject === index
                    ? `${subject.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{subject.icon}</span>
                <span>{subject.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeSubject}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`${subjects[activeSubject].color} p-4 rounded-2xl`}>
                  <span className="text-5xl">{subjects[activeSubject].icon}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {subjects[activeSubject].name}
                  </h3>
                  <p className="text-gray-600">
                    {classData.name} - {subjects[activeSubject].name}
                  </p>
                </div>
              </div>

              <Link href={`/${classId}/${subjects[activeSubject].id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full ${subjects[activeSubject].color} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                >
                  <span>Start Learning</span>
                  <svg
                    className="w-5 h-5"
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
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
