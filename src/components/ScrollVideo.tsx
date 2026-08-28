import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = `${import.meta.env.BASE_URL}hero.mp4`
const VIDEO_MOBILE_SRC = `${import.meta.env.BASE_URL}hero-mobile.mp4`
const POSTER_SRC = `${import.meta.env.BASE_URL}poster.png`
const POSTER_MOBILE_SRC = `${import.meta.env.BASE_URL}poster-mobile.png`
const MAX_WIDTH = 1280
const FPS = 24
const MIN_FRAMES = 30
const MAX_FRAMES = 120

function useIsMobile() {
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

/**
 * Мобильный фон: обычный видимый <video> — autoplay, muted,
 * playsinline, loop. Под ним вертикальный постер: если видео
 * не запустилось, посетитель видит кадр, а не черноту.
 * Затемнение — градиентом: верх слегка, центр почти чистый,
 * низ плотнее под текст.
 */
function MobileVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [srcIndex, setSrcIndex] = useState(0)
  // сперва пробуем вертикальный ролик; если его нет — обычный
  const sources = [VIDEO_MOBILE_SRC, VIDEO_SRC]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // ограничение движения: останавливаем на первом кадре
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const stop = () => video.pause()
      video.addEventListener('loadeddata', stop, { once: true })
      return () => video.removeEventListener('loadeddata', stop)
    }

    // энергосбережение iOS: автоплей заблокирован до первого жеста
    const kick = () => {
      video.play().catch(() => {})
    }
    const gestureKick = () => {
      if (video.paused) kick()
      else {
        window.removeEventListener('touchstart', gestureKick)
        window.removeEventListener('pointerdown', gestureKick)
        window.removeEventListener('scroll', gestureKick)
      }
    }
    window.addEventListener('touchstart', gestureKick, { passive: true })
    window.addEventListener('pointerdown', gestureKick, { passive: true })
    window.addEventListener('scroll', gestureKick, { passive: true })
    return () => {
      window.removeEventListener('touchstart', gestureKick)
      window.removeEventListener('pointerdown', gestureKick)
      window.removeEventListener('scroll', gestureKick)
    }
  }, [srcIndex])

  return (
    <>
      {/* постер-подложка: виден, пока видео не отдало кадр */}
      <img
        src={POSTER_MOBILE_SRC}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        src={sources[srcIndex]}
        poster={POSTER_MOBILE_SRC}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        onError={() => {
          if (srcIndex < sources.length - 1) setSrcIndex(srcIndex + 1)
        }}
        className="absolute inset-0 h-full w-full object-cover object-[38%_center]"
      />
      {/* градиент вместо сплошного затемнения */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/70" />
    </>
  )
}

/**
 * Десктопный фон: видео перематывается скроллом.
 * Кадры нарезаются в ImageBitmap и рисуются на канвасе;
 * пока нарезка идёт — рисуем сам <video>, до него — постер.
 */
function DesktopVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const framesRef = useRef<ImageBitmap[]>([])
  const posterRef = useRef<HTMLImageElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = POSTER_SRC
    img.onload = () => {
      posterRef.current = img
    }
  }, [])

  // ── нарезка кадров ──
  useEffect(() => {
    let cancelled = false
    let objectUrl: string | null = null
    const bitmaps: ImageBitmap[] = []

    const extract = async () => {
      try {
        const response = await fetch(VIDEO_SRC)
        if (cancelled) return
        const blob = await response.blob()
        if (cancelled) return

        objectUrl = URL.createObjectURL(blob)

        const video = document.createElement('video')
        video.muted = true
        video.playsInline = true
        video.preload = 'auto'
        video.src = objectUrl

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve()
          video.onerror = () => reject(new Error('metadata'))
        })
        if (cancelled) return

        const duration = video.duration
        if (!duration || !isFinite(duration)) return

        const scale = Math.min(1, MAX_WIDTH / video.videoWidth)
        const width = Math.round(video.videoWidth * scale)
        const height = Math.round(video.videoHeight * scale)

        const count = Math.min(
          MAX_FRAMES,
          Math.max(MIN_FRAMES, Math.round(duration * FPS)),
        )
        const span = Math.max(0, duration - 0.05)

        for (let i = 0; i < count; i++) {
          if (cancelled) return
          const time = count === 1 ? 0 : (i / (count - 1)) * span

          await new Promise<void>((resolve) => {
            const done = () => {
              video.removeEventListener('seeked', done)
              resolve()
            }
            video.addEventListener('seeked', done)
            video.currentTime = time
            window.setTimeout(done, 2000)
          })
          if (cancelled) return

          let bitmap: ImageBitmap
          try {
            bitmap = await createImageBitmap(video, {
              resizeWidth: width,
              resizeHeight: height,
              resizeQuality: 'high',
            })
          } catch {
            bitmap = await createImageBitmap(video)
          }
          if (cancelled) {
            bitmap.close()
            return
          }
          bitmaps.push(bitmap)
        }

        if (bitmaps.length < 10) return
        framesRef.current = bitmaps
        setReady(true)
      } catch {
        // остаёмся на живом видео + постере
      }
    }

    extract()

    return () => {
      cancelled = true
      framesRef.current = []
      bitmaps.forEach((b) => b.close())
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  // ── скролл, сглаживание, отрисовка ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let target = 0
    let smoothed = 0
    let lastIndex = -1
    let seeking = false
    let lastSeekTime = -1
    let posterDrawn = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      lastIndex = -1
      posterDrawn = false
    }

    const readScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      target = scrollable > 0 ? window.scrollY / scrollable : 0
      if (target < 0) target = 0
      if (target > 1) target = 1
    }

    const drawCover = (source: CanvasImageSource, sw: number, sh: number) => {
      if (!sw || !sh) return
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / sw, ch / sh)
      const dw = sw * scale
      const dh = sh * scale
      ctx.drawImage(source, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    const video = videoRef.current
    const onSeeked = () => {
      seeking = false
    }
    video?.addEventListener('seeked', onSeeked)

    const kick = () => {
      video
        ?.play()
        .then(() => video.pause())
        .catch(() => {})
    }
    video?.addEventListener('loadeddata', kick, { once: true })
    if (video && video.readyState >= 2) kick()

    const tick = () => {
      smoothed += (target - smoothed) * 0.1

      const frames = framesRef.current
      if (frames.length > 0) {
        const index = Math.min(
          frames.length - 1,
          Math.max(0, Math.round(smoothed * (frames.length - 1))),
        )
        if (index !== lastIndex) {
          lastIndex = index
          drawCover(frames[index], frames[index].width, frames[index].height)
        }
      } else if (
        video &&
        video.readyState >= 2 &&
        video.duration &&
        isFinite(video.duration)
      ) {
        const time = smoothed * Math.max(0, video.duration - 0.05)
        if (!seeking && Math.abs(time - lastSeekTime) > 0.001) {
          seeking = true
          lastSeekTime = time
          video.currentTime = time
        }
        drawCover(video, video.videoWidth, video.videoHeight)
        posterDrawn = false
      } else if (posterRef.current && !posterDrawn) {
        drawCover(
          posterRef.current,
          posterRef.current.naturalWidth,
          posterRef.current.naturalHeight,
        )
        posterDrawn = true
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    readScroll()
    smoothed = target
    raf = requestAnimationFrame(tick)

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', resize)
      video?.removeEventListener('seeked', onSeeked)
      video?.removeEventListener('loadeddata', kick)
    }
  }, [ready])

  return (
    <>
      {!ready && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          autoPlay
          preload="auto"
          className="pointer-events-none absolute h-px w-px opacity-0"
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full brightness-[0.55] contrast-[0.9]"
      />
      <div className="absolute inset-0 bg-black/40" />
    </>
  )
}

export default function ScrollVideo() {
  const isMobile = useIsMobile()
  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
      {isMobile ? <MobileVideo /> : <DesktopVideo />}
    </div>
  )
}
