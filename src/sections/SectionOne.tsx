import { ArrowDown, Share2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import AssistantFeed from '../components/AssistantFeed'
import { SIGNUP_URL } from '../config'

export default function SectionOne() {
  return (
    <section
      id="main"
      className="relative flex min-h-screen flex-col justify-end supports-[height:100svh]:min-h-[100svh]"
    >
      <div className="relative flex flex-col gap-6 px-5 pb-16 pt-20 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-8 sm:pt-0 md:px-12 md:pb-20 short:pb-6">
        {/* Название продукта — первым, обещание — второй строкой */}
        <h1 className="font-display max-w-3xl text-[clamp(26px,7.2vw,36px)] font-bold uppercase leading-[1.14] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl short:text-4xl short:leading-[1.1]">
          <Reveal as="span" delay={100} className="block">
            AI-руководитель
          </Reveal>
          <Reveal as="span" delay={220} className="block sm:pl-6">
            <span className="font-sans font-light normal-case italic tracking-normal">
              цветочного магазина
            </span>
          </Reveal>
          <Reveal as="span" delay={340} className="hidden pl-4 sm:block sm:pl-12">
            // Меньше времени
          </Reveal>
          <Reveal as="span" delay={460} className="hidden pl-6 sm:block sm:pl-16">
            Больше прибыли
          </Reveal>
          {/* одна короткая фраза о результате — только на телефоне */}
          <Reveal as="span" delay={340} className="mt-4 block sm:hidden">
            <span className="font-mono text-[13px] font-normal uppercase tracking-[0.12em] text-[#7AD4FF]">
              <span className="block">Меньше ручных таблиц</span>
              <span className="block">больше решений по прибыли</span>
            </span>
          </Reveal>
        </h1>

        <div className="flex w-full max-w-sm flex-col items-start sm:mt-36 short:mt-28">
          <Reveal delay={400} className="order-1 hidden w-full sm:order-none sm:block">
            <div className="mb-5 flex w-full items-center justify-between font-mono text-white sm:mb-7 short:mb-3">
              <span className="text-lg">( A )</span>
              <span className="text-xs text-white/70">[ 001 /004 ]</span>
            </div>
          </Reveal>

          {/* Что это и для кого — на десктопе; на мобильном уехало на экран 2 */}
          <Reveal delay={480} className="order-2 w-full sm:order-none">
            <p className="mb-4 hidden text-base leading-relaxed text-white drop-shadow-md sm:block sm:text-[17px] sm:leading-[27px] short:mb-2">
              За 9 уроков вы соберёте шесть AI-помощников для ассортимента,
              закупки, денег, продаж, команды и процессов — и будете принимать
              решения по данным, а не по интуиции.
            </p>
          </Reveal>

          <Reveal delay={540} className="order-3 hidden w-full sm:order-none sm:block">
            <p className="mb-4 text-[15px] leading-[1.6] text-white/76 drop-shadow-md sm:mb-6 short:mb-3">
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
              className="mb-6 block w-full rounded-full bg-[#45C1FF] text-[#04131F] shadow-[0_0_16px_rgba(69,193,255,0.9),0_0_48px_rgba(69,193,255,0.45)] hover:bg-[#7AD4FF] hover:shadow-[0_0_22px_rgba(122,212,255,1),0_0_64px_rgba(122,212,255,0.6)] px-8 py-3.5 text-center font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 sm:mb-7 short:mb-2"
            >
              Записаться на курс
            </a>
            <div className="-mt-4 mb-2 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#7AD4FF] drop-shadow-md sm:-mt-5 sm:mb-6 short:-mt-1 short:mb-3">
              [ старт — 5 октября 2026, 11:00 мск ]
            </div>
          </Reveal>

          {/* Живая лента — на десктопе в хиро, на мобильном ниже первого экрана */}
          <Reveal delay={680} className="order-5 hidden w-full sm:order-none sm:block">
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
