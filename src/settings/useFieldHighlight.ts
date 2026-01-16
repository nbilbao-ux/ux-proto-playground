import { useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook to highlight a field when the page loads with a highlight parameter
 * Returns a ref callback that should be attached to the field container
 */
export function useFieldHighlight(fieldId: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    if (highlightId === fieldId && elementRef.current) {
      // Small delay to ensure DOM is ready
      const timeout = setTimeout(() => {
        const element = elementRef.current;
        if (!element) return;

        // Scroll to the element
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        // Add highlight class
        element.classList.add('field-highlighted');

        // Remove highlight after animation
        setTimeout(() => {
          element.classList.remove('field-highlighted');
          // Remove the highlight parameter from URL
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('highlight');
          setSearchParams(newParams, { replace: true });
        }, 2000);
      }, 100);

      return () => {
        clearTimeout(timeout);
        elementRef.current?.classList.remove('field-highlighted');
      };
    }
  }, [highlightId, fieldId, searchParams, setSearchParams]);

  return setRef;
}
