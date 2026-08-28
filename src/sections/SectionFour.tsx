import { Plus, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import { ASSISTANT_URL, SIGNUP_URL } from '../config'

type Lesson = {
  n: string
  date: string
  block: string
  name: string
  tool: string
  situation: string
  question: string
  data: string
  result: string
  crew: string
}

// Содержание — из каркаса курса, по схеме:
// знакомая ситуация → вопрос руководителя → инструмент → данные → результат
const LESSONS: Lesson[] = [
  {
    n: '01',
    date: '5 окт',
    block: 'Товар',
    name: 'Ассортиментная матрица',
    tool: 'AI-конструктор «Ассортиментная матрица»',
    situation:
      'Ассортимент растёт стихийно: что-то закупают по привычке, что-то просит шеф-флорист. Нужных позиций не хватает, а часть товара регулярно списывается.',
    question:
      'Что должно постоянно находиться в магазине и в каком количестве?',
    data: 'Список позиций, категории, закупочные и розничные цены, поставщики.',
    result:
      'Матрица по категориям, ценовым сегментам и обязательному наличию — со статусами «оставить, наблюдать, тестировать, сократить, вывести» и правилами пересмотра.',
    crew: 'AI-закупщик',
  },
  {
    n: '02',
    date: '11 ноя',
    block: 'Товар',
    name: 'Спрос и конкуренты',
    tool: 'AI-ассистент «Аналитик спроса и ассортимента»',
    situation:
      'Магазин видит только состоявшиеся продажи. Запросы, которые не закончились покупкой, остаются в переписках и памяти сотрудников.',
    question:
      'Что покупатели хотят купить, чего не находят и какие позиции пора изменить или вывести?',
    data: 'Продажи, обращения и отказы, остатки, списания; открытые данные конкурентов.',
    result:
      'Отчёт «спрос — покупка — отказ», сравнение ассортимента, ценовых диапазонов и предложений конкурентов, незакрытые запросы и список позиций для теста.',
    crew: 'AI-закупщик',
  },
  {
    n: '03',
    date: '11 дек',
    block: 'Товар',
    name: 'Закупка и анализ поставщиков',
    tool: 'AI-ассистент «Закупщик»',
    situation:
      'Прайсы приходят в разных форматах, один сорт у поставщиков записан по-разному. Заказывают на глаз — то не хватает, то списываем.',
    question:
      'Что, сколько и у кого купить, чтобы закрыть спрос, не переплатить и не получить списания?',
    data: 'Прайсы поставщиков, остатки, подтверждённые заказы, продажи и списания прошлых недель.',
    result:
      'Сравнение одного сорта, длины и производителя у разных поставщиков и плантаций — и проект закупки: что, сколько, у кого и почему, в минимальном, базовом и максимальном вариантах.',
    crew: 'AI-закупщик',
  },
  {
    n: '04',
    date: '15 янв',
    block: 'Продажи',
    name: 'Клиентская база',
    tool: 'AI-ассистент «Менеджер клиентской базы»',
    situation:
      'Клиенты живут в переписках и телефонах сотрудников. О базе вспоминают перед праздником — и платят за привлечение тех, кто уже покупал.',
    question:
      'Кому, когда и с каким поводом напомнить о магазине, чтобы выросли повторные покупки?',
    data: 'История заказов, каналы, поводы покупок, согласия на связь.',
    result:
      'Сегменты (постоянные, новые, ценные, уснувшие), покупатели прошлых 14 февраля и 8 Марта, календарь поводов и план повторных продаж к высокому сезону.',
    crew: 'AI-руководитель продаж',
  },
  {
    n: '05',
    date: '8 фев',
    block: 'Продажи',
    name: 'Входящий поток',
    tool: 'AI-ассистент «Руководитель продаж»',
    situation:
      'Администраторы сообщают выручку, но сколько человек обратилось, кто купил и почему остальные ушли — неизвестно.',
    question:
      'Где магазин теряет клиентов и кто не доводит обращение до покупки?',
    data: 'Обращения по каналам, статусы «купил / не купил», причины отказов, суммы.',
    result:
      'Полный входящий поток: конверсия по каналам и сотрудникам, причины отказов и потерянная выручка в рублях. Первая боевая проверка — уже 14 февраля.',
    crew: 'AI-руководитель продаж',
  },
  {
    n: '06',
    date: '15 мар',
    block: 'Деньги',
    name: 'Прибыль, расходы и платёжный календарь',
    tool: 'AI-ассистенты «Финансовый аналитик» и «Казначей» — два инструмента за один урок',
    situation:
      'Главный денежный период года только что прошёл. Выручка 8 Марта известна, а что осталось после списаний, скидок, зарплат и комиссий — нет. Деньги разложены по кассам и банкам, впереди платежи поставщикам.',
    question:
      'Выручка 8 Марта известна. А сколько магазин действительно заработал и хватит ли этих денег на ближайшие платежи?',
    data: 'Продажи, себестоимость, закупки, списания, зарплаты, аренда, комиссии; остатки по счетам и кассам, обязательные платежи и их сроки.',
    result:
      'Разбор высокого сезона на свежих цифрах: прибыль, маржинальность, точка безубыточности — и платёжный календарь с прогнозом на 7, 14 и 30 дней и предупреждением о кассовом разрыве.',
    crew: 'AI-финансовый менеджер',
  },
  {
    n: '07',
    date: '15 апр',
    block: 'Команда',
    name: 'Аудит и квалификация команды',
    tool: 'AI-ассистент «Аудитор команды»',
    situation:
      'Высокий сезон показал команду в деле: кто продавал, кто раздавал скидки, кто терял обращения. Пока всё свежо, оценка идёт не по ощущениям, а по фактам двух праздников.',
    question:
      'Кто умеет работать по стандартам, где пробелы и чему доучить каждого?',
    data: 'Результаты смен за 14 февраля и 8 Марта, продажи по сотрудникам, ошибки, возвраты, регламенты магазина.',
    result:
      'Карта компетенций, профиль сильных и слабых сторон каждого, план дообучения и основа для KPI.',
    crew: 'AI-аудитор команды',
  },
  {
    n: '08',
    date: '15 мая',
    block: 'Процессы',
    name: 'Регламенты',
    tool: 'AI-конструктор «Процессы, регламенты и чек-листы»',
    situation:
      'Ошибки высокого сезона и выводы по команде ещё свежи, но живут в голове и чатах. Если их не записать — к следующему сезону всё повторится.',
    question:
      'Как перестать держать весь магазин в голове и повторять одно и то же?',
    data: 'Переписки и голосовые руководителя, ошибки и выводы сезона, типовые задачи.',
    result:
      'Один ключевой процесс полностью на контроле: регламент, инструкции по ролям, чек-листы смены и контрольные точки — на основе фактических проблем, а не «потому что надо».',
    crew: 'AI-операционный менеджер',
  },
  {
    n: '09',
    date: '15 июн',
    block: 'Сборка',
    name: 'Сводный AI-штаб руководителя',
    tool: 'AI-ассистент «Штаб руководителя» — все инструменты курса в одном плане',
    situation:
      'К значимому периоду — 1 сентября, Дню учителя, Дню матери, Новому году — готовятся в последний момент: закупка дорожает, график собирается на бегу, после праздника остаётся полный холодильник при высокой выручке.',
    question:
      'Сколько продадим, сколько закупим, сколько людей поставим и хватит ли денег, чтобы пройти ключевой период без хаоса и лишних остатков?',
    data: 'Наработки всех уроков: матрица, спрос, поставщики, деньги, клиентская база, команда и регламенты — плюс продажи прошлых сезонов и предзаказы.',
    result:
      'Единый управленческий план: три сценария продаж, закупка, график команды, бюджет и контрольные точки. Каждый участник собирает его под ближайший важный период своего магазина.',
    crew: 'AI-штаб руководителя',
  },
]

const OUTCOMES = [
  'собрана ассортиментная матрица',
  'виден спрос, который магазин закрывает и теряет',
  'прайсы поставщиков приведены к единому виду',
  'подготовлен расчёт закупки',
  'понятны прибыль и расходы',
  'ведётся платёжный календарь',
  'считается входящий поток и конверсия',
  'клиентская база превращена в план повторных продаж',
  'команда проверяется по единым критериям',
  'один ключевой процесс описан и поставлен на контроль',
  'подготовлен единый план ближайшего праздника',
]

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
        {label}
      </span>
      <span className="text-base leading-relaxed text-white/85 sm:text-sm">
        {children}
      </span>
    </div>
  )
}

export default function SectionFour() {
  return (
    <section id="season" className="relative flex flex-col">
      <div className="relative mx-auto flex w-full max-w-[1340px] flex-col gap-6 px-5 py-12 sm:gap-10 sm:px-8 sm:py-20 md:px-12">
        {/* верхняя строка: вопрос слева, счётчик справа */}
        <div className="flex items-baseline justify-between gap-4">
          <Reveal delay={60}>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
              — С чего начать?
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-8 font-mono text-white sm:gap-16">
              <span className="text-lg">( D )</span>
              <span className="text-xs text-white/70">[ 004 /004 ]</span>
            </div>
          </Reveal>
        </div>

        {/* симметричная формула: 09 → 10, ниже — 6 ролей */}
        <div className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4 sm:gap-8">
            <Reveal delay={140}>
              <div className="flex flex-col gap-1">
                <span className="font-display text-6xl font-bold leading-none tracking-tight text-white drop-shadow-lg sm:text-7xl md:text-8xl">
                  09
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  уроков
                </span>
              </div>
            </Reveal>

            {/* линия-стрелка между числами */}
            <Reveal delay={220} className="hidden flex-1 self-center sm:block">
              <div className="flex flex-col items-center gap-3 px-2">
                <div className="relative h-px w-full bg-gradient-to-r from-white/10 via-white/35 to-[#45C1FF]/80">
                  <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-[#45C1FF]" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                  закрывают 6 AI-помощников
                </span>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col gap-1 text-right">
                <span className="font-display text-6xl font-bold leading-none tracking-tight text-[#7AD4FF] drop-shadow-lg sm:text-7xl md:text-8xl">
                  10
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  вопросов собственника
                </span>
              </div>
            </Reveal>
          </div>

          {/* мобильная версия связки */}
          <Reveal delay={220} className="sm:hidden">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              → закрывают 6 AI-помощников
            </div>
          </Reveal>

          {/* почему чисел два — на виду, не в раскрытии */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <Reveal delay={340}>
              <p className="max-w-xl text-base leading-relaxed text-white/85 drop-shadow-md sm:text-sm">
                Девятимесячная программа внедрения. Один инструмент в месяц,
                работа на данных своего магазина и поддержка между занятиями.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <p className="max-w-sm text-base leading-relaxed text-white drop-shadow-md sm:text-right sm:text-sm">
                Каждый урок начинается с вопроса собственника. Финансовый
                закрывает сразу два: сколько заработали — и хватит ли
                на платежи.
              </p>
            </Reveal>
          </div>
        </div>

        {/* дуга сезона — на всю ширину, крупно */}
        <Reveal delay={160}>
          <p className="border-y border-white/15 py-5 text-base leading-relaxed text-white drop-shadow-md sm:text-lg">
            <span className="text-white/60">До высокого сезона</span> — товар,
            закупка и клиенты.{' '}
            <span className="text-white/60">В сезон</span> — контроль
            обращений. <span className="text-white/60">После</span> — деньги,
            команда и процессы.{' '}
            <span className="text-white/60">В финале</span> — единая система
            управления.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 drop-shadow-md sm:text-xs">
            Старт — 5 октября 2026 · финал — 15 июня 2027 · один урок
            в месяц · июль и август — каникулы · нажмите на урок, чтобы
            раскрыть
          </div>
        </Reveal>

        {/* Программа: пять колонок в строке, раскрытие в две */}
        <div className="flex flex-col rounded-2xl bg-black/60 p-4 sm:bg-black/45 sm:p-6">
          {LESSONS.map((lesson, i) => (
            <Reveal key={lesson.n} delay={100 + i * 50}>
              <details className="group border-t border-white/15 first:border-t-0">
                <summary className="flex items-baseline gap-3 py-4 sm:gap-4">
                  <span className="font-mono text-xs text-white/50">
                    [ {lesson.n} ]
                  </span>
                  <span className="w-14 shrink-0 font-mono text-xs text-[#7AD4FF]/90">
                    {lesson.date}
                  </span>
                  <span className="hidden w-20 shrink-0 text-sm text-white/50 sm:block">
                    {lesson.block}
                  </span>
                  <span className="flex-1 text-base font-medium leading-snug text-white drop-shadow-md sm:text-[15px]">
                    {lesson.name}
                  </span>
                  <span className="hidden w-56 shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.08em] text-white/45 md:block">
                    {lesson.crew}
                  </span>
                  <Plus
                    size={16}
                    className="shrink-0 self-center text-white/60 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="grid gap-x-12 gap-y-4 pb-6 sm:grid-cols-2 sm:pl-24 sm:pr-8">
                  <div className="flex flex-col gap-4">
                    <Field label="Знакомая ситуация">{lesson.situation}</Field>
                    <Field label="Вопрос руководителя">{lesson.question}</Field>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Field label="Создадим">{lesson.tool}</Field>
                    <Field label="Какие данные передадим">{lesson.data}</Field>
                    <Field label="Результат урока">{lesson.result}</Field>
                    <div className="flex items-center gap-2 border-t border-white/10 pt-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                        складывается в помощника
                      </span>
                      <span className="font-mono text-xs text-[#7AD4FF]">
                        {lesson.crew}
                      </span>
                    </div>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        {/* Требования и безопасность — две равные колонки */}
        <div className="grid gap-6 rounded-2xl border border-white/10 bg-[#0c1118]/90 p-5 sm:grid-cols-2 sm:gap-10 sm:p-6">
          <Reveal delay={80}>
            <div className="flex h-full flex-col gap-3">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                Что понадобится для работы
              </div>
              <p className="text-base leading-relaxed text-white/85 sm:text-sm">
                Компьютер, личный аккаунт ChatGPT с платным тарифом и цифровая
                система учёта магазина — например, МойСклад, 1С или аналогичная
                система, в которой ведутся продажи, остатки и закупки.{' '}
                <span className="text-white">Программирование не требуется.</span>
              </p>
              <p className="text-base leading-relaxed text-white/85 sm:text-sm">
                Идеального порядка в учётной системе не требуется: на уроках
                AI-помощники помогут привести данные к единому виду и покажут,
                чего не хватает для анализа.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex h-full flex-col gap-3 border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                Безопасность данных
              </div>
              <p className="text-base leading-relaxed text-white/85 sm:text-sm">
                Подключения настраиваются в аккаунтах владельца. Для каждого
                помощника используется только необходимый доступ. На курсе
                отдельно разбираются права доступа и безопасная работа
                с финансовыми и клиентскими данными.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Как устроено обучение — три колонки */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0c1118]/90 p-5 sm:p-6">
          <Reveal delay={80}>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
              Как устроено обучение
            </div>
          </Reveal>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={120}>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm text-[#7AD4FF]">9 месяцев</span>
                <span className="text-base leading-relaxed text-white/80 sm:text-sm">
                  Один урок в месяц. Всё остальное время — внедрение
                  инструмента в вашем магазине.
                </span>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm text-[#7AD4FF]">30–60 минут</span>
                <span className="text-base leading-relaxed text-white/80 sm:text-sm">
                  Каждый урок — живой прямой эфир. Запись остаётся
                  в доступе.
                </span>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm text-[#7AD4FF]">записи — год</span>
                <span className="text-base leading-relaxed text-white/80 sm:text-sm">
                  Доступ ко всем урокам до 5 октября 2027 — ровно год
                  со старта.
                </span>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm text-[#7AD4FF]">чат с автором</span>
                <span className="text-base leading-relaxed text-white/80 sm:text-sm">
                  Вопросы по внедрению — в чат курса. На них отвечает
                  Мария лично.
                </span>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm text-[#7AD4FF]">без домашек</span>
                <span className="text-base leading-relaxed text-white/80 sm:text-sm">
                  Практика — внедрение инструмента на данных своего магазина.
                  Если не получается — разбираем в чате.
                </span>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-sm text-[#7AD4FF]">кураторство</span>
                <span className="text-base leading-relaxed text-white/80 sm:text-sm">
                  Коллективная прокачка под кураторством автора. Настройка
                  идёт по урокам, шаг за шагом.
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Итог курса — чек-лист, результат слева и запись справа */}
        <div id="itog" className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#0c1118]/90 p-5 sm:p-6">
          <Reveal delay={100}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
              <div className="font-display text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                Итог курса: система собрана
              </div>
              <div className="font-mono text-xs text-[#7AD4FF]">[ ИТОГ ]</div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-sm">
              Участник заканчивает курс не папкой с десятью промптами,
              а работающей системой:
            </p>
          </Reveal>

          <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {OUTCOMES.map((item, i) => (
              <Reveal key={i} delay={180 + i * 30}>
                <div className="flex items-center gap-3">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded border border-[#45C1FF]/60 font-mono text-[11px] leading-none text-[#7AD4FF] shadow-[0_0_10px_rgba(69,193,255,0.35)]">
                    ✓
                  </span>
                  <span className="text-base leading-snug text-white/90 sm:text-sm">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* финал: результат слева, действие справа */}
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <Reveal delay={280} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-xl bg-[#45C1FF]/10 p-4 sm:p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7AD4FF]">
                  Главный результат
                </div>
                <p className="text-base font-medium leading-relaxed text-white sm:text-lg">
                  Руководитель меньше времени тратит на сбор таблиц и ручную
                  подготовку отчётов и больше — на решения, которые влияют
                  на прибыль магазина.
                </p>
              </div>
            </Reveal>

            <Reveal delay={340} className="h-full">
              <div className="flex h-full flex-col items-start justify-center gap-3 rounded-xl border border-[#45C1FF]/40 bg-[#45C1FF]/5 p-4 sm:p-5">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#7AD4FF]">
                  Старт — 5 октября 2026, 11:00 мск
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
                  9 месяцев внедрения · записи до 5 октября 2027
                </div>
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block w-full rounded-full bg-[#45C1FF] px-10 py-3.5 text-center font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[#04131F] shadow-[0_0_16px_rgba(69,193,255,0.9),0_0_48px_rgba(69,193,255,0.45)] transition-all duration-300 hover:bg-[#7AD4FF] hover:shadow-[0_0_22px_rgba(122,212,255,1),0_0_64px_rgba(122,212,255,0.6)] sm:w-auto"
                >
                  Узнать стоимость и условия
                </a>
                <a
                  href={ASSISTANT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                >
                  Остались вопросы? Спросите ассистента Марии
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal
        delay={980}
        className="absolute bottom-5 left-5 hidden sm:bottom-6 sm:left-8 sm:block md:left-12"
      >
        <button
          aria-label="Поделиться"
          className="text-white/80 transition-colors hover:text-white"
        >
          <Share2 size={18} />
        </button>
      </Reveal>

      <Reveal
        delay={980}
        className="absolute bottom-5 right-5 sm:bottom-6 sm:right-8 md:right-12"
      >
        <span className="font-mono text-[10px] text-white/40 sm:text-xs">
          Мария Андреева · 2026
        </span>
      </Reveal>
    </section>
  )
}
