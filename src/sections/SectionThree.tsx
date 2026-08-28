import { Plus, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'

// Карточки ролей. Первая строка — узнаваемая работа владельца,
// «Матрица» — первым словом первого помощника.
const CREW = [
  {
    n: '01',
    name: 'AI-закупщик',
    role: 'Матрица, остатки, списания, сравнение цен и расчёт закупки',
    lessons: 'уроки 1–3',
    salary: '130–200 тыс ₽/мес',
    short: 'закупка без переплат и списаний',
    data: 'продажи, остатки и списания из учётной системы, прайсы поставщиков',
    result: 'точный заказ: что, сколько и у кого покупать',
  },
  {
    n: '02',
    name: 'AI-финансовый менеджер',
    role: 'Прибыль, движение денег по банкам и кассам, платёжный календарь',
    lessons: 'урок 6',
    salary: '170–190 тыс ₽/мес',
    short: 'прибыль и платёжный календарь',
    data: 'выписки банков, кассы, платежи и счета',
    result: 'видно, сколько заработали и хватит ли на платежи',
  },
  {
    n: '03',
    name: 'AI-руководитель продаж',
    role: 'Обращения по каналам, купил/не купил, причины отказов, конверсия администраторов',
    lessons: 'уроки 4–5',
    salary: 'от 100 тыс ₽/мес',
    short: 'обращения, отказы, конверсия',
    data: 'переписки и обращения по каналам, клиентская база',
    result: 'видно, где теряются клиенты и выручка',
  },
  {
    n: '04',
    name: 'AI-аудитор команды',
    role: 'Результаты смен, квалификация сотрудников, индивидуальные зоны роста',
    lessons: 'урок 7',
    salary: '85–140 тыс ₽/мес',
    short: 'смены и квалификация',
    data: 'продажи и результаты смен по сотрудникам',
    result: 'понятно, кто как работает и кого чему учить',
  },
  {
    n: '05',
    name: 'AI-операционный менеджер',
    role: 'Регламенты, инструкции и контроль выполнения',
    lessons: 'урок 8',
    salary: null,
    short: 'регламенты и контроль',
    data: 'как устроена работа магазина — процессы и правила',
    result: 'магазин работает по написанному, а не по памяти владельца',
  },
  {
    n: '06',
    name: 'AI-штаб руководителя',
    role: 'Сводный план продаж, закупки, денег и смен к ключевому периоду магазина',
    lessons: 'урок 9',
    salary: null,
    short: 'план ключевого периода',
    data: 'наработки всех уроков: матрица, спрос, деньги, база, команда',
    result: 'единый план: продажи, закупка, деньги и смены',
  },
]

export default function SectionThree() {
  return (
    <section id="assistants" className="relative flex flex-col">
      <div className="relative flex flex-col gap-8 px-5 py-16 sm:px-8 md:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5">
            <Reveal static delay={60}>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
                — Как тратить меньше времени?
              </div>
            </Reveal>
            <h2 className="font-display max-w-md text-[clamp(32px,8.6vw,40px)] font-bold uppercase leading-[1.14] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
              <Reveal static as="span" delay={100} className="block">
                Шесть{' '}
                <span className="font-sans font-light normal-case italic tracking-normal">
                  своих
                </span>
              </Reveal>
              <Reveal static as="span" delay={220} className="block pl-8 sm:pl-16">
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

        {/* вводные абзацы — десктоп */}
        <Reveal static delay={160} className="hidden sm:block">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-[17px] leading-relaxed text-white/85 drop-shadow-md sm:text-sm">
              В крупном цветочном бизнесе эти задачи распределены между
              руководителями разных направлений. В небольшом магазине большую
              часть этой работы обычно выполняет сам владелец.
            </p>
            <p className="text-[17px] leading-relaxed text-white drop-shadow-md sm:text-sm">
              AI-помощники подключаются к CRM, кассам, банковским данным
              и Telegram, автоматически собирают и сводят информацию, проводят
              первичный анализ и показывают руководителю, что требует решения.{' '}
              <span className="text-white/70">
                Решение и ответственность остаются за руководителем.
              </span>
            </p>
          </div>
        </Reveal>

        {/* вводный абзац — мобильный, один */}
        <Reveal static className="sm:hidden">
          <p className="rounded-xl bg-[#0a0e14]/[0.93] p-4 text-[17px] leading-[1.55] text-white/90">
            В крупном бизнесе эти задачи распределены между разными
            руководителями. В небольшом магазине их обычно выполняет сам
            владелец. AI-помощники собирают данные, проводят первичный анализ
            и показывают, что требует решения.
          </p>
        </Reveal>

        {/* мобильный аккордеон помощников */}
        <Reveal static className="sm:hidden">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e14]/95 backdrop-blur-xl">
            {CREW.map((member, i) => (
              <details
                key={member.n}
                name="crew-m"
                open={i === 0}
                className="group border-t border-white/10 open:bg-[#45C1FF]/[0.04] first:border-t-0"
              >
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs text-white/40">
                    [ {member.n} ]
                  </span>
                  <span className="flex-1">
                    <span className="block text-[16px] font-medium leading-snug text-white">
                      {member.name}
                    </span>
                    <span className="block text-[13px] leading-snug text-white/55">
                      {member.short}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] uppercase text-white/45">
                    {member.lessons}
                  </span>
                  <Plus
                    size={18}
                    className="shrink-0 text-white/60 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="flex flex-col gap-4 px-5 pb-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                      Задачи
                    </span>
                    <p className="text-[16px] leading-[1.55] text-white/90">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                      С какими данными работает
                    </span>
                    <p className="text-[16px] leading-[1.55] text-white/80">
                      {member.data}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                      Результат для руководителя
                    </span>
                    <p className="text-[16px] leading-[1.55] text-white/90">
                      {member.result}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    {member.salary ? (
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                          роль на рынке
                        </span>
                        <span className="font-mono text-[15px] text-[#7AD4FF]">
                          {member.salary}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                          отдельной ставки нет
                        </span>
                        <span className="font-mono text-[13px] text-white/60">
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

        {/* карточки ролей — десктоп */}
        <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {CREW.map((member, i) => (
            <Reveal key={member.n} delay={140 + i * 60} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-[#0c1118]/90 p-5 backdrop-blur-sm">
                <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.1em] text-white/45">
                  <span>[ {member.n} ]</span>
                  <span className="uppercase">{member.lessons}</span>
                </div>
                <div className="font-display text-xl font-semibold leading-snug text-white sm:text-[17px]">
                  {member.name}
                </div>
                <p className="text-[17px] leading-relaxed text-white/75 sm:text-sm">
                  {member.role}
                </p>
                <div className="mt-auto border-t border-white/10 pt-3">
                  {member.salary ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                        роль на рынке
                      </span>
                      <span className="font-mono text-[15px] text-[#7AD4FF] sm:text-sm">
                        {member.salary}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                        отдельной ставки нет
                      </span>
                      <span className="font-mono text-[15px] text-white/60 sm:text-sm">
                        обычно — сам владелец
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-white/45 drop-shadow-md max-sm:rounded-xl max-sm:bg-[#0a0e14]/80 max-sm:p-3">
            Суммы — стоимость роли на рынке, а не обещание замены сотрудника ·
            отдельные вакансии hh.ru, Москва и СПб, август 2026
          </div>
        </Reveal>

        {/* Обычный день — десктоп */}
        <Reveal delay={220} className="hidden sm:block">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0c1118]/90 p-5 sm:p-6">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
              Как изменится обычный день
            </div>
            <p className="max-w-3xl text-[17px] leading-relaxed text-white/85 sm:text-sm">
              Вчера администраторы прислали выручку по каналам, обращения
              и причины отказов. Бухгалтерия добавила платежи, из учётной
              системы пришли остатки и списания.{' '}
              <span className="text-white">
                Утром AI-руководитель собрал один отчёт: где потеряли клиентов,
                что заканчивается, что рискуем списать, сколько денег находится
                в кассах и банках и какие платежи предстоят.
              </span>
            </p>
          </div>
        </Reveal>

        {/* Утро AI-руководителя — мобильная контрастная карточка */}
        <Reveal className="sm:hidden">
          <div className="flex flex-col gap-4 rounded-2xl border border-[#45C1FF]/30 bg-[#0c1118]/95 p-5 backdrop-blur-xl">
            <div className="font-display text-[18px] font-semibold leading-snug text-white">
              Как начинается утро AI-руководителя
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                Что поступило из систем
              </span>
              <p className="text-[16px] leading-[1.55] text-white/80">
                Вчера администраторы прислали выручку по каналам, обращения
                и причины отказов. Бухгалтерия добавила платежи, из учётной
                системы пришли остатки и списания.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
                Что собрал AI
              </span>
              <p className="text-[16px] leading-[1.55] text-white/90">
                Утром — один отчёт: где потеряли клиентов, что заканчивается,
                что рискуем списать, сколько денег находится в кассах и банках
                и какие платежи предстоят.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7AD4FF]">
                Решение — за владельцем
              </span>
              <p className="text-[16px] leading-[1.55] text-white">
                Что дозаказать, какие платежи провести и на что обратить
                внимание команды — решает руководитель.
              </p>
            </div>
          </div>
        </Reveal>

        {/* связка с программой — десктоп: абзац */}
        <Reveal delay={260} className="hidden sm:block">
          <p className="max-w-2xl text-[17px] leading-relaxed text-white drop-shadow-md sm:text-sm">
            9 уроков закрывают 10 главных вопросов собственника — силами
            шести AI-помощников. Каких — в программе ниже.
          </p>
        </Reveal>

        {/* связка с программой — мобильная итоговая строка */}
        <Reveal className="sm:hidden">
          <div className="rounded-xl border border-white/10 bg-[#0a0e14]/95 px-5 py-4 text-center font-mono text-[13px] uppercase leading-relaxed tracking-[0.1em] text-white">
            9 уроков → 10 вопросов собственника
            <span className="block text-[#7AD4FF]">
              → 6 AI-помощников
            </span>
          </div>
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
