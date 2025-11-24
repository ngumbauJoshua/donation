import * as Sentry from "@sentry/react";

let globalErrorHandler: ((message?: string) => void) | null = null;

export function setGlobalErrorHandler(handler: (message?: string) => void) {
  globalErrorHandler = handler;
}

export function invokeGlobalErrorHandler(message?: string) {
  if (globalErrorHandler) {
    globalErrorHandler(message);
  }
}

interface ErrorContext {
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  level?: 'error' | 'warning' | 'info' | 'debug';
}

/**
 * Centralized error reporting function that logs to console and sends to Sentry
 */
export function reportErrorToSentry(error: Error | unknown, context?: ErrorContext) {
  if (error instanceof Error) {
    Sentry.captureException(error, {
      tags: context?.tags,
      extra: context?.extra,
      level: context?.level || 'error'
    });
  } else {
    const errorObj = new Error(String(error));
    Sentry.captureException(errorObj, {
      tags: context?.tags,
      extra: { originalError: error, ...context?.extra },
      level: context?.level || 'error'
    });
  }
} 