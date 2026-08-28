import { Share2 } from 'lucide-react'
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
  },
  {
    n: '02',
    name: 'AI-финансовый менеджер',
    role: 'Прибыль, движение денег по банкам и кассам, платёжный календарь',
    lessons: 'урок 6',
    salary: '170–190 тыс ₽/мес',
  },
  {
    n: '03',
    name: 'AI-руководитель продаж',
    role: 'Обращения по каналам, купил/не купил, причины отказов, конверсия администраторов',
    lessons: 'уроки 4–5',
    salary: 'от 100 тыс ₽/мес',
  },
  {
    n: '04',
    name: 'AI-аудитор команды',
    role: 'Результаты смен, квалификация сотрудников, индивидуальные зоны роста',
    lessons: 'урок 7',
    salary: '85–140 тыс ₽/мес',
  },
  {
    n: '05',
    name: 'AI-операционный менеджер',
    role: 'Регламенты, инструкции и контроль выполнения',
    lessons: 'урок 8',
    salary: null,
  },
  {
    n: '06',
    name: 'AI-штаб руководителя',
    role: 'Сводный план продаж, закупки, денег и смен к ключевому периоду магазина',
    lessons: 'урок 9',
    salary: null,
  },
]

export default function SectionThree() {
  return (
    <section id="assistants" className="relative flex flex-col">
      <div className="relative flex flex-col gap-8 px-5 py-12 sm:px-8 sm:py-16 md:px-12">
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

          <Reveal static delay={340}>
            <div className="flex items-center gap-16 font-mono text-white md:gap-24">
              <span className="text-lg">( C )</span>
              <span className="text-xs text-white/70">[ 003 /004 ]</span>
            </div>
          </Reveal>
        </div>

        <Reveal static delay={160}>
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                      <span className="font-mono text-sm text-white/60">
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
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-white/45 drop-shadow-md">
            Суммы — стоимость роли на рынке, а не обещание замены сотрудника ·
            отдельные вакансии hh.ru, Москва и СПб, август 2026
          </div>
        </Reveal>

        {/* Один цельный сценарий обычного дня */}
        <Reveal delay={220}>
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

        <Reveal delay={260}>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white drop-shadow-md sm:text-sm">
            9 уроков закрывают 10 главных вопросов собственника — силами
            шести AI-помощников. Каких — в программе ниже.
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
