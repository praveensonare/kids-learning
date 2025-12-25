export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  description: string;
  color: string;
  icon: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}
