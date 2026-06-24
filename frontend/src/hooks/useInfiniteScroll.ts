import { useCallback, useEffect, useRef, useState } from 'react';

const INITIAL_COUNT = 20;
const STEP = 10;

export interface UseInfiniteScrollResult {
  visibleCount: number;
  sentinelRef: (node: HTMLElement | null) => void;
  reset: () => void;
}

export function useInfiniteScroll(total: number): UseInfiniteScrollResult {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const reset = useCallback(() => {
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (node === null) {
        return;
      }
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => (prev < total ? prev + STEP : prev));
        }
      });
      observerRef.current.observe(node);
    },
    [total]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { visibleCount, sentinelRef, reset };
}
