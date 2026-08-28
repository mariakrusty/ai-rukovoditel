import { Plus, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import AssistantFeed from '../components/AssistantFeed'

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

// мобильный аккордеон: те же шесть пар, короткие названия и цифры-результаты
const PAIRS_M: {
  title: string
  digit: string
  was: string
  now: string
  result: string
}[] = [
  {
    title: 'Поставщики и цены',
    digit: '−5 000 ₽ в неделю',
    was: PAIRS[0].was,
    now: 'Та же роза, та же длина, та же плантация — у поставщика в центре на 10 ₽ дешевле.',
    result: 'На поставке в 500 стеблей это 5 000 ₽. Каждую неделю',
  },
  {
    title: 'Остатки и списания',
    digit: 'точный объём закупки',
    was: PAIRS[1].was,
    now: 'Точное количество от поставки до поставки, с учётом логистического плеча.',
    result: 'Ни дефицита, ни увядших остатков',
  },
  {
    title: 'Прибыль с заказа',
    digit: '1 600 ₽, а не 5 000 ₽',
    was: PAIRS[2].was,
    now: 'Цветок 2 100, упаковка 300, доставка 400, эквайринг 100, скидка 500.',
    result: 'Осталось 1 600, а не 5 000',
  },
  {
    title: 'Платёжный календарь',
    digit: '+1 800 ₽ за две недели',
    was: PAIRS[3].was,
    now: 'Платим в последний день отсрочки, деньги лежат на накопительном.',
    result: 'На 300 000 ₽ за две недели — около 1 800 ₽ просто за то, что полежали',
  },
  {
    title: 'Входящие обращения',
    digit: 'потери — в рублях',
    was: PAIRS[4].was,
    now: 'Время первого ответа считается.',
    result: 'Видно, в какие часы теряем и сколько это в рублях',
  },
  {
    title: 'Процессы магазина',
    digit: 'работает без вас',
    was: PAIRS[5].was,
    now: 'Карта процессов: как устроена работа, записано.',
    result: 'Работает без вашего участия',
  },
]

export default function SectionTwo() {
  return (
    <section id="pairs" className="relative flex flex-col">
      {/* ── мобильная версия: заголовок сразу, сравнения — аккордеоном ── */}
      <div className="flex flex-col gap-6 px-5 pb-16 pt-14 sm:hidden">
        <div className="flex flex-col gap-4">
          <Reveal static>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
              — Как заработать больше? Как сэкономить?
            </div>
          </Reveal>
          <h2 className="font-display text-[clamp(32px,8.6vw,40px)] font-bold uppercase leading-[1.14] tracking-tight text-white drop-shadow-lg">
            <Reveal static as="span" className="block">
              По цифрам,
            </Reveal>
            <Reveal static as="span" className="block">
              а не{' '}
              <span className="font-sans font-light normal-case italic tracking-normal">
                на глазок
              </span>
            </Reveal>
          </h2>
        </div>

        <Reveal static>
          <p className="rounded-xl bg-[#0a0e14]/[0.93] p-4 text-[17px] leading-[1.55] text-white/90">
            Один и тот же магазин может управляться по ощущениям или
            по данным. AI-помощники показывают, где бизнес переплачивает,
            теряет деньги и недозарабатывает.
          </p>
        </Reveal>

        <Reveal static>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e14]/95 backdrop-blur-xl">
            {PAIRS_M.map((pair, i) => (
              <details
                key={i}
                name="pairs-m"
                open={i === 0}
                className="group border-t border-white/10 open:bg-[#45C1FF]/[0.04] first:border-t-0"
              >
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs text-white/40">
                    [ 0{i + 1} ]
                  </span>
                  <span className="flex-1">
                    <span className="block text-[16px] font-medium leading-snug text-white">
                      {pair.title}
                    </span>
                    <span className="block font-mono text-[11px] text-[#7AD4FF]">
                      {pair.digit}
                    </span>
                  </span>
                  <Plus
                    size={18}
                    className="shrink-0 text-white/60 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="flex flex-col gap-4 px-5 pb-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                      Как сейчас
                    </span>
                    <p className="text-[16px] leading-[1.55] text-white/60">
                      {pair.was}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                      Что покажет AI
                    </span>
                    <p className="text-[16px] leading-[1.55] text-white/90">
                      {pair.now}
                    </p>
                  </div>
                  <p className="border-t border-white/10 pt-3 text-[15px] leading-snug text-[#7AD4FF]">
                    {pair.result}
                  </p>
                  {i === 0 && <AssistantFeed />}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── десктопная версия — утверждена, без изменений ── */}
      <div className="relative hidden flex-col gap-10 px-5 py-12 sm:flex sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-8 sm:py-16 md:px-12">
        <div className="flex flex-col gap-8 sm:max-w-sm">
          <Reveal static delay={60}>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
              — Как заработать больше? Как сэкономить?
            </div>
          </Reveal>

          <h2 className="font-display text-[clamp(32px,8.6vw,40px)] font-bold uppercase leading-[1.14] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
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
            <p className="max-w-xs text-[17px] leading-relaxed text-white/85 drop-shadow-md sm:text-sm">
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
                <p className="text-[17px] leading-relaxed text-white/55 drop-shadow-md sm:text-sm">
                  {pair.was}
                </p>
                <p className="text-[17px] leading-relaxed text-white drop-shadow-md sm:text-sm">
                  {pair.now}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal
        delay={700}
        className="absolute bottom-5 left-5 hidden sm:bottom-6 sm:left-8 sm:block md:left-12"
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
