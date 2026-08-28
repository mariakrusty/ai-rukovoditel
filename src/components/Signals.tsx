import type { ReactNode } from 'react'

/**
 * Смысловые цветовые сигналы:
 * Neg — проблема, потеря денег, риск (красный, подчёркивание 2px);
 * NegSum — негативная сумма (красный без подчёркивания);
 * Pos — данные, решение AI, экономия, результат (голубой, плотнее).
 */
export function Neg({ children }: { children: ReactNode }) {
  return (
    <span className="font-medium text-negative-signal underline decoration-negative-signal/85 decoration-2 underline-offset-4">
      {children}
    </span>
  )
}

export function NegSum({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-negative-signal">{children}</span>
}

export function Pos({ children }: { children: ReactNode }) {
  return <span className="font-medium text-positive-signal">{children}</span>
}
