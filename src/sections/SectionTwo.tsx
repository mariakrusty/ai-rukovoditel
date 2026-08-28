import { Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'

const PAIRS: { was: string; now: string }[] = [
  {
    was: '«Эквадор берём у своих. Так привыкли, и человек хороший»',
    now: 'Та же роза, та же длина, та же плантация — у поставщика в центре на 10 ₽ дешевле. На поставке в 500 стеблей это 5 000 ₽. Каждую неделю',
  },
  {
    was: '«Постоянно не хватает красной гвоздики. А потом она стоит и вянет»',
    now: 'Точное количество от поставки до поставки, с учётом логистического плеча',
  },
  {
    was: '«Продали композицию за 5 000 — отличный чек, день удался»',
    now: 'Цветок 2 100, упаковка 300, доставка 400, эквайринг 100, скидка 500. Осталось 1 600, а не 5 000',
  },
  {
    was: '«Пришёл счёт — оплатила сразу, чтобы не забыть»',
    now: 'Платим в последний день отсрочки, деньги лежат на накопительном. На 300 000 ₽ за две недели — около 1 800 ₽ просто за то, что полежали',
  },
  {
    was: '«Написали в директ в девять вечера, ответили утром»',
    now: 'Время первого ответа считается. Видно, в какие часы теряем и сколько это в рублях',
  },
  {
    was: '«Весь магазин у меня в голове. Уехала на три дня — всё встало»',
    now: 'Карта процессов: как устроена работа, записано и работает без вашего участия',
  },
]

export default function SectionTwo() {
  return (
    <section id="pairs" className="relative flex flex-col">
      <div className="relative flex flex-col gap-10 px-5 py-12 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-8 sm:py-16 md:px-12">
        <div className="flex flex-col gap-8 sm:max-w-sm">
          <Reveal static delay={60}>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
              — Как заработать больше? Как сэкономить?
            </div>
          </Reveal>

          <h2 className="font-display text-3xl font-bold uppercase leading-[1.14] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            <Reveal static as="span" delay={100} className="block">
              По цифрам,
            </Reveal>
            <Reveal static as="span" delay={220} className="block">
              а не{' '}
              <span className="font-sans font-light normal-case italic tracking-normal">на глазок</span>
            </Reveal>
          </h2>

          <Reveal static delay={340}>
            <div className="flex items-center justify-between font-mono text-white sm:justify-start sm:gap-16 md:gap-24">
              <span className="text-lg">( B )</span>
              <span className="text-xs text-white/70">[ 002 /004 ]</span>
            </div>
          </Reveal>

          <Reveal static delay={420}>
            <p className="max-w-xs text-base leading-relaxed text-white/85 drop-shadow-md sm:text-sm">
              Слева — магазин, который живёт на ощущениях. Справа — тот же
              магазин после курса: где переплачиваем, где теряем, где
              недозарабатываем. Цифры условные — на курсе каждый считает свои.
            </p>
          </Reveal>
        </div>

        <div className="flex w-full flex-col rounded-2xl bg-black/60 p-4 sm:max-w-xl sm:rounded-none sm:bg-transparent sm:p-0">
          {PAIRS.map((pair, i) => (
            <Reveal key={i} delay={200 + i * 90}>
              <div className="grid gap-2 border-t border-white/15 py-5 sm:grid-cols-[1fr_1.15fr] sm:gap-6">
                <p className="text-base leading-relaxed text-white/55 drop-shadow-md sm:text-sm">
                  {pair.was}
                </p>
                <p className="text-base leading-relaxed text-white drop-shadow-md sm:text-sm">
                  {pair.now}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal
        delay={700}
        className="absolute bottom-5 left-5 sm:bottom-6 sm:left-8 md:left-12"
      >
        <button
          aria-label="Поделиться"
          className="text-white/80 transition-colors hover:text-white"
        >
          <Share2 size={18} />
        </button>
      </Reveal>
    </section>
  )
}
