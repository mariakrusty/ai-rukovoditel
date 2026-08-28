import { useEffect, useState } from 'react'
import { ArrowDown, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import { SIGNUP_URL } from '../config'

// Сообщения, которые помощники «присылают» по очереди.
// Цифры условные — как и всюду на странице.
const MESSAGES = [
  {
    from: 'AI-закупщик',
    time: 'сегодня, 8:00',
    text: 'Белой хризантемы 80 стеблей, лежит шестой день. Ещё два дня — спишем 9 600 ₽. Собрать моно по 1 890 и вынести на витрину?',
    yes: 'Да, делаем',
    no: 'Позже',
  },
  {
    from: 'AI-закупщик',
    time: 'сегодня, 8:00',
    text: 'Красная роза закончится завтра к обеду: уходит 40–45 стеблей в день, осталось 60. До поставки в четверг не хватит около 70 штук. Добрать у второго поставщика?',
    yes: 'Добрать',
    no: 'Позже',
  },
  {
    from: 'AI-казначей',
    time: 'сегодня, 9:10',
    text: 'Десятого аренда 180 000 ₽. На счетах 96 000, до десятого ждём ещё около 130 000. Хватает, но на закупку к выходным останется впритык.',
    yes: 'Учту',
    no: 'Детали',
  },
  {
    from: 'AI-руководитель продаж',
    time: 'вчера, 21:30',
    text: 'За неделю 11 диалогов остались без ответа — все между 19:00 и 21:00. Это примерно 40 000 ₽. Поставить вечернее дежурство по переписке?',
    yes: 'Поставить',
    no: 'Позже',
  },
  {
    from: 'AI-финансовый менеджер',
    time: 'вчера, 22:00',
    text: 'Выручка 68 400 ₽ — на 12% выше прошлого вторника. Но себестоимость 41% вместо обычных 34%: много ушло со скидкой. Заработали меньше, чем кажется.',
    yes: 'Разбор',
    no: 'Ок',
  },
  {
    from: 'AI-закупщик',
    time: 'сегодня, 8:00',
    text: 'Гипсофилы взяли втрое больше обычного, а продаж по ней нет четыре дня. Похоже, перезаказ: 14 000 ₽ лежат в холодильнике. Поставить её в букеты дня?',
    yes: 'В работу',
    no: 'Позже',
  },
  {
    from: 'AI-менеджер клиентской базы',
    time: 'сегодня, 10:00',
    text: 'У 14 клиентов в этом месяце годовщина первого заказа. Восемь из них не покупали больше полугода. Отправить каждому персональное предложение?',
    yes: 'Отправить',
    no: 'Список',
  },
  {
    from: 'AI-аудитор команды',
    time: 'вчера, 23:00',
    text: 'Смена Ани: 14 чеков, средний 2 340 ₽. Смена Кати в тот же день недели: 11 чеков, средний 3 100 ₽. Аня продаёт чаще, Катя — дороже. Собрать разбор для обеих?',
    yes: 'Собрать',
    no: 'Позже',
  },
  {
    from: 'AI-штаб руководителя',
    time: 'сегодня, 9:00',
    text: 'До 8 марта 12 дней. В прошлом году к этой дате было 40% предзаказов от итога, сейчас 22%. Запустить рассылку по тёплой базе?',
    yes: 'Запустить',
    no: 'Детали',
  },
  {
    from: 'AI-казначей',
    time: 'сегодня, 9:10',
    text: 'Поставщик дал отсрочку до пятницы. Если платить в последний день, 300 000 ₽ лежат на накопительном ещё четыре дня — около 900 ₽ сверху. Поставить оплату на пятницу?',
    yes: 'Поставить',
    no: 'Сразу',
  },
  {
    from: 'AI-руководитель продаж',
    time: 'вчера, 20:40',
    text: 'Вчера 9 обращений с сайта, 2 заказа. Пять отказов — «нет доставки сегодня вечером». Включить вечерний слот доставки по выходным?',
    yes: 'Включить',
    no: 'Позже',
  },
  {
    from: 'AI-финансовый менеджер',
    time: 'сегодня, 8:30',
    text: 'Списания за неделю 6 800 ₽ — вдвое ниже прошлой. Новый расчёт закупки работает. Держим объёмы или пробуем расширить матрицу?',
    yes: 'Держим',
    no: 'Разбор',
  },
]

// Перемешивание Фишера–Йетса: у каждого визита своя колода
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const DECK_SIZE = 5

function AssistantFeed() {
  // колода собирается один раз при открытии страницы
  const [deck] = useState(() => shuffle(MESSAGES).slice(0, DECK_SIZE))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % deck.length),
      5000,
    )
    return () => window.clearInterval(t)
  }, [deck.length])

  const msg = deck[index]

  return (
    <div className="w-full rounded-2xl rounded-tl-md border border-white/20 bg-black/60 p-4 backdrop-blur-sm">
      {/* key перезапускает анимацию входа на каждом сообщении */}
      <div key={index} className="msg-enter">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
          <span>{msg.from}</span>
          <span>{msg.time}</span>
        </div>
        <p className="min-h-[7.5rem] font-mono text-base leading-relaxed text-white sm:min-h-[6.75rem] sm:text-sm">
          {msg.text}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full border border-white/40 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
            {msg.yes}
          </span>
          <span className="rounded-full border border-white/15 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
            {msg.no}
          </span>
          <span className="ml-auto flex gap-1.5">
            {deck.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                  i === index ? 'bg-[#7AD4FF]' : 'bg-white/25'
                }`}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SectionOne() {
  return (
    <section
      id="main"
      className="relative flex min-h-screen flex-col justify-end supports-[height:100svh]:min-h-[100svh]"
    >
      <div className="relative flex flex-col gap-6 px-5 pb-14 pt-20 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-8 sm:pt-0 md:px-12 md:pb-20">
        {/* Название продукта — первым, обещание — второй строкой */}
        <h1 className="font-display max-w-2xl text-2xl font-bold uppercase leading-[1.16] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
          <Reveal as="span" delay={100} className="block">
            AI-руководитель
          </Reveal>
          <Reveal as="span" delay={220} className="block pl-5 sm:pl-12">
            <span className="font-sans font-light normal-case italic tracking-normal">
              цветочного магазина
            </span>
          </Reveal>
          <Reveal as="span" delay={340} className="hidden pl-8 sm:block sm:pl-20">
            // Меньше времени
          </Reveal>
          <Reveal as="span" delay={460} className="hidden pl-12 sm:block sm:pl-28">
            Больше прибыли
          </Reveal>
          {/* компактное обещание — только на телефоне */}
          <Reveal as="span" delay={340} className="mt-3 block sm:hidden">
            <span className="font-sans text-base font-normal normal-case tracking-normal text-white/90">
              Меньше ручных таблиц. Больше решений по прибыли.
            </span>
          </Reveal>
        </h1>

        <div className="flex w-full max-w-sm flex-col items-start sm:mt-48">
          <Reveal delay={400} className="order-1 hidden w-full sm:order-none sm:block">
            <div className="mb-5 flex w-full items-center justify-between font-mono text-white sm:mb-7">
              <span className="text-lg">( A )</span>
              <span className="text-xs text-white/70">[ 001 /004 ]</span>
            </div>
          </Reveal>

          {/* Что это и для кого — сразу, до примера */}
          <Reveal delay={480} className="order-2 w-full sm:order-none">
            <p className="mb-4 hidden text-base leading-relaxed text-white drop-shadow-md sm:block sm:text-sm">
              За 9 уроков вы соберёте шесть AI-помощников для ассортимента,
              закупки, денег, продаж, команды и процессов — и будете принимать
              решения по данным, а не по интуиции.
            </p>
            <p className="mb-3 text-base leading-relaxed text-white drop-shadow-md sm:hidden">
              За 9 уроков вы соберёте шесть AI-помощников и будете принимать
              решения по данным, а не по интуиции.
            </p>
          </Reveal>

          <Reveal delay={540} className="order-3 w-full sm:order-none">
            <p className="mb-4 text-[13px] leading-relaxed text-white/70 drop-shadow-md sm:mb-6">
              Подходит офлайн-магазинам, интернет-магазинам и смешанному
              формату: мы работаем не с сайтом или витриной, а с управленческими
              данными — продажами по каналам, обращениями, остатками, закупками
              и движением денег.
            </p>
          </Reveal>

          <Reveal delay={600} className="order-4 w-full sm:order-none">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="mb-6 block w-full rounded-full bg-[#45C1FF] text-[#04131F] shadow-[0_0_16px_rgba(69,193,255,0.9),0_0_48px_rgba(69,193,255,0.45)] hover:bg-[#7AD4FF] hover:shadow-[0_0_22px_rgba(122,212,255,1),0_0_64px_rgba(122,212,255,0.6)] px-8 py-3.5 text-center font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 sm:mb-7"
            >
              Записаться на курс
            </a>
            <div className="-mt-4 mb-5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[#7AD4FF] drop-shadow-md sm:-mt-5 sm:mb-6 sm:text-[11px]">
              [ старт — 5 октября 2026, 11:00 мск ]
            </div>
          </Reveal>

          {/* Живая лента — помощники пишут по очереди */}
          <Reveal delay={680} className="order-5 w-full sm:order-none">
            <AssistantFeed />
          </Reveal>
        </div>
      </div>

      <Reveal
        delay={760}
        className="absolute bottom-5 left-5 hidden sm:bottom-6 sm:left-8 sm:block md:left-12"
      >
        <button aria-label="Поделиться" className="text-white/80 transition-colors hover:text-white">
          <Share2 size={18} />
        </button>
      </Reveal>

      <Reveal
        delay={760}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6"
      >
        <ArrowDown size={18} className="animate-bounce text-white/80" />
      </Reveal>
    </section>
  )
}
