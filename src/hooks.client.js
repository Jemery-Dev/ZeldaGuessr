import { handleErrorWithSentry, replayIntegration } from "@sentry/sveltekit";
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://f4762ffc4d50fa13fbd4e0ec4b69b2df@o4507298968698880.ingest.de.sentry.io/4507298969026640',
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
  
  // If you don't want to use Session Replay, just remove the line below:
  integrations: [replayIntegration()],
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
