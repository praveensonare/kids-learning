'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getClassById, getSubjectsByClass } from '@/data/classes';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Trophy,
  Gamepad2,
  Crown,
  Sparkles,
  Lightbulb,
  CheckCircle,
  Star,
  Target,
  Brain,
  Medal,
  XCircle,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { KnowledgeBaseContent, Topic } from '@/lib/loadKnowledgeBase';

type SectionType = 'theory' | 'examples' | 'worksheets' | 'assessment' | 'games' | 'leaderboard';

export default function TopicPage() {
  const params = useParams();
  const classId = params.class as string;
  const subjectId = params.subject as string;
  const topicId = params.lesson as string; // Note: route param is still 'lesson' but we use it as topicId

  const [activeSection, setActiveSection] = useState<SectionType>('theory');
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseContent | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);
  const subjectData = subjects.find((s) => s.id === subjectId);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/knowledge-base?class=${classId}&subject=${subjectId}`
        );
        if (response.ok) {
          const data = await response.json();
          setKnowledgeBase(data);

          // Find the specific topic
          const topic = data.topics?.find((t: Topic) => t.id === topicId);
          setCurrentTopic(topic || null);
        }
      } catch (error) {
        console.error('Error loading knowledge base:', error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [classId, subjectId, topicId]);

  if (!classData || !subjectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Page not found</h1>
          <Link href="/" className="text-purple-600 hover:underline font-semibold">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'theory' as SectionType, name: 'Theory', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { id: 'examples' as SectionType, name: 'Examples', icon: Lightbulb, color: 'from-green-500 to-emerald-500' },
    { id: 'worksheets' as SectionType, name: 'Worksheets', icon: FileText, color: 'from-orange-500 to-amber-500' },
    { id: 'assessment' as SectionType, name: 'Assessment', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { id: 'games' as SectionType, name: 'Games', icon: Gamepad2, color: 'from-purple-500 to-pink-500' },
    { id: 'leaderboard' as SectionType, name: 'Leaderboard', icon: Crown, color: 'from-red-500 to-rose-500' },
  ];

  // Sample quiz questions (in real app, these would come from knowledge base)
  const sampleQuestions = [
    {
      id: '1',
      question: 'What is the main concept covered in this topic?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'This tests your understanding of the core concept.',
    },
    {
      id: '2',
      question: 'Which example best demonstrates the theory?',
      options: ['Example 1', 'Example 2', 'Example 3', 'Example 4'],
      correctAnswer: 1,
      explanation: 'Example 2 clearly shows the concept in action.',
    },
  ];

  const handleQuizSubmit = () => {
    let correctCount = 0;
    sampleQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    const points = correctCount * 10;
    setScore(correctCount);
    setTotalPoints(totalPoints + points);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Sarah', points: 950, avatar: '👑' },
    { rank: 2, name: 'Alex', points: 880, avatar: '🌟' },
    { rank: 3, name: 'Jamie', points: 820, avatar: '⭐' },
    { rank: 4, name: 'You', points: totalPoints, avatar: '😊' },
    { rank: 5, name: 'Chris', points: 650, avatar: '🎯' },
  ];

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
          <div className="flex items-center gap-3">
            <Link href={`/${classId}/${subjectId}`}>
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
                {currentTopic ? currentTopic.title : 'Loading...'}
              </h1>
              <p className="text-xs md:text-sm text-gray-700 font-semibold">
                {classData.name} · {subjectData.name}
              </p>
            </div>
            {totalPoints > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-2 rounded-xl shadow-lg border-2 border-white">
                <Star className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">{totalPoints}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b-2 border-purple-100 sticky top-[88px] z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base shadow-md border-2 ${
                    activeSection === section.id
                      ? `bg-gradient-to-r ${section.color} text-white border-white shadow-xl`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{section.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full"
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Theory Section */}
            {activeSection === 'theory' && (
              <motion.div
                key="theory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-blue-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
                      <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Theory
                      </h2>
                      <p className="text-sm md:text-base text-gray-700 font-semibold">
                        Understanding the concepts
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-sm md:prose-lg max-w-none">
                    {currentTopic?.theory ? (
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 md:p-8 border-2 border-blue-200 shadow-md mb-6">
                        <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                          <Brain className="w-6 h-6 text-blue-600" />
                          Core Concept
                        </h3>
                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                          {currentTopic.theory}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 rounded-2xl p-6 md:p-8 border-2 border-blue-200">
                        <p className="text-gray-600 text-center">
                          Theory content is being prepared for this topic. Check back soon!
                        </p>
                      </div>
                    )}

                    {/* Learning Objectives */}
                    {knowledgeBase && knowledgeBase.learningObjectives.length > 0 && (
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 border-2 border-purple-200 shadow-md">
                        <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                          <Target className="w-6 h-6 text-purple-600" />
                          Learning Objectives
                        </h3>
                        <ul className="space-y-3">
                          {knowledgeBase.learningObjectives.map((objective, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-base md:text-lg text-gray-800 font-medium">
                                {objective}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection('examples')}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-white"
                  >
                    <span>Continue to Examples</span>
                    <Lightbulb className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Examples Section */}
            {activeSection === 'examples' && (
              <motion.div
                key="examples"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-green-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg">
                      <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Solved Examples
                      </h2>
                      <p className="text-sm md:text-base text-gray-700 font-semibold">
                        Learn through practical examples
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {currentTopic?.examples ? (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border-2 border-green-200 shadow-md">
                        <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                          <Sparkles className="w-6 h-6 text-green-600" />
                          Examples with Explanations
                        </h3>
                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                          {currentTopic.examples}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-50 rounded-2xl p-6 md:p-8 border-2 border-green-200">
                        <p className="text-gray-600 text-center">
                          Example content is being prepared for this topic. Check back soon!
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection('worksheets')}
                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-white"
                  >
                    <span>Continue to Worksheets</span>
                    <FileText className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Worksheets Section */}
            {activeSection === 'worksheets' && (
              <motion.div
                key="worksheets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-orange-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-2xl shadow-lg">
                      <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        Worksheets
                      </h2>
                      <p className="text-sm md:text-base text-gray-700 font-semibold">
                        Practice makes perfect!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {currentTopic?.worksheets ? (
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 md:p-8 border-2 border-orange-200 shadow-md">
                        <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                          <FileText className="w-6 h-6 text-orange-600" />
                          Practice Activities
                        </h3>
                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                          {currentTopic.worksheets}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border-2 border-orange-200">
                        <p className="text-gray-600 text-center">
                          Worksheet content is being prepared for this topic. Check back soon!
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection('assessment')}
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-white"
                  >
                    <span>Continue to Assessment</span>
                    <Trophy className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Assessment Section */}
            {activeSection === 'assessment' && (
              <motion.div
                key="assessment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-yellow-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                        <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          Assessment
                        </h2>
                        <p className="text-sm md:text-base text-gray-700 font-semibold">
                          Test your knowledge
                        </p>
                      </div>
                    </div>
                    {quizSubmitted && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetQuiz}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                      >
                        Retry
                      </motion.button>
                    )}
                  </div>

                  {!quizSubmitted ? (
                    <div className="space-y-6">
                      {sampleQuestions.map((question, qIndex) => (
                        <div
                          key={question.id}
                          className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 md:p-8 border-2 border-yellow-200 shadow-md"
                        >
                          <h3 className="font-black text-gray-800 mb-4 text-lg md:text-xl">
                            Question {qIndex + 1}: {question.question}
                          </h3>
                          <div className="space-y-3">
                            {question.options.map((option, oIndex) => (
                              <motion.button
                                key={oIndex}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                  setQuizAnswers({ ...quizAnswers, [question.id]: oIndex })
                                }
                                className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all ${
                                  quizAnswers[question.id] === oIndex
                                    ? 'border-yellow-500 bg-yellow-100 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                      quizAnswers[question.id] === oIndex
                                        ? 'border-yellow-500 bg-yellow-500'
                                        : 'border-gray-300'
                                    }`}
                                  >
                                    {quizAnswers[question.id] === oIndex && (
                                      <div className="w-3 h-3 bg-white rounded-full" />
                                    )}
                                  </div>
                                  <span className="text-base md:text-lg text-gray-800 font-medium">
                                    {option}
                                  </span>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length !== sampleQuestions.length}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
                      >
                        Submit Assessment
                      </motion.button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <div className="text-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ type: 'spring', duration: 0.5 }}
                          className="inline-block mb-4"
                        >
                          <Award className="w-24 h-24 text-yellow-500" />
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
                          Assessment Complete!
                        </h3>
                        <p className="text-xl md:text-2xl text-gray-600">
                          You scored{' '}
                          <span className="font-black text-yellow-600">
                            {score} out of {sampleQuestions.length}
                          </span>
                        </p>
                        <div className="mt-4 max-w-md mx-auto">
                          <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(score / sampleQuestions.length) * 100}%`,
                              }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        {sampleQuestions.map((question, qIndex) => {
                          const userAnswer = quizAnswers[question.id];
                          const isCorrect = userAnswer === question.correctAnswer;
                          return (
                            <div
                              key={question.id}
                              className={`rounded-2xl p-6 border-2 ${
                                isCorrect
                                  ? 'bg-green-50 border-green-500'
                                  : 'bg-red-50 border-red-500'
                              }`}
                            >
                              <div className="flex items-start gap-3 mb-3">
                                {isCorrect ? (
                                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                ) : (
                                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                )}
                                <div>
                                  <h4 className="font-black text-gray-800 text-base md:text-lg">
                                    Question {qIndex + 1}: {question.question}
                                  </h4>
                                  <p className="text-sm md:text-base text-gray-600 mt-1">
                                    Your answer: {question.options[userAnswer]}
                                  </p>
                                  {!isCorrect && (
                                    <p className="text-sm md:text-base text-gray-600">
                                      Correct answer: {question.options[question.correctAnswer]}
                                    </p>
                                  )}
                                  {question.explanation && (
                                    <p className="text-sm md:text-base text-gray-700 mt-2 italic">
                                      💡 {question.explanation}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSection('games')}
                        className="w-full bg-gradient-to-r from-yellow-500 to-purple-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-white"
                      >
                        <span>Continue to Games</span>
                        <Gamepad2 className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Games Section */}
            {activeSection === 'games' && (
              <motion.div
                key="games"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-purple-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                      <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Interactive Games
                      </h2>
                      <p className="text-sm md:text-base text-gray-700 font-semibold">
                        Learn while having fun!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'Memory Match', icon: '🎯', desc: 'Match pairs to test your memory' },
                      { name: 'Quick Quiz', icon: '⚡', desc: 'Fast-paced knowledge challenge' },
                      { name: 'Word Puzzle', icon: '🧩', desc: 'Solve puzzles using what you learned' },
                      { name: 'Speed Challenge', icon: '🚀', desc: 'Race against the clock!' },
                    ].map((game, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg cursor-pointer"
                      >
                        <div className="text-6xl mb-4 text-center">{game.icon}</div>
                        <h3 className="text-xl font-black text-gray-800 mb-2 text-center">
                          {game.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm mb-4">{game.desc}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-md"
                        >
                          Play Now
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection('leaderboard')}
                    className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border-2 border-white"
                  >
                    <span>View Leaderboard</span>
                    <Crown className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Leaderboard Section */}
            {activeSection === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-red-200">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-gradient-to-br from-red-500 to-rose-500 p-4 rounded-2xl shadow-lg">
                      <Crown className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                        Leaderboard
                      </h2>
                      <p className="text-sm md:text-base text-gray-700 font-semibold">
                        Top performers in this topic
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {leaderboardData.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-2xl p-6 border-2 shadow-lg ${
                          entry.name === 'You'
                            ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400'
                            : entry.rank <= 3
                            ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-xl shadow-lg ${
                                entry.rank === 1
                                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                                  : entry.rank === 2
                                  ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                                  : entry.rank === 3
                                  ? 'bg-gradient-to-br from-orange-400 to-amber-600'
                                  : 'bg-gradient-to-br from-gray-400 to-gray-500'
                              }`}
                            >
                              {entry.rank}
                            </div>
                            <div className="text-4xl">{entry.avatar}</div>
                            <div>
                              <h3 className="text-xl font-black text-gray-800">{entry.name}</h3>
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-bold text-gray-600">
                                  {entry.points} points
                                </span>
                              </div>
                            </div>
                          </div>
                          {entry.rank <= 3 && (
                            <Medal
                              className={`w-8 h-8 ${
                                entry.rank === 1
                                  ? 'text-yellow-500'
                                  : entry.rank === 2
                                  ? 'text-gray-400'
                                  : 'text-orange-600'
                              }`}
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200">
                    <h3 className="text-lg font-black text-gray-800 mb-2 text-center">
                      Keep Learning to Climb Higher! 🚀
                    </h3>
                    <p className="text-gray-600 text-center">
                      Complete more assessments and games to earn points and improve your ranking.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
