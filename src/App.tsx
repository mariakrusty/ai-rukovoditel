import { useEffect } from 'react'
import ScrollVideo from './components/ScrollVideo'
import Navbar from './components/Navbar'
import SectionOne from './sections/SectionOne'
import SectionTwo from './sections/SectionTwo'
import SectionThree from './sections/SectionThree'
import SectionFour from './sections/SectionFour'

export default function App() {
  // Якорь из адреса (#assistants и т.п.) отрабатываем после того,
  // как React отрисовал страницу — иначе браузер ищет пустой DOM.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView()
    }, 120)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="relative">
      <ScrollVideo />
      <Navbar />
      <main>
        <SectionOne />
        <div aria-hidden className="h-[180px] sm:h-[38vh]" />
        <SectionTwo />
        <div aria-hidden className="h-[140px] sm:h-[26vh]" />
        <SectionThree />
        <div aria-hidden className="h-[140px] sm:h-[26vh]" />
        <SectionFour />
      </main>
    </div>
  )
}
