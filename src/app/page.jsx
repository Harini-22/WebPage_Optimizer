'use client';

import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MetricCard } from '@/components/MetricCard';
import { Recommendations } from '@/components/Recommendations';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze website');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze the website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 h-16 flex flex-wrap items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:from-indigo-400 hover:to-purple-400 transition-colors">
            Web Performance Optimizer
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Analyze Your Website Performance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Get detailed insights and actionable recommendations to improve your website's speed, user experience, and SEO rankings.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., https://example.com)"
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors relative group"
              >
                {loading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  'Analyze'
                )}
                {!loading && (
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-white/10"
                    initial={false}
                    animate={{ scale: [0.85, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
              </button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 dark:text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 max-w-7xl mx-auto space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard metric={result.metrics.lcp} />
                <MetricCard metric={result.metrics.fcp} />
                <MetricCard metric={result.metrics.cls} />
                <MetricCard metric={result.metrics.ttfb} />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Recommendations recommendations={result.recommendations} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
} 