'use client'

import { Star } from 'lucide-react'

export type QuoteItem = {
  quote: string
  attribution: string
  role?: string
  /** Optional headline/title above the quote */
  title?: string
  /** Star rating out of 5; only shown when defined */
  rating?: number
  /** Display date, e.g. "March 2024" or "Q2 2023"; only shown when defined */
  date?: string
}

type QuoteCarouselProps = {
  quotes: QuoteItem[]
}

const FIGMA_HIGHLIGHT_COLORS = [
  { border: 'border-l-figma-red', star: 'fill-figma-red text-figma-red' },
  { border: 'border-l-figma-orange', star: 'fill-figma-orange text-figma-orange' },
  { border: 'border-l-figma-purple', star: 'fill-figma-purple text-figma-purple' },
  { border: 'border-l-figma-blue', star: 'fill-figma-blue text-figma-blue' },
  { border: 'border-l-figma-green', star: 'fill-figma-green text-figma-green' },
] as const

const NUM_COLORS = FIGMA_HIGHLIGHT_COLORS.length

/** Pick a color not in the forbidden set */
function pickColorAvoiding(avoid: Set<number>): number {
  for (let c = 0; c < NUM_COLORS; c++) {
    if (!avoid.has(c)) return c
  }
  return 0
}

/** Returns color indices so no two adjacent cards (or first/last at seam) share a color. Also avoids same color within 2 positions. */
function getNoRepeatColorIndices(n: number): number[] {
  const indices: number[] = []
  for (let i = 0; i < n; i++) {
    const avoid = new Set<number>()
    if (i > 0) avoid.add(indices[i - 1])
    if (i > 1) avoid.add(indices[i - 2])
    indices.push(pickColorAvoiding(avoid))
  }
  if (n > 1) {
    const avoid = new Set([indices[0], indices[n - 2]])
    if (n > 2) avoid.add(indices[1])
    if (avoid.has(indices[n - 1])) {
      indices[n - 1] = pickColorAvoiding(avoid)
    }
  }
  return indices
}

function QuoteCard({ item, colorIndex }: { item: QuoteItem; colorIndex: number }) {
  const rating = item.rating != null ? Math.min(5, Math.max(0, item.rating)) : null
  const { border: borderColor, star: starColor } = FIGMA_HIGHLIGHT_COLORS[colorIndex % FIGMA_HIGHLIGHT_COLORS.length]
  return (
    <blockquote className={`flex h-[225px] min-h-[225px] w-max min-w-[280px] max-w-[700px] flex-shrink-0 flex-col overflow-hidden border border-gray-600 border-l-4 ${borderColor} rounded-lg bg-[#0d0d0d] pl-6 pr-6 py-6 md:py-8`}>
      {rating != null && (
        <div className="flex gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={18}
              strokeWidth={1.5}
              className={n <= rating ? starColor : 'fill-transparent text-gray-600'}
              aria-hidden
            />
          ))}
        </div>
      )}
      <p className="min-h-0 flex-1 overflow-hidden text-lg md:text-xl text-muted-gray leading-relaxed">
        &ldquo;{item.quote}&rdquo;
      </p>
      <footer className="mt-6 flex flex-shrink-0 flex-wrap items-baseline gap-2">
        <cite className="font-mono text-sm font-medium text-light-gray not-italic">
          {item.attribution}
        </cite>
        {item.role && (
          <span className="font-mono text-sm text-gray-500">
            {item.role}
          </span>
        )}
        {item.date && (
          <span className="font-mono text-sm text-gray-500">
            {item.date}
          </span>
        )}
      </footer>
    </blockquote>
  )
}

export default function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  if (quotes.length === 0) return null

  const colorIndices = getNoRepeatColorIndices(quotes.length)

  return (
    <div className="w-full pb-4">
      <p className="text-lg font-bold font-mono uppercase text-gray-500 mb-8 max-w-6xl mx-auto">
        How my design impacted Toro's reputation
      </p>
      <div className="w-screen max-w-none ml-[calc(50%-50vw)] relative overflow-hidden">
        <div
          className="flex flex-nowrap gap-6 animate-ticker-scroll will-change-transform"
          style={{ width: 'max-content' }}
        >
          <div className="flex flex-nowrap shrink-0 gap-6">
            {quotes.map((q, i) => (
              <QuoteCard key={`a-${i}`} item={q} colorIndex={colorIndices[i]} />
            ))}
          </div>
          <div className="flex flex-nowrap shrink-0 gap-6">
            {quotes.map((q, i) => (
              <QuoteCard key={`b-${i}`} item={q} colorIndex={colorIndices[i]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
