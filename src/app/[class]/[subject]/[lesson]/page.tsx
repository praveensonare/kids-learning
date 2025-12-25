'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getClassById,
  getSubjectsByClass,
  getLessonsBySubject,
  getQuizByLesson,
  getChallengesByLesson,
} from '@/data/classes';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  Award,
  Star,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

type SectionType = 'learn' | 'worksheet' | 'quiz' | 'challenges';

export default function LessonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const classId = params.class as string;
  const subjectId = params.subject as string;
  const lessonId = params.lesson as string;

  const [activeSection, setActiveSection] = useState<SectionType>('learn');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const classData = getClassById(classId);
  const subjects = getSubjectsByClass(classId);
  const subjectData = subjects.find((s) => s.id === subjectId);
  const lessons = getLessonsBySubject(classId, subjectId);
  const lessonData = lessons.find((l) => l.id === lessonId);
  const quizQuestions = getQuizByLesson(lessonId);
  const challenges = getChallengesByLesson(lessonId);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleQuizSubmit = () => {
    let correctCount = 0;
    quizQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const handleChallengeComplete = (challengeId: string) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🎯
        </motion.div>
      </div>
    );
  }

  if (!classData || !subjectData || !lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
          <Link href="/" className="text-purple-600 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'learn' as SectionType, name: 'Learn', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'worksheet' as SectionType, name: 'Worksheet', icon: FileText, color: 'bg-green-500' },
    { id: 'quiz' as SectionType, name: 'Quiz', icon: Trophy, color: 'bg-yellow-500' },
    { id: 'challenges' as SectionType, name: 'Challenges', icon: Zap, color: 'bg-purple-500' },
  ];

  const totalPoints = challenges.reduce((sum, c) => {
    return sum + (completedChallenges.includes(c.id) ? c.points : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href={`/${classId}/${subjectId}`}>
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </motion.button>
            </Link>
            <div className={`${subjectData.color} p-1.5 md:p-2 rounded-lg md:rounded-xl`}>
              <span className="text-lg md:text-2xl">{subjectData.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm md:text-xl font-bold text-gray-800 truncate">
                {lessonData.title}
              </h1>
              <p className="text-xs text-gray-600 truncate">
                {classData.name} - {subjectData.name}
              </p>
            </div>
            {totalPoints > 0 && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 md:px-3 py-1 md:py-2 rounded-lg md:rounded-xl">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-white" />
                <span className="text-xs md:text-sm font-bold text-white">{totalPoints}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Section Tabs */}
      <div className="bg-white border-b sticky top-[72px] md:top-[80px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide py-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all whitespace-nowrap text-sm md:text-base ${
                    activeSection === section.id
                      ? `${section.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <main className="container mx-auto px-4 py-6 md:py-8">
        <AnimatePresence mode="wait">
          {/* Learn Section */}
          {activeSection === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-500 p-3 md:p-4 rounded-xl md:rounded-2xl">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Learn</h2>
                    <p className="text-sm md:text-base text-gray-600">{lessonData.title}</p>
                  </div>
                </div>

                <div className="prose prose-sm md:prose max-w-none">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    {lessonData.description}
                  </p>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                      Key Learning Points
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700">
                          Understand the basic concepts and foundations
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700">
                          Practice with interactive examples
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700">
                          Apply your knowledge to solve problems
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl md:rounded-2xl p-4">
                      <h4 className="font-bold text-gray-800 mb-2 text-sm md:text-base">💡 Fun Fact</h4>
                      <p className="text-xs md:text-sm text-gray-700">
                        Learning is more effective when you're having fun! Try to enjoy each activity.
                      </p>
                    </div>
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl md:rounded-2xl p-4">
                      <h4 className="font-bold text-gray-800 mb-2 text-sm md:text-base">🎯 Tip</h4>
                      <p className="text-xs md:text-sm text-gray-700">
                        Take your time and don't rush. Understanding is more important than speed!
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection('worksheet')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 md:py-4 px-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-sm md:text-base">Continue to Worksheet</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Worksheet Section */}
          {activeSection === 'worksheet' && (
            <motion.div
              key="worksheet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500 p-3 md:p-4 rounded-xl md:rounded-2xl">
                    <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Worksheet</h2>
                    <p className="text-sm md:text-base text-gray-600">Practice your skills</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <h3 className="font-bold text-gray-800 mb-4 text-base md:text-lg">Exercise 1</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-4">
                      Complete the following practice activity to reinforce what you've learned.
                    </p>
                    <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-200">
                      <div className="flex items-center justify-center h-32 md:h-40 text-gray-400">
                        <p className="text-xs md:text-sm text-center">
                          Interactive worksheet activity would appear here
                          <br />
                          <span className="text-xs">(Drag and drop, fill in the blanks, etc.)</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <h3 className="font-bold text-gray-800 mb-4 text-base md:text-lg">Exercise 2</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-4">
                      Try this additional practice to master the concept.
                    </p>
                    <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-200">
                      <div className="flex items-center justify-center h-32 md:h-40 text-gray-400">
                        <p className="text-xs md:text-sm text-center">
                          Interactive worksheet activity would appear here
                          <br />
                          <span className="text-xs">(Matching, sequencing, etc.)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection('quiz')}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 md:py-4 px-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-sm md:text-base">Continue to Quiz</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Quiz Section */}
          {activeSection === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 p-3 md:p-4 rounded-xl md:rounded-2xl">
                      <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Quiz</h2>
                      <p className="text-sm md:text-base text-gray-600">Test your knowledge</p>
                    </div>
                  </div>
                  {quizSubmitted && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={resetQuiz}
                      className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold"
                    >
                      Retry
                    </motion.button>
                  )}
                </div>

                {quizQuestions.length > 0 ? (
                  <>
                    {!quizSubmitted ? (
                      <div className="space-y-6">
                        {quizQuestions.map((question, qIndex) => (
                          <div
                            key={question.id}
                            className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-gray-200"
                          >
                            <h3 className="font-bold text-gray-800 mb-4 text-base md:text-lg">
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
                                  className={`w-full text-left p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all ${
                                    quizAnswers[question.id] === oIndex
                                      ? 'border-yellow-500 bg-yellow-50'
                                      : 'border-gray-200 bg-white hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
                                        quizAnswers[question.id] === oIndex
                                          ? 'border-yellow-500 bg-yellow-500'
                                          : 'border-gray-300'
                                      }`}
                                    >
                                      {quizAnswers[question.id] === oIndex && (
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
                                      )}
                                    </div>
                                    <span className="text-sm md:text-base text-gray-700">{option}</span>
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
                          disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 md:py-4 px-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Quiz
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
                            <Award className="w-16 h-16 md:w-24 md:h-24 text-yellow-500" />
                          </motion.div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Quiz Complete!
                          </h3>
                          <p className="text-lg md:text-xl text-gray-600">
                            You scored{' '}
                            <span className="font-bold text-yellow-600">
                              {score} out of {quizQuestions.length}
                            </span>
                          </p>
                          <div className="mt-4">
                            <div className="bg-gray-200 rounded-full h-4 md:h-6 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(score / quizQuestions.length) * 100}%`,
                                }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {quizQuestions.map((question, qIndex) => {
                            const userAnswer = quizAnswers[question.id];
                            const isCorrect = userAnswer === question.correctAnswer;
                            return (
                              <div
                                key={question.id}
                                className={`rounded-xl md:rounded-2xl p-4 md:p-6 border-2 ${
                                  isCorrect
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                                }`}
                              >
                                <div className="flex items-start gap-3 mb-3">
                                  {isCorrect ? (
                                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0" />
                                  )}
                                  <div>
                                    <h4 className="font-bold text-gray-800 text-sm md:text-base">
                                      Question {qIndex + 1}: {question.question}
                                    </h4>
                                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                                      Your answer: {question.options[userAnswer]}
                                    </p>
                                    {!isCorrect && (
                                      <p className="text-xs md:text-sm text-gray-600">
                                        Correct answer: {question.options[question.correctAnswer]}
                                      </p>
                                    )}
                                    {question.explanation && (
                                      <p className="text-xs md:text-sm text-gray-700 mt-2 italic">
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
                          onClick={() => setActiveSection('challenges')}
                          className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-purple-500 text-white font-bold py-3 md:py-4 px-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                          <span className="text-sm md:text-base">Continue to Challenges</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No quiz available for this lesson yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Challenges Section */}
          {activeSection === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500 p-3 md:p-4 rounded-xl md:rounded-2xl">
                    <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Challenges</h2>
                    <p className="text-sm md:text-base text-gray-600">Earn points and master skills</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 md:px-4 py-2 rounded-xl">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-sm md:text-base font-bold text-white">{totalPoints} pts</span>
                  </div>
                </div>

                {challenges.length > 0 ? (
                  <div className="grid gap-4 md:gap-6">
                    {challenges.map((challenge, index) => {
                      const isCompleted = completedChallenges.includes(challenge.id);
                      const difficultyColors = {
                        easy: 'from-green-400 to-green-600',
                        medium: 'from-yellow-400 to-yellow-600',
                        hard: 'from-red-400 to-red-600',
                      };

                      return (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`rounded-xl md:rounded-2xl p-4 md:p-6 border-2 ${
                            isCompleted
                              ? 'bg-green-50 border-green-500'
                              : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`bg-gradient-to-br ${difficultyColors[challenge.difficulty]} rounded-xl p-3 md:p-4 flex-shrink-0`}
                            >
                              <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                  {challenge.title}
                                </h3>
                                <div className="flex items-center gap-1 bg-yellow-100 px-2 md:px-3 py-1 rounded-lg flex-shrink-0">
                                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-600" />
                                  <span className="text-xs md:text-sm font-bold text-yellow-700">
                                    {challenge.points}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm md:text-base text-gray-600 mb-4">
                                {challenge.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-xs md:text-sm font-semibold px-3 py-1 rounded-lg bg-gradient-to-r ${difficultyColors[challenge.difficulty]} text-white`}
                                >
                                  {challenge.difficulty.toUpperCase()}
                                </span>
                                {!isCompleted ? (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleChallengeComplete(challenge.id)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 md:px-6 py-2 rounded-lg md:rounded-xl font-semibold text-sm md:text-base"
                                  >
                                    Start Challenge
                                  </motion.button>
                                ) : (
                                  <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="font-semibold text-sm md:text-base">Completed!</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Zap className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No challenges available for this lesson yet.</p>
                  </div>
                )}

                {completedChallenges.length === challenges.length && challenges.length > 0 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl p-6 md:p-8 text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      className="text-5xl md:text-6xl mb-4"
                    >
                      🏆
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Congratulations!
                    </h3>
                    <p className="text-sm md:text-base text-white/90">
                      You've completed all challenges and earned {totalPoints} points!
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
