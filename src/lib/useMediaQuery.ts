"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a media query without a state-in-effect round trip.
 * Server snapshot is `false`, so SSR always renders the wide-viewport branch
 * and React swaps in the real value during hydration.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
