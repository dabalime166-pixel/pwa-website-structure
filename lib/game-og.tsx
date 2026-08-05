import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'
import sharp from 'sharp'
import { getGame } from '@/lib/games'
import type { Lang } from '@/lib/games'
import { SITE_ORIGIN } from '@/lib/seo'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

async function loadFont(weight: 500 | 700): Promise<ArrayBuffer | null> {
  try {
    const url =
      weight === 700
        ? 'https://cdn.jsdelivr.net/fontsource/fonts/unbounded@latest/latin-700-normal.woff'
        : 'https://cdn.jsdelivr.net/fontsource/fonts/manrope@latest/latin-500-normal.woff'
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

/** Load cover as PNG ArrayBuffer — Satori does not render WebP reliably. */
async function loadCoverPng(avatarPath?: string): Promise<ArrayBuffer | null> {
  const candidates: string[] = []
  if (avatarPath) {
    const rel = avatarPath.replace(/^\//, '')
    candidates.push(join(process.cwd(), 'public', rel))
  }
  candidates.push(join(process.cwd(), 'public', 'og-picture.jpg'))

  for (const filePath of candidates) {
    try {
      const input = await readFile(filePath)
      const png = await sharp(input)
        .resize(720, 960, { fit: 'cover', position: 'centre' })
        .png()
        .toBuffer()
      return png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength)
    } catch {
      // try next candidate
    }
  }

  try {
    const fallbackUrl = `${SITE_ORIGIN}/og-picture.jpg`
    const res = await fetch(fallbackUrl)
    if (!res.ok) return null
    const input = Buffer.from(await res.arrayBuffer())
    const png = await sharp(input).resize(720, 960, { fit: 'cover' }).png().toBuffer()
    return png.buffer.slice(png.byteOffset, png.byteOffset + png.byteLength)
  } catch {
    return null
  }
}

function copy(lang: Lang, gameName: string, provider: string, rtp?: string) {
  if (lang === 'ru') {
    return {
      brand: '1weapp',
      kicker: 'Бесплатное демо',
      title: gameName,
      line: [provider, rtp ? `RTP ${rtp}` : null, 'Без регистрации']
        .filter(Boolean)
        .join(' · '),
      sub: 'Играйте в браузере — без депозита и аккаунта',
      alt: `${gameName} демо бесплатно — обложка Open Graph`,
    }
  }
  return {
    brand: '1weapp',
    kicker: 'Free demo',
    title: gameName,
    line: [provider, rtp ? `RTP ${rtp}` : null, 'No signup']
      .filter(Boolean)
      .join(' · '),
    sub: 'Play in your browser — no deposit, no account',
    alt: `${gameName} free demo — Open Graph cover`,
  }
}

/** Branded 1200×630 Open Graph card for a game page. */
export async function renderGameOgImage(slug: string, lang: Lang) {
  const safeSlug = String(slug || '').trim()
  const game = safeSlug ? getGame(safeSlug) : undefined
  const name = game?.name ?? (safeSlug ? safeSlug.replace(/-/g, ' ') : 'Demo')
  const provider = game?.provider ?? '1weapp'
  const rtp = game?.rtp
  const t = copy(lang, name, provider, rtp)

  const [displayFont, bodyFont, coverPng] = await Promise.all([
    loadFont(700),
    loadFont(500),
    loadCoverPng(game?.avatar),
  ])
  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 700; style: 'normal' }[] = []
  if (displayFont) fonts.push({ name: 'OgDisplay', data: displayFont, weight: 700, style: 'normal' })
  if (bodyFont) fonts.push({ name: 'OgSans', data: bodyFont, weight: 500, style: 'normal' })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#0a0908',
          color: '#f4efe6',
          fontFamily: bodyFont ? 'OgSans' : 'sans-serif',
        }}
      >
        {/* Atmosphere wash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'radial-gradient(ellipse 80% 70% at 18% 40%, rgba(201,162,74,0.22), transparent 55%), radial-gradient(ellipse 60% 50% at 88% 10%, rgba(120,70,30,0.35), transparent 50%), linear-gradient(135deg, #12100e 0%, #0a0908 48%, #15110c 100%)',
          }}
        />

        {/* Soft grid texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.14,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(244,239,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(244,239,230,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '56px 64px',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          {/* Cover */}
          <div
            style={{
              display: 'flex',
              width: 360,
              height: 480,
              borderRadius: 28,
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 28px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,162,74,0.28)',
              background: '#1a1612',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {coverPng ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverPng as unknown as string}
                alt=""
                width={360}
                height={480}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  fontSize: 36,
                  fontWeight: 700,
                  color: 'rgba(201,162,74,0.55)',
                  fontFamily: displayFont ? 'OgDisplay' : 'sans-serif',
                }}
              >
                1weapp
              </div>
            )}
          </div>

          {/* Copy */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: 0,
              justifyContent: 'center',
              gap: 18,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 0,
                fontFamily: displayFont ? 'OgDisplay' : 'sans-serif',
                fontSize: 42,
                fontWeight: 700,
                letterSpacing: '-0.03em',
              }}
            >
              <span style={{ color: '#f4efe6' }}>1we</span>
              <span style={{ color: '#c9a24a' }}>app</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  padding: '8px 14px',
                  borderRadius: 8,
                  background: 'rgba(201,162,74,0.16)',
                  border: '1px solid rgba(201,162,74,0.4)',
                  color: '#e6c878',
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {t.kicker}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                fontFamily: displayFont ? 'OgDisplay' : 'sans-serif',
                fontSize: name.length > 28 ? 52 : name.length > 18 ? 60 : 68,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#faf6ee',
                maxWidth: 640,
              }}
            >
              {t.title}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 26,
                color: 'rgba(244,239,230,0.72)',
                letterSpacing: '0.01em',
              }}
            >
              {t.line}
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: 8,
                fontSize: 24,
                color: 'rgba(244,239,230,0.55)',
              }}
            >
              {t.sub}
            </div>
          </div>
        </div>

        {/* Bottom gold rule */}
        <div
          style={{
            position: 'absolute',
            left: 64,
            right: 64,
            bottom: 36,
            height: 2,
            display: 'flex',
            background: 'linear-gradient(90deg, rgba(201,162,74,0.75), rgba(201,162,74,0.05))',
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
    }
  )
}

export function gameOgAlt(slug: string, lang: Lang): string {
  const game = getGame(slug)
  const name = game?.name ?? String(slug || 'demo').replace(/-/g, ' ')
  return copy(lang, name, game?.provider ?? '1weapp', game?.rtp).alt
}
