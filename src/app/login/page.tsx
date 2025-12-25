'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GraduationCap, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple dummy login - just set a flag and redirect
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', username);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-6xl"
          animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🎨
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-6xl"
          animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-10 text-6xl"
          animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        >
          🚀
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome!
            </h1>
            <p className="text-gray-600">Enter any username and password to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors text-gray-800"
                placeholder="Enter any username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors text-gray-800"
                placeholder="Enter any password"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Continue to Learning
            </motion.button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            This is a demo login - any credentials will work
          </p>
        </div>
      </motion.div>
    </div>
  );
}
