import { Manrope, Unbounded } from 'next/font/google'

export const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

export const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-display',
  preload: false,
  weight: ['500', '700'],
})

export const fontClassName = `${manrope.variable} ${unbounded.variable}`
