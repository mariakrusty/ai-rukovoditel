import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = `${import.meta.env.BASE_URL}hero.mp4`
const POSTER_SRC = `${import.meta.env.BASE_URL}poster.png`
const MAX_WIDTH = 1280
const FPS = 24
const MIN_FRAMES = 30
const MAX_FRAMES = 120

const IS_IOS =
  typeof navigator !== 'undefined' &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

/**
 * Фон на весь экран: видео, перемотанное скроллом.
 * Три уровня надёжности:
 * 1) кадры, нарезанные в ImageBitmap (десктоп) — плавный скраб;
 * 2) прямая отрисовка <video> на канвас (iOS и всё остальное);
 * 3) постер-кадр — рисуется мгновенно и до того, как видео оживёт.
 * На iOS нарезка не запускается вовсе (двойная загрузка ни к чему),
 * а декодер будится play→pause и повторно — по первому касанию.
 */
export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const framesRef = useRef<ImageBitmap[]>([])
  const posterRef = useRef<HTMLImageElement | null>(null)
  const [ready, setReady] = useState(false)

  // ── постер: гарантированная картинка с первой секунды ──
  useEffect(() => {
    const img = new Image()
    img.src = POSTER_SRC
    img.onload = () => {
      posterRef.current = img
    }
  }, [])

  // ── нарезка кадров (не на iOS) ──
  useEffect(() => {
    if (IS_IOS) return
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
    let videoAlive = false
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

    const drawCover = (
      source: CanvasImageSource,
      sw: number,
      sh: number,
    ) => {
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

    // будим декодер: iOS не отдаёт кадр, пока видео не «поиграло»
    const kick = () => {
      if (!video) return
      video
        .play()
        .then(() => {
          video.pause()
          videoAlive = true
        })
        .catch(() => {
          /* энергосбережение — ждём жеста */
        })
    }
    const gestureKick = () => {
      if (!videoAlive) kick()
      if (videoAlive) {
        window.removeEventListener('touchstart', gestureKick)
        window.removeEventListener('pointerdown', gestureKick)
        window.removeEventListener('scroll', gestureKick)
      }
    }
    video?.addEventListener('loadeddata', kick, { once: true })
    if (video && video.readyState >= 2) kick()
    // первый жест пользователя снимает запрет автоплея (Low Power Mode)
    window.addEventListener('touchstart', gestureKick, { passive: true })
    window.addEventListener('pointerdown', gestureKick, { passive: true })
    window.addEventListener('scroll', gestureKick, { passive: true })

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
        // видео ещё не ожило — держим постер, чтобы фон не был чёрным
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
      window.removeEventListener('touchstart', gestureKick)
      window.removeEventListener('pointerdown', gestureKick)
      window.removeEventListener('scroll', gestureKick)
      video?.removeEventListener('seeked', onSeeked)
      video?.removeEventListener('loadeddata', kick)
    }
  }, [ready])

  // ── отладка: ?debug=1 показывает состояние прямо на странице ──
  const [debugInfo, setDebugInfo] = useState('')
  useEffect(() => {
    if (!location.search.includes('debug=1')) return
    const t = window.setInterval(() => {
      const v = videoRef.current
      setDebugInfo(
        [
          `ios:${IS_IOS ? 1 : 0}`,
          `frames:${framesRef.current.length}`,
          `video:${v ? `rs${v.readyState} d${isFinite(v.duration) ? v.duration.toFixed(1) : '?'} err${v.error ? v.error.code : 0}` : 'нет'}`,
          `poster:${posterRef.current ? 'ок' : 'нет'}`,
          `bitmap:${typeof createImageBitmap !== 'undefined' ? 'да' : 'нет'}`,
        ].join(' · '),
      )
    }, 700)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
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
      {debugInfo && (
        <div className="absolute bottom-2 left-2 z-50 rounded bg-black/80 px-2 py-1 font-mono text-[10px] text-lime-300">
          {debugInfo}
        </div>
      )}
    </div>
  )
}
