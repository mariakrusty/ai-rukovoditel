import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = `${import.meta.env.BASE_URL}hero.mp4`
const MAX_WIDTH = 1280
const FPS = 24
const MIN_FRAMES = 30
const MAX_FRAMES = 120

/**
 * Фон на весь экран: видео, перемотанное скроллом.
 * Сначала кадры вырезаются в ImageBitmap и рисуются на канвасе —
 * так перемотка идёт без рывков. Пока кадры не готовы,
 * показываем обычный <video> и двигаем его currentTime.
 */
export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const framesRef = useRef<ImageBitmap[]>([])
  const [ready, setReady] = useState(false)

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
            // страховка, если seeked не придёт
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

        framesRef.current = bitmaps
        setReady(true)
      } catch {
        // остаёмся на запасном <video>
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      lastIndex = -1
    }

    const readScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      target = scrollable > 0 ? window.scrollY / scrollable : 0
      if (target < 0) target = 0
      if (target > 1) target = 1
    }

    const drawCover = (bitmap: ImageBitmap) => {
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / bitmap.width, ch / bitmap.height)
      const dw = bitmap.width * scale
      const dh = bitmap.height * scale
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(bitmap, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    const video = videoRef.current
    const onSeeked = () => {
      seeking = false
    }
    video?.addEventListener('seeked', onSeeked)

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
          drawCover(frames[index])
        }
      } else if (video && video.duration && isFinite(video.duration)) {
        const time = smoothed * Math.max(0, video.duration - 0.05)
        if (!seeking && Math.abs(time - lastSeekTime) > 0.001) {
          seeking = true
          lastSeekTime = time
          video.currentTime = time
        }
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
    }
  }, [ready])

  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
      {!ready && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.55] contrast-[0.9]"
        />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full brightness-[0.55] contrast-[0.9]" />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
