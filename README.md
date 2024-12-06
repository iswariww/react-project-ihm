# Readme File

# TechNova User Tracking Review Guide

This guide explains how to review and understand the user tracking implementation in the TechNova project. The application uses Google Tag Manager (GTM) and custom analytics to track user interactions.

## Setup Requirements

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Key Areas to Monitor

### 1. Console Logging

Open your browser's developer tools (F12) to view tracking data in the console. The following information is logged:

- User location coordinates
- Browser language
- Time of day
- Timezone
- Local time
- Analytics summaries (refreshed every 15 seconds)

### 2. Google Tag Manager Events

The application pushes various events to GTM's dataLayer, which can be monitored in the console. Key events include:

#### Form Interactions

- Form submission success/errors
- Missing field validations
- Form data content

#### Button Clicks

- CTA button interactions
- Navigation link clicks
- Social media link clicks

#### User Context Data

- Geographic location
- Language preferences
- Session timing

### 3. Analytics Summary

Every 15 seconds, the console displays a grouped summary of:

- Button click statistics
- Page time statistics
- Session duration

## Testing User Tracking

1. **Form Interactions**

   - Fill out and submit the contact form
   - Try submitting with missing fields
   - Check console for form submission events

2. **Navigation Tracking**

   - Click navigation links
   - Monitor console for click events
   - Review page time tracking updates

3. **CTA Button Testing**

   - Click "Get Started", "Learn More", and "Start Free Trial" buttons
   - Verify button click events in console
   - Check analytics summary for click counts

4. **User Context**
   - Allow location permissions when prompted
   - Check console for user context data
   - Verify GTM events for user information

## Important Files to Review

1. `src/utils/gtm.ts`

   - GTM initialization
   - DataLayer configuration
   - Event tracking setup

2. `src/components/Contact.tsx`

   - Form submission tracking
   - Error handling events
   - Success tracking

3. `src/contexts/UserContext.tsx`

   - User data collection
   - Location tracking
   - Session management

4. `src/App.tsx`
   - Page tracking initialization
   - Analytics summary scheduling
   - Cleanup handling

## Notes

- The application uses a 30-second interval for page tracking updates
- Success/error messages are displayed for 5 seconds
- Location tracking requires user permission
- All tracking data is logged to both console and GTM dataLayer

## Privacy Considerations

- User location data is only collected with explicit permission
- Form data is tracked but not stored permanently
- Session tracking respects minimum thresholds to avoid spam data
- All tracking is transparent through console logging
