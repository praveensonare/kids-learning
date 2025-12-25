import { Class, Subject, Lesson, QuizQuestion, Challenge } from '@/types';

export const classes: Class[] = [
  {
    id: 'nursery',
    name: 'Nursery',
    level: 'Foundation',
    description: 'Early learning foundation for young minds',
    color: 'bg-gradient-to-br from-pink-400 to-pink-600',
    icon: '🌸',
  },
  {
    id: 'reception',
    name: 'Reception',
    level: 'Pre-Primary',
    description: 'Building blocks for future learning',
    color: 'bg-gradient-to-br from-purple-400 to-purple-600',
    icon: '🎨',
  },
  {
    id: 'year-1',
    name: 'Year 1',
    level: 'Primary',
    description: 'First steps in primary education',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    icon: '📚',
  },
  {
    id: 'year-2',
    name: 'Year 2',
    level: 'Primary',
    description: 'Advancing primary skills',
    color: 'bg-gradient-to-br from-green-400 to-green-600',
    icon: '🌟',
  },
  {
    id: 'year-3',
    name: 'Year 3',
    level: 'Primary',
    description: 'Exploring new concepts',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    icon: '🚀',
  },
  {
    id: 'year-4',
    name: 'Year 4',
    level: 'Primary',
    description: 'Growing knowledge and skills',
    color: 'bg-gradient-to-br from-red-400 to-red-600',
    icon: '🎯',
  },
  {
    id: 'year-5',
    name: 'Year 5',
    level: 'Upper Primary',
    description: 'Mastering core subjects',
    color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    icon: '🏆',
  },
  {
    id: 'year-6',
    name: 'Year 6',
    level: 'Upper Primary',
    description: 'Preparing for secondary education',
    color: 'bg-gradient-to-br from-teal-400 to-teal-600',
    icon: '🎓',
  },
];

export const subjects: Record<string, Subject[]> = {
  nursery: [
    { id: 'literacy', name: 'Early Literacy', color: 'bg-pink-500', icon: '📖' },
    { id: 'numeracy', name: 'Early Numeracy', color: 'bg-purple-500', icon: '🔢' },
    { id: 'science', name: 'Discovery', color: 'bg-green-500', icon: '🔬' },
  ],
  reception: [
    { id: 'english', name: 'English', color: 'bg-blue-500', icon: '📝' },
    { id: 'maths', name: 'Maths', color: 'bg-red-500', icon: '➕' },
    { id: 'science', name: 'Science', color: 'bg-green-500', icon: '🧪' },
  ],
  'year-1': [
    { id: 'english', name: 'English', color: 'bg-blue-500', icon: '📝' },
    { id: 'maths', name: 'Maths', color: 'bg-red-500', icon: '➕' },
    { id: 'science', name: 'Science', color: 'bg-green-500', icon: '🧪' },
    { id: 'art', name: 'Art & Design', color: 'bg-purple-500', icon: '🎨' },
  ],
  'year-2': [
    { id: 'english', name: 'English', color: 'bg-blue-500', icon: '📝' },
    { id: 'maths', name: 'Maths', color: 'bg-red-500', icon: '➕' },
    { id: 'science', name: 'Science', color: 'bg-green-500', icon: '🧪' },
    { id: 'art', name: 'Art & Design', color: 'bg-purple-500', icon: '🎨' },
  ],
  'year-3': [
    { id: 'english', name: 'English', color: 'bg-blue-500', icon: '📝' },
    { id: 'maths', name: 'Maths', color: 'bg-red-500', icon: '➕' },
    { id: 'science', name: 'Science', color: 'bg-green-500', icon: '🧪' },
    { id: 'history', name: 'History', color: 'bg-yellow-600', icon: '📜' },
    { id: 'geography', name: 'Geography', color: 'bg-teal-500', icon: '🌍' },
  ],
  'year-4': [
    { id: 'english', name: 'English', color: 'bg-blue-500', icon: '📝' },
    { id: 'maths', name: 'Maths', color: 'bg-red-500', icon: '➕' },
    { id: 'science', name: 'Science', color: 'bg-green-500', icon: '🧪' },
    { id: 'history', name: 'History', color: 'bg-yellow-600', icon: '📜' },
    { id: 'geography', name: 'Geography', color: 'bg-teal-500', icon: '🌍' },
  ],
  'year-5': [
    { id: 'english', name: 'English', color: 'bg-blue-500', icon: '📝' },
    { id: 'maths', name: 'Maths', color: 'bg-red-500', icon: '➕' },
    { id: 'science', name: 'Science', color: 'bg-green-500', icon: '🧪' },
    { id: 'history', name: 'History', color: 'bg-yellow-600', icon: '📜' },
    { id: 'geography', name: 'Geography', color: 'bg-teal-500', icon: '🌍' },
  ],
  'year-6': [
    { id: 'english', name: 'English', color: 'bg-blue-500', icon: '📝' },
    { id: 'maths', name: 'Maths', color: 'bg-red-500', icon: '➕' },
    { id: 'science', name: 'Science', color: 'bg-green-500', icon: '🧪' },
    { id: 'history', name: 'History', color: 'bg-yellow-600', icon: '📜' },
    { id: 'geography', name: 'Geography', color: 'bg-teal-500', icon: '🌍' },
  ],
};

export const lessons: Record<string, Lesson[]> = {
  'year-1-english': [
    {
      id: 'phonics-1',
      title: 'Introduction to Phonics',
      description: 'Learn letter sounds and basic phonics',
      duration: '15 mins',
      difficulty: 'easy',
    },
    {
      id: 'reading-1',
      title: 'Simple Words',
      description: 'Reading and spelling simple CVC words',
      duration: '20 mins',
      difficulty: 'easy',
    },
    {
      id: 'writing-1',
      title: 'Letter Formation',
      description: 'Practice writing lowercase letters',
      duration: '15 mins',
      difficulty: 'medium',
    },
  ],
  'year-1-maths': [
    {
      id: 'numbers-1',
      title: 'Numbers 1-10',
      description: 'Counting and recognizing numbers up to 10',
      duration: '15 mins',
      difficulty: 'easy',
    },
    {
      id: 'addition-1',
      title: 'Simple Addition',
      description: 'Adding numbers up to 10',
      duration: '20 mins',
      difficulty: 'medium',
    },
    {
      id: 'shapes-1',
      title: 'Basic Shapes',
      description: 'Identifying circles, squares, and triangles',
      duration: '15 mins',
      difficulty: 'easy',
    },
  ],
  'year-1-science': [
    {
      id: 'animals-1',
      title: 'Animals Around Us',
      description: 'Learning about different animals and their habitats',
      duration: '20 mins',
      difficulty: 'easy',
    },
    {
      id: 'plants-1',
      title: 'Parts of a Plant',
      description: 'Understanding roots, stems, leaves, and flowers',
      duration: '15 mins',
      difficulty: 'easy',
    },
    {
      id: 'seasons-1',
      title: 'Four Seasons',
      description: 'Exploring the characteristics of each season',
      duration: '20 mins',
      difficulty: 'easy',
    },
  ],
};

export const quizQuestions: Record<string, QuizQuestion[]> = {
  'phonics-1': [
    {
      id: 'q1',
      question: 'What sound does the letter "A" make?',
      options: ['ah', 'eh', 'oh', 'oo'],
      correctAnswer: 0,
      explanation: 'The letter A makes the "ah" sound as in apple.',
    },
    {
      id: 'q2',
      question: 'Which letter makes the "buh" sound?',
      options: ['D', 'B', 'P', 'C'],
      correctAnswer: 1,
      explanation: 'The letter B makes the "buh" sound as in ball.',
    },
    {
      id: 'q3',
      question: 'What sound does "C" make?',
      options: ['suh', 'kuh', 'duh', 'tuh'],
      correctAnswer: 1,
      explanation: 'The letter C makes the "kuh" sound as in cat.',
    },
  ],
  'numbers-1': [
    {
      id: 'q1',
      question: 'How many fingers do you have on one hand?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: 'We have 5 fingers on each hand!',
    },
    {
      id: 'q2',
      question: 'What number comes after 7?',
      options: ['6', '8', '9', '10'],
      correctAnswer: 1,
      explanation: 'The number 8 comes after 7.',
    },
    {
      id: 'q3',
      question: 'How many eyes does a person have?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1,
      explanation: 'People have 2 eyes!',
    },
  ],
};

export const challenges: Record<string, Challenge[]> = {
  'phonics-1': [
    {
      id: 'c1',
      title: 'Sound Matching Game',
      description: 'Match the letter with its correct sound',
      difficulty: 'easy',
      points: 10,
    },
    {
      id: 'c2',
      title: 'Build a Word',
      description: 'Use letter sounds to create simple words',
      difficulty: 'medium',
      points: 20,
    },
  ],
  'numbers-1': [
    {
      id: 'c1',
      title: 'Counting Stars',
      description: 'Count the stars and pick the right number',
      difficulty: 'easy',
      points: 10,
    },
    {
      id: 'c2',
      title: 'Number Detective',
      description: 'Find the missing number in the sequence',
      difficulty: 'medium',
      points: 20,
    },
  ],
};

export function getClassById(id: string): Class | undefined {
  return classes.find((c) => c.id === id);
}

export function getSubjectsByClass(classId: string): Subject[] {
  return subjects[classId] || [];
}

export function getLessonsBySubject(classId: string, subjectId: string): Lesson[] {
  return lessons[`${classId}-${subjectId}`] || [];
}

export function getQuizByLesson(lessonId: string): QuizQuestion[] {
  return quizQuestions[lessonId] || [];
}

export function getChallengesByLesson(lessonId: string): Challenge[] {
  return challenges[lessonId] || [];
}
