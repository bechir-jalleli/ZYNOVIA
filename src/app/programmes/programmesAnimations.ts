'use client'

// Shared animation variants used across all Programmes sub-components.
// Centralised here to avoid duplication and keep each component lean.

export const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const cardVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
}
