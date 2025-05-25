/**
 * @typedef {Object} PerformanceMetric
 * @property {string} name - The name of the metric
 * @property {number} value - The numerical value of the metric
 * @property {string} unit - The unit of measurement
 * @property {number} score - The score between 0 and 1
 * @property {string} description - A description of the metric
 */

/**
 * @typedef {Object} Recommendation
 * @property {string} id - Unique identifier
 * @property {'critical' | 'moderate' | 'minor'} category - The severity category
 * @property {string} title - The recommendation title
 * @property {string} description - Detailed description of the recommendation
 */

/**
 * @typedef {Object} PerformanceResult
 * @property {string} url - The URL that was analyzed
 * @property {string} timestamp - ISO timestamp of the analysis
 * @property {Object} metrics - Performance metrics
 * @property {PerformanceMetric} metrics.lcp - Largest Contentful Paint metric
 * @property {PerformanceMetric} metrics.fcp - First Contentful Paint metric
 * @property {PerformanceMetric} metrics.cls - Cumulative Layout Shift metric
 * @property {PerformanceMetric} metrics.ttfb - Time to First Byte metric
 * @property {Array<Recommendation>} recommendations - List of performance recommendations
 */

export const mockPerformanceResult = {
  url: 'https://example.com',
  timestamp: new Date().toISOString(),
  metrics: {
    lcp: {
      name: 'Largest Contentful Paint',
      value: 2.5,
      unit: 's',
      score: 0.85,
      description: 'Time until the largest content element is rendered',
    },
    fcp: {
      name: 'First Contentful Paint',
      value: 1.2,
      unit: 's',
      score: 0.92,
      description: 'Time until the first content is rendered',
    },
    cls: {
      name: 'Cumulative Layout Shift',
      value: 0.12,
      unit: '',
      score: 0.88,
      description: 'Measures visual stability',
    },
    ttfb: {
      name: 'Time to First Byte',
      value: 0.8,
      unit: 's',
      score: 0.95,
      description: 'Time until the first byte is received',
    },
  },
  recommendations: [
    {
      id: '1',
      category: 'critical',
      title: 'Optimize Images',
      description: 'Convert images to WebP format and implement lazy loading',
    },
    {
      id: '2',
      category: 'moderate',
      title: 'Enable Text Compression',
      description: 'Enable GZIP compression for text-based assets',
    },
    {
      id: '3',
      category: 'minor',
      title: 'Leverage Browser Caching',
      description: 'Set appropriate cache headers for static assets',
    },
  ],
}; 