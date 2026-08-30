import { Plus, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'

// Шесть помощников: закрытая строка + три смысловых блока в раскрытии.
const CREW = [
  {
    n: '01',
    name: 'AI-закупщик',
    role: 'Матрица, остатки, списания, сравнение цен и расчёт закупки',
    lessons: 'уроки 1–3',
    salary: '130–200 тыс ₽/мес',
    short: 'закупка без переплат и списаний',
    result: 'Точный заказ: что, сколько и у кого покупать',
  },
  {
    n: '02',
    name: 'AI-финансовый менеджер',
    role: 'Прибыль, движение денег по банкам и кассам, платёжный календарь',
    lessons: 'урок 6',
    salary: '170–190 тыс ₽/мес',
    short: 'прибыль и платёжный календарь',
    result: 'Видно, сколько заработали и хватит ли на платежи',
  },
  {
    n: '03',
    name: 'AI-руководитель продаж',
    role: 'Обращения по каналам, купил/не купил, причины отказов, конверсия администраторов',
    lessons: 'уроки 4–5',
    salary: 'от 100 тыс ₽/мес',
    short: 'обращения, отказы, конверсия',
    result: 'Видно, где теряются клиенты и выручка',
  },
  {
    n: '04',
    name: 'AI-аудитор команды',
    role: 'Результаты смен, квалификация сотрудников, индивидуальные зоны роста',
    lessons: 'урок 7',
    salary: '85–140 тыс ₽/мес',
    short: 'смены и квалификация',
    result: 'Понятно, кто как работает и кого чему учить',
  },
  {
    n: '05',
    name: 'AI-операционный менеджер',
    role: 'Регламенты, инструкции и контроль выполнения',
    lessons: 'урок 8',
    salary: null,
    short: 'регламенты и контроль',
    result: 'Магазин работает по написанному, а не по памяти владельца',
  },
  {
    n: '06',
    name: 'AI-штаб руководителя',
    role: 'Объединяет данные ассортимента, закупки, денег, продаж, клиентов, команды и процессов в единый управленческий отчёт',
    lessons: 'урок 9',
    salary: null,
    short: 'единый управленческий отчёт',
    result: 'В одном месте видно, что происходит в магазине, какие показатели требуют внимания и какие решения необходимо принять',
  },
]

export default function SectionThree() {
  return (
    <section id="assistants" className="relative flex flex-col">
      <div className="relative flex flex-col gap-8 px-5 py-16 sm:gap-10 sm:px-8 md:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5">
            <Reveal static delay={60}>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
                — Как тратить меньше времени?
              </div>
            </Reveal>
            <h2 className="font-display max-w-xl text-[clamp(34px,9.9vw,40px)] font-bold uppercase leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-[64px] lg:leading-[1.04]">
              <Reveal static as="span" delay={100} className="block">
                Шесть{' '}
                <span className="font-sans font-light normal-case italic tracking-normal">
                  своих
                </span>
              </Reveal>
              <Reveal static as="span" delay={220} className="block sm:pl-16">
                Помощников
              </Reveal>
            </h2>
          </div>

          <Reveal static delay={340} className="hidden sm:block">
            <div className="flex items-center gap-16 font-mono text-white md:gap-24">
              <span className="text-lg">( C )</span>
              <span className="text-xs text-white/70">[ 003 /004 ]</span>
            </div>
          </Reveal>
        </div>

        {/* вводный текст — десктоп */}
        <Reveal static delay={160} className="hidden sm:block">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-[18px] leading-[28px] text-white/76 drop-shadow-md">
              В крупном цветочном бизнесе эти задачи распределены между
              руководителями разных направлений. В небольшом магазине большую
              часть этой работы обычно выполняет сам владелец.
            </p>
            <p className="text-[18px] leading-[28px] text-white/96 drop-shadow-md">
              AI-помощники подключаются к CRM, кассам, банковским данным
              и Telegram, автоматически собирают и сводят информацию, проводят
              первичный анализ и показывают руководителю, что требует решения.{' '}
              <span className="text-white/76">
                Решение и ответственность остаются за руководителем.
              </span>
            </p>
          </div>
        </Reveal>

        {/* вводный абзац — мобильный */}
        <Reveal static className="sm:hidden">
          <p className="rounded-2xl bg-[#070c13]/[0.94] p-6 text-[18px] leading-[28px] text-white/96">
            В крупном бизнесе эти задачи распределены между разными
            руководителями. В небольшом магазине их обычно выполняет сам
            владелец. AI-помощники собирают данные, проводят первичный анализ
            и показывают, что требует решения.
          </p>
        </Reveal>

        {/* мобильный аккордеон помощников */}
        <Reveal static className="sm:hidden">
          <div className="overflow-hidden rounded-[20px] bg-[#070c13]/[0.94]">
            {CREW.map((member, i) => (
              <details
                key={member.n}
                name="crew-m"
                open={i === 0}
                className="group border-t border-white/12 open:bg-[#45C1FF]/[0.04] first:border-t-0"
              >
                <summary className="flex min-h-[76px] cursor-pointer list-none outline-none items-center gap-3 px-6 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">
                    <span className="block text-[20px] font-medium leading-snug text-white/96">
                      {member.name}
                    </span>
                    <span className="block text-[16px] leading-snug text-white/60">
                      {member.short}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[12px] uppercase text-white/58">
                    {member.lessons}
                  </span>
                  <Plus
                    size={18}
                    className="shrink-0 text-white/60 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="flex flex-col gap-6 px-6 pb-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/58">
                      Задачи
                    </span>
                    <p className="text-[18px] leading-[28px] text-white/96">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-[21px] font-medium leading-[1.3] text-positive-signal">
                    {member.result}
                  </p>
                  <div className="border-t border-white/12 pt-4">
                    {member.salary ? (
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/58">
                          роль на рынке
                        </span>
                        <span className="font-mono text-[16px] text-[#7AD4FF]">
                          {member.salary}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/58">
                          отдельной ставки нет
                        </span>
                        <span className="font-mono text-[16px] text-white/76">
                          обычно — сам владелец
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Reveal>

        {/* карточки ролей — десктоп, две колонки */}
        <div className="hidden gap-4 sm:grid sm:grid-cols-2">
          {CREW.map((member) => (
            <Reveal static key={member.n} className="h-full">
              <div className="flex h-full min-h-[230px] flex-col gap-4 rounded-[20px] bg-[#070c13]/[0.94] p-[30px]">
                <div className="flex items-baseline justify-between font-mono text-[13px] tracking-[0.1em] text-white/58">
                  <span>[ {member.n} ]</span>
                  <span className="uppercase">{member.lessons}</span>
                </div>
                <div className="text-[23px] font-semibold leading-snug text-white/96">
                  {member.name}
                </div>
                <p className="text-[17px] leading-[27px] text-white/76">
                  {member.role}
                </p>
                <p className="text-[20px] font-medium leading-[1.3] text-positive-signal">
                  {member.result}
                </p>
                <div className="mt-auto border-t border-white/12 pt-4">
                  {member.salary ? (
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-white/58">
                        роль на рынке
                      </span>
                      <span className="font-mono text-[16px] text-[#7AD4FF]">
                        {member.salary}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-white/58">
                        отдельной ставки нет
                      </span>
                      <span className="font-mono text-[16px] text-white/76">
                        обычно — сам владелец
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal static delay={200}>
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-white/58 drop-shadow-md max-sm:rounded-xl max-sm:bg-[#070c13]/80 max-sm:p-3">
            Суммы — стоимость роли на рынке, а не обещание замены сотрудника ·
            отдельные вакансии hh.ru, Москва и СПб, август 2026
          </div>
        </Reveal>

        {/* Утро AI-руководителя — редакционная сцена */}
        <Reveal static>
          <div className="flex flex-col gap-6 rounded-[20px] bg-[#070c13]/[0.94] p-6 sm:gap-8 sm:p-8">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/58">
              Как начинается утро AI-руководителя
            </div>
            <h3 className="font-display text-[clamp(34px,8.8vw,38px)] font-bold uppercase leading-[1.05] tracking-tight text-white/96 sm:text-[52px] sm:leading-[1.04]">
              Утром — один отчёт
            </h3>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {[
                ['01', 'Данные поступили из систем'],
                ['02', 'AI собрал картину'],
                ['03', 'Владелец принял решение'],
              ].map(([num, text]) => (
                <div key={num} className="flex items-baseline gap-3 border-t border-white/12 pt-3">
                  <span className="font-mono text-xs text-[#7AD4FF]/80">{num}</span>
                  <span className="text-[17px] leading-snug text-white/96 sm:text-[18px]">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[28px] font-semibold uppercase leading-[1.08] text-negative-signal sm:text-[36px]">
                Потеряли клиентов
              </div>
              <div className="text-[24px] font-semibold uppercase leading-[1.1] text-positive-signal sm:text-[30px]">
                Причина и сумма уже в отчёте
              </div>
            </div>

            <p className="max-w-3xl text-[18px] leading-[28px] text-white/76">
              Вчера администраторы прислали выручку по каналам, обращения
              и причины отказов. Бухгалтерия добавила платежи, из учётной
              системы пришли остатки и списания.{' '}
              <span className="text-white/96">
                Утром AI-руководитель собрал один отчёт: где потеряли клиентов,
                что заканчивается, что рискуем списать, сколько денег находится
                в кассах и банках и какие платежи предстоят.
              </span>
            </p>
          </div>
        </Reveal>

        {/* связка с программой */}
        <Reveal static className="sm:hidden">
          <div className="rounded-xl bg-[#070c13]/[0.94] px-5 py-4 text-center font-mono text-[13px] uppercase leading-relaxed tracking-[0.1em] text-white/96">
            9 уроков → 10 инструментов
            <span className="block text-[#7AD4FF]">→ 6 AI-помощников</span>
          </div>
        </Reveal>
        <Reveal static className="hidden sm:block">
          <p className="max-w-2xl text-[18px] leading-[28px] text-white/96 drop-shadow-md">
            9 уроков дают 10 инструментов, объединённых в шесть
            AI-помощников. Каких — в программе ниже.
          </p>
        </Reveal>
      </div>

      <Reveal
        delay={320}
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
