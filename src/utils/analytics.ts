/**
 * Analytics Utility Module
 *
 * This module provides utilities for tracking user interactions and analytics data.

 *
 * It tracks specifically CTA (Call-to-Action) button clicks as they are crucial metrics.
 * These include:
 * - "Get Started" clicks
 * - "Learn More" clicks
 * - "Start Free Trial" clicks
 *
 * The module integrates with Google Tag Manager for event tracking
 * and for analytics summaries.
 *
 * Key Features:
 * - CTA button click tracking
 * - Page view duration tracking
 * - Session time tracking
 * - Analytics data summarization and reporting
 */

// Types
interface ButtonClickData {
  buttonName: string; // Name of the button clicked
  clickCount: number; // Number of times button was clicked
  lastClicked: Date; // Timestamp of last click
}

interface PageTimeData {
  pageName: string; // Name of the page being tracked
  startTime: Date; // When tracking started for this page
  totalTimeSpent: number; // Total time spent on page (in seconds)
  visits: number; // Number of visits to this page
}

// Constants for CTA button names
export const CTAButtons = {
  GET_STARTED: "Get started",
  LEARN_MORE: "Learn more",
  START_TRIAL: "Start Free Trial",
} as const;

// Minimum time thresholds for valid tracking data
const TIME_THRESHOLDS = {
  MINIMUM_PAGEVIEW: 30, // Minimum seconds for a valid page view
  MINIMUM_SESSION: 10, // Minimum seconds for a valid session
} as const;

// Add new constant for interval timing
const TRACKING_INTERVAL = 30000; // 30 seconds in milliseconds

// Add interval ID storage
let trackingInterval: number | null = null;

// Store data in memory
const buttonClicks = new Map<string, ButtonClickData>();
const pageTimeData = new Map<string, PageTimeData>();
let currentPage: string | null = null;
let pageStartTime: Date | null = null;

// Initialize CTA tracking by setting up initial data for all buttons
function initializeCTATracking() {
  Object.values(CTAButtons).forEach((button) => {
    if (!buttonClicks.has(button)) {
      buttonClicks.set(button, {
        buttonName: button,
        clickCount: 0,
        lastClicked: new Date(),
      });
    }
  });
}

// Get statistics for all CTA buttons
function getCTAButtonStats() {
  return Array.from(buttonClicks.entries()).map(([name, data]) => ({
    name,
    clicks: data.clickCount,
    lastClicked: data.lastClicked,
  }));
}

// Update time spent on a specific page
function updatePageTime(pageName: string, timeSpent: number) {
  const existing = pageTimeData.get(pageName);

  if (timeSpent > 0) {
    const newData: PageTimeData = {
      pageName,
      startTime: existing?.startTime || new Date(),
      totalTimeSpent: (existing?.totalTimeSpent || 0) + timeSpent,
      visits: (existing?.visits || 0) + 1,
    };

    pageTimeData.set(pageName, newData);

    // Push page time data to GTM
    window.dataLayer?.push({
      event: "page_time_update",
      pageName,
      timeSpent,
      totalTimeSpent: newData.totalTimeSpent,
      visits: newData.visits,
    });
  }
}

// Export functions for external use

// Track button clicks with GTM integration
export function trackButtonClick(buttonName: string) {
  console.log("Button clicked:", buttonName);

  const existing = buttonClicks.get(buttonName);
  const now = new Date();

  const newData: ButtonClickData = {
    buttonName,
    clickCount: (existing?.clickCount || 0) + 1,
    lastClicked: now,
  };

  buttonClicks.set(buttonName, newData);
  console.log("Updated button clicks:", Array.from(buttonClicks.entries()));

  // Push click event to GTM
  window.dataLayer?.push({
    event: "button_click",
    buttonName,
    clickCount: newData.clickCount,
    timestamp: now.toISOString(),
  });
}

// Start tracking time spent on a page
export function startPageTracking(pageName: string) {
  if (currentPage && pageStartTime) {
    const timeSpent = (new Date().getTime() - pageStartTime.getTime()) / 1000;
    if (timeSpent >= TIME_THRESHOLDS.MINIMUM_PAGEVIEW) {
      updatePageTime(currentPage, timeSpent);
    }
  }

  currentPage = pageName;
  pageStartTime = new Date();

  // Clear any existing interval
  if (trackingInterval) {
    clearInterval(trackingInterval);
  }

  // Set up new interval
  trackingInterval = window.setInterval(() => {
    if (currentPage && pageStartTime) {
      const timeSpent = (new Date().getTime() - pageStartTime.getTime()) / 1000;
      updatePageTime(currentPage, timeSpent);
      pageStartTime = new Date(); // Reset start time for next interval
    }
  }, TRACKING_INTERVAL);
}

// End tracking for current page
export function endPageTracking() {
  if (trackingInterval) {
    clearInterval(trackingInterval);
    trackingInterval = null;
  }

  if (currentPage && pageStartTime) {
    const timeSpent = (new Date().getTime() - pageStartTime.getTime()) / 1000;
    updatePageTime(currentPage, timeSpent);
  }
}

// Get summary of all analytics data
export function getAnalyticsSummary() {
  const currentTime = new Date().getTime();
  const sessionTime = pageStartTime
    ? (currentTime - pageStartTime.getTime()) / 1000
    : 0;

  // Remove or comment out these console.log statements
  // console.log('Current session time:', sessionTime);

  const ctaStats = getCTAButtonStats();
  const pageStats = Array.from(pageTimeData.values());

  // Remove or comment out these console.log statements
  // console.log('Raw CTA Stats:', ctaStats);
  // console.log('Raw Page Stats:', pageStats);

  console.group("Analytics Summary (Refreshed every 15 seconds)");

  console.group("Button Clicks:");
  Object.values(CTAButtons).forEach((buttonName) => {
    const stats = ctaStats.find((stat) => stat.name === buttonName);
    console.log(`${buttonName}: ${stats?.clicks || 0} clicks`);
  });
  console.groupEnd();

  console.group("Page Time Statistics:");
  pageStats.forEach((page) => {
    const avgTimeSpent = page.totalTimeSpent / page.visits;
    console.log(`${page.pageName}:`);
    console.log(`  - Total time: ${page.totalTimeSpent.toFixed(2)}s`);
    console.log(`  - Visits: ${page.visits}`);
    console.log(`  - Average time per visit: ${avgTimeSpent.toFixed(2)}s`);
  });
  console.groupEnd();

  console.groupEnd();

  return { ctaStats, pageStats };
}

// Initialize tracking when the file is loaded
initializeCTATracking();
