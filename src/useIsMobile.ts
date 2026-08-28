import { useEffect, useState } from 'react'

/** true на экранах уже 640px — для мобильных вариантов поведения */
export default function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => window.matchMedia('(max-width: 639px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}
