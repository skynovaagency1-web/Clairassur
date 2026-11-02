import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router'

/** URL query params that are safe to read during hydration:
 *  the prerendered HTML has none, so the first client render sees none too. */
export function useQueryParams() {
  const { search } = useLocation()
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  return new URLSearchParams(hydrated ? search : '')
}
