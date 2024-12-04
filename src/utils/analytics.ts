// Types
interface ButtonClickData {
  buttonName: string;
  clickCount: number;
  lastClicked: Date;
}

interface PageTimeData {
  pageName: string;
  startTime: Date;
  totalTimeSpent: number;
  visits: number;
}

// Constants
export const CTAButtons = {
  GET_STARTED: "Get started",
  LEARN_MORE: "Learn more",
  START_TRIAL: "Start Free Trial",
} as const;

const TIME_THRESHOLDS = {
  MINIMUM_PAGEVIEW: 30,
  MINIMUM_SESSION: 10,
} as const;

// Store data
const buttonClicks = new Map<string, ButtonClickData>();
const pageTimeData = new Map<string, PageTimeData>();
let currentPage: string | null = null;
let pageStartTime: Date | null = null;

// Initialize CTA tracking
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

// Get CTA button statistics
function getCTAButtonStats() {
  return Array.from(buttonClicks.entries()).map(([name, data]) => ({
    name,
    clicks: data.clickCount,
    lastClicked: data.lastClicked,
  }));
}

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

    window.dataLayer?.push({
      event: "page_time_update",
      pageName,
      timeSpent,
      totalTimeSpent: newData.totalTimeSpent,
      visits: newData.visits,
    });
  }
}

// Export functions
export function trackButtonClick(buttonName: string) {
  const existing = buttonClicks.get(buttonName);
  const now = new Date();

  const newData: ButtonClickData = {
    buttonName,
    clickCount: (existing?.clickCount || 0) + 1,
    lastClicked: now,
  };

  buttonClicks.set(buttonName, newData);

  window.dataLayer?.push({
    event: "button_click",
    buttonName,
    clickCount: newData.clickCount,
    timestamp: now.toISOString(),
  });
}

export function startPageTracking(pageName: string) {
  if (currentPage && pageStartTime) {
    const timeSpent = (new Date().getTime() - pageStartTime.getTime()) / 1000;
    if (timeSpent >= TIME_THRESHOLDS.MINIMUM_PAGEVIEW) {
      updatePageTime(currentPage, timeSpent);
    }
  }

  currentPage = pageName;
  pageStartTime = new Date();
}

export function endPageTracking() {
  if (currentPage && pageStartTime) {
    const timeSpent = (new Date().getTime() - pageStartTime.getTime()) / 1000;
    updatePageTime(currentPage, timeSpent);
  }
}

export function getAnalyticsSummary() {
  const currentTime = new Date().getTime();
  const sessionTime = pageStartTime
    ? (currentTime - pageStartTime.getTime()) / 1000
    : 0;

  if (sessionTime < TIME_THRESHOLDS.MINIMUM_SESSION) {
    return;
  }

  const ctaStats = getCTAButtonStats();
  const pageStats = Array.from(pageTimeData.values());

  console.group("Analytics Summary");

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
