import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { ASSISTANT_URL } from '../config'

const LINKS = [
  { label: 'главное', href: '#main' },
  { label: 'помощники', href: '#assistants' },
  { label: 'программа', href: '#season' },
  { label: 'спросить ассистента', href: ASSISTANT_URL, external: true },
]

/**
 * Шапка НЕ фиксированная: absolute, уезжает при прокрутке
 * и не накладывается на контент. На мобильном — компактный ряд
 * из двух ссылок вместо вертикального меню.
 */
export default function Navbar() {
  return (
    <>
      <div className="absolute left-5 top-5 z-50 sm:left-8 sm:top-7 md:left-12">
        <Reveal>
          <a
            href="#main"
            className="font-mono text-base font-medium tracking-tight text-white drop-shadow-md sm:text-xl md:text-2xl"
          >
            (M_ANDREEVA)
          </a>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-4 font-mono text-[10px] text-white/60 sm:mt-8 sm:text-xs">
            [ AI прокачка цветочного бизнеса 2.0 ]
          </div>
        </Reveal>
      </div>

      {/* мобильное меню: две ссылки в строку */}
      <nav className="absolute right-5 top-5 z-50 sm:hidden">
        <Reveal delay={100}>
          <div className="flex items-center gap-3">
            <a
              href="#assistants"
              className="font-mono text-[11px] text-white/80 drop-shadow-md"
            >
              помощники
            </a>
            <a
              href="#season"
              className="font-mono text-[11px] text-white/80 drop-shadow-md"
            >
              программа
            </a>
            <a
              href={ASSISTANT_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-3 py-1 font-mono text-[11px] text-white drop-shadow-md"
            >
              спросить
            </a>
          </div>
        </Reveal>
      </nav>

      {/* меню на компьютере */}
      <nav className="absolute right-8 top-7 z-50 hidden sm:block md:right-12">
        <ul className="flex flex-col items-end gap-2">
          {LINKS.map((link, i) => (
            <li key={link.label}>
              <Reveal delay={100 + i * 120}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                  className="group flex items-center gap-1 font-mono text-sm text-white/80 drop-shadow-md transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
