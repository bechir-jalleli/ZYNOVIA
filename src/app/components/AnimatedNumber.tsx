'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

type AnimatedNumberProps = {
  value: string | number
  duration?: number
  className?: string
}

export default function AnimatedNumber({
  value,
  duration = 2000,
  className = '',
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Parse the value to handle "+" prefix and extract the number
  const parseValue = (val: string | number): { prefix: string; target: number; suffix: string } => {
    const str = String(val)
    
    // Check for "+" prefix
    if (str.startsWith('+')) {
      const num = parseInt(str.slice(1), 10)
      return { prefix: '+', target: isNaN(num) ? 0 : num, suffix: '' }
    }
    
    // Check for regular number with optional suffix
    const match = str.match(/^(\d+)(.*)$/)
    if (match) {
      return {
        prefix: '',
        target: parseInt(match[1], 10),
        suffix: match[2] || '',
      }
    }
    
    return { prefix: '', target: 0, suffix: str }
  }

  const { prefix, target, suffix } = parseValue(value)

  useEffect(() => {
    if (!isInView || target === 0) {
      if (target === 0) {
        setDisplay(0)
      }
      return
    }

    let frameId: number
    const startTime = performance.now()
    const startValue = 0

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3)
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const current = Math.floor(startValue + (target - startValue) * easedProgress)
      
      setDisplay(current)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      } else {
        // Ensure we end at the exact target value
        setDisplay(target)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [isInView, target, duration])

  // Format number with thousand separators
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR')
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(display)}
      {suffix}
    </span>
  )
}

