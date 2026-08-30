import { useState } from 'react'
import { Plus, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import AssistantFeed from '../components/AssistantFeed'

// Один кейс = задача, красный диагноз, голубой ответ и исходный пример.
const CASES = [
  {
    title: 'Поставщики и цены',
    promise: '−5 000 ₽ в неделю',
    red: '−5 000 ₽ в неделю',
    blue: 'Тот же сорт на 10 ₽ дешевле',
    was: '«Эквадор берём у своих. Так привыкли, и человек хороший»',
    now: 'Та же роза, та же длина, та же плантация — у поставщика в центре на 10 ₽ дешевле. На поставке в 500 стеблей это 5 000 ₽. Каждую неделю',
  },
  {
    title: 'Остатки и списания',
    promise: 'точный объём закупки',
    red: 'Дефицит → списания',
    blue: 'Точный объём закупки',
    was: '«Постоянно не хватает красной гвоздики. А потом она стоит и вянет»',
    now: 'Точное количество от поставки до поставки, с учётом логистического плеча',
  },
  {
    title: 'Прибыль с заказа',
    promise: '1 600 ₽, а не 5 000 ₽',
    red: '5 000 ₽ — ещё не прибыль',
    blue: 'Реальная прибыль — 1 600 ₽',
    was: '«Продали композицию за 5 000 — отличный чек, день удался»',
    now: 'Цветок 2 100, упаковка 300, доставка 400, эквайринг 100, скидка 500. Осталось 1 600, а не 5 000',
  },
  {
    title: 'Платёжный календарь',
    promise: '+1 800 ₽ за две недели',
    red: 'Деньги ушли раньше срока',
    blue: '+1 800 ₽ за две недели',
    was: '«Пришёл счёт — оплатила сразу, чтобы не забыть»',
    now: 'Платим в последний день отсрочки, деньги лежат на накопительном. На 300 000 ₽ за две недели — около 1 800 ₽ просто за то, что полежали',
  },
  {
    title: 'Входящие обращения',
    promise: 'потери — в рублях',
    red: 'Ответили только утром',
    blue: 'Потери видны в рублях',
    was: '«Написали в директ в девять вечера, ответили утром»',
    now: 'Время первого ответа считается. Видно, в какие часы теряем и сколько это в рублях',
  },
  {
    title: 'Процессы магазина',
    promise: 'работает без вас',
    red: 'Без владельца всё встало',
    blue: 'Процесс работает без вас',
    was: '«Весь магазин у меня в голове. Уехала на три дня — всё встало»',
    now: 'Карта процессов: как устроена работа, записано и работает без вашего участия',
  },
]

// содержимое активного кейса: диагноз → ответ → объяснение → сообщение AI
function CaseBody({ i, big }: { i: number; big: boolean }) {
  const c = CASES[i]
  return (
    <>
      <div
        className={`font-semibold uppercase leading-[1.06] text-negative-signal ${
          big ? 'text-[clamp(38px,3.4vw,46px)]' : 'text-[30px]'
        }`}
      >
        {c.red}
      </div>
      <div
        className={`font-semibold uppercase leading-[1.1] text-positive-signal ${
          big ? 'text-[28px]' : 'text-[24px]'
        }`}
      >
        {c.blue}
      </div>
      <div className="h-px w-full bg-white/12" />
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/58">
          Как сейчас
        </span>
        <p className={`text-white/76 ${big ? 'text-[17px] leading-[27px]' : 'text-[18px] leading-[28px]'}`}>
          {c.was}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#7AD4FF]/70">
          Что покажет AI
        </span>
        <p className={`text-white/96 ${big ? 'text-[17px] leading-[27px]' : 'text-[18px] leading-[28px]'}`}>
          {c.now}
        </p>
      </div>
      <AssistantFeed />
    </>
  )
}

export default function SectionTwo() {
  const [active, setActive] = useState(0)

  return (
    <section id="pairs" className="relative flex flex-col">
      {/* ── мобильная версия: аккордеон, раскрыт один кейс ── */}
      <div className="flex flex-col gap-6 px-5 pb-16 pt-14 sm:hidden">
        <div className="flex flex-col gap-4">
          <Reveal static>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
              — Как заработать больше? Как сэкономить?
            </div>
          </Reveal>
          <h2 className="font-display text-[clamp(40px,10.5vw,44px)] font-bold uppercase leading-[1.05] tracking-tight text-white drop-shadow-lg">
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
          <p className="rounded-2xl bg-[#070c13]/[0.94] p-6 text-[18px] leading-[28px] text-white/96">
            Один и тот же магазин может управляться по ощущениям или
            по данным. AI-помощники показывают, где бизнес переплачивает,
            теряет деньги и недозарабатывает.
          </p>
        </Reveal>

        <Reveal static>
          <div className="overflow-hidden rounded-[20px] bg-[#070c13]/[0.94]">
            {CASES.map((c, i) => (
              <details
                key={i}
                name="pairs-m"
                open={i === 0}
                className="group border-t border-white/12 open:bg-[#45C1FF]/[0.04] first:border-t-0"
              >
                <summary className="flex min-h-[72px] cursor-pointer list-none outline-none items-center gap-3 px-6 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs text-white/58">
                    [ 0{i + 1} ]
                  </span>
                  <span className="flex-1">
                    <span className="block text-[20px] font-medium leading-snug text-white/96">
                      {c.title}
                    </span>
                    <span className="block font-mono text-[14px] text-[#7AD4FF]">
                      {c.promise}
                    </span>
                  </span>
                  <Plus
                    size={18}
                    className="shrink-0 text-white/60 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="flex flex-col gap-6 px-6 pb-6">
                  <CaseBody i={i} big={false} />
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ── десктоп: список задач слева, один активный кейс справа ── */}
      <div className="relative hidden flex-col gap-10 px-5 py-12 sm:flex sm:px-8 sm:py-16 md:px-12">
        <div className="flex items-end justify-between gap-8">
          <div className="flex flex-col gap-6">
            <Reveal static delay={60}>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
                — Как заработать больше? Как сэкономить?
              </div>
            </Reveal>
            <h2 className="font-display font-bold uppercase leading-[1.04] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-[64px]">
              <Reveal static as="span" delay={100} className="block">
                По цифрам,
              </Reveal>
              <Reveal static as="span" delay={220} className="block">
                а не{' '}
                <span className="font-sans font-light normal-case italic tracking-normal">на глазок</span>
              </Reveal>
            </h2>
          </div>
          <Reveal static delay={340}>
            <div className="flex items-center gap-16 font-mono text-white md:gap-24">
              <span className="text-lg">( B )</span>
              <span className="text-xs text-white/70">[ 002 /004 ]</span>
            </div>
          </Reveal>
        </div>

        <Reveal static delay={420}>
          <p className="max-w-2xl text-[18px] leading-[28px] text-white/76 drop-shadow-md">
            Слева — привычные фразы магазина, который живёт на ощущениях.
            Справа — что на том же месте показывает AI. Цифры условные —
            на курсе каждый считает свои.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-[minmax(280px,1fr)_1.8fr]">
          {/* список задач */}
          <div className="flex flex-col overflow-hidden rounded-[20px] bg-[#070c13]/[0.94]">
            {CASES.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`flex min-h-[64px] items-center gap-3 border-t border-white/12 px-6 py-4 text-left outline-none transition-colors duration-200 first:border-t-0 ${
                  active === i
                    ? 'bg-[#45C1FF]/[0.07] shadow-[inset_2px_0_0_#45C1FF]'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <span className="font-mono text-xs text-white/58">
                  [ 0{i + 1} ]
                </span>
                <span className="flex-1">
                  <span
                    className={`block text-[18px] font-medium leading-snug ${
                      active === i ? 'text-white/96' : 'text-white/76'
                    }`}
                  >
                    {c.title}
                  </span>
                  <span className="block font-mono text-[13px] text-[#7AD4FF]/80">
                    {c.promise}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* активный кейс */}
          <div
            key={active}
            className="case-enter flex min-h-[220px] flex-col gap-6 rounded-[20px] bg-[#070c13]/[0.94] p-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[22px] font-medium text-white/96">
                {CASES[active].title}
              </span>
              <span className="font-mono text-xs text-white/58">
                [ 0{active + 1} /06 ]
              </span>
            </div>
            <CaseBody i={active} big />
          </div>
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
