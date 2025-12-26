'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getClassById, getSubjectsByClass } from '@/data/classes';
import { ArrowLeft, BookOpen, Lightbulb, FileText, Target, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { KnowledgeBaseContent, Topic } from '@/lib/loadKnowledgeBase';

export default function TopicPage() {
  const params = useParams();
  const classId = params.class as string;
  const subjectId = params.subject as string;
  const chapterId = params.chapter as string;
  const topicId = params.topic as string;

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);
  const subjectData = subjects.find((s) => s.id === subjectId);

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'theory' | 'examples' | 'worksheets' | 'problems'>('theory');

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Topic not found</h1>
          <Link href="/" className="text-purple-600 hover:underline font-semibold">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const chapter = knowledgeBase?.chapters.find(ch => ch.id === chapterId);
  const topic = chapter?.topics.find(t => t.id === topicId);

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
            <Link href={`/${classId}/${subjectId}/${chapterId}`}>
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
                {topic?.title || 'Loading...'}
              </h1>
              <p className="text-xs md:text-sm text-gray-700 font-semibold">
                {classData.name} · {subjectData.name} · {chapter?.title}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
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

        {/* Topic Content */}
        {!loading && topic && (
          <div className="max-w-5xl mx-auto">
            {/* Topic Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-3">
                Topic {topic.number}: {topic.title}
              </h2>
              {topic.description && (
                <p className="text-lg text-gray-700 font-semibold max-w-3xl mx-auto">
                  {topic.description}
                </p>
              )}
            </motion.div>

            {/* Section Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-3 justify-center mb-8"
            >
              {topic.theory && (
                <button
                  onClick={() => setActiveSection('theory')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    activeSection === 'theory'
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Theory
                  </div>
                </button>
              )}
              {topic.examples && (
                <button
                  onClick={() => setActiveSection('examples')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    activeSection === 'examples'
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-white text-green-700 hover:bg-green-50 border-2 border-green-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Examples
                  </div>
                </button>
              )}
              {topic.worksheets && (
                <button
                  onClick={() => setActiveSection('worksheets')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    activeSection === 'worksheets'
                      ? 'bg-orange-600 text-white shadow-lg scale-105'
                      : 'bg-white text-orange-700 hover:bg-orange-50 border-2 border-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Worksheets
                  </div>
                </button>
              )}
              {(topic.problemsEasy || topic.problemsMedium || topic.problemsDifficult) && (
                <button
                  onClick={() => setActiveSection('problems')}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    activeSection === 'problems'
                      ? 'bg-pink-600 text-white shadow-lg scale-105'
                      : 'bg-white text-pink-700 hover:bg-pink-50 border-2 border-pink-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Practice Problems
                  </div>
                </button>
              )}
            </motion.div>

            {/* Section Content */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-6 md:p-8"
            >
              {/* Theory Section */}
              {activeSection === 'theory' && topic.theory && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">Theory</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {topic.theory}
                    </div>
                  </div>
                </div>
              )}

              {/* Examples Section */}
              {activeSection === 'examples' && topic.examples && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Lightbulb className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">Examples</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {topic.examples}
                    </div>
                  </div>
                </div>
              )}

              {/* Worksheets Section */}
              {activeSection === 'worksheets' && topic.worksheets && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">Interactive Worksheets</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {topic.worksheets}
                    </div>
                  </div>
                </div>
              )}

              {/* Problems Section */}
              {activeSection === 'problems' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-pink-100 p-3 rounded-xl">
                      <Target className="w-6 h-6 text-pink-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">Practice Problems</h3>
                  </div>

                  {/* Easy Problems */}
                  {topic.problemsEasy && topic.problemsEasy.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-green-100 px-3 py-1 rounded-lg">
                          <span className="text-green-700 font-bold text-sm">EASY</span>
                        </div>
                        <span className="text-gray-600 text-sm">{topic.problemsEasy.length} problems</span>
                      </div>
                      <div className="space-y-3">
                        {topic.problemsEasy.map((problem, idx) => (
                          <div
                            key={idx}
                            className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg hover:bg-green-100 transition-colors"
                          >
                            <p className="text-gray-800">{problem}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Medium Problems */}
                  {topic.problemsMedium && topic.problemsMedium.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-yellow-100 px-3 py-1 rounded-lg">
                          <span className="text-yellow-700 font-bold text-sm">MEDIUM</span>
                        </div>
                        <span className="text-gray-600 text-sm">{topic.problemsMedium.length} problems</span>
                      </div>
                      <div className="space-y-3">
                        {topic.problemsMedium.map((problem, idx) => (
                          <div
                            key={idx}
                            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg hover:bg-yellow-100 transition-colors"
                          >
                            <p className="text-gray-800">{problem}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Difficult Problems */}
                  {topic.problemsDifficult && topic.problemsDifficult.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-red-100 px-3 py-1 rounded-lg">
                          <span className="text-red-700 font-bold text-sm">DIFFICULT</span>
                        </div>
                        <span className="text-gray-600 text-sm">{topic.problemsDifficult.length} problems</span>
                      </div>
                      <div className="space-y-3">
                        {topic.problemsDifficult.map((problem, idx) => (
                          <div
                            key={idx}
                            className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg hover:bg-red-100 transition-colors"
                          >
                            <p className="text-gray-800">{problem}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Progress Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200"
            >
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                <p className="font-semibold">
                  Complete all sections to master this topic! Work through theory, examples, worksheets, and practice problems.
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* No Topic State */}
        {!loading && !topic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white/95 rounded-3xl shadow-xl p-8 md:p-12 max-w-md mx-auto border-2 border-purple-200">
              <div className="text-6xl md:text-7xl mb-6">📚</div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Topic Not Found
              </h3>
              <p className="text-gray-600 text-base md:text-lg mb-4">
                We couldn't find this topic. It may have been moved or doesn't exist yet.
              </p>
              <Link
                href={`/${classId}/${subjectId}/${chapterId}`}
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors"
              >
                Back to Chapter
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
