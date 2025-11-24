import { isFunction } from '@/utils';
import { useMemo, useRef } from 'react';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;
 
/**
 * Custom hook to memoize a function with a **stable reference**.
 *
 * 👉 Why not just use `useCallback`?
 * - `useCallback` memoizes functions based on a dependency array.
 * - When dependencies change, React re-creates the callback, which means
 *   its reference is not guaranteed to remain stable.
 *
 * 👉 What this hook does:
 * - Keeps a stable function reference across re-renders.
 * - Always calls the **latest implementation** of the function.
 *
 * This is useful when passing a callback into deeply memoized components
 * or event listeners where you want the reference to stay the same
 * (avoiding unnecessary re-subscribes / re-renders), but still ensure
 * the logic inside uses the most recent state/props.
 */
const useMemoizedFn = <T extends noop>(fn: T) => {
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  // Store the latest function in a ref so it always points
  // to the newest implementation
  const fnRef = useRef<T>(fn);

  // Update ref when fn changes (ensures latest logic is used)
  fnRef.current = useMemo<T>(() => fn, [fn]);

  // Stable wrapper function reference
  const memoizedFn = useRef<PickFunction<T>>(undefined);

  // Only create the wrapper once → stable reference forever
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      // But internally, always call the latest fn
      return fnRef.current.apply(this, args);
    };
  }

  // Consumers always get the same function reference,
  // but its internal logic updates when fn changes
  return memoizedFn.current;
};

export default useMemoizedFn;
