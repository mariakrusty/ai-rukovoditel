import { Plus, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import useIsMobile from '../useIsMobile'
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
    tool: 'AI-ассистент «Штаб руководителя» — десять инструментов курса в одном отчёте',
    situation:
      'Данные магазина уже собираются девятью инструментами, но живут в разных отчётах и чатах: чтобы увидеть картину целиком, их приходится сводить вручную.',
    question:
      'Что происходит в магазине, какие показатели требуют внимания и какие решения нужно принять?',
    data: 'Наработки всех уроков: матрица, спрос, поставщики, деньги, клиентская база, команда и регламенты.',
    result:
      'Единый управленческий отчёт: данные ассортимента, закупки, денег, продаж, клиентов, команды и процессов сведены в одном месте — видно, что требует внимания и какие решения необходимо принять.',
    crew: 'AI-штаб руководителя',
  },
]

const OUTCOMES = [
  'ассортиментная матрица',
  'анализ спроса и конкурентов',
  'сравнение прайсов поставщиков',
  'расчёт закупки',
  'расчёт прибыли и расходов',
  'платёжный календарь',
  'анализ входящего потока и конверсии',
  'план работы с клиентской базой',
  'аудит квалификации команды',
  'регламент и контроль процесса',
]

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/58">
        {label}
      </span>
      <span className="text-[18px] leading-[28px] text-white/96 sm:text-[17px] sm:leading-[27px]">
        {children}
      </span>
    </div>
  )
}

export default function SectionFour() {
  const isMobile = useIsMobile()
  return (
    <section id="season" className="relative flex flex-col">
      <div className="relative mx-auto flex w-full max-w-[1340px] flex-col gap-6 px-5 py-16 sm:gap-10 sm:px-8 md:px-12">
        {/* верхняя строка: вопрос слева, счётчик справа */}
        <div className="flex items-baseline justify-between gap-4">
          <Reveal static delay={60}>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
              — С чего начать?
            </div>
          </Reveal>
          <Reveal static delay={100}>
            <div className="flex items-center gap-8 font-mono text-white sm:gap-16">
              <span className="text-lg">( D )</span>
              <span className="text-xs text-white/70">[ 004 /004 ]</span>
            </div>
          </Reveal>
        </div>

        {/* симметричная формула: 09 → 10, ниже — 6 ролей */}
        <div className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4 sm:gap-8">
            <Reveal static delay={140}>
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
            <Reveal static delay={220} className="hidden flex-1 self-center sm:block">
              <div className="flex flex-col items-center gap-3 px-2">
                <div className="relative h-px w-full bg-gradient-to-r from-white/10 via-white/35 to-[#45C1FF]/80">
                  <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-[#45C1FF]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/76">
                  объединены в 6 AI-помощников
                </span>
              </div>
            </Reveal>

            <Reveal static delay={300}>
              <div className="flex flex-col gap-1 text-right">
                <span className="font-display text-6xl font-bold leading-none tracking-tight text-[#7AD4FF] drop-shadow-lg sm:text-7xl md:text-8xl">
                  10
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  инструментов
                </span>
              </div>
            </Reveal>
          </div>

          {/* мобильная версия связки */}
          <Reveal static delay={220} className="sm:hidden">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/70">
              → объединены в 6 AI-помощников
            </div>
          </Reveal>

          {/* почему чисел два — на виду, не в раскрытии */}
          <div className="hidden sm:flex sm:items-start sm:justify-between sm:gap-8">
            <Reveal static delay={340}>
              <p className="max-w-xl text-[18px] leading-[28px] text-white/76 drop-shadow-md">
                Девятимесячная программа внедрения. Один инструмент в месяц,
                работа на данных своего магазина и поддержка между занятиями.
              </p>
            </Reveal>
            <Reveal static delay={380}>
              <p className="max-w-sm text-[18px] leading-[28px] text-white/96 drop-shadow-md sm:text-right">
                Каждый урок начинается с вопроса собственника и заканчивается
                работающим инструментом. Финансовый урок даёт сразу два:
                расчёт прибыли — и платёжный календарь.
              </p>
            </Reveal>
          </div>
        </div>

        {/* дуга сезона — на всю ширину, крупно */}
        <Reveal static delay={160} className="hidden sm:block">
          <p className="border-y border-white/12 py-5 text-[21px] leading-[1.5] text-white/96 drop-shadow-md">
            <span className="text-white/60">До высокого сезона</span> — товар,
            закупка и клиенты.{' '}
            <span className="text-white/60">В сезон</span> — контроль
            обращений. <span className="text-white/60">После</span> — деньги,
            команда и процессы.{' '}
            <span className="text-white/60">В финале</span> — единая система
            управления.
          </p>
        </Reveal>

        {/* дуга сезона — мобильная схема из трёх этапов */}
        <div className="flex flex-col gap-2 sm:hidden">
          {[
            ['До высокого сезона', 'Товар, поставщики, закупка и клиентская база.'],
            ['В сезон', 'Контроль входящих обращений и работы отдела продаж.'],
            ['После сезона', 'Прибыль, деньги, команда, процессы и единая система управления.'],
          ].map(([label, text]) => (
            <div
              key={label}
              className="flex flex-col gap-1 rounded-2xl bg-[#070c13]/[0.94] p-6"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#7AD4FF]">
                {label}
              </span>
              <span className="text-[18px] leading-[28px] text-white/96">
                {text}
              </span>
            </div>
          ))}
        </div>

        <Reveal static delay={200}>
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-white/58 drop-shadow-md max-sm:rounded-xl max-sm:bg-[#070c13]/80 max-sm:p-3 max-sm:text-white/76">
            Старт — 5 октября 2026 · финал — 15 июня 2027 · один урок
            в месяц · июль и август — каникулы · нажмите на урок, чтобы
            раскрыть
          </div>
        </Reveal>

        {/* Программа: пять колонок в строке, раскрытие в две */}
        <div className="flex flex-col rounded-[20px] bg-[#070c13]/[0.94] p-4 sm:p-6">
          {LESSONS.map((lesson) => (
            <Reveal static key={lesson.n}>
              <details
                {...(isMobile ? { name: 'lessons-m' } : {})}
                className="group border-t border-white/15 first:border-t-0 open:bg-[#45C1FF]/[0.04] open:shadow-[inset_2px_0_0_#45C1FF]"
              >
                <summary className="flex min-h-[64px] cursor-pointer list-none outline-none items-center gap-3 py-4 max-sm:min-h-[68px] max-sm:px-2 sm:gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[13px] text-white/58">
                    [ {lesson.n} ]
                  </span>
                  <span className="w-14 shrink-0 font-mono text-[13px] text-[#7AD4FF]/90">
                    {lesson.date}
                  </span>
                  <span className="hidden w-20 shrink-0 text-[14px] text-white/58 sm:block">
                    {lesson.block}
                  </span>
                  <span className="flex-1 text-[18px] font-medium leading-snug text-white/96 drop-shadow-md">
                    {lesson.name}
                  </span>
                  <span className="hidden w-56 shrink-0 text-right font-mono text-[13px] uppercase tracking-[0.08em] text-white/58 md:block">
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
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/58">
                        складывается в помощника
                      </span>
                      <span className="font-mono text-[13px] text-[#7AD4FF]">
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
        <div className="flex flex-col gap-3 sm:hidden">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60 drop-shadow-md">
            Что понадобится для работы
          </div>
          <div className="overflow-hidden rounded-[20px] bg-[#070c13]/[0.94]">
            {[
              {
                title: 'Техника и подписки',
                items: [
                  'Компьютер',
                  'Личный аккаунт ChatGPT с платным тарифом',
                  'Программирование не требуется',
                ],
              },
              {
                title: 'Данные магазина',
                items: [
                  'МойСклад, 1С или аналогичная цифровая система учёта',
                  'Идеального порядка в данных не требуется',
                  'На занятиях данные приводятся к единому виду',
                ],
              },
              {
                title: 'Безопасность',
                items: [
                  'Подключения выполняются в аккаунтах владельца',
                  'Каждому помощнику — только необходимый доступ',
                  'Отдельно разбираются права доступа и работа с финансовыми и клиентскими данными',
                ],
              },
            ].map((req) => (
              <details
                key={req.title}
                name="reqs-m"
                className="group border-t border-white/10 open:bg-[#45C1FF]/[0.04] first:border-t-0"
              >
                <summary className="flex min-h-[60px] cursor-pointer list-none outline-none items-center gap-3 px-6 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-[18px] font-medium text-white/96">
                    {req.title}
                  </span>
                  <Plus
                    size={18}
                    className="shrink-0 text-white/60 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <ul className="flex flex-col gap-2 px-6 pb-6">
                  {req.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-[18px] leading-[28px] text-white/96"
                    >
                      <span className="text-[#7AD4FF]">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className="hidden gap-6 rounded-[20px] bg-[#070c13]/[0.94] p-5 sm:grid sm:grid-cols-2 sm:gap-10 sm:p-[30px]">
          <Reveal static delay={80}>
            <div className="flex h-full flex-col gap-3">
              <div className="font-mono text-[14px] uppercase tracking-[0.14em] text-white/60">
                Что понадобится для работы
              </div>
              <p className="text-[17px] leading-[27px] text-white/96">
                Компьютер, личный аккаунт ChatGPT с платным тарифом и цифровая
                система учёта магазина — например, МойСклад, 1С или аналогичная
                система, в которой ведутся продажи, остатки и закупки.{' '}
                <span className="text-white">Программирование не требуется.</span>
              </p>
              <p className="text-[17px] leading-[27px] text-white/76">
                Идеального порядка в учётной системе не требуется: на уроках
                AI-помощники помогут привести данные к единому виду и покажут,
                чего не хватает для анализа.
              </p>
            </div>
          </Reveal>
          <Reveal static delay={140}>
            <div className="flex h-full flex-col gap-3 border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <div className="font-mono text-[14px] uppercase tracking-[0.14em] text-white/60">
                Безопасность данных
              </div>
              <p className="text-[17px] leading-[27px] text-white/96">
                Подключения настраиваются в аккаунтах владельца. Для каждого
                помощника используется только необходимый доступ. На курсе
                отдельно разбираются права доступа и безопасная работа
                с финансовыми и клиентскими данными.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Как устроено обучение: три главных показателя + условия */}
        <div className="flex flex-col gap-6 rounded-[20px] bg-[#070c13]/[0.94] p-6 sm:gap-8 sm:p-[30px]">
          <Reveal static>
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
              Как устроено обучение
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[
              [
                '9 месяцев',
                'Один урок в месяц. Всё остальное время — внедрение инструмента в своём магазине.',
              ],
              [
                '30–60 минут',
                'Каждый урок — живой прямой эфир. Запись остаётся в доступе.',
              ],
              [
                'Записи — год',
                'Доступ ко всем урокам до 5 октября 2027 — ровно год со старта.',
              ],
            ].map(([big, text]) => (
              <Reveal static key={big}>
                <div className="flex flex-col gap-2 border-t border-white/12 pt-4">
                  <span className="font-display text-[28px] font-bold uppercase leading-[1.06] tracking-tight text-white/96 sm:text-[32px]">
                    {big}
                  </span>
                  <span className="text-[17px] leading-[27px] text-white/76 sm:text-[17px]">
                    {text}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal static>
            <div className="flex flex-col gap-3 border-t border-white/12 pt-5">
              <p className="text-[17px] leading-[27px] text-white/96 sm:text-[18px] sm:leading-[28px]">
                Чат курса: на вопросы отвечает Мария лично.
              </p>
              <p className="text-[17px] leading-[27px] text-white/96 sm:text-[18px] sm:leading-[28px]">
                Домашек нет: внедрил — работает; не выходит — разбираем.
              </p>
              <p className="text-[17px] leading-[27px] text-white/96 sm:text-[18px] sm:leading-[28px]">
                Коллективная прокачка под кураторством автора, настройка идёт
                по урокам.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Итог курса: крупный тезис + четыре группы инструментов */}
        <div id="itog" className="flex flex-col gap-6 rounded-[20px] bg-[#070c13]/[0.94] p-6 sm:p-[30px]">
          <Reveal static>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/12 pb-4">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                Итог курса: система собрана
              </div>
              <div className="font-mono text-xs text-[#7AD4FF]">[ ИТОГ ]</div>
            </div>
          </Reveal>

          <Reveal static>
            <h3 className="max-w-4xl font-display text-[clamp(28px,7.4vw,32px)] font-bold uppercase leading-[1.08] tracking-tight text-white/96 sm:text-[40px] sm:leading-[1.06]">
              Работающая система,{' '}
              <span className="text-positive-signal">а не папка с промптами</span>
            </h3>
          </Reveal>

          <div className="overflow-hidden rounded-2xl">
            {[
              { title: 'Товар и закупка', items: OUTCOMES.slice(0, 4) },
              { title: 'Деньги', items: OUTCOMES.slice(4, 6) },
              { title: 'Продажи и клиенты', items: OUTCOMES.slice(6, 8) },
              { title: 'Команда и процессы', items: OUTCOMES.slice(8, 10) },
            ].map((groupItem) => (
              <details
                key={groupItem.title}
                name="outcomes-m"
                className="group border-t border-white/12 open:bg-[#45C1FF]/[0.04] first:border-t-0"
              >
                <summary className="flex min-h-[60px] cursor-pointer list-none outline-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden sm:px-6">
                  <span className="flex-1 text-[20px] font-medium text-white/96 sm:text-[21px]">
                    {groupItem.title}
                  </span>
                  <span className="shrink-0 font-mono text-[13px] uppercase text-[#7AD4FF]">
                    {groupItem.items.length} инструмента
                  </span>
                  <Plus
                    size={18}
                    className="shrink-0 text-white/60 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <div className="flex flex-col gap-3 px-5 pb-5 sm:px-6">
                  {groupItem.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded border border-[#45C1FF]/60 font-mono text-xs leading-none text-[#7AD4FF]">
                        ✓
                      </span>
                      <span className="text-[17px] leading-snug text-white/96 sm:text-[18px]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {/* финал: результат слева, действие справа */}
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <Reveal static delay={280} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl bg-[#0d1a26] p-6 sm:p-[30px]">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                  Главный результат
                </div>
                <div className="text-[24px] font-semibold uppercase leading-[1.1] text-positive-signal sm:text-[27px]">
                  Решения, которые влияют на прибыль
                </div>
                <p className="text-[17px] leading-[27px] text-white/96 sm:text-[18px] sm:leading-[28px]">
                  Руководитель меньше времени тратит на сбор таблиц и ручную
                  подготовку отчётов и больше — на решения, которые влияют
                  на прибыль магазина.
                </p>
              </div>
            </Reveal>

            <Reveal static delay={340} className="h-full">
              <div className="flex h-full flex-col items-start justify-center gap-3 rounded-2xl bg-[#081420] p-6 sm:p-[30px]">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#7AD4FF]">
                  Старт — 5 октября 2026, 11:00 мск
                </div>
                <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-white/76">
                  9 месяцев внедрения · записи до 5 октября 2027
                </div>
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 flex w-full min-h-[56px] items-center justify-center rounded-full bg-[#45C1FF] px-10 py-3.5 text-center font-mono text-[13px] font-semibold uppercase tracking-[0.15em] text-[#04131F] shadow-[0_0_16px_rgba(69,193,255,0.9),0_0_48px_rgba(69,193,255,0.45)] transition-all duration-300 hover:bg-[#7AD4FF] hover:shadow-[0_0_22px_rgba(122,212,255,1),0_0_64px_rgba(122,212,255,0.6)] sm:w-auto"
                >
                  Узнать стоимость и условия
                </a>
                <a
                  href={ASSISTANT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[13px] text-white/76 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
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
        <span className="font-mono text-xs text-white/58">
          Мария Андреева · 2026
        </span>
      </Reveal>
    </section>
  )
}
