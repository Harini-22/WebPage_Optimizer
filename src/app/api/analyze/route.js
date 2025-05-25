import { NextResponse } from 'next/server';

const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;
const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const apiUrl = new URL(PAGESPEED_API_URL);
    apiUrl.searchParams.append('url', url);
    apiUrl.searchParams.append('strategy', 'mobile');
    apiUrl.searchParams.append('category', 'performance');
    if (PAGESPEED_API_KEY) {
      apiUrl.searchParams.append('key', PAGESPEED_API_KEY);
    }

    const response = await fetch(apiUrl.toString());
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to analyze website');
    }

    const { lighthouseResult } = data;
    const { audits, categories } = lighthouseResult;

    const metrics = {
      lcp: {
        name: 'Largest Contentful Paint',
        value: Number((audits['largest-contentful-paint'].numericValue / 1000).toFixed(1)),
        unit: 's',
        score: audits['largest-contentful-paint'].score,
        description: audits['largest-contentful-paint'].description
      },
      fcp: {
        name: 'First Contentful Paint',
        value: Number((audits['first-contentful-paint'].numericValue / 1000).toFixed(1)),
        unit: 's',
        score: audits['first-contentful-paint'].score,
        description: audits['first-contentful-paint'].description
      },
      cls: {
        name: 'Cumulative Layout Shift',
        value: Number(audits['cumulative-layout-shift'].numericValue.toFixed(2)),
        unit: '',
        score: audits['cumulative-layout-shift'].score,
        description: audits['cumulative-layout-shift'].description
      },
      ttfb: {
        name: 'Time to First Byte',
        value: Number((audits['server-response-time'].numericValue / 1000).toFixed(1)),
        unit: 's',
        score: audits['server-response-time'].score,
        description: audits['server-response-time'].description
      }
    };

    // Get recommendations from failed audits
    const recommendations = Object.values(audits)
      .filter(audit => audit.score !== null && audit.score < 0.9 && audit.details?.type !== 'debugdata')
      .map((audit, index) => ({
        id: String(index + 1),
        category: audit.score < 0.5 ? 'critical' : 'moderate',
        title: audit.title,
        description: audit.description
      }))
      .sort((a) => (a.category === 'critical' ? -1 : 1))
      .slice(0, 5);

    return NextResponse.json({
      url,
      timestamp: new Date().toISOString(),
      metrics,
      recommendations,
      score: categories.performance.score
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze website. Please try again.' },
      { status: 500 }
    );
  }
} 