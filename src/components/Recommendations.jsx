import { ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export function Recommendations({ recommendations }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'critical':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />;
      case 'moderate':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    }
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'critical':
        return 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30';
      case 'moderate':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30';
      default:
        return 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        Recommendations
      </h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {recommendations.map((recommendation) => (
          <motion.div
            key={recommendation.id}
            variants={item}
            className={`rounded-lg border p-4 transition-colors cursor-pointer ${getCategoryStyle(recommendation.category)}`}
          >
            <div className="flex flex-wrap break-words items-start gap-3">
              {getCategoryIcon(recommendation.category)}
              <div className="space-y-1 flex flex-col w-full">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {recommendation.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {recommendation.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 