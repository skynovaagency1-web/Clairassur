import { useSyncExternalStore } from 'react'

// Pinned insurers, kept in this browser only. Hydration-safe: the server and the
// first client render see an empty list, then the stored list.
const KEY = 'clairassur:saved'
const listeners = new Set<() => void>()
let cache: string[] | null = null
const EMPTY: string[] = []

function read(): string[] {
  if (cache) return cache
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    cache = []
  }
  return cache!
}

function write(next: string[]) {
  cache = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l())
}

export function useSaved() {
  const saved = useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    read,
    () => EMPTY,
  )
  const toggle = (name: string) => write(saved.includes(name) ? saved.filter((n) => n !== name) : [...saved, name])
  return { saved, toggle }
}
