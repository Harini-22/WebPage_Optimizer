import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export function MetricCard({ metric }) {
  const getScoreColor = (score) => {
    if (score >= 0.9) return 'text-green-500 dark:text-green-400';
    if (score >= 0.5) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getScoreBackground = (score) => {
    if (score >= 0.9) return 'bg-green-500/10 dark:bg-green-500/20';
    if (score >= 0.5) return 'bg-yellow-500/10 dark:bg-yellow-500/20';
    return 'bg-red-500/10 dark:bg-red-500/20';
  };

  const getScoreLabel = (score) => {
    if (score >= 0.9) return 'Good';
    if (score >= 0.5) return 'Needs Improvement';
    return 'Poor';
  };

  const getScoreExplanation = (name, score, value, unit) => {
    const scoreLabel = getScoreLabel(score);
    let explanation = `${name}: ${value}${unit} - ${scoreLabel}\n\n`;
    
    if (name === 'Largest Contentful Paint') {
      explanation += '• Good: ≤ 2.5s\n• Needs Improvement: ≤ 4s\n• Poor: > 4s';
    } else if (name === 'First Contentful Paint') {
      explanation += '• Good: ≤ 1.8s\n• Needs Improvement: ≤ 3s\n• Poor: > 3s';
    } else if (name === 'Cumulative Layout Shift') {
      explanation += '• Good: ≤ 0.1\n• Needs Improvement: ≤ 0.25\n• Poor: > 0.25';
    } else if (name === 'Time to First Byte') {
      explanation += '• Good: ≤ 0.8s\n• Needs Improvement: ≤ 1.8s\n• Poor: > 1.8s';
    }

    return explanation;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white truncate">
            {metric.name}
          </h3>
          <div className="relative group">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 break-words">
              {metric.description}
            </div>
            <div className="relative flex-shrink-0 mt-0.5">
              <InformationCircleIcon className="h-4 w-4 cursor-help" />
              <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 rounded-lg bg-gray-900 dark:bg-gray-700 p-3 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-pre-line z-10">
                {getScoreExplanation(metric.name, metric.score, metric.value, metric.unit)}
                <div className="absolute left-1/2 bottom-[-8px] -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
              </div>
            </div>
          </div>
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className={`text-xl sm:text-2xl font-bold ${getScoreColor(metric.score)} flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 flex-shrink-0`}
        >
          <span>{(metric.score * 100).toFixed(0)}</span>
          <span className="text-xs font-medium sm:mt-1">{getScoreLabel(metric.score)}</span>
        </motion.div>
      </div>

      <div className="mt-4 sm:mt-6">
        <div className="flex items-baseline gap-2 mb-2">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {metric.value}
          </div>
          <div className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400">
            {metric.unit}
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Score</span>
            <span className={getScoreColor(metric.score)}>{(metric.score * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metric.score * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full transition-colors ${getScoreBackground(metric.score)}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
} 