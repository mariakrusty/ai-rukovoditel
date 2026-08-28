import { useEffect, useState } from 'react'

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

export default function AssistantFeed() {
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
    <div className="w-full rounded-2xl rounded-tl-md border border-white/20 bg-black/60 p-4 backdrop-blur-sm short:p-3">
      {/* key перезапускает анимацию входа на каждом сообщении */}
      <div key={index} className="msg-enter">
        <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-white/50">
          <span>{msg.from}</span>
          <span>{msg.time}</span>
        </div>
        <p className="min-h-[7.5rem] font-mono text-base leading-relaxed text-white sm:min-h-[6.75rem] sm:text-sm short:min-h-[5.5rem] short:leading-snug">
          {msg.text}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full border border-white/40 px-4 py-1 font-mono text-xs uppercase tracking-[0.12em] text-white">
            {msg.yes}
          </span>
          <span className="rounded-full border border-white/15 px-4 py-1 font-mono text-xs uppercase tracking-[0.12em] text-white/50">
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
