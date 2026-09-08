'use client'

import { IndianRupee } from 'lucide-react'
import { DISCLAIMER, getPricing } from '@/lib/mock-data'

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm ${strong ? 'font-bold text-primary' : 'font-semibold text-card-foreground'}`}>
        {value}
      </span>
    </div>
  )
}

export function PricingCard({ cost }: { cost: number }) {
  const p = getPricing(cost)
  // Position of the recommended price within the market range (0-100%).
  const pos = Math.min(100, Math.max(0, ((p.price - p.rangeLow) / (p.rangeHigh - p.rangeLow)) * 100))

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 bg-secondary px-4 py-3">
        <IndianRupee className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide text-secondary-foreground">
          PRODUCT ECONOMICS
        </h3>
      </div>

      <div className="px-4 py-3">
        <div className="divide-y divide-border">
          <Row label="Manufacturing Cost" value={`₹${p.cost}`} />
          <Row label="Recommended Selling Price" value={`₹${p.price}`} strong />
          <Row label="Est. marketplace / logistics costs" value={`₹${p.marketplaceCost}`} />
          <Row label="Estimated Contribution" value={`₹${p.contribution}`} />
          <Row label="Estimated Contribution Margin" value={`${p.margin}%`} />
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
            <span>Value</span>
            <span>Market Price Range</span>
            <span>Premium</span>
          </div>
          <div className="relative h-2 rounded-full bg-gradient-to-r from-chart-3 via-primary to-chart-5">
            <div
              className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-card shadow"
              style={{ left: `${pos}%` }}
              aria-hidden="true"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>₹{p.rangeLow}</span>
            <span className="font-bold text-primary">₹{p.price}</span>
            <span>₹{p.rangeHigh}</span>
          </div>
        </div>

        <div className="mt-3 rounded-xl bg-secondary px-3 py-2.5">
          <p className="text-sm text-secondary-foreground">
            <span className="font-medium">Recommendation: </span>
            <span className="font-bold">Launch at ₹{p.price}</span>
          </p>
        </div>

        <p className="pt-2.5 text-[11px] text-muted-foreground">{DISCLAIMER} · illustrative demo assumptions</p>
      </div>
    </div>
  )
}
