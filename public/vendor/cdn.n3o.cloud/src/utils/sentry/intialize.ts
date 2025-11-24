import * as Sentry from "@sentry/react";

let isInitialized = false;

export const initializeSentry = (env: string) => {

  if (isInitialized) {
    console.debug('Sentry already initialized, skipping...');
    return;
  }

  try {
    Sentry.init({
    dsn: "https://d71093cdf36b9b1c13bfc8713e58e7a8@o373343.ingest.us.sentry.io/4508919379853312",      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    beforeSend: (event: Sentry.ErrorEvent, hint: Sentry.EventHint) => {
      const error = hint?.originalException;
      
      
      if (error && hint?.mechanism?.type === 'onunhandledrejection') {
        const errorSource = (error as Error)?.stack || '';
        if (!errorSource.includes('platforms')) {
          console.debug('Sentry: Ignoring unhandled promise rejection not from our widget');
          return null;
        }
      }
      
      const errorStack = (error instanceof Error) ? error.stack || '' : '';
      if (errorStack && !errorStack.includes('platforms')) {
        return null;
      }
        
      
      event.tags = {
        ...event.tags,
      };
      
      return event;
    },
  });

  
  Sentry.setTag("environment", env);
  
  isInitialized = true;
  console.debug('Sentry initialized successfully');
  
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
};
