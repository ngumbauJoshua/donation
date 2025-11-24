import { useState } from 'react';
import useMemoizedFn from './useMemoizedFn';
import { isFunction } from '@/utils';

/**
 * Custom hook similar to React's `this.setState` in class components.
 *
 * 👉 Why not just use `useState` directly?
 * - React's `useState` replaces state entirely, whereas class components
 *   allowed **partial updates** (`setState` merges updates into the existing state).
 * - Writing manual merge logic everywhere is repetitive and error-prone.
 *
 * 👉 What this hook does:
 * - Provides a `setState` function that **merges** partial state objects
 *   into the existing state.
 * - Accepts either:
 *   1. A **partial object** → merges into existing state.
 *   2. An **updater function** → receives previous state and returns
 *      partial updates or a full replacement.
 *
 * This makes working with complex state objects much easier and mirrors
 * the ergonomics of class component `setState`.
 */

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S),
): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useMemoizedFn((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  });

  return [state, setMergeState];
};

export default useSetState;
