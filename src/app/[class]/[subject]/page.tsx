'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getClassById, getSubjectsByClass } from '@/data/classes';
import { ArrowLeft, BookOpen, Sparkles, FileText, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { KnowledgeBaseContent } from '@/lib/loadKnowledgeBase';

export default function SubjectPage() {
  const params = useParams();
  const classId = params.class as string;
  const subjectId = params.subject as string;

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);
  const subjectData = subjects.find((s) => s.id === subjectId);

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch(
          `/api/knowledge-base?class=${classId}&subject=${subjectId}`
        );
        if (response.ok) {
          const data = await response.json();
          setKnowledgeBase(data);
        }
      } catch (error) {
        console.error('Error loading knowledge base:', error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [classId, subjectId]);

  if (!classData || !subjectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Subject not found</h1>
          <Link href="/" className="text-purple-600 hover:underline font-semibold">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

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
              <BookOpen className="w-10 h-10 text-purple-600" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Topics to Explore
            </h2>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Sparkles className="w-10 h-10 text-orange-500" />
            </motion.div>
          </div>
          <p className="text-lg md:text-xl text-gray-700 font-semibold">
            Select a topic to dive into learning with theory, examples, and practice!
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full"
            />
          </div>
        )}

        {/* Topics List - Book Style */}
        {!loading && knowledgeBase && knowledgeBase.topics.length > 0 && (
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-t-2xl shadow-lg border-2 border-purple-200 p-4 md:p-6"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Table of Contents
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2 ml-9">
                {knowledgeBase.topics.length} Topics · Click any topic to start learning
              </p>
            </motion.div>

            {/* Topics List */}
            <div className="bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-xl border-x-2 border-b-2 border-purple-200 divide-y divide-gray-200">
              {knowledgeBase.topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/${classId}/${subjectId}/${topic.id}`}>
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.05)', x: 4 }}
                      className="p-4 md:p-5 cursor-pointer transition-all group relative"
                    >
                      <div className="flex items-start gap-4">
                        {/* Topic Number */}
                        <div className="flex-shrink-0">
                          <div className={`${subjectData.color} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform`}>
                            <span className="text-lg md:text-xl font-black text-white">
                              {topic.number}
                            </span>
                          </div>
                        </div>

                        {/* Topic Content */}
                        <div className="flex-1 min-w-0">
                          {/* Topic Title */}
                          <h4 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-2 leading-tight">
                            {topic.title}
                          </h4>

                          {/* Content Badges */}
                          <div className="flex flex-wrap gap-2">
                            {topic.theory && (
                              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs font-semibold border border-blue-200 flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                Theory
                              </span>
                            )}
                            {topic.examples && (
                              <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-md text-xs font-semibold border border-green-200 flex items-center gap-1">
                                <Lightbulb className="w-3 h-3" />
                                Examples
                              </span>
                            )}
                            {topic.worksheets && (
                              <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md text-xs font-semibold border border-orange-200 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Worksheets
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Arrow Indicator */}
                        <div className="flex-shrink-0 self-center">
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="text-gray-400 group-hover:text-purple-600 transition-colors"
                          >
                            <svg
                              className="w-5 h-5 md:w-6 md:h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover Effect Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200"
            >
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <p className="font-semibold">
                  Each topic includes comprehensive theory, worked examples, and practice worksheets
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* No Topics State */}
        {!loading && (!knowledgeBase || knowledgeBase.topics.length === 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white/95 rounded-3xl shadow-xl p-8 md:p-12 max-w-md mx-auto border-2 border-purple-200">
              <div className="text-6xl md:text-7xl mb-6">📚</div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Content Coming Soon!
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Exciting topics and lessons are being prepared for this subject. Check back soon!
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
