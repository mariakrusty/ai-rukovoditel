import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span'
  /** static: элемент виден сразу, без анимации — для заголовков блоков */
  static?: boolean
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  static: isStatic = false,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isStatic) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [isStatic])

  const Tag = as as any
  if (isStatic) {
    return <Tag className={className}>{children}</Tag>
  }
  const state = visible
    ? 'translate-y-0 opacity-100'
    : 'translate-y-4 opacity-0'
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${Math.min(delay, 250)}ms` }}
      className={`transition-all duration-300 ease-out will-change-transform ${state} ${className}`}
    >
      {children}
    </Tag>
  )
}
